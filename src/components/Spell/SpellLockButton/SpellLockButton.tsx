import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import { Lang, spellDb } from '@app/data/SpellDb'
import { modifiers as m } from 'vue-tsx-support/lib/modifiers'
import { Store } from '@app/components/App/App'
import FaIcon from '@app/components/FaIcon'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { SpellButtonStyled } from '@app/components/Spell/styled'

export default component({
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  render (h): VNode {
    const spell = spellDb.findSpell(this.id)

    const lang = Store.state.sLang as Lang

    const lockedItems = Store.state.aLockedItems as string[] // todo replace with Set

    return lockedItems.indexOf(spell.id) > -1
      ? (
        <SpellButtonStyled
          title={spellDb.getUiString('spell__unlock_btn', lang)}
          onClick={m.stop(() => Store.unlockCard(spell.id))}>
          <FaIcon icon={faUnlock} aria-hidden="true" />
        </SpellButtonStyled>
        )
      : (
        <SpellButtonStyled
          title={spellDb.getUiString('spell__lock_btn', lang)}
          onClick={m.stop(() => Store.lockCard(spell.id))}>
          <FaIcon icon={faLock} aria-hidden="true" />
        </SpellButtonStyled>
        )
  }
})
