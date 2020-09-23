/* eslint comma-dangle: ["error", "always-multiline"] */

// Import components core
import './_style/global.styl'
import {transformCamelCase, warn} from './_util'
import Tag from './tag'
/* @init<%import ${componentNameUpper} from './${componentName}'%> */

// Totally importing reminder
warn(
  'You are using a whole package of mand-mobile, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  'warn',
)

/* global MAN_VERSION */
const version = /* @echo MAN_VERSION */ MAN_VERSION

export const components = {
  Tag,
  /* @init<%${componentNameUpper},%> */
}

// Define plugin installation method
const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }

  // Register global components
  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component) // kebab-case
      Vue.component(transformCamelCase(`-${component.name}`), component) // PascalCase
    }
  })

  // Mount to prototype
  // Vue.prototype.$sample = Sample
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// xport components
export {
  install,
  version,
  Tag,
  /* @init<%${componentNameUpper},%> */
}

export default {
  install,
  version,
}
