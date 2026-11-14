import { computed } from 'vue'
import { defineStore } from 'pinia'
import { demoTransactions } from '@/mocks/transactions'
import { useWalletStore } from './wallet.store'

export const useTransactionStore = defineStore('transaction', () => {
  const walletStore = useWalletStore()
  const transactions = computed(() =>
    demoTransactions.filter(
      (transaction) =>
        transaction.walletId === walletStore.selectedWallet.id && transaction.deletedAt === null,
    ),
  )

  return { transactions }
})