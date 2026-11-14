<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction.store'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/stores/wallet.store'
import { useFinancialSummary } from '@/composables/useFinancialSummary'
import { decimalToCents, formatMoney } from '@/utils/money'
import SummaryCard from '@/components/SummaryCard.vue'
import ExpenseDonutChart from '@/components/ExpenseDonutChart.vue'
import { useExpensesByCategory } from '@/composables/useExpensesByCategory'
import { demoUser } from '@/mocks/wallets'
import WalletSelector from '@/components/layout/WalletSelector.vue'
import LayoutIcon from '@/components/layout/LayoutIcon.vue'

const { selectedWallet } = storeToRefs(useWalletStore())
const { selectedMonth, selectedYear, periodTransactions: transactions, summary } = useFinancialSummary()
const { categories, total } = useExpensesByCategory(transactions)
const months = Array.from({ length: 12 }, (_, index) =>
  new Intl.DateTimeFormat('es-MX', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, index, 1))),
)
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from(new Set([currentYear - 1, currentYear, currentYear + 1, selectedYear.value,
    ...transactionYears.value])).sort((a, b) => a - b)
})
const transactionStore = useTransactionStore()
const transactionYears = computed(() => transactionStore.transactions.map((transaction) => Number(transaction.date.slice(0, 4))))

const dateFormatter = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeZone: 'UTC' })
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
    </section>
    <section class="mt-7" aria-labelledby="summary-heading">
      <div class="mb-4 flex flex-wrap items-end justify-between gap-4">
        <h3 id="summary-heading" class="text-lg font-semibold">Resumen financiero</h3>
        <div class="flex flex-wrap gap-3">
          <label class="text-xs text-[var(--color-muted)]">
            Mes
            <select v-model.number="selectedMonth" class="mt-1 block rounded-xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)]">
              <option v-for="(month, index) in months" :key="month" :value="index + 1">{{ month }}</option>
            </select>
          </label>
          <label class="text-xs text-[var(--color-muted)]">
            Año
            <select v-model.number="selectedYear" class="mt-1 block rounded-xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)]">
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
          </label>
        </div>
      </div>
      <div class="grid gap-4 xl:grid-cols-3" aria-live="polite" aria-atomic="true">
        <SummaryCard title="Ingresos" :cents="summary.income" variant="income" />
        <SummaryCard title="Gastos" :cents="summary.expenses" variant="expense" />
        <SummaryCard title="Balance" :cents="summary.balance" variant="balance" />
      </div>
    </section>
    <ExpenseDonutChart :categories="categories" :total="total" />
    <section class="workspace-panel mt-7" aria-labelledby="transactions-heading">
      <h3 id="transactions-heading" class="text-lg font-semibold">Movimientos de demostración</h3>
      <p class="mt-2 text-xs leading-6 text-[var(--color-muted)]">Lista temporal de {{ selectedWallet.name }} · {{ months[selectedMonth - 1] }} {{ selectedYear }} · MXN</p>
      <ul v-if="transactions.length" class="mt-4 divide-y divide-[var(--color-line)]" data-testid="transactions">
        <li v-for="transaction in transactions" :key="transaction.id" class="flex flex-wrap items-center justify-between gap-3 py-4">
          <div class="min-w-0">
            <p class="break-words text-sm font-medium">{{ transaction.description }}</p>
            <p class="mt-1 text-xs text-[var(--color-muted)]">
              <time :datetime="transaction.date">{{ dateFormatter.format(new Date(transaction.date)) }}</time>
              · {{ transaction.type === 'INCOME' ? 'Ingreso' : 'Gasto' }}
            </p>
          </div>
          <span class="shrink-0 text-sm font-semibold tabular-nums">
            {{ transaction.type === 'INCOME' ? '+' : '−' }}{{ formatMoney(decimalToCents(transaction.amount)) }}
          </span>
        </li>
      </ul>
      <p v-else class="mt-4 text-sm text-[var(--color-muted)]">No hay movimientos activos en este periodo.</p>
    </section>
    <p class="mt-4 text-[11px] leading-5 text-[var(--color-muted)]">Vista de demostración · Wallets y usuarios simulados · MXN</p>
  </section>
</template>
