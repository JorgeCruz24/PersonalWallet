<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import LayoutIcon, { type LayoutIconName } from '@/components/layout/LayoutIcon.vue'
import { demoUser, demoPartner } from '@/mocks/wallets'

const upcoming: { label: string; icon: LayoutIconName }[] = [
  { label: 'Movimientos', icon: 'transactions' },
  { label: 'Categorías', icon: 'categories' },
  { label: 'Reportes', icon: 'reports' },
  { label: 'Configuración', icon: 'settings' },
]
</script>

<template>
  <a href="#main-content" class="skip-link">Saltar al contenido</a>
  <div class="app-shell">
    <AppHeader :user-name="demoUser.name" :initials="demoUser.initials" :partner-name="demoPartner.name" :partner-initials="demoPartner.initials" />
    <aside class="app-sidebar">
      <div class="hidden px-3 pb-5 pt-1 md:block">
        <p class="text-[13px] font-semibold">Menú principal</p>
        <p class="mt-1 text-[11px] text-[var(--color-muted)]">Personal y compartido</p>
      </div>
      <nav aria-label="Navegación principal" class="flex gap-1 overflow-x-auto md:flex-col md:gap-1.5">
        <RouterLink to="/dashboard" class="nav-item nav-item-active" active-class="is-active">
          <LayoutIcon name="dashboard" class="size-5 shrink-0" />
          Dashboard
        </RouterLink>
        <span v-for="item in upcoming" :key="item.label" aria-disabled="true" :title="`${item.label}: próximamente`" class="nav-item cursor-default">
          <LayoutIcon :name="item.icon" class="size-5 shrink-0" />
          {{ item.label }}
          <span class="sr-only">Próximamente</span>
        </span>
      </nav>
      <div class="mt-auto hidden rounded-2xl border border-[var(--color-line)] bg-white/50 p-4 md:block">
        <p class="text-xs font-semibold text-[var(--color-accent)]">PersonalWallet</p>
        <p class="mt-1 text-[11px] leading-5 text-[var(--color-muted)]">Espacios separados.<br />Moneda única: MXN.</p>
      </div>
    </aside>
    <main id="main-content" class="dashboard-main" tabindex="-1">
      <RouterView />
    </main>
  </div>
</template>
