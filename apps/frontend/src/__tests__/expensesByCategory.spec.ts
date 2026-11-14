import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, ref } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { useExpensesByCategory } from '@/composables/useExpensesByCategory'
import { useFinancialSummary } from '@/composables/useFinancialSummary'
import { useWalletStore } from '@/stores/wallet.store'
import { demoTransactions } from '@/mocks/transactions'
import type { Transaction } from '@/types/transaction'
import ExpenseDonutChart from '@/components/ExpenseDonutChart.vue'
import DashboardView from '@/views/DashboardView.vue'

vi.mock('vue-chartjs', () => ({ Doughnut: { template: '<canvas />', props: ['data', 'options'] } }))
beforeEach(() => setActivePinia(createPinia()))
const expense = (overrides: Partial<Transaction> = {}): Transaction => ({
  ...demoTransactions.find((item) => item.id === 'personal-expense-nov')!, ...overrides,
})

describe('Gastos por categoría', () => {
  it('agrupa por ID, conserva centavos y excluye ingresos y eliminados', () => {
    const transactions = ref([
      expense({ amount: '0.10' }), expense({ amount: '0.20' }),
      expense({ categoryId: 'another-food', amount: '0.60' }),
      expense({ type: 'INCOME', amount: '100.00' }),
      expense({ deletedAt: '2026-11-08', amount: '99.00' }),
    ])
    const { categories, total } = useExpensesByCategory(transactions)
    expect(total.value).toBe(90)
    expect(categories.value.map((item) => item.cents)).toEqual([60, 30])
    expect(categories.value[0]!.percentage).toBeCloseTo(66.6666667)
    expect(categories.value[1]!.percentage).toBeCloseTo(33.3333333)
    expect(categories.value.reduce((sum, item) => sum + item.percentage, 0)).toBeCloseTo(100)
    transactions.value = []
    expect(total.value).toBe(0)
    expect(categories.value).toEqual([])
  })
  it('mantiene IDs distintos aunque tengan el mismo nombre', () => {
    const { categories } = useExpensesByCategory(ref([
      expense({ categoryId: 'unknown-one' }), expense({ categoryId: 'unknown-two' }),
    ]))
    expect(categories.value).toHaveLength(2)
    expect(categories.value[0]!.name).toBe(categories.value[1]!.name)
    expect(categories.value[0]!.categoryId).not.toBe(categories.value[1]!.categoryId)
  })
  it('coincide con el resumen al cambiar wallet, mes y año sin mezclar espacios', () => {
    const { periodTransactions, summary, selectedMonth, selectedYear } = useFinancialSummary(new Date(2026, 10, 14))
    const { categories, total } = useExpensesByCategory(periodTransactions)
    const wallets = useWalletStore()
    const verify = (expected: number, ids: string[]) => {
      expect(total.value).toBe(expected)
      expect(total.value).toBe(summary.value.expenses)
      expect(categories.value.reduce((sum, item) => sum + item.cents, 0)).toBe(expected)
      expect(categories.value.map((item) => item.categoryId)).toEqual(ids)
    }
    verify(23075, ['personal-food'])
    selectedMonth.value = 10
    verify(18550, ['personal-food'])
    wallets.selectWallet('shared-demo')
    verify(0, []) // Hay ingresos, pero no gastos.
    selectedMonth.value = 11
    verify(145025, ['shared-home']) // Gasto de Ana completo.
    wallets.selectWallet('personal-ana-demo')
    verify(145025, ['shared-home']) // Selección ajena rechazada.
    selectedYear.value = 2025
    verify(0, [])
    selectedYear.value = 2026
    wallets.selectWallet('personal-demo')
    verify(23075, ['personal-food'])
  })
  it('mantiene el color de una categoría entre periodos', () => {
    const transactions = ref([expense()])
    const { categories } = useExpensesByCategory(transactions)
    const color = categories.value[0]!.color
    transactions.value = [expense({ categoryId: 'another' }), expense()]
    expect(categories.value.find((item) => item.categoryId === 'personal-food')!.color).toBe(color)
  })
  it('rechaza sumas fuera del rango entero seguro', () => {
    const { total } = useExpensesByCategory(ref([expense({ amount: '90071992547409.91' }), expense({ amount: '0.01' })]))
    expect(() => total.value).toThrow(RangeError)
  })
  it('muestra leyenda con MXN y porcentajes o estado vacío sin canvas', async () => {
    const { categories, total } = useExpensesByCategory(ref([expense()]))
    const wrapper = mount(ExpenseDonutChart, { props: { categories: categories.value, total: total.value } })
    expect(wrapper.text()).toContain('$230.75 MXN')
    expect(wrapper.text()).toContain('100 %')
    expect(wrapper.get('ul').text()).toContain('Comida')
    await wrapper.setProps({ categories: [], total: 0 })
    expect(wrapper.find('canvas').exists()).toBe(false)
    expect(wrapper.text()).toContain('No hay gastos activos')
    wrapper.unmount()
  })
  it('actualiza la gráfica desde los controles existentes del dashboard', async () => {
    const wrapper = mount(DashboardView)
    const selects = wrapper.findAll('select')
    await selects[1]!.setValue('2026')
    await selects[0]!.setValue('11')
    const chart = computed(() => wrapper.get('[data-testid="expense-distribution"]'))
    expect(chart.value.text()).toContain('$230.75 MXN')
    await selects[0]!.setValue('10')
    expect(chart.value.text()).toContain('$185.50 MXN')
    await wrapper.get('input[value="shared-demo"]').setValue()
    expect(chart.value.text()).toContain('No hay gastos activos')
    await selects[0]!.setValue('11')
    expect(chart.value.text()).toContain('$1,450.25 MXN')
    expect(chart.value.text()).not.toContain('Comida')
    wrapper.unmount()
  })
})
