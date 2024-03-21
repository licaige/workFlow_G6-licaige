// Polyfill fn.bind() for PhantomJS
import bind from 'function-bind'
// Polyfill Object.assign for PhantomJS
import objectAssign from 'object-assign'

/* eslint-disable no-extend-native */
Function.prototype.bind = bind

Object.assign = objectAssign

// require all src files for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../src', true, /^\.\/(?!index(\.js)?$)/)
srcContext.keys().forEach(srcContext)

// Set up
require('./setup')

// Use a div to insert elements
before(function () {
  const el = document.createElement('DIV')
  el.id = 'tests'
  document.body.appendChild(el)
})

// Remove every test html scenario
afterEach(function () {
  const el = document.getElementById('tests')
  for (let i = 0; i < el.children.length; ++i) {
    el.removeChild(el.children[i])
  }
})

const specsContext = require.context('./specs', true)
specsContext.keys().forEach(specsContext)
