import styled from 'vue-styled-components'
import { FONT_COLOR_DARK, FONT_COLOR_LIGHT, OUTLINE_COLOR_DARK } from '@app/components/common-styled'

export const BG_COLOR_BUTTON = 'hsl(0,0%,47%)'
export const BG_COLOR_BUTTON_HOVER = 'hsl(0,0%,60%)'

export const FilterLabelStyled = styled('span')`
  font-weight: bold;
`

export const SearchInputWrapperStyled = styled('div')`
  display: flex;
  position: relative;
`

export const CrossBtnStyled = styled('span')`
  position: absolute;
  color: hsl(0, 0%, 60%);
  cursor: pointer;
  transition: color 0.3s;
  padding: 5px 7px;
  font-weight: bold;
  font-size: 15px;
  right: 28px;

  &:hover {
    color: ${OUTLINE_COLOR_DARK};
    opacity: 0.9;
  }

  &:active {
    color: ${OUTLINE_COLOR_DARK};
    text-shadow: 0 0 3px 3px ${FONT_COLOR_DARK};
    opacity: 1;
  }
`

export const SearchInputStyled = styled('input')`
  border: none;
  cursor: text;
  background: ${FONT_COLOR_LIGHT};
  padding: 5px 7px;
  display: block;
  width: 100%;
  margin: 0;
  color: ${FONT_COLOR_DARK};
  font-weight: 400;

  &:focus {
    box-shadow: 0 0 5px 0 ${FONT_COLOR_LIGHT};
  }
`

export const RandomSearchBtnStyled = styled('div')`
  background: ${BG_COLOR_BUTTON};
  padding: 5px 7px;
  display: block;
  cursor: pointer;
  text-align: center;
  font-size: 100%;

  &:hover {
    background-color: ${BG_COLOR_BUTTON_HOVER};
  }

  &:active {
    background-color: ${BG_COLOR_BUTTON};
  }
`
