import Vue, { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import { Store } from '@app/components/App/App'
import { FilterItemStyled, FilterLabelStyled } from '@app/components/SideBar/styled'
import {
  SelectBtnStyled,
  SelectOneDropDownStyled,
  SlideAreaStyled,
  SlideListItemStyled,
  SlideListStyled
} from './styled'

export default component({
  props: {
    selected: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    selectHandler: {
      type: Function,
      default: () => null
    }
  },
  data: () => ({
    store: Store.state,
    open: false
  }),
  updated: function () {
    const isOpen = (this.open != null) ? this.open : false
    if (!isOpen && this.items.length > 1) {
      ((this.$refs.slideArea as Vue).$el as HTMLElement).style.maxHeight = '0px'
    }
  },
  methods: {
    toggle: function () {
      this.open = !this.open
      const slideArea = (this.$refs.slideArea as Vue).$el

      if (this.open) {
        (slideArea as HTMLElement).style.maxHeight = '1000px'
      } else {
        (slideArea as HTMLElement).style.maxHeight = '0px'
      }
    },
    select(sKey: any): (event: MouseEvent) => void {
      return () => {
        this.toggle()
        this.selectHandler(sKey)
      }
    }
  },
  render(h): VNode {
    if (this.items.length <= 1) {
      return <div />
    }

    const label = this.title.length > 0
      ? (<FilterLabelStyled>{this.title}:</FilterLabelStyled>)
      : null

    return (
      <FilterItemStyled>
        {label}
        <SelectOneDropDownStyled onClick={this.toggle}>
          <SelectBtnStyled>{this.selected}</SelectBtnStyled>
          <SlideAreaStyled ref="slideArea">
            <SlideListStyled>
              {
                this.items.map((item: any) =>
                  <SlideListItemStyled key={item.key}
                    onClick={m.stop(this.select(item.key))}
                    domPropsInnerHTML={item.title}
                  />)
              }
            </SlideListStyled>
          </SlideAreaStyled>
        </SelectOneDropDownStyled>
      </FilterItemStyled>
    )
  }
})
