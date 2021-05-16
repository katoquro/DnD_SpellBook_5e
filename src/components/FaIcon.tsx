import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { IconDefinition } from '@fortawesome/fontawesome-common-types'

const iconsCache = new Set<String>()

export default component({
  props: {
    icon: {
      type: Object,
      required: true
    }
  },

  render (h): VNode {
    const icon = this.icon as IconDefinition
    if (!iconsCache.has(icon.iconName)) {
      library.add(icon)
      iconsCache.add(icon.iconName)
    }

    // @ts-ignore
    return <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} />
  }
})
