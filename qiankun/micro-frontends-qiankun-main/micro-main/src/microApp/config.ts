

import { TMicroApps } from './types'

export const microApps: TMicroApps = [
  {
    label: 'React 应用',
    name: "reactApp",
    entry: "//localhost:8888",
    activeRule: "micro/reactApp",
    container: "#subapp-viewport",
    props: {
      basename: '/micro/reactApp',
    },
  },
  {
    label: 'Vue 应用',
    name: "vueApp",
    entry: "//localhost:9999",
    container: "#subapp-viewport",
    activeRule: "/micro/vueApp",
    props: {
      basename: '/micro/vueApp',
    },
  },
];