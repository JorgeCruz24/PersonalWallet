import type { TransactionType } from './category'

// Decimal serializado: conservar precisión para la futura API y Prisma Decimal(14,2).
export interface Transaction {
  readonly id: string
  readonly walletId: string
  readonly categoryId: string
  readonly userId: string
  readonly type: TransactionType
  readonly amount: string
  readonly description: string
  readonly date: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly deletedAt: string | null
  readonly deletedById: string | null
}
/** Solo datos del formulario; identidad, wallet y auditoría proceden del contexto. */
export interface CreateTransactionInput {
  readonly categoryId: string
  readonly type: TransactionType
  readonly amount: string
  readonly description: string
  readonly date: string
}