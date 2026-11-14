import type { User } from '@/types/user'
import type { Wallet, WalletMember } from '@/types/wallet'

export const demoUser: User = { id: 'jorge-demo', name: 'Jorge', initials: 'J' }
export const demoPartner: User = { id: 'ana-demo', name: 'Ana', initials: 'A' }
export const demoUsers: readonly User[] = [demoUser, demoPartner]

export const demoWallets: readonly Wallet[] = [
  { id: 'personal-demo', name: 'Mis finanzas', type: 'PERSONAL', currency: 'MXN' },
  { id: 'shared-demo', name: 'Compartidas', type: 'SHARED', currency: 'MXN' },
  { id: 'personal-ana-demo', name: 'Finanzas de Ana', type: 'PERSONAL', currency: 'MXN' },
]

export const demoWalletMembers: readonly WalletMember[] = [
  { walletId: 'personal-demo', userId: demoUser.id, role: 'OWNER' },
  { walletId: 'shared-demo', userId: demoUser.id, role: 'OWNER' },
  { walletId: 'shared-demo', userId: demoPartner.id, role: 'MEMBER' },
  { walletId: 'personal-ana-demo', userId: demoPartner.id, role: 'OWNER' },
]