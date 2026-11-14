<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet.store'
const walletStore = useWalletStore()
</script>

<template>
  <fieldset class="min-w-0">
    <legend class="mb-2 text-[11px] font-medium text-[var(--color-muted)]">Espacio financiero</legend>
    <div class="inline-flex w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-1 sm:w-auto">
      <label v-for="wallet in walletStore.wallets" :key="wallet.id" class="relative flex min-w-0 flex-1 cursor-pointer sm:flex-none">
        <input
          type="radio"
          name="wallet"
          :value="wallet.id"
          :checked="walletStore.selectedWallet.id === wallet.id"
          class="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          @change="walletStore.selectWallet(wallet.id)"
        />
        <span class="w-full rounded-lg px-4 py-2.5 text-center text-xs font-semibold text-[var(--color-muted)] transition peer-checked:bg-[var(--color-accent)] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-accent)] sm:min-w-32">
          {{ wallet.name }}
        </span>
      </label>
    </div>
  </fieldset>
</template>
