import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import { FilterBtnStyled } from '@app/components/SideBar/styled'
import FaIcon from '@app/components/FaIcon'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export default component({
  props: {
    title: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      required: true
    },
    showSpellHandler: {
      type: Function,
      required: true
    }
  },
  data: () => ({
  }),
  methods: {
    unhide: function () {
      this.showSpellHandler()
    }
  },

  render(h):VNode {
    return <FilterBtnStyled onClick={m.stop(this.unhide)}>
      <FaIcon icon={faEye} />
      {this.title}<br/>({this.tooltip})
    </FilterBtnStyled>
  }
})
