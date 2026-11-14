const mxnFormatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

/** Convierte decimales sin multiplicar números de punto flotante ni redondear. */
export function decimalToCents(amount: string): number {
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(amount)
  if (!match) throw new RangeError('Importe decimal inválido')
  const cents = Number(match[2]) * 100 + Number((match[3] ?? '').padEnd(2, '0'))
  if (!Number.isSafeInteger(cents)) throw new RangeError('Importe fuera del rango seguro')
  return match[1] ? -cents : cents
}

export function formatMoney(cents: number): string {
  if (!Number.isSafeInteger(cents)) throw new RangeError('Se requieren centavos enteros seguros')
  return mxnFormatter.format(cents / 100)
}
