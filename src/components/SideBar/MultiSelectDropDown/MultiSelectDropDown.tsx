import Vue, { VNode } from 'vue'
import { component } from 'vue-tsx-support'

import MultiSelectDropDownItem from '../MultiSelectDropDownItem/MultiSelectDropDownItem'
import FaIcon from '../../FaIcon'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import {
  DropDownPrimaryBtnStyled, DropDownSecondBtnStyled,
  MultiSelectDropDownStyled,
  SlideAreaStyled, SlideListStyled
} from '@app/components/SideBar/MultiSelectDropDown/styled'
import { BG_COLOR_LIGHT } from '@app/components/common-styled'

export default component({
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    selectHandler: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    open: false
  }),
  mounted() {
    if (!this.open) {
      ((this.$refs.slideArea as Vue).$el as HTMLElement).style.maxHeight = '0px'
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
      const slideArea = (this.$refs.slideArea as Vue).$el

      if (this.open) {
        (slideArea as HTMLElement).style.maxHeight = '1000px'
      } else {
        (slideArea as HTMLElement).style.maxHeight = '0px'
      }
    },
  },
  render(h): VNode {
    return (
      <MultiSelectDropDownStyled>
        <DropDownPrimaryBtnStyled onClick={this.toggle}>
          {this.title}
        </DropDownPrimaryBtnStyled>
        <SlideAreaStyled ref="slideArea">
          <SlideListStyled>
            {this.items.map((item: any) =>
              <MultiSelectDropDownItem
                key={item.key}
                val={item.key}
                checked={item.checked}
                title={item.title}
                subtitle={item.subtitle}
                selectHandler={this.selectHandler}
              />
            )}
          </SlideListStyled>
        </SlideAreaStyled>
        <DropDownSecondBtnStyled onClick={this.toggle}>
          {this.open
            ? (<FaIcon icon={faArrowUp} />)
            : (<FaIcon icon={faArrowDown} />)}
        </DropDownSecondBtnStyled>
      </MultiSelectDropDownStyled>
    )
  }
})
