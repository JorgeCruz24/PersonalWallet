export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Category {
  readonly id: string
  readonly walletId: string
  readonly name: string
  readonly type: TransactionType
}