import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import AppInfoModalContent from './AppInfoModalContent'

export default component({
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true,
    },
    closeFunc: {
      type: Function,
      required: true
    }
  },

  data () {
    return {}
  },

  computed: {},

  methods: {
    close (event: MouseEvent) {
      this.closeFunc(event)
    }
  },
  render (h):VNode {
    if (!this.show) {
      return <div/>
    }

    return <div class="mod_win_wrapper" style='background: rgba(0, 0, 0, 0.7);' onClick={this.close} onScroll={m.stop}>
            <div class="mod_win">
              <span class="bCloseInfoWin" onClick={this.close}>×</span>
              <div class="mod_win_content"><AppInfoModalContent/></div>
            </div>
          </div>
  }
})
