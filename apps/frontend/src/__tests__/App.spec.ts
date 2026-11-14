import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'
import router from '../router'
import { useWalletStore } from '../stores/wallet.store'

describe('Layout y navegación', () => {
  it('redirige al dashboard y cambia de wallet sin mezclar espacios', async () => {
    const pinia = createPinia()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(App, { global: { plugins: [pinia, router] } })
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/dashboard')
    expect(wrapper.get('#wallet-heading').text()).toBe('Mis finanzas')
    expect(wrapper.get('[data-testid="transactions"]').text()).toContain('Sueldo de noviembre')
    expect(wrapper.get('[data-testid="transactions"]').text()).not.toContain('Despensa del hogar')
    expect(wrapper.text()).not.toContain('Compra duplicada eliminada')
    expect(wrapper.text()).not.toContain('Sueldo de Ana')
    await wrapper.get('input[value="shared-demo"]').setValue()
    expect(wrapper.get('#wallet-heading').text()).toBe('Compartidas')
    expect(wrapper.get('[data-testid="transactions"]').text()).toContain('Despensa del hogar')
    expect(wrapper.get('[data-testid="transactions"]').text()).not.toContain('Sueldo de noviembre')
    expect(wrapper.get('[role="status"]').text()).toContain('sin reparto automático')
    await wrapper.get('input[value="personal-demo"]').setValue()
    expect(wrapper.get('#wallet-heading').text()).toBe('Mis finanzas')
    expect(wrapper.get('[data-testid="transactions"]').text()).toContain('Sueldo de noviembre')
    expect(wrapper.get('[data-testid="transactions"]').text()).not.toContain('Despensa del hogar')
    expect(wrapper.text()).not.toContain('Compra duplicada eliminada')
    expect(wrapper.text()).not.toContain('Sueldo de Ana')

    const store = useWalletStore(pinia)
    store.selectWallet('personal-ajena')
    expect(store.selectedWallet.id).toBe('personal-demo')
    expect(wrapper.findAll('input[name="wallet"]')).toHaveLength(2)
    wrapper.unmount()
  })
})
