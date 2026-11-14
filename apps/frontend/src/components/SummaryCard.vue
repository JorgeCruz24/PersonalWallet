<script setup lang="ts">
import { formatMoney } from '@/utils/money'

defineProps<{ title: string; cents: number; variant: 'income' | 'expense' | 'balance' }>()
const tones = {
  income: 'bg-emerald-100 text-emerald-700',
  expense: 'bg-red-100 text-red-600',
  balance: 'bg-violet-100 text-violet-700',
}
</script>

<template>
  <article
    class="flex min-w-0 items-center gap-4 overflow-hidden rounded-[20px] border p-5 sm:p-6"
    :class="variant === 'balance' ? 'border-violet-200 bg-gradient-to-br from-white to-violet-50' : 'border-[var(--color-line)] bg-white'"
    :data-testid="`summary-${variant}`"
  >
    <span class="flex size-11 shrink-0 items-center justify-center rounded-xl text-xl" :class="tones[variant]" aria-hidden="true">
      {{ variant === 'income' ? '↗' : variant === 'expense' ? '↘' : '=' }}
    </span>
    <div class="min-w-0">
      <h3 class="text-xs font-medium text-[var(--color-muted)]">{{ title }}</h3>
      <p class="mt-1 break-words text-2xl font-bold tracking-tight tabular-nums">{{ formatMoney(cents) }}</p>
      <p class="mt-1 text-[11px] text-[var(--color-muted)]">Periodo seleccionado · MXN</p>
    </div>
  </article>
</template>
