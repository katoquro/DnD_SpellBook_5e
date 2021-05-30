import styled from 'vue-styled-components'
import { BG_COLOR_LIGHT, BG_COLOR_LIGHT_DIMMED, FONT_COLOR_DARK, nonPrintingStyle } from '@app/components/common-styled'

export const SpellButtonStyled = styled('span', { invisible: Boolean })`
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
export const SpellControlsRowStyled = styled('div', { position: String })`
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
