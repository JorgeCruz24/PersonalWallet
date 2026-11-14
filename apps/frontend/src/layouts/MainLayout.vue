<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import WalletSelector from '@/components/layout/WalletSelector.vue'
import { demoUser } from '@/mocks/wallets'
</script>

<template>
  <a href="#main-content" class="sr-only z-50 rounded bg-white p-3 text-emerald-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Saltar al contenido</a>
  <div class="min-h-dvh bg-slate-50 md:flex">
    <aside class="flex flex-col bg-emerald-950 text-white md:fixed md:inset-y-0 md:w-60">
      <RouterLink to="/dashboard" class="flex items-center gap-3 border-b border-white/10 px-6 py-6 text-lg font-bold tracking-tight">
        <svg class="size-8 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20 7H5a2 2 0 0 1 0-4h13v4M4 7v12a2 2 0 0 0 2 2h14V7M16 12h4v5h-4a2.5 2.5 0 0 1 0-5Z" /></svg>
        PersonalWallet
      </RouterLink>
      <nav aria-label="Navegación principal" class="flex gap-2 overflow-x-auto p-3 md:flex-col md:p-4">
        <RouterLink to="/dashboard" class="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold shadow-sm" active-class="ring-1 ring-white/15">Dashboard</RouterLink>
        <span v-for="label in ['Movimientos', 'Categorías', 'Reportes', 'Configuración']" :key="label" aria-disabled="true" class="flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm text-emerald-100/60">
          {{ label }} <span class="text-[10px] uppercase tracking-wide">Próximamente</span>
        </span>
      </nav>
      <div class="mt-auto hidden border-t border-white/10 px-6 py-5 md:block">
        <p class="text-sm font-medium">{{ demoUser.name }}</p>
        <p class="mt-1 text-xs text-emerald-100/60">Sesión simulada · MXN</p>
      </div>
    </aside>
    <div class="min-w-0 flex-1 md:ml-60">
      <AppHeader :user-name="demoUser.name" :initials="demoUser.initials" />
      <main id="main-content" class="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8" tabindex="-1">
        <WalletSelector />
        <RouterView />
      </main>
    </div>
  </div>
</template>
