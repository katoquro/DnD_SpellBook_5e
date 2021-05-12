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
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {}
  },
  computed: {
    innerId: function () {
      return 'chb_' + this.id
    },
    value: function () {
      return this.checked ? 'checked=\'checked\'' : ''
    }
  },
  methods: {
    press: function () {
      this.$emit('press')
    }
  },

  render (h): VNode {
    return <div id={this.id} class="customCheckbox" onClick={m.stop(this.press)} title={this.tooltip}>
        <input type="checkbox" id={this.innerId} checked={this.checked}/>
        <span class="label">{this.title}</span>
    </div>
  }
})
