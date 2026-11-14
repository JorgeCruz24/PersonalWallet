import type { Wallet } from '@/types/wallet'

// Sesión de demostración: únicamente la wallet personal de este usuario y la compartida.
export const demoUser = { name: 'Jorge', initials: 'J' } as const
export const demoWallets: readonly Wallet[] = [
  { id: 'personal-demo', name: 'Mis finanzas', type: 'PERSONAL' },
  { id: 'shared-demo', name: 'Compartidas', type: 'SHARED' },
]

export const demoPartner = { name: 'Ana', initials: 'A' } as const
