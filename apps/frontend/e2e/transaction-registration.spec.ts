import { test, expect } from '@playwright/test'

for (const width of [1440, 390]) {
  test(`registro de movimientos a ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 })
    await page.clock.setFixedTime(new Date(2026, 10, 14, 23, 30))
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/dashboard')
    const form = page.locator('form')
    await expect(form.getByLabel('Fecha', { exact: true })).toHaveValue('2026-11-14')
    for (const [wallet, income, expense, incomeTotal, expenseTotal] of [
      ['Mis finanzas', 'Sueldo', 'Comida', '$25,010.20', '$230.85'],
      ['Compartidas', 'Aportaciones', 'Hogar', '$10.20', '$1,450.35'],
    ]) {
      await page.getByRole('radio', { name: wallet!, exact: true }).check()
      await form.getByLabel('Ingreso', { exact: true }).check()
      await expect(form.getByLabel('Categoría')).toHaveValue('')
      await form.getByLabel('Categoría').selectOption({ label: income! })
      await form.getByLabel('Importe (MXN)').fill('10.20')
      await form.getByLabel('Descripción').fill('Ingreso registrado')
      await form.getByRole('button', { name: 'Guardar ingreso' }).click()
      await expect(form.getByRole('status')).toContainText('Movimiento registrado')
      await expect(page.getByTestId('summary-income')).toContainText(incomeTotal!)
      await form.getByLabel('Gasto', { exact: true }).check()
      await expect(form.getByLabel('Categoría')).toHaveValue('')
      await expect(form.getByLabel('Categoría').locator('option')).toHaveText(['Selecciona una categoría', expense!])
      await form.getByLabel('Categoría').selectOption({ label: expense! })
      await form.getByLabel('Importe (MXN)').fill('0.001')
      await form.getByLabel('Descripción').fill('Gasto registrado')
      await form.getByRole('button', { name: 'Guardar gasto' }).click()
      await expect(form.getByRole('alert')).toContainText('dos decimales')
      await form.getByLabel('Importe (MXN)').fill('0.10')
      await form.getByRole('button', { name: 'Guardar gasto' }).click()
      await expect(form.getByRole('status')).toContainText('Movimiento registrado')
      await expect(page.getByTestId('summary-expense')).toContainText(expenseTotal!)
      await expect(page.getByTestId('expense-distribution')).toContainText(expenseTotal!)
      await expect(form.getByLabel('Importe (MXN)')).toHaveValue('')
    }
    expect(errors).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: testInfo.outputPath('registration.png'), fullPage: true, animations: 'disabled' })
    await page.reload()
    await expect(page.getByTestId('summary-income')).toContainText('$25,000.00')
    await expect(page.getByTestId('summary-expense')).toContainText('$230.75')
  })
}
