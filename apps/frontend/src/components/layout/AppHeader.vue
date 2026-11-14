<script setup lang="ts">
defineProps<{ userName: string; initials: string }>()
</script>

<template>
  <header class="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-emerald-700">Tu espacio financiero</p>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Resumen mensual</h1>
    </div>
    <div class="flex shrink-0 items-center gap-3" aria-label="Usuario de demostración">
      <span class="flex size-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800" aria-hidden="true">{{ initials }}</span>
      <div class="hidden sm:block">
        <p class="text-sm font-semibold text-slate-900">{{ userName }}</p>
        <p class="text-xs text-slate-500">Cuenta de demostración</p>
      </div>
    </div>
  </header>
</template>
