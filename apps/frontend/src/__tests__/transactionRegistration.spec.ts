import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { useWalletStore } from '@/stores/wallet.store'
import { useTransactionStore } from '@/stores/transaction.store'
import { demoTransactions } from '@/mocks/transactions'
import type { CreateTransactionInput } from '@/types/transaction'
import { localDate } from '@/utils/date'
import TransactionForm from '@/components/TransactionForm.vue'
import DashboardView from '@/views/DashboardView.vue'

vi.mock('vue-chartjs', () => ({ Doughnut: { template: '<canvas />', props: ['data', 'options'] } }))
beforeEach(() => {
  setActivePinia(createPinia())
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 10, 14, 23, 30))
})
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks() })

const input = (overrides: Partial<CreateTransactionInput> = {}): CreateTransactionInput => ({
  type: 'EXPENSE', categoryId: 'personal-food', amount: '12.50',
  description: ' Compra ', date: '2026-11-14', ...overrides,
})

describe('Registro en Pinia', () => {
  it.each([
    ['personal-demo', 'INCOME', 'personal-salary'],
    ['personal-demo', 'EXPENSE', 'personal-food'],
    ['shared-demo', 'INCOME', 'shared-contribution'],
    ['shared-demo', 'EXPENSE', 'shared-home'],
  ] as const)('registra %s %s completo, con identidad y auditoría automáticas', (wallet, type, categoryId) => {
    useWalletStore().selectWallet(wallet)
    const store = useTransactionStore()
    const transaction = store.addTransaction(input({ type, categoryId, amount: '123.4' }))
    expect(transaction).toMatchObject({
      walletId: wallet, userId: 'jorge-demo', type, categoryId, amount: '123.40',
      description: 'Compra', date: '2026-11-14', deletedAt: null, deletedById: null,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    })
    expect(transaction.id).toMatch(/^[0-9a-f-]{36}$/)
    expect(store.transactions).toContainEqual(transaction)
    expect(store.addTransaction(input({ type, categoryId })).id).not.toBe(transaction.id)
    expect(demoTransactions).toHaveLength(9)
    setActivePinia(createPinia())
    expect(useTransactionStore().transactions.some((item) => item.id === transaction.id)).toBe(false)
  })
  it.each(['0', '0.00', '-1', '1.001', '1e3', '1,50', '', ' 1', 'NaN', '1000000000000'])('rechaza importe %j sin insertar', (amount) => {
    const store = useTransactionStore()
    const before = store.transactions.length
    expect(() => store.addTransaction(input({ amount }))).toThrow('importe')
    expect(store.transactions).toHaveLength(before)
  })
  it('rechaza categoría ajena, desconocida o de otro tipo sin insertar', () => {
    const store = useTransactionStore()
    for (const categoryId of ['shared-home', 'ana-transport', 'personal-salary', 'unknown']) {
      expect(() => store.addTransaction(input({ categoryId }))).toThrow('categoría')
    }
    expect(store.transactions).toHaveLength(4)
  })
  it('rechaza wallets ajenas y no acepta identidad ni wallet inyectadas', () => {
    const wallets = useWalletStore()
    const store = useTransactionStore()
    expect(wallets.selectWallet('personal-ana-demo')).toBe(false)
    expect(() => store.addTransaction(input({ categoryId: 'ana-transport' }))).toThrow()
    const forged = { ...input(), walletId: 'personal-ana-demo', userId: 'ana-demo', deletedAt: '2026-11-14' }
    expect(store.addTransaction(forged)).toMatchObject({
      walletId: 'personal-demo', userId: 'jorge-demo', deletedAt: null,
    })
    // Defensa adicional si el contexto seleccionado se manipula fuera del selector.
    vi.spyOn(wallets, 'selectedWallet', 'get').mockReturnValue({
      id: 'personal-ana-demo', name: 'Ajena', type: 'PERSONAL', currency: 'MXN',
    })
    expect(() => store.addTransaction(input())).toThrow('acceso')
    expect(store.transactions).toEqual([])
  })
  it.each(['2026-02-29', '2026-04-31', '2026-13-01', '2026-00-01', '2026-11-00', '0000-01-01', '2026-11-14T00:00:00Z', ''])('rechaza fecha %j', (date) => {
    expect(() => useTransactionStore().addTransaction(input({ date }))).toThrow('fecha')
  })
  it('acepta día bisiesto y rechaza descripción vacía y tipo desconocido', () => {
    expect(useTransactionStore().addTransaction(input({ date: '2028-02-29', amount: '0.01' })).amount).toBe('0.01')
    expect(() => useTransactionStore().addTransaction(input({ description: '   ' }))).toThrow('descripción')
    expect(() => useTransactionStore().addTransaction(input({ type: 'OTHER' as 'INCOME' }))).toThrow('tipo')
  })
})

