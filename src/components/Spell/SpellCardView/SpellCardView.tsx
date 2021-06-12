import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import { Store } from '@app/components/App/App'
import { Lang, spellDb } from '@app/data/SpellDb'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@app/components/FaIcon'
import {
  SpellCardCellStyled,
  SpellCardContentStyled,
  SpellCardFooterStyled,
  SpellCardMaterialsStyled,
  SpellCardRowStyled,
  SpellCardStyled,
  SpellCardTextStyled,
  SpellCardTitleStyled
} from './styled'
import SpellLockButton from '@app/components/Spell/SpellLockButton/SpellLockButton'
import { SpellButtonStyled, SpellControlsRowStyled } from '@app/components/Spell/styled'
import { levelToL7dString, parseSourcesToL7dSting } from '@app/components/Spell/Spell'

// TODO katoquro: 30/05/2021 select, adjust text

export default component({
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    cardFontSize: 12,
    store: Store.state,
  }),
  methods: {
    decreaseTextSize() {
      if (this.cardFontSize > 5) {
        this.cardFontSize -= 1
      }
    },
    increaseTextSize() {
      if (this.cardFontSize < 32) {
        this.cardFontSize += 1
      }
    },
    onTextChange() {
      alert('Is not supported yet :(')
    }
  },
  render(h): VNode {
    const spell = spellDb.findSpell(this.id)

    const lang = this.store.sLang as Lang
    const ritual = spell.ritual ? '(' + spellDb.getUiString('ritual', lang) + ')' : null
    const spellClass = this.store.sClass ? this.store.sClass.toLowerCase() : 'noClass'
    const editMode = this.store.bEditMode
    const spellCardWidth = this.store.spellCardWidth

    return (
      <SpellCardStyled spellClass={spellClass} spellCardWidth={spellCardWidth}>
         <SpellCardContentStyled>

          <SpellControlsRowStyled position='top'>
            <SpellLockButton id={spell.id}/>
            <SpellButtonStyled
              title={spellDb.getUiString('spell__hide_btn', lang)}
              onClick={m.stop(() => Store.hideCard(spell.id))}>
              <FaIcon icon={faEyeSlash} />
           </SpellButtonStyled>
          </SpellControlsRowStyled>
          <SpellCardTitleStyled title={spell.name.getL7d('en')} spellClass={spellClass} contenteditable={editMode}>
            {spell.name.getL7d(lang)} {ritual}
          </SpellCardTitleStyled>
          <SpellCardRowStyled>
            <SpellCardCellStyled spellClass={spellClass} contenteditable={editMode}>
              <div>{spellDb.getUiString('castingTime', lang)}</div>
              <div>{spell.castTime.getL7d(lang)}</div>
            </SpellCardCellStyled>
            <SpellCardCellStyled spellClass={spellClass} contenteditable={editMode}>
              <div>{spellDb.getUiString('range', lang)}</div>
              <div>{spell.range.getL7d(lang)}</div>
            </SpellCardCellStyled>
          </SpellCardRowStyled>
          <SpellCardRowStyled>
            <SpellCardCellStyled spellClass={spellClass} contenteditable={editMode}>
              <div>{spellDb.getUiString('components', lang)}</div>
              <div>{spell.components.getL7d(lang)}</div>
            </SpellCardCellStyled>
            <SpellCardCellStyled spellClass={spellClass} contenteditable={editMode}>
              <div>{spellDb.getUiString('duration', lang)}</div>
              <div>{spell.duration.getL7d(lang)}</div>
            </SpellCardCellStyled>
          </SpellCardRowStyled>
          <SpellCardMaterialsStyled spellClass={spellClass} contenteditable={editMode}>
            {spell.materials.getL7d(lang)}
          </SpellCardMaterialsStyled>
          <SpellCardTextStyled fontSize={this.cardFontSize} contenteditable={editMode}
            domPropsInnerHTML={spell.text.getL7d(lang)}
          />

          <SpellControlsRowStyled position='bottom'>
            <SpellButtonStyled
              title={spellDb.getUiString('reduce_text_size_btn', lang)}
              onClick={m.stop(this.decreaseTextSize)}>
              –
            </SpellButtonStyled>

            <SpellButtonStyled
              title={spellDb.getUiString('cancel', lang)}
              invisible={!editMode}
              onClick={m.stop(this.onTextChange)}>
              ✖
            </SpellButtonStyled>
            <SpellButtonStyled
              title={spellDb.getUiString('save', lang)}
              invisible={!editMode}
              onClick={m.stop(this.onTextChange)}>
              ✔
            </SpellButtonStyled>

            <SpellButtonStyled
              title={spellDb.getUiString('increase_text_size_btn', lang)}
              onClick={m.stop(this.increaseTextSize)}>
              +
            </SpellButtonStyled>
          </SpellControlsRowStyled>
          <SpellCardFooterStyled>
            <span>
              {'noClass' === spellClass ? '' : spellDb.getUiString(spellClass, lang)}
            </span>
            <span>
              {levelToL7dString(spell.level, lang)}, {spell.school.getL7d(lang)}
              <span title={parseSourcesToL7dSting(spell.source, lang)}>({spell.source})</span>
            </span>
          </SpellCardFooterStyled>

         </SpellCardContentStyled>
      </SpellCardStyled>
    )
  }
})
