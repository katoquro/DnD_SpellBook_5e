import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import { Store } from '../App/App'
import { Lang, spellDb } from '../../data/SpellDb'
import { faEyeSlash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '../FaIcon'
import {
  SpellCardButtonStyled,
  SpellCardCellStyled,
  SpellCardControlsStyled,
  SpellCardFooterStyled,
  SpellCardStyled,
  SpellCardTextStyled,
  SpellCardTitleStyled
} from './styled'

function levelToL7dString (level: string, lang: Lang): string {
  if ('0' === level) {
    return spellDb.getUiString('cantrip', lang)
  } else {
    return level + ' ' + spellDb.getUiString('spell_level', lang)
  }
}

function parseSourcesToL7dSting (sources: string, lang: Lang): string {
  const l7dSources = sources.split(',')
    .map((it) => it.trim())
    .map((it) => it.toLowerCase())
    .map((it) => spellDb.getUiString(it, lang))
    .join(', ')

  return spellDb.getUiString('data_source', lang) + ': ' + l7dSources
}

// TODO katoquro: 30/05/2021 select, adjust text

export default component({
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    isSelected: false,
    cardFontSize: 12,
    store: Store.state,
  }),
  methods: {
    decreaseTextSize () {
      if (this.cardFontSize > 5) {
        this.cardFontSize -= 1
      }
    },
    increaseTextSize () {
      if (this.cardFontSize < 32) {
        this.cardFontSize += 1
      }
    },
    onTextChange () {
      alert('Is not supported yet :(')
    }
  },
  render (h): VNode {
    const spell = spellDb.findSpell(this.id)

    const lang = this.store.sLang as Lang
    const ritual = spell.ritual ? '(' + spellDb.getUiString('ritual', lang) + ')' : null
    const spellClass = this.store.sClass ? this.store.sClass.toLowerCase() : 'noClass'
    const editMode = this.store.bEditMode
    const spellCardWidth = this.store.spellCardWidth
    const lockedItems = this.store.aLockedItems as string[] // todo replace with Set

    const lockButton = lockedItems.indexOf(spell.id) > -1
      ? (<SpellCardButtonStyled
          title={spellDb.getUiString('spell__unlock_btn', lang)}
          onClick={m.stop(() => Store.unlockCard(spell.id))}>
          <FaIcon icon={faUnlock} aria-hidden="true"/>
        </SpellCardButtonStyled>)
      : (<SpellCardButtonStyled
          title={spellDb.getUiString('spell__lock_btn', lang)}
          onClick={m.stop(() => Store.lockCard(spell.id))}>
          <FaIcon icon={faLock} aria-hidden="true"/>
        </SpellCardButtonStyled>)

    return (
      <SpellCardStyled spellClass={spellClass} spellCardWidth={spellCardWidth}>
        <div class="content">
          <SpellCardControlsStyled position='top'>
            { lockButton }
            <SpellCardButtonStyled
              title={spellDb.getUiString('spell__hide_btn', lang)}
              onClick={m.stop(() => Store.hideCard(spell.id))}>
              <FaIcon icon={faEyeSlash} aria-hidden="true"/>
           </SpellCardButtonStyled>
          </SpellCardControlsStyled>
          <SpellCardTitleStyled title={spell.name.getL7d('en')} spellClass={spellClass} contenteditable={editMode}>
            {spell.name.getL7d(lang)} {ritual}
          </SpellCardTitleStyled>
          <div>
            <SpellCardCellStyled spellClass={spellClass} contenteditable={editMode}>
              <div>{spellDb.getUiString('castingTime', lang)}</div>
              <div>{spell.castTime.getL7d(lang)}</div>
            </SpellCardCellStyled>
            <SpellCardCellStyled spellClass={spellClass} contenteditable={editMode}>
              <div>{spellDb.getUiString('range', lang)}</div>
              <div>{spell.range.getL7d(lang)}</div>
            </SpellCardCellStyled>
          </div>
          <div>
            <SpellCardCellStyled spellClass={spellClass} contenteditable={editMode}>
              <div>{spellDb.getUiString('components', lang)}</div>
              <div>{spell.components.getL7d(lang)}</div>
            </SpellCardCellStyled>
            <SpellCardCellStyled spellClass={spellClass} contenteditable={editMode}>
              <div>{spellDb.getUiString('duration', lang)}</div>
              <div>{spell.duration.getL7d(lang)}</div>
            </SpellCardCellStyled>
          </div>
          <div class="materials" contenteditable={editMode}>{spell.materials.getL7d(lang)}</div>
          <SpellCardTextStyled fontSize={this.cardFontSize} domPropsInnerHTML={spell.text.getL7d(lang)}
            contenteditable={editMode} />

          <SpellCardControlsStyled position='bottom'>
            <SpellCardButtonStyled
              title={spellDb.getUiString('reduce_text_size_btn', lang)}
              onClick={m.stop(this.decreaseTextSize)}>
              –
            </SpellCardButtonStyled>

            <SpellCardButtonStyled
              title={spellDb.getUiString('cancel', lang)}
              invisible={!editMode}
              onClick={m.stop(this.onTextChange)}>
              ✖
            </SpellCardButtonStyled>
            <SpellCardButtonStyled
              title={spellDb.getUiString('save', lang)}
              invisible={!editMode}
              onClick={m.stop(this.onTextChange)}>
              ✔
            </SpellCardButtonStyled>

            <SpellCardButtonStyled
              title={spellDb.getUiString('increase_text_size_btn', lang)}
              onClick={m.stop(this.increaseTextSize)}>
              +
            </SpellCardButtonStyled>
          </SpellCardControlsStyled>
          <SpellCardFooterStyled>
            <span>
              {'noClass' === spellClass ? '' : spellDb.getUiString(spellClass, lang)}
            </span>
            <span>
              {levelToL7dString(spell.level, lang)}, {spell.school.getL7d(lang)}
              <span title={parseSourcesToL7dSting(spell.source, lang)}>({spell.source})</span>
            </span>
          </SpellCardFooterStyled>
        </div>
      </SpellCardStyled>
    )
  }
})
