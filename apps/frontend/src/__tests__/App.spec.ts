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
    expect(wrapper.get('h2').text()).toBe('Mis finanzas')
    await wrapper.get('input[value="shared-demo"]').setValue()
    expect(wrapper.get('h2').text()).toBe('Compartidas')
    expect(wrapper.get('[role="status"]').text()).toContain('sin reparto automático')
    await wrapper.get('input[value="personal-demo"]').setValue()
    expect(wrapper.get('h2').text()).toBe('Mis finanzas')

    const store = useWalletStore(pinia)
    store.selectWallet('personal-ajena')
    expect(store.selectedWallet.id).toBe('personal-demo')
    expect(wrapper.findAll('input[name="wallet"]')).toHaveLength(2)
    wrapper.unmount()
  })
})
