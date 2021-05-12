import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'

export default component({
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {}
  },
  computed: {},

  methods: {
    unhide: function (oEvent: MouseEvent) {
      this.$emit('unhide', oEvent)
    }
  },

  render (h):VNode {
    return <a href='#' onClick={m.stop(this.unhide)}>{this.title} ({this.tooltip})</a>
  }
})
