<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/stores/wallet.store'

const { selectedWallet } = storeToRefs(useWalletStore())
</script>

<template>
  <section class="mt-8" aria-labelledby="wallet-heading">
    <div role="status" aria-live="polite" aria-atomic="true">
      <p class="text-xs font-semibold uppercase tracking-widest text-emerald-700">Wallet seleccionada</p>
      <h2 id="wallet-heading" class="mt-2 text-xl font-bold text-slate-900">{{ selectedWallet.name }}</h2>
      <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
        {{ selectedWallet.type === 'PERSONAL'
          ? 'Un espacio para tus ingresos y gastos personales, separado de las finanzas compartidas.'
          : 'Un espacio para administrar juntos los ingresos y gastos compartidos, sin reparto automático.' }}
      </p>
    </div>
    <div class="mt-7 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:py-20">
      <span class="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">Primera etapa</span>
      <h3 class="mt-4 text-lg font-semibold text-slate-900">Tu resumen financiero comienza aquí</h3>
      <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">En las siguientes etapas podrás consultar balances y registrar movimientos en este espacio.</p>
    </div>
    <p class="mt-5 text-xs leading-5 text-slate-500">Vista de demostración con wallets simuladas. La autenticación y la conexión al backend están pendientes.</p>
  </section>
</template>
