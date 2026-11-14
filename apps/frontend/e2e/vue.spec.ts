import { test, expect } from '@playwright/test'

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`dashboard y selector a ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport)
    await page.clock.setFixedTime(new Date('2026-11-14T12:00:00'))
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    await expect(page).toHaveURL(/\/dashboard$/)
    await expect(page.getByRole('heading', { name: 'Resumen mensual' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Mis finanzas', exact: true })).toBeVisible()
    await page.getByLabel('Compartidas', { exact: true }).check()
    await expect(page.getByRole('heading', { name: 'Compartidas', exact: true })).toBeVisible()
    await page.getByLabel('Mis finanzas', { exact: true }).check()
    await expect(page.getByRole('heading', { name: 'Mis finanzas', exact: true })).toBeVisible()
    await page.getByLabel('Compartidas', { exact: true }).check()
    await page.getByRole('combobox', { name: /^Año/ }).selectOption('2026')
    await page.getByRole('combobox', { name: /^Mes/ }).selectOption('11')
    const distribution = page.getByTestId('expense-distribution')
    await expect(distribution).toContainText('$1,450.25 MXN')
    await expect(distribution.locator('canvas')).toBeVisible()
    expect(await distribution.locator('canvas').evaluate((canvas) => {
      const element = canvas as HTMLCanvasElement
      const pixels = element.getContext('2d')!.getImageData(0, 0, element.width, element.height).data
      return pixels.some((value, index) => index % 4 === 3 && value > 0)
    })).toBe(true)
    await page.getByRole('combobox', { name: /^Mes/ }).selectOption('10')
    await expect(distribution).toContainText('No hay gastos activos')
    await expect(distribution.locator('canvas')).toHaveCount(0)
    await page.getByLabel('Mis finanzas', { exact: true }).check()
    await expect(distribution).toContainText('$185.50 MXN')
    await expect(distribution).not.toContainText('Hogar')
    await page.getByRole('combobox', { name: /^Mes/ }).selectOption('11')
    await expect(distribution).toContainText('$230.75 MXN')
    await expect(distribution).toContainText('100 %')
    await page.getByRole('combobox', { name: /^Año/ }).selectOption('2025')
    await expect(distribution).toContainText('No hay gastos activos')
    await page.getByRole('combobox', { name: /^Año/ }).selectOption('2026')
    expect(errors).toEqual([])
    await page.screenshot({ path: testInfo.outputPath('dashboard.png'), fullPage: true, animations: 'disabled' })
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Resumen mensual' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })
}
