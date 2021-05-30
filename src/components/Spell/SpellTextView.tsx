import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

export default component({
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  render (h): VNode {
    return <div></div>
  }
})
