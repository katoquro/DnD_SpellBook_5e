import styled from 'vue-styled-components'
import { BG_COLOR_LIGHT, BG_COLOR_LIGHT_DIMMED, nonPrintingStyle } from '@app/components/common-styled'

export const SpellLayoutStyled = styled('div')`
  margin-left: 225px;

  @media print {
    margin: 0;
  }
`

export const SpellContainerStyled = styled('div', { spaced: Boolean })`
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${p => p.spaced ? 'space-evenly' : 'unset'};

  @media print {
    display: block;
    padding: 0;
    margin: 0;
  }
`

export const AriaTitleStyled = styled('div')`
  margin: 5px 0;
  padding-left: 25px;
  height: 25px;
  background-color: hsla(0, 0%, 90%, 0.5);

  font-weight: bold;

  ${nonPrintingStyle}
`

export const UnlockAllStyled = styled('button')`
  border: none;
  cursor: pointer;

  margin-left: 20px;
  padding: 0 10px;
  height: 25px;

  font-weight: bold;

  background: ${BG_COLOR_LIGHT};
  transition: background 0.3s;

  &:hover {
    background: ${BG_COLOR_LIGHT_DIMMED};
  }
`
