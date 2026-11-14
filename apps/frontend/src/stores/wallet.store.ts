import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { demoUser, demoWallets, demoWalletMembers } from '@/mocks/wallets'

export const useWalletStore = defineStore('wallet', () => {
  const wallets = computed(() =>
    demoWallets.filter((wallet) =>
      demoWalletMembers.some((member) => member.walletId === wallet.id && member.userId === demoUser.id),
    ),
  )
  const selectedWalletId = ref(wallets.value[0]!.id)
  const selectedWallet = computed(() =>
    wallets.value.find((wallet) => wallet.id === selectedWalletId.value)!,
  )

  function selectWallet(id: string): boolean {
    if (!wallets.value.some((wallet) => wallet.id === id)) return false
    selectedWalletId.value = id
    return true
  }

  return { wallets, selectedWallet, selectWallet }
})