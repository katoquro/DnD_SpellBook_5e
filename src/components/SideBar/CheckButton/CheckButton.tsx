import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import { CheckboxButtonStyled } from '@app/components/SideBar/CheckButton/styled'

export default component({
  props: {
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
    },
    show: {
      type: Boolean,
      default: true
    },
    changeHandler: {
      type: Function,
      default: () => null
    }
  },

  methods: {
    onChange: function () {
      this.changeHandler()
    }
  },

  render(h): VNode {
    if (!this.show) {
      return <div />
    }

    return <CheckboxButtonStyled onClick={m.stop(this.onChange)} title={this.tooltip}>
      <input type="checkbox" checked={this.checked} />
      <span>{this.title}</span>
    </CheckboxButtonStyled>
  }
})
