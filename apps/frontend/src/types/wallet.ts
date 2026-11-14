export interface Wallet {
  readonly id: string
  readonly name: string
  readonly type: 'PERSONAL' | 'SHARED'
}
