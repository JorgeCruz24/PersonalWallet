<script setup lang="ts">
import { computed } from 'vue'
import { ArcElement, Chart as ChartJS, Tooltip, type ChartOptions } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import type { useExpensesByCategory } from '@/composables/useExpensesByCategory'
import { formatMoney } from '@/utils/money'

ChartJS.register(ArcElement, Tooltip)
const props = defineProps<{
  categories: ReturnType<typeof useExpensesByCategory>['categories']['value']
  total: number
}>()
const percent = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 1 })
const data = computed(() => ({
  labels: props.categories.map((item) => item.name),
  datasets: [{ data: props.categories.map((item) => item.cents), backgroundColor: props.categories.map((item) => item.color), borderWidth: 2, borderColor: '#ffffff', hoverOffset: 4 }],
}))
const options: ChartOptions<'doughnut'> = {
  responsive: true, maintainAspectRatio: false, cutout: '70%', animation: false,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (context) => {
      const category = props.categories[context.dataIndex]!
      return `${category.name}: ${formatMoney(category.cents)} MXN (${percent.format(category.percentage)} %)`
    } } },
  },
}
</script>

<template>
  <section class="workspace-panel mt-7" aria-labelledby="expenses-heading" data-testid="expense-distribution">
    <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">Distribución</p>
    <h3 id="expenses-heading" class="mt-2 text-lg font-semibold">¿En qué se fue el dinero?</h3>
    <div v-if="total > 0" class="mt-6 grid items-center gap-7 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
      <div class="relative mx-auto h-64 w-full max-w-64">
        <Doughnut :data="data" :options="options" aria-label="Distribución de gastos por categoría; detalle en la leyenda" role="img" />
        <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center" aria-hidden="true">
          <span class="text-xs text-[var(--color-muted)]">Total gastado</span>
          <span class="mt-1 text-xl font-bold tabular-nums">{{ formatMoney(total) }}</span>
          <span class="mt-1 text-xs text-[var(--color-muted)]">MXN</span>
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true" class="min-w-0">
        <p class="text-sm font-semibold">Total gastado: {{ formatMoney(total) }} MXN</p>
        <ul class="mt-4 space-y-4" aria-label="Gastos por categoría">
          <li v-for="category in categories" :key="category.categoryId" class="flex items-center gap-3 text-sm">
            <span class="size-2.5 shrink-0 rounded-full" :style="{ backgroundColor: category.color }" aria-hidden="true" />
            <div class="min-w-0 flex-1">
              <p class="break-words font-medium">{{ category.name }}</p>
              <p class="text-xs text-[var(--color-muted)]">{{ percent.format(category.percentage) }} %</p>
            </div>
            <span class="shrink-0 text-xs font-semibold tabular-nums">{{ formatMoney(category.cents) }} MXN</span>
          </li>
        </ul>
      </div>
    </div>
    <p v-else class="mt-6 text-sm text-[var(--color-muted)]" role="status">No hay gastos activos en este periodo para esta wallet.</p>
  </section>
</template>
