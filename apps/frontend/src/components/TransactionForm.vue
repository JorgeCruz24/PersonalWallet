<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/stores/wallet.store'
import { useTransactionStore } from '@/stores/transaction.store'
import { demoCategories } from '@/mocks/categories'
import type { TransactionType } from '@/types/category'
import { localDate } from '@/utils/date'

const { selectedWallet } = storeToRefs(useWalletStore())
const store = useTransactionStore()
const type = ref<TransactionType>('EXPENSE')
const amount = ref('')
const categoryId = ref('')
const description = ref('')
const date = ref(localDate())
const error = ref('')
const confirmation = ref('')
const saving = ref(false)
const categories = computed(() => demoCategories.filter((category) =>
  category.walletId === selectedWallet.value.id && category.type === type.value,
))
watch([() => selectedWallet.value.id, type], () => {
  categoryId.value = ''
  error.value = ''
  confirmation.value = ''
}, { flush: 'sync' })

function submit() {
  if (saving.value) return
  error.value = ''
  confirmation.value = ''
  saving.value = true
  try {
    const transaction = store.addTransaction({
      type: type.value, amount: amount.value, categoryId: categoryId.value,
      description: description.value, date: date.value,
    })
    confirmation.value = `Movimiento registrado en ${selectedWallet.value.name} con fecha ${transaction.date}. El resumen y la gráfica muestran el periodo seleccionado.`
    amount.value = ''
    categoryId.value = ''
    description.value = ''
    date.value = localDate()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'No se pudo registrar el movimiento. Intenta de nuevo.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="workspace-panel mt-7" aria-labelledby="transaction-form-heading">
    <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">Nuevo movimiento</p>
    <h3 id="transaction-form-heading" class="mt-2 text-lg font-semibold">Registro rápido</h3>
    <p class="mt-2 text-sm text-[var(--color-muted)]">{{ selectedWallet.name }} · MXN</p>
    <form class="mt-5 grid gap-4 sm:grid-cols-2" novalidate :aria-busy="saving" @submit.prevent="submit">
      <fieldset class="flex gap-4 rounded-xl bg-[var(--color-surface)] p-3 sm:col-span-2">
        <legend class="sr-only">Tipo de movimiento</legend>
        <label class="flex flex-1 items-center justify-center gap-2 text-sm font-medium">
          <input v-model="type" type="radio" name="transaction-type" value="EXPENSE"> Gasto
        </label>
        <label class="flex flex-1 items-center justify-center gap-2 text-sm font-medium">
          <input v-model="type" type="radio" name="transaction-type" value="INCOME"> Ingreso
        </label>
      </fieldset>
      <label class="text-sm">
        Importe (MXN)
        <input v-model="amount" name="amount" type="text" inputmode="decimal" placeholder="0.00" required class="transaction-field">
      </label>
      <label class="text-sm">
        Fecha
        <input v-model="date" name="date" type="date" required class="transaction-field">
      </label>
      <label class="text-sm sm:col-span-2">
        Categoría
        <select v-model="categoryId" name="categoryId" required class="transaction-field">
          <option value="" disabled>Selecciona una categoría</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </label>
      <label class="text-sm sm:col-span-2">
        Descripción
        <input v-model="description" name="description" type="text" placeholder="Ej. Compra del súper" required class="transaction-field">
      </label>
      <p v-if="error" id="transaction-error" role="alert" class="text-sm text-red-700 sm:col-span-2">{{ error }}</p>
      <p v-if="confirmation" role="status" class="text-sm text-[var(--color-accent)] sm:col-span-2">{{ confirmation }}</p>
      <button type="submit" :disabled="saving" :aria-describedby="error ? 'transaction-error' : undefined" class="rounded-xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60 sm:col-span-2">
        {{ saving ? 'Guardando…' : type === 'EXPENSE' ? 'Guardar gasto' : 'Guardar ingreso' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";
.transaction-field {
  @apply mt-2 block w-full min-w-0 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-3 text-sm focus:outline-2 focus:outline-[var(--color-accent)];
}
</style>
