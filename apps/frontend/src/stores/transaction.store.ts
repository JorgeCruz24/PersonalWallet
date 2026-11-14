import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { demoTransactions } from '@/mocks/transactions'
import { demoCategories } from '@/mocks/categories'
import { demoUser } from '@/mocks/wallets'
import type { CreateTransactionInput, Transaction } from '@/types/transaction'
import { decimalToCents } from '@/utils/money'
import { isCalendarDate } from '@/utils/date'
import { useWalletStore } from './wallet.store'

export const useTransactionStore = defineStore('transaction', () => {
  const walletStore = useWalletStore()
  const records = ref<Transaction[]>(demoTransactions.map((transaction) => ({ ...transaction })))
  const transactions = computed(() =>
    records.value.filter(
      (transaction) =>
        walletStore.wallets.some((wallet) => wallet.id === transaction.walletId) &&
        transaction.walletId === walletStore.selectedWallet.id && transaction.deletedAt === null,
    ),
  )

  function addTransaction(input: CreateTransactionInput): Transaction {
    const wallet = walletStore.selectedWallet
    if (!wallet || !walletStore.wallets.some((item) => item.id === wallet.id)) {
      throw new Error('No tienes acceso a esta wallet.')
    }
    if (input.type !== 'INCOME' && input.type !== 'EXPENSE') throw new Error('Selecciona un tipo válido.')
    if (!demoCategories.some((category) =>
      category.id === input.categoryId && category.walletId === wallet.id && category.type === input.type,
    )) throw new Error('Selecciona una categoría de esta wallet y tipo de movimiento.')
    // Límite compatible con el contrato Decimal(14,2); no se redondean entradas.
    if (!/^\d{1,12}(?:\.\d{1,2})?$/.test(input.amount) || decimalToCents(input.amount) <= 0) {
      throw new Error('El importe debe ser mayor que cero y tener máximo dos decimales (hasta 12 enteros).')
    }
    if (!isCalendarDate(input.date)) throw new Error('Selecciona una fecha válida.')
    if (!input.description.trim()) throw new Error('Escribe una descripción.')
    const [whole, fraction = ''] = input.amount.split('.')
    const timestamp = new Date().toISOString()
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      walletId: wallet.id,
      userId: demoUser.id,
      categoryId: input.categoryId,
      type: input.type,
      amount: `${whole!.replace(/^0+(?=\d)/, '')}.${fraction.padEnd(2, '0')}`,
      description: input.description.trim(),
      date: input.date,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
      deletedById: null,
    }
    records.value.push(transaction)
    return transaction
  }

  return { transactions, addTransaction }
})
