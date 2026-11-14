<script setup lang="ts">
export type LayoutIconName = 'wallet' | 'dashboard' | 'transactions' | 'categories' | 'reports' | 'settings' | 'sparkles'
defineProps<{ name: LayoutIconName }>()
const paths: Record<LayoutIconName, string> = {
  wallet: 'M4 5h16v15H4z M4 9h16 M7 13l5 3 5-3 M7 2h10',
  dashboard: 'M3 3h7v7H3z M14 3h7v4h-7z M3 14h7v7H3z M14 11h7v10h-7z',
  transactions: 'M5 3l2 1 2-1 3 1 3-1 2 1 2-1v18l-2-1-2 1-3-1-3 1-2-1-2 1z M8 8h8 M8 12h8 M8 16h5',
  categories: 'M3 4h8l10 10-7 7L3 10z M7 8h.01 M15 3l6 6',
  reports: 'M5 20v-6 M12 20V8 M19 20V3',
  settings: 'M9 3h6l1 4 4 1v7l-4 1-1 5H9l-1-5-4-1V8l4-1z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  sparkles: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z M20 2v4 M18 4h4',
}
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[name]" />
  </svg>
</template>
