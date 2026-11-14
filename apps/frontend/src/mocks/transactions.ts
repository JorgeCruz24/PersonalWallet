import type { Transaction } from '@/types/transaction'

export const demoTransactions: readonly Transaction[] = [
  { id: 'personal-income-oct', walletId: 'personal-demo', categoryId: 'personal-salary', userId: 'jorge-demo', type: 'INCOME', amount: '25000.00', description: 'Sueldo de octubre', date: '2026-10-01', deletedAt: null, deletedById: null },
  { id: 'personal-expense-oct', walletId: 'personal-demo', categoryId: 'personal-food', userId: 'jorge-demo', type: 'EXPENSE', amount: '185.50', description: 'Comida de octubre', date: '2026-10-15', deletedAt: null, deletedById: null },
  { id: 'personal-income-nov', walletId: 'personal-demo', categoryId: 'personal-salary', userId: 'jorge-demo', type: 'INCOME', amount: '25000.00', description: 'Sueldo de noviembre', date: '2026-11-01', deletedAt: null, deletedById: null },
  { id: 'personal-expense-nov', walletId: 'personal-demo', categoryId: 'personal-food', userId: 'jorge-demo', type: 'EXPENSE', amount: '230.75', description: 'Comida de noviembre', date: '2026-11-07', deletedAt: null, deletedById: null },
  { id: 'personal-deleted', walletId: 'personal-demo', categoryId: 'personal-food', userId: 'jorge-demo', type: 'EXPENSE', amount: '99.00', description: 'Compra duplicada eliminada', date: '2026-11-07', deletedAt: '2026-11-08T18:00:00Z', deletedById: 'jorge-demo' },
  { id: 'shared-income-oct', walletId: 'shared-demo', categoryId: 'shared-contribution', userId: 'jorge-demo', type: 'INCOME', amount: '8000.00', description: 'Aportación al hogar', date: '2026-10-02', deletedAt: null, deletedById: null },
  { id: 'shared-expense-nov', walletId: 'shared-demo', categoryId: 'shared-home', userId: 'ana-demo', type: 'EXPENSE', amount: '1450.25', description: 'Despensa del hogar', date: '2026-11-09', deletedAt: null, deletedById: null },
  { id: 'ana-income', walletId: 'personal-ana-demo', categoryId: 'ana-salary', userId: 'ana-demo', type: 'INCOME', amount: '28000.00', description: 'Sueldo de Ana', date: '2026-11-01', deletedAt: null, deletedById: null },
  { id: 'ana-expense', walletId: 'personal-ana-demo', categoryId: 'ana-transport', userId: 'ana-demo', type: 'EXPENSE', amount: '450.00', description: 'Transporte de Ana', date: '2026-10-20', deletedAt: null, deletedById: null },
]