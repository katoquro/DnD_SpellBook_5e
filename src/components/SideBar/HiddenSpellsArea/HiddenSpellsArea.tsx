import { VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import { modifiers as m } from 'vue-tsx-support/lib/modifiers'
import { Store } from '@app/components/App/App'
import { FilterBtnStyled, FilterItemStyled, FilterLabelStyled } from '@app/components/SideBar/styled'
import HiddenSpellItem from '@app/components/SideBar/HiddenSpellItem/HiddenSpellItem'
import { FlexWrap } from '@app/components/common-styled'

export default tsx.component({
  data: () => ({
    store: Store.state
  }),
  render(h): VNode {
    const hiddenSpellsList = Store.aHiddenItemsList() as any[]

    if (0 === hiddenSpellsList.length) {
      return <div />
    }

    return (
      <FilterItemStyled>
        <FilterLabelStyled>Скрытые заклинания ({hiddenSpellsList.length})</FilterLabelStyled>
        <FilterBtnStyled onClick={m.stop(Store.unhideAll.bind(Store))}>
          Вернуть все обратно
        </FilterBtnStyled>
        <FlexWrap column={true} basis="100%">
          {hiddenSpellsList.map((item: any) => {
            return <HiddenSpellItem
              key={item.id}
              title={item.title}
              tooltip={item.tooltip}
              showSpellHandler={() => Store.unhideCard(item.id)}
            />
          })}
        </FlexWrap>
      </FilterItemStyled>
    )
  }
})
