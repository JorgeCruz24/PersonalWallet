import { test, expect } from '@playwright/test'

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`dashboard y selector a ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await expect(page).toHaveURL(/\/dashboard$/)
    await expect(page.getByRole('heading', { name: 'Resumen mensual' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Mis finanzas', exact: true })).toBeVisible()
    await page.getByLabel('Compartidas', { exact: true }).check()
    await expect(page.getByRole('heading', { name: 'Compartidas', exact: true })).toBeVisible()
    await page.getByLabel('Mis finanzas', { exact: true }).check()
    await expect(page.getByRole('heading', { name: 'Mis finanzas', exact: true })).toBeVisible()
    await page.getByLabel('Compartidas', { exact: true }).check()
    await page.screenshot({ path: testInfo.outputPath('dashboard.png'), fullPage: true, animations: 'disabled' })
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Resumen mensual' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })
}
