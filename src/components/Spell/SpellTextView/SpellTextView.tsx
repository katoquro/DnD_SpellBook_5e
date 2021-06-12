import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import { modifiers as m } from 'vue-tsx-support/lib/modifiers'

import FaIcon from '@app/components/FaIcon'
import SpellLockButton from '@app/components/Spell/SpellLockButton/SpellLockButton'

import { Store } from '@app/components/App/App'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Lang, spellDb } from '@app/data/SpellDb'
import { levelToL7dString, parseSourcesToL7dSting } from '@app/components/Spell/Spell'

import { FlexWrap } from '@app/components/common-styled'
import { SpellButtonStyled, SpellControlsRowStyled } from '@app/components/Spell/styled'
import {
  SpellTextCellMaterials,
  SpellTextCellTitle,
  SpellTextContentStyled,
  SpellTextSchoolStyled,
  SpellTextSourceStyled,
  SpellTextStyled,
  SpellTextTextStyled,
  SpellTextTitleEnStyled,
  SpellTextTitleStyled
} from '@app/components/Spell/SpellTextView/styled'

export default component({
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    store: Store.state,
  }),
  methods: {
    onTextChange() {
      alert('Is not supported yet :(')
    }
  },
  render(h): VNode {
    const spell = spellDb.findSpell(this.id)

    const lang = this.store.sLang as Lang
    const ritual = spell.ritual ? '(' + spellDb.getUiString('ritual', lang) + ')' : null
    const editMode = this.store.bEditMode
    const spellClass = this.store.sClass ? this.store.sClass.toLowerCase() : 'noClass'

    const spellMaterials = spell.materials.getL7d(lang)
    const materials = spellMaterials
      ? (
        <SpellTextCellMaterials>
          <b>{spellDb.getUiString('spell__materials', lang)}:</b> {spellMaterials}
        </SpellTextCellMaterials>
        )
      : null

    return (
      <SpellTextStyled spellClass={spellClass}>
        <SpellTextContentStyled>
          <SpellControlsRowStyled position='top'>
            <SpellLockButton id={spell.id} />
            <SpellButtonStyled
              title={spellDb.getUiString('spell__hide_btn', lang)}
              onClick={m.stop(() => Store.hideCard(spell.id))}>
              <FaIcon icon={faEyeSlash} />
            </SpellButtonStyled>
          </SpellControlsRowStyled>
          <FlexWrap>
            <FlexWrap column basis='35%'>
              <SpellTextTitleStyled title={spell.name.getL7d('en')} contenteditable={editMode}>
                {spell.name.getL7d(lang)} {ritual}
              </SpellTextTitleStyled>
              <SpellTextTitleEnStyled>{spell.name.getL7d('en')}</SpellTextTitleEnStyled>
              <SpellTextSchoolStyled>
                {levelToL7dString(spell.level, lang)}, {spell.school.getL7d(lang)}
              </SpellTextSchoolStyled>
            </FlexWrap>

            <FlexWrap column basis='65%'>
              <FlexWrap>
                <FlexWrap column grow={1}>
                  <FlexWrap column>
                    <SpellTextCellTitle>{spellDb.getUiString('castingTime', lang)}</SpellTextCellTitle>
                    <div>{spell.castTime.getL7d(lang)}</div>
                  </FlexWrap>
                  <FlexWrap column>
                    <SpellTextCellTitle>{spellDb.getUiString('range', lang)}</SpellTextCellTitle>
                    <div>{spell.range.getL7d(lang)}</div>
                  </FlexWrap>
                </FlexWrap>

                <FlexWrap column grow={1}>
                  <FlexWrap column>
                    <SpellTextCellTitle>{spellDb.getUiString('components', lang)}</SpellTextCellTitle>
                    <div>{spell.components.getL7d(lang)}</div>
                  </FlexWrap>
                  <FlexWrap column>
                    <SpellTextCellTitle>{spellDb.getUiString('duration', lang)}</SpellTextCellTitle>
                    <div>{spell.duration.getL7d(lang)}</div>
                  </FlexWrap>
                </FlexWrap>
              </FlexWrap>
              {materials}
            </FlexWrap>
          </FlexWrap>

          <SpellTextTextStyled domPropsInnerHTML={spell.text.getL7d(lang)} contenteditable={editMode} />
          <SpellTextSourceStyled
            title={parseSourcesToL7dSting(spell.source, lang)}>({spell.source})</SpellTextSourceStyled>

          <SpellControlsRowStyled position='bottom'>
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
          </SpellControlsRowStyled>
        </SpellTextContentStyled>
      </SpellTextStyled>
    )
  }
})
