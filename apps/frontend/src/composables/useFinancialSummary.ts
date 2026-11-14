import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '@/stores/transaction.store'
import { useWalletStore } from '@/stores/wallet.store'
import { decimalToCents } from '@/utils/money'

export function useFinancialSummary(today = new Date()) {
  const { transactions } = storeToRefs(useTransactionStore())
  const { selectedWallet } = storeToRefs(useWalletStore())
  const selectedMonth = ref(today.getMonth() + 1)
  const selectedYear = ref(today.getFullYear())
  // Fechas de dominio YYYY-MM-DD: comparar el calendario sin conversión de zona horaria.
  const periodTransactions = computed(() => {
    const prefix = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-`
    return transactions.value.filter((transaction) =>
      transaction.walletId === selectedWallet.value.id &&
      transaction.deletedAt === null && transaction.date.startsWith(prefix),
    )
  })
  const summary = computed(() => {
    let income = 0
    let expenses = 0
    for (const transaction of periodTransactions.value) {
      const cents = decimalToCents(transaction.amount)
      if (transaction.type === 'INCOME') income += cents
      else if (transaction.type === 'EXPENSE') expenses += cents
      if (!Number.isSafeInteger(income) || !Number.isSafeInteger(expenses)) {
        throw new RangeError('Total fuera del rango seguro')
      }
    }
    const balance = income - expenses
    if (!Number.isSafeInteger(balance)) throw new RangeError('Balance fuera del rango seguro')
    return { income, expenses, balance }
  })
  return { selectedMonth, selectedYear, periodTransactions, summary }
}
