import { computed, type Ref } from 'vue'
import type { Transaction } from '@/types/transaction'
import { demoCategories } from '@/mocks/categories'
import { decimalToCents } from '@/utils/money'

const colors = ['#159f70', '#7654e8', '#b580e8', '#f5b727', '#fb7060', '#238ca6']

export function useExpensesByCategory(transactions: Readonly<Ref<readonly Transaction[]>>) {
  const distribution = computed(() => {
    const grouped = new Map<string, { categoryId: string; name: string; cents: number; color: string }>()
    let total = 0
    for (const transaction of transactions.value) {
      if (transaction.type !== 'EXPENSE' || transaction.deletedAt !== null) continue
      const cents = decimalToCents(transaction.amount)
      const category = demoCategories.find((item) => item.id === transaction.categoryId && item.walletId === transaction.walletId)
      let group = grouped.get(transaction.categoryId)
      if (!group) {
        // Color estable por ID, independiente del orden y del periodo.
        const hash = Array.from(transaction.categoryId).reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 0)
        group = { categoryId: transaction.categoryId, name: category?.name ?? 'Categoría no disponible', cents: 0, color: colors[hash % colors.length]! }
        grouped.set(transaction.categoryId, group)
      }
      group.cents += cents
      total += cents
      if (!Number.isSafeInteger(total) || !Number.isSafeInteger(group.cents)) throw new RangeError('Total fuera del rango seguro')
    }
    const categories = [...grouped.values()].map((group) => ({
      ...group, percentage: total === 0 ? 0 : (group.cents / total) * 100,
    })).sort((a, b) => b.cents - a.cents || a.categoryId.localeCompare(b.categoryId))
    return { categories, total }
  })
  return { categories: computed(() => distribution.value.categories), total: computed(() => distribution.value.total) }
}
