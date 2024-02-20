<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import type { MenuOption } from './components/Dropdown/types'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import { createMessage } from './components/Message/method'
import type { ButtonInstance } from './components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openedValue = ref(['a'])
const size = ref<any>('3x')
const trigger = ref<any>('click')
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const open = () => {
  createMessage({ message: 'hello world', duration: 0, showClose: true })
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
const inlineConsole = (...args: any) => {
  console.log(...args)
}
onMounted(() => {
  createMessage({ message: 'hello world', duration: 0, showClose: true })
  createMessage({ message: 'hello world again', duration: 0, type: 'success', showClose: true })
  createMessage({ message: 'hello world three', duration: 0, type: 'danger', showClose: true })
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref)
  }
  setTimeout(() => {
    openedValue.value = ['a', 'b']
    size.value = '2xl'
    // instance.destory()
    // trigger.value = 'hover'
  }, 2000)
})
</script>

<template>
  <header>
    <Dropdown 
      placement="bottom" 
      :trigger="trigger" 
      :menu-options="options"
      @visible-change="e => inlineConsole('visible change', e)"
      @select="e => inlineConsole('select', e)"
      manual
      ref="tooltipRef"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>
    </Dropdown>
  </header>

  <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d"/>
  <main>
    <Button ref="buttonRef" @click="open">Test Button</Button>
    <Button plain @click="close">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br/><br/>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br/><br/>
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button><br/><br/>    

    <Collapse v-model="openedValue">
      <Item name="a" title="Title A">
        <h1>headline title</h1>
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div> this is cccc test </div>
      </Item>
    </Collapse>
    {{openedValue}}
  </main>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  border: 1px solid green;
}
.vk-tooltip__popper {
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
