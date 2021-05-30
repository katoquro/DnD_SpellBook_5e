import styled from 'vue-styled-components'
import { nonPrintingStyle } from '../styled'

const FONT_COLOR_LIGHT = '#fff'
const FONT_COLOR_DARK = 'hsl(220,60%,10%)'
const BG_COLOR_LIGHT = 'hsl(0,0%,98%)'
const BG_COLOR_LIGHT_DIMMED = 'hsl(0,0%,90%)'
const OUTLINE_COLOR_LIGHT = 'hsla(0, 0%, 98%, 0.8)'
const OUTLINE_COLOR_DARK = 'hsl(214, 52%, 53%)'

const cardClassColors = {
  noClass: 'hsl(0,4%,69%)',
  bard: 'hsl(340, 82%, 52%)',
  cleric: 'hsl(49, 98%, 60%)',
  druid: 'hsl(16, 25%, 38%)',
  paladin: 'hsl(207, 90%, 54%)',
  ranger: 'hsl(122, 39%, 49%)',
  sorcerer: 'hsl(36, 100%, 50%)',
  warlock: 'hsl(262, 52%, 47%)',
  wizard: 'hsl(4, 90%, 58%)'
}

function scrollbars (size) {
  return `
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

export const SpellCardTitleStyled = styled('div', { spellClass: String })`
  font-size: 95%;
  margin: 0;
  padding: 0 0.9em;
  text-align: center;
  text-transform: uppercase;
  border-bottom: 1px solid ${props => cardClassColors[props.spellClass]};
`

export const SpellCardStyled = styled('div', { spellClass: String, spellCardWidth: Number })`
  width: ${props => props.spellCardWidth}px;
  border: 9px solid ${props => cardClassColors[props.spellClass]};
  border-bottom-width: 25px;
  border-radius: 5px;
  height: 3.5in;
  background-color: ${props => cardClassColors[props.spellClass]};
  position: relative;

  &.selected {
    transform: scale(0.94);
    outline: 5px ${OUTLINE_COLOR_LIGHT} solid;
    transition: outline 0.2s;

    &:hover {
      outline-color: ${OUTLINE_COLOR_DARK};
    }
  }

  .content {
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
  }

  .materials {
    color: ${FONT_COLOR_LIGHT};
    background: ${props => cardClassColors[props.spellClass]} !important;
    font-size: 75%;
    padding: 0 2px;
    font-style: oblique;
  }

  .cardFooter {
    position: absolute;
    left: 1px;
    bottom: -20px;
    font-size: 10px;
    color: ${FONT_COLOR_LIGHT};
    cursor: default;
    font-weight: 700;
  }
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

export const SpellCardTextStyled = styled('div', { fontSize: Number })`
  font-size: ${props => props.fontSize}px;
  padding: 2px;
  overflow-y: auto;
  flex-shrink: 99;
  line-height: normal;
  
  ${scrollbars(5)}
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

export const SpellCardControlsStyled = styled('div', { position: String })`
  position: absolute;
  ${p => p.position}: 0;
  left: 0;
  right: 0;
  margin: 0 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${nonPrintingStyle}
`

export const SpellCardButtonStyled = styled('span', { invisible: Boolean })`
  cursor: pointer;
  min-width: 20px;
  text-align: center;
  background: ${BG_COLOR_LIGHT};
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  border-radius: 10px;
  font-weight: bold;
  opacity: 60%;
  display: ${props => props.invisible ? 'none' : 'block'};

  &:hover {
    opacity: 1;
    background: ${BG_COLOR_LIGHT_DIMMED};
    color: ${FONT_COLOR_DARK};
  }
`
