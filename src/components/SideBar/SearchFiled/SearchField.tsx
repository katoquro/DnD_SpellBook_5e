import { VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import FaIcon from '@app/components/FaIcon'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@app/components/App/App'
import { debounce } from 'debounce'
import { CrossBtnStyled, RandomSearchBtnStyled, SearchInputStyled, SearchInputWrapperStyled } from './styled'
import { FilterItemStyled, FilterLabelStyled } from '@app/components/SideBar/styled'

export default tsx.component({
  data: () => ({
    store: Store.state
  }),
  methods: {
    onInput(value: string) {
      Store.onSearchName(value)
    },
    onClean() {
      Store.onSearchName('')
    },
    onRandomClick(event: MouseEvent) {
      event.preventDefault()
      Store.getRandomItem()
    }
  },
  render(h): VNode {
    return <FilterItemStyled>
      <FilterLabelStyled>Название:</FilterLabelStyled>
      <SearchInputWrapperStyled>
        <SearchInputStyled
          type="text"
          value={this.store.sSearch}
          onInput={debounce(this.onInput, 500)} />
        <CrossBtnStyled onClick={this.onClean}>✖</CrossBtnStyled>
        <RandomSearchBtnStyled
          title="Случайное заклинание"
          onClick={this.onRandomClick}>
          <FaIcon icon={faDiceD20} />
        </RandomSearchBtnStyled>
      </SearchInputWrapperStyled>
    </FilterItemStyled>
  }
})