describe('Formulario e integración reactiva', () => {
  it('inicializa la fecha de calendario local aunque UTC corresponda a otro día', () => {
    const date = new Date(2026, 10, 14, 23, 30)
    vi.spyOn(date, 'toISOString').mockReturnValue('2026-11-15T07:30:00.000Z')
    expect(localDate(date)).toBe('2026-11-14')
    const wrapper = mount(TransactionForm)
    expect(wrapper.get<HTMLInputElement>('[name="date"]').element.value).toBe('2026-11-14')
    expect(wrapper.find('[name="userId"]').exists()).toBe(false)
    wrapper.unmount()
  })
  it('filtra categorías y limpia la selección al cambiar tipo o wallet', async () => {
    const wrapper = mount(TransactionForm)
    const category = wrapper.get('[name="categoryId"]')
    expect(category.text()).toContain('Comida')
    expect(category.text()).not.toContain('Sueldo')
    await category.setValue('personal-food')
    await wrapper.get('input[value="INCOME"]').setValue()
    expect(category.text()).toContain('Sueldo')
    expect(category.text()).not.toContain('Comida')
    expect((category.element as HTMLSelectElement).value).toBe('')
    await category.setValue('personal-salary')
    useWalletStore().selectWallet('shared-demo')
    await nextTick()
    expect((category.element as HTMLSelectElement).value).toBe('')
    expect(category.text()).toContain('Aportaciones')
    expect(category.text()).not.toContain('Sueldo')
    await wrapper.get('input[value="EXPENSE"]').setValue()
    expect(category.text()).toContain('Hogar')
    wrapper.unmount()
  })
  it('muestra errores, conserva datos tras fallo y limpia campos tras confirmar', async () => {
    const wrapper = mount(TransactionForm)
    await wrapper.get('[name="categoryId"]').setValue('personal-food')
    await wrapper.get('[name="amount"]').setValue('1.001')
    await wrapper.get('[name="description"]').setValue('Prueba')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('[role="alert"]').text()).toContain('dos decimales')
    expect(wrapper.get<HTMLInputElement>('[name="amount"]').element.value).toBe('1.001')
    const failure = vi.spyOn(useTransactionStore(), 'addTransaction').mockImplementationOnce(() => { throw new Error('Error simulado') })
    await wrapper.get('[name="amount"]').setValue('0.20')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('[role="alert"]').text()).toBe('Error simulado')
    failure.mockRestore()
    await wrapper.get('form').trigger('submit')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.get('[role="status"]').text()).toContain('Movimiento registrado')
    expect(wrapper.get<HTMLInputElement>('[name="amount"]').element.value).toBe('')
    expect(wrapper.get<HTMLInputElement>('[name="description"]').element.value).toBe('')
    expect(wrapper.get<HTMLSelectElement>('[name="categoryId"]').element.value).toBe('')
    wrapper.unmount()
  })
  it('actualiza tarjetas y gráfica al registrar ingresos y gastos en ambas wallets', async () => {
    const wrapper = mount(DashboardView)
    for (const [wallet, incomeCategory, expenseCategory, baseIncome, baseExpense] of [
      ['personal-demo', 'personal-salary', 'personal-food', '$25,010.20', '$230.85'],
      ['shared-demo', 'shared-contribution', 'shared-home', '$10.20', '$1,450.35'],
    ]) {
      useWalletStore().selectWallet(wallet!)
      await nextTick()
      const form = wrapper.getComponent(TransactionForm)
      await form.get('input[value="INCOME"]').setValue()
      await form.get('[name="categoryId"]').setValue(incomeCategory!)
      await form.get('[name="amount"]').setValue('10.20')
      await form.get('[name="description"]').setValue('Ingreso de prueba')
      await form.get('form').trigger('submit')
      expect(wrapper.get('[data-testid="summary-income"]').text()).toContain(baseIncome)
      await form.get('input[value="EXPENSE"]').setValue()
      await form.get('[name="categoryId"]').setValue(expenseCategory!)
      await form.get('[name="amount"]').setValue('0.10')
      await form.get('[name="description"]').setValue('Gasto de prueba')
      await form.get('form').trigger('submit')
      expect(wrapper.get('[data-testid="summary-expense"]').text()).toContain(baseExpense)
      expect(wrapper.get('[data-testid="expense-distribution"]').text()).toContain(baseExpense)
    }
    const form = wrapper.getComponent(TransactionForm)
    await form.get('[name="categoryId"]').setValue('shared-home')
    await form.get('[name="amount"]').setValue('100')
    await form.get('[name="date"]').setValue('2026-10-20')
    await form.get('[name="description"]').setValue('Otro periodo')
    await form.get('form').trigger('submit')
    expect(wrapper.get('[data-testid="summary-expense"]').text()).toContain('$1,450.35')
    await wrapper.findAll('select')[0]!.setValue('10')
    expect(wrapper.get('[data-testid="summary-expense"]').text()).toContain('$100.00')
    expect(wrapper.get('[data-testid="expense-distribution"]').text()).toContain('$100.00')
    wrapper.unmount()
  })
})
