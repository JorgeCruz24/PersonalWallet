import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { demoUser, demoWallets, demoWalletMembers } from '@/mocks/wallets'
import { demoCategories } from '@/mocks/categories'
import { demoTransactions } from '@/mocks/transactions'
import { useWalletStore } from '@/stores/wallet.store'
import { useTransactionStore } from '@/stores/transaction.store'

beforeEach(() => setActivePinia(createPinia()))

describe('Selección de wallets', () => {
  it('ofrece únicamente la personal del usuario simulado y la compartida', () => {
    const store = useWalletStore()
    expect(store.wallets.map((wallet) => wallet.id)).toEqual(['personal-demo', 'shared-demo'])
    expect(store.selectedWallet.id).toBe('personal-demo')
  })

  it('cambia de wallet y rechaza una wallet ajena real y un ID desconocido', () => {
    const store = useWalletStore()
    expect(store.selectWallet('shared-demo')).toBe(true)
    expect(store.selectedWallet.id).toBe('shared-demo')
    expect(store.selectWallet('personal-ana-demo')).toBe(false)
    expect(store.selectWallet('unknown')).toBe(false)
    expect(store.selectedWallet.id).toBe('shared-demo')
    expect(store.selectWallet('personal-demo')).toBe(true)
    expect(store.selectedWallet.id).toBe('personal-demo')
  })

  it('restablece la selección en una nueva instancia de Pinia', () => {
    useWalletStore().selectWallet('shared-demo')
    setActivePinia(createPinia())
    expect(useWalletStore().selectedWallet.id).toBe('personal-demo')
  })
})

describe('Movimientos por wallet', () => {
  it('incluye ingresos y gastos de varios meses y excluye el eliminado', () => {
    const store = useTransactionStore()
    expect(store.transactions.map((transaction) => transaction.id)).toEqual([
      'personal-income-oct', 'personal-expense-oct', 'personal-income-nov', 'personal-expense-nov',
    ])
    expect(demoTransactions.some((transaction) => transaction.deletedAt !== null)).toBe(true)
    expect(store.transactions.every((transaction) => transaction.deletedAt === null)).toBe(true)
  })

  it('reacciona al selector sin mezclar wallets ni filtrar por creador en la compartida', () => {
    const wallets = useWalletStore()
    const store = useTransactionStore()
    wallets.selectWallet('shared-demo')
    expect(store.transactions.map((transaction) => transaction.id)).toEqual([
      'shared-income-oct', 'shared-expense-nov',
    ])
    expect(new Set(store.transactions.map((transaction) => transaction.userId)).size).toBe(2)
    wallets.selectWallet('personal-ana-demo')
    expect(store.transactions.every((transaction) => transaction.walletId === 'shared-demo')).toBe(true)
    wallets.selectWallet('personal-demo')
    expect(store.transactions).toHaveLength(4)
    expect(store.transactions.every((transaction) => transaction.userId === demoUser.id)).toBe(true)
  })

  it('mantiene mocks coherentes con membresías, categorías, moneda y decimales', () => {
    for (const transaction of demoTransactions) {
      expect(demoWallets.find((wallet) => wallet.id === transaction.walletId)?.currency).toBe('MXN')
      expect(demoWalletMembers.some((member) =>
        member.walletId === transaction.walletId && member.userId === transaction.userId,
      )).toBe(true)
      expect(demoCategories.find((category) => category.id === transaction.categoryId)).toMatchObject({
        walletId: transaction.walletId, type: transaction.type,
      })
      expect(transaction.amount).toMatch(/^\d{1,12}\.\d{2}$/)
      expect(Number(transaction.amount)).toBeGreaterThan(0)
    }
  })
})