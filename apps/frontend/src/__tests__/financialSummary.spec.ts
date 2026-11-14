import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { useFinancialSummary } from '@/composables/useFinancialSummary'
import { useWalletStore } from '@/stores/wallet.store'
import { decimalToCents, formatMoney } from '@/utils/money'
import DashboardView from '@/views/DashboardView.vue'

vi.mock('vue-chartjs', () => ({ Doughnut: { template: '<canvas />', props: ['data', 'options'] } }))

beforeEach(() => {
  setActivePinia(createPinia())
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 10, 14))
})
afterEach(() => vi.useRealTimers())

describe('Dinero en centavos', () => {
  it('convierte decimales exactamente y admite ceros y negativos', () => {
    expect(decimalToCents('0.10') + decimalToCents('0.20')).toBe(30)
    expect(decimalToCents('230.75')).toBe(23075)
    expect(decimalToCents('1.5')).toBe(150)
    expect(decimalToCents('0')).toBe(0)
    expect(decimalToCents('-1450.25')).toBe(-145025)
    expect(decimalToCents('999999999999.99')).toBe(99999999999999)
    expect(formatMoney(-145025)).toBe('-$1,450.25')
  })
  it('rechaza precisión extra, formatos inválidos y enteros inseguros', () => {
    for (const value of ['1.001', '', 'NaN', '1e3', '1,000.00', '9007199254740992']) {
      expect(() => decimalToCents(value)).toThrow(RangeError)
    }
    expect(() => formatMoney(1.5)).toThrow(RangeError)
  })
})

describe('Resumen financiero reactivo', () => {
  it('calcula ambos periodos personales excluyendo el gasto eliminado', () => {
    const { summary, selectedMonth, periodTransactions } = useFinancialSummary(new Date(2026, 10, 14))
    expect(summary.value).toEqual({ income: 2500000, expenses: 23075, balance: 2476925 })
    expect(periodTransactions.value.map((item) => item.id)).toEqual(['personal-income-nov', 'personal-expense-nov'])
    selectedMonth.value = 10
    expect(summary.value).toEqual({ income: 2500000, expenses: 18550, balance: 2481450 })
  })
  it('actualiza la wallet sin repartir gastos ni cambiar el periodo', () => {
    const { summary, selectedMonth } = useFinancialSummary(new Date(2026, 10, 14))
    useWalletStore().selectWallet('shared-demo')
    expect(selectedMonth.value).toBe(11)
    expect(summary.value).toEqual({ income: 0, expenses: 145025, balance: -145025 })
    selectedMonth.value = 10
    expect(summary.value).toEqual({ income: 800000, expenses: 0, balance: 800000 })
    useWalletStore().selectWallet('personal-ana-demo')
    expect(summary.value.income).toBe(800000)
    useWalletStore().selectWallet('personal-demo')
    expect(summary.value.expenses).toBe(18550)
  })
  it('devuelve ceros para meses y años sin movimientos', () => {
    const { summary, selectedMonth, selectedYear } = useFinancialSummary(new Date(2026, 10, 14))
    selectedYear.value = 2025
    expect(summary.value).toEqual({ income: 0, expenses: 0, balance: 0 })
    selectedYear.value = 2026
    selectedMonth.value = 12
    expect(summary.value).toEqual({ income: 0, expenses: 0, balance: 0 })
  })
  it('conecta los selectores de periodo y las tarjetas en el dashboard', async () => {
    const wrapper = mount(DashboardView)
    await wrapper.get('select').setValue('11')
    await wrapper.findAll('select')[1]!.setValue('2026')
    expect(wrapper.get('[data-testid="summary-balance"]').text()).toContain('$24,769.25')
    await wrapper.get('select').setValue('10')
    expect(wrapper.get('[data-testid="summary-expense"]').text()).toContain('$185.50')
    expect(wrapper.get('[data-testid="transactions"]').text()).not.toContain('noviembre')
    await wrapper.findAll('select')[1]!.setValue('2025')
    expect(wrapper.get('[data-testid="summary-income"]').text()).toContain('$0.00')
    expect(wrapper.text()).toContain('No hay movimientos activos en este periodo.')
    wrapper.unmount()
  })
})