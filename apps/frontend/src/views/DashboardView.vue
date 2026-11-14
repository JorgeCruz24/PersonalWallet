<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/stores/wallet.store'
import { demoUser } from '@/mocks/wallets'
import WalletSelector from '@/components/layout/WalletSelector.vue'
import LayoutIcon from '@/components/layout/LayoutIcon.vue'

const { selectedWallet } = storeToRefs(useWalletStore())
</script>

<template>
  <section aria-labelledby="welcome-heading">
    <div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div>
        <p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          <LayoutIcon name="sparkles" class="size-4" />
          Su espacio financiero
        </p>
        <h2 id="welcome-heading" class="mt-2 text-4xl font-bold tracking-[-0.045em] sm:text-[46px] sm:leading-tight">
          {{ selectedWallet.type === 'SHARED' ? 'Hola, equipo' : `Hola, ${demoUser.name}` }}
        </h2>
        <p class="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          {{ selectedWallet.type === 'SHARED' ? 'Un vistazo claro a lo que construyen juntos.' : 'Un vistazo claro a tus finanzas personales.' }}
        </p>
      </div>
      <WalletSelector />
    </div>

    <section class="workspace-panel mt-7" aria-labelledby="wallet-heading">
      <div role="status" aria-live="polite" aria-atomic="true">
        <span class="inline-flex rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] font-semibold text-[var(--color-accent)]">Espacio seleccionado</span>
        <h3 id="wallet-heading" class="mt-5 text-xl font-semibold tracking-tight">{{ selectedWallet.name }}</h3>
        <p class="mt-2 max-w-lg text-sm leading-6 text-[var(--color-muted)]">
          {{ selectedWallet.type === 'PERSONAL'
            ? 'Un espacio para tus ingresos y gastos personales, separado de las finanzas compartidas.'
            : 'Un espacio para administrar juntos los ingresos y gastos compartidos, sin reparto automático.' }}
        </p>
      </div>
      <div class="mt-10 border-t border-[var(--color-line)] pt-6">
        <p class="text-xs font-semibold">Tu resumen financiero, próximamente</p>
        <p class="mt-2 max-w-lg text-xs leading-6 text-[var(--color-muted)]">Aquí podrás consultar tus balances, explorar gastos por categoría y registrar movimientos.</p>
      </div>
    </section>
    <p class="mt-4 text-[11px] leading-5 text-[var(--color-muted)]">Vista de demostración · Wallets y usuarios simulados · MXN</p>
  </section>
</template>
