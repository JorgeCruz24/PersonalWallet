<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet.store'

const walletStore = useWalletStore()
</script>

<template>
  <fieldset>
    <legend class="mb-2 text-sm font-medium text-slate-600">Espacio financiero</legend>
    <div class="inline-flex w-full rounded-2xl border border-slate-200 bg-white p-1 sm:w-auto">
      <label
        v-for="wallet in walletStore.wallets"
        :key="wallet.id"
        class="relative flex flex-1 cursor-pointer sm:flex-none"
      >
        <input
          type="radio"
          name="wallet"
          :value="wallet.id"
          :checked="walletStore.selectedWallet.id === wallet.id"
          class="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          @change="walletStore.selectWallet(wallet.id)"
        />
        <span class="w-full rounded-xl px-5 py-3 text-center text-sm font-semibold text-slate-600 transition peer-checked:bg-emerald-700 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-600 sm:min-w-40">
          {{ wallet.name }}
        </span>
      </label>
    </div>
  </fieldset>
</template>
