import styled from 'vue-styled-components'
import { FlexWrap, FONT_COLOR_LIGHT, nonPrintingStyle } from '@app/components/common-styled'

export const BG_COLOR_BUTTON = 'hsl(0,0%,47%)'
export const BG_COLOR_BUTTON_HOVER = 'hsl(0,0%,60%)'
export const BG_COLOR_BUTTON_ACTIVE = 'hsl(0,0%,35%)'

export const BG_COLOR_LIST_ITEM_HOVER = 'hsl(0,0%,80%)'

export const BORDER_COLOR_BUTTON = 'hsl(0,0%,73%)'

export const SideBarStyled = styled('div')`
  width: 225px;

  position: absolute;
  padding: 5px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  background: hsl(0, 0%, 0%, 40%);

  z-index: 9;

  ${nonPrintingStyle}
`

export const FilterLabelStyled = styled('span')`
  color: ${FONT_COLOR_LIGHT};
  font-weight: bold;
`

export const FilterItemStyled = styled(FlexWrap)`
  margin: 5px 0;
`

export const FilterBtnStyled = styled('a')`
  text-decoration: none;
  flex-grow: 1;
  background: ${BG_COLOR_BUTTON};
  color: ${FONT_COLOR_LIGHT};
  padding: 2px 0;
  display: block;
  cursor: pointer;
  text-align: center;
  font-size: 100%;
  margin: 1px;

  &:hover {
    background: ${BG_COLOR_BUTTON_HOVER};
  }

  &:active {
    background: ${BG_COLOR_BUTTON_ACTIVE};
  }
`
