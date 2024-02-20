import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态 class，查看 classes 是否正确
    // 针对 v-if 是否渲染正确的标签以及内容
    // 针对 slots，是否渲染对应的 slots 内容
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text',
        modelValue: ''
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    console.log(wrapper.html())
    // classes
    expect(wrapper.classes()).toContain('vk-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    // should render input
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.vk-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.vk-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.vk-input__prefix').text()).toBe('prefix')

    // textarea
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: ''
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })
  it('支持 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        type: 'text'
      }
    })
    // 初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    // 更新值
    // 注意 setValue 是组合事件会触发 input 以及 change
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')

    console.log('the events', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    // [ [ 'update' ], ...更多事件 ]
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])
    // v-model 的异步更新
    await wrapper.setProps({ modelValue: 'prop update' })
    expect(input.element.value).toBe('prop update')
  })
  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 不出现对应的 Icon 区域
    expect(wrapper.find('.vk-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    //  出现 Icon 区域
    expect(wrapper.find('.vk-input__clear').exists()).toBeTruthy()
    // 点击值变为空并且消失
    await wrapper.get('.vk-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    // 点击值变为空并且消失，特别注意这里不仅仅会触发 clear 事件，对应的 input 以及 change 应该都会被触发，因为对应的值发生了变化
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })
  it('支持切换密码显示', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        showPassword: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 不出现对应的 Icon 区域, 因为当前值为空
    expect(wrapper.find('.vk-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    //  出现 Icon 区域，并且 Icon 为特点的图标
    await input.setValue('123')
    const eyeIcon = wrapper.find('.vk-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // 点击值变会切换input 类型，并且图标的 Icon 会切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.vk-input__password').attributes('icon')).toBe('eye')
  })
})