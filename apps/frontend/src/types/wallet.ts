export interface Wallet {
  readonly id: string
  readonly name: string
  readonly type: 'PERSONAL' | 'SHARED'
  readonly currency: 'MXN'
}

export interface WalletMember {
  readonly walletId: string
  readonly userId: string
  readonly role: 'OWNER' | 'MEMBER'
}