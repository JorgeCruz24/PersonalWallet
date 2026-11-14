import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { demoWallets } from '@/mocks/wallets'

export const useWalletStore = defineStore('wallet', () => {
  const wallets = demoWallets
  const selectedWalletId = ref(wallets[0]!.id)
  const selectedWallet = computed(() => wallets.find((wallet) => wallet.id === selectedWalletId.value)!)

  function selectWallet(id: string) {
    if (wallets.some((wallet) => wallet.id === id)) selectedWalletId.value = id
  }

  return { wallets, selectedWallet, selectWallet }
})
