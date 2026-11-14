import type { Category } from '@/types/category'

export const demoCategories: readonly Category[] = [
  { id: 'personal-salary', walletId: 'personal-demo', name: 'Sueldo', type: 'INCOME' },
  { id: 'personal-food', walletId: 'personal-demo', name: 'Comida', type: 'EXPENSE' },
  { id: 'shared-contribution', walletId: 'shared-demo', name: 'Aportaciones', type: 'INCOME' },
  { id: 'shared-home', walletId: 'shared-demo', name: 'Hogar', type: 'EXPENSE' },
  { id: 'ana-salary', walletId: 'personal-ana-demo', name: 'Sueldo', type: 'INCOME' },
  { id: 'ana-transport', walletId: 'personal-ana-demo', name: 'Transporte', type: 'EXPENSE' },
]