import styled from 'vue-styled-components'
import {
  BG_COLOR_BUTTON,
  BG_COLOR_BUTTON_ACTIVE,
  BG_COLOR_BUTTON_HOVER,
  BORDER_COLOR_BUTTON
} from '@app/components/SideBar/styled'
import { BG_COLOR_LIGHT, FONT_COLOR_LIGHT } from '@app/components/common-styled'

export const MultiSelectDropDownStyled = styled('div')`
  color: ${FONT_COLOR_LIGHT};
  margin: 5px 0;
`

export const SlideAreaStyled = styled('div')`
  max-height: 1000px;
  transition: max-height 300ms;
  overflow: hidden;
`

export const SlideListStyled = styled('ul')`
  background: ${BG_COLOR_LIGHT};
  border-radius: 0 0 0.2em 0.2em;
  border: 1px solid ${BORDER_COLOR_BUTTON};
  padding: 0.2em 0;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
  margin-top: 0.25em;
`

export const DropDownPrimaryBtnStyled = styled('div')`
  background: ${BG_COLOR_BUTTON};
  padding: 7px 0;
  display: block;
  cursor: pointer;
  text-align: center;
  margin: 0;
  position: relative;
  font-size: 100%;
  width: 100%;

  &:hover {
    background: ${BG_COLOR_BUTTON_HOVER};
  }

  &:active {
    background: ${BG_COLOR_BUTTON_ACTIVE};
  }
`

export const DropDownSecondBtnStyled = styled('div')`
  background: ${BG_COLOR_BUTTON};
  text-align: center;
  padding: 2px 0;
  border-top: 1px solid ${BORDER_COLOR_BUTTON};

  &:hover {
    background: ${BG_COLOR_BUTTON_HOVER};
  }

  &:active {
    background: ${BG_COLOR_BUTTON_ACTIVE};
  }
`
