import { shallowMount } from '@vue/test-utils'
import VuePopper from '../src/components/Index.vue'

describe('Index.vue', () => {
  it('Rendered', () => {
    const wrapper = shallowMount(VuePopper)
    expect(wrapper.find('div').exists()).to.equal(true)
  })
})
