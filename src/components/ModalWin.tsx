import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'

export default component({
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {}
  },
  computed: {},
  methods: {
    close: function () {
      this.$emit('close')
    }
  },

  render (h):VNode {
    return <div class="mod_win_wrapper" style='background: rgba(0, 0, 0, 0.7);' onClick={this.close} onScroll={m.stop}>
      <div class="mod_win">
        <span class="bCloseInfoWin" onClick={this.close}>×</span>
        <div class="mod_win_content" domPropsInnerHTML={this.content}>
        </div>
      </div>
    </div>
  }
})
