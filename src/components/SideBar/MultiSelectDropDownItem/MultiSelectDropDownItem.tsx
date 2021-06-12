import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import { MultiSelectDropDownItem } from '@app/components/SideBar/MultiSelectDropDownItem/styled'

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
    },
    selectHandler: {
      type: Function,
      required: true
    }
  },
  data: () => ({}),
  methods: {
    labelClick: function () {
      this.selectHandler(this.val)
    }
  },
  render(h): VNode {
    return <MultiSelectDropDownItem>
      <input type="checkbox" value={this.val} checked={this.checked} />
      <label onClick={this.labelClick}>
        <span domPropsInnerHTML={this.title} />
        {this.subtitle ? (<div style={{ color: 'hsl(0,0,60%)' }} domPropsInnerHTML={this.subtitle} />) : ''}
      </label>
    </MultiSelectDropDownItem>
  }
})
