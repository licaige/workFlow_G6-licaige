import { reactive } from 'vue'

const children = [
  {
    text: '别克GL8',
  },
  {
    text: '别克GL8',
  },
  {
    text: '别克GL8',
  },
  {
    text: '别克GL8',
  },
  {
    text: '别克GL8',
  },
  {
    text: '别克GL8',
  },
  {
    text: '别克GL8',
  },
  {
    text: '别克GL8',
  },
  {
    text: '别克GL8',
  },
]

export const navTitleList = reactive([
  {
    prefix: 'SUV',
    children
  },
  {
    prefix: 'MPV',
    children
  },
  {
    prefix: '紧凑型',
    children
  },
  {
    prefix: '纯电动',
    children
  },

])
