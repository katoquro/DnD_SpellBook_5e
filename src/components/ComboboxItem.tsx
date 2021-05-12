import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

export default component({
  props: {
    val: {
      type: String,
      default: '0'
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
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
    id: function () {
      return 'ch_' + this.val
    },
    label: function () {
      const subtitle = this.subtitle ? '<span class=\'subtitle\'>' + this.subtitle + '</span>' : ''
      return this.title + subtitle
    }
  },
  created: function () {

  },
  methods: {
    labelClick: function (oEvent: MouseEvent) {
      this.$emit('lclick', this.val)
    }
  },
  render (h):VNode {
    return <div>
      <input type="checkbox" value={this.val} id={this.id} checked={this.checked}/>
      <label data-hierarchy="root" domPropsInnerHTML={this.label} onClick={this.labelClick}/>
    </div>
  }
})
