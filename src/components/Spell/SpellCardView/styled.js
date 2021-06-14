import styled, { css } from 'vue-styled-components'
import {
  BG_COLOR_LIGHT,
  cardClassColors,
  FONT_COLOR_LIGHT,
  OUTLINE_COLOR_DARK,
  OUTLINE_COLOR_LIGHT
} from '@app/components/common-styled'

function scrollbars(size) {
  return css`
    &::-webkit-scrollbar {
      width: ${size}px;
      height: ${size}px;
    }

    &::-webkit-scrollbar-thumb {
      background: #777;
    }

    &::-webkit-scrollbar-track {
      background: #ddd;
    }
  `
}

const selectionBorderStyle = css`
  transform: scale(0.97);
  outline: 5px ${OUTLINE_COLOR_LIGHT} solid;
  transition: outline 0.2s;

  &:hover {
    outline-color: ${OUTLINE_COLOR_DARK};
  }
`

export const SpellCardStyled = styled('div', {
  spellClass: String,
  spellCardWidth: Number,
  selected: Boolean
})`
  page-break-inside: avoid;
  width: ${props => props.spellCardWidth}px;
  border: 9px solid ${props => cardClassColors[props.spellClass]};
  border-bottom-width: 25px;
  border-radius: 5px;
  height: 3.5in;
  background-color: ${props => cardClassColors[props.spellClass]};
  position: relative;
  margin: 1px;

  ${p => p.selected ? selectionBorderStyle : ''} @media print {
    float: left;
  }
`

export const SpellCardContentStyled = styled('div')`
  border-radius: 5px;
  background: ${BG_COLOR_LIGHT};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
`

export const SpellCardTitleStyled = styled('div', { spellClass: String })`
  font-size: 95%;
  margin: 0;
  padding: 0 0.9em;
  text-align: center;
  text-transform: uppercase;
  border-bottom: 1px solid ${props => cardClassColors[props.spellClass]};
`

export const SpellCardMaterialsStyled = styled('div', { spellClass: String })`
  color: ${FONT_COLOR_LIGHT};
  background-color: ${p => cardClassColors[p.spellClass]};
  font-size: 75%;
  padding: 0 2px;
  font-style: oblique;
`

export const SpellCardRowStyled = styled('div')`
  display: flex;
`

export const SpellCardCellStyled = styled('div', { spellClass: String })`
  border: 1px solid ${props => cardClassColors[props.spellClass]};
  float: left;
  width: 50%;

  div {
    text-transform: uppercase;
    text-align: center;
    font-size: 10px;
  }
`

export const SpellCardTextStyled = styled('div', { fontSize: Number })`
  font-size: ${props => props.fontSize}px;
  padding: 2px;
  overflow-y: auto;
  flex-shrink: 99;
  line-height: normal;

  ${scrollbars(5)}
`

export const SpellCardFooterStyled = styled('div')`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  color: ${FONT_COLOR_LIGHT};
  cursor: default;
  font-size: 10px;
`
