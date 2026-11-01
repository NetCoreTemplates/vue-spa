import { describe, expect, it, vi } from 'vite-plus/test'
import { flushPromises, mount } from '@vue/test-utils'
import { ApiResult, JsonServiceClient } from '@servicestack/client'
import { HelloResponse } from '@/lib/dtos'
import HelloApi from './HelloApi.vue'

describe('HelloApi', () => {
    it('renders the API response', async () => {
        const client = new JsonServiceClient()
        const api = vi.spyOn(client, 'api').mockResolvedValue(new ApiResult({ response: new HelloResponse({ result: 'Hello, Vite+!' }) }))

        const wrapper = mount(HelloApi, {
            props: { value: 'Vite+' },
            global: { provide: { client } },
        })
        await flushPromises()

        expect(wrapper.text()).toContain('Hello, Vite+!')
        expect(api).toHaveBeenCalledOnce()
    })
})
