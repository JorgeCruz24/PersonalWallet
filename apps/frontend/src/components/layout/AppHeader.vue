<script setup lang="ts">
import LayoutIcon from './LayoutIcon.vue'
defineProps<{ userName: string; initials: string; partnerName: string; partnerInitials: string }>()
</script>

<template>
  <header class="app-header">
    <div class="flex min-w-0 items-center gap-3">
      <RouterLink to="/dashboard" aria-label="PersonalWallet — inicio" class="brand-mark">
        <LayoutIcon name="wallet" class="size-6" />
      </RouterLink>
      <h1 class="truncate text-lg font-bold tracking-tight sm:text-[23px]">Resumen mensual</h1>
      <span class="ml-2 hidden border-l border-[var(--color-line)] pl-5 text-[13px] text-[var(--color-muted)] lg:block">Finanzas en pareja</span>
    </div>
    <div class="flex shrink-0 items-center gap-3" :aria-label="`Usuarios de demostración: ${userName} y ${partnerName}`">
      <div class="flex -space-x-1.5" aria-hidden="true">
        <span class="avatar bg-emerald-100 text-emerald-700">{{ initials }}</span>
        <span class="avatar bg-purple-100 text-purple-700">{{ partnerInitials }}</span>
      </div>
      <span class="hidden text-xs font-semibold text-[var(--color-muted)] sm:block">{{ userName }} &amp; {{ partnerName }}</span>
    </div>
  </header>
</template>
