import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import { Store } from '@app/components/App/App'
import Spell from '@app/components/Spell/Spell'
import {
  AriaTitleStyled,
  SpellContainerStyled,
  SpellLayoutStyled,
  UnlockAllStyled
} from './styled'

export default component({
  render (h): VNode {
    // todo rename
    const store: any = Store

    const lockedSpells = store.aLockedItemsList().map((item: any) => <Spell id={item.id} />)
    const foundSpells = store.aItemsList().map((item: any) => <Spell id={item.id} />)

    const lockedArea = lockedSpells.length > 0
      ? <div>
        <AriaTitleStyled>
          <span >Закрепленные заклинания ({lockedSpells.length})</span>
          <UnlockAllStyled onClick={store.unlockAll.bind(store)}>Открепить все</UnlockAllStyled>
        </AriaTitleStyled>
        <SpellContainerStyled spaced={'card' !== Store.state.sView}>
          {lockedSpells}
        </SpellContainerStyled>
        <AriaTitleStyled>
          <span >Каталог заклинаний ({foundSpells.length})</span>
        </AriaTitleStyled>
      </div>
      : null

    return (
      <SpellLayoutStyled>
        {lockedArea}

        <SpellContainerStyled spaced={'card' !== Store.state.sView}>
          {foundSpells}
        </SpellContainerStyled>
      </SpellLayoutStyled>
    )
  }
})
