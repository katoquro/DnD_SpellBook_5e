import styled from 'vue-styled-components'
import {
  BG_COLOR_BUTTON,
  BG_COLOR_BUTTON_ACTIVE,
  BG_COLOR_BUTTON_HOVER,
  BG_COLOR_LIST_ITEM_HOVER,
  BORDER_COLOR_BUTTON
} from '@app/components/SideBar/styled'
import { BG_COLOR_LIGHT, FONT_COLOR_DARK, FONT_COLOR_LIGHT } from '@app/components/common-styled'

export const SelectOneDropDownStyled = styled('div')`
  background: ${BG_COLOR_BUTTON};
  padding: 0;
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

export const SlideAreaStyled = styled('div')`
  max-height: 1000px;
  transition: max-height 400ms ease-out;
  overflow: hidden;

  position: absolute;
  left: 0;
  right: 0;
  z-index: 33;
`

export const SelectBtnStyled = styled('div')`
  display: block;
  padding: 7px 35px 7px 0;
  user-select: none;

  z-index: 9;
  position: relative;
  color: ${FONT_COLOR_LIGHT};
  transition: background 0.2s ease-out;
  text-transform: capitalize;

  cursor: pointer;

  &:before {
    content: "▼";
    position: absolute;
    right: 0.3em;
    padding: 0 0.2em;
    transition: color 0.3s ease 0s, background 0.3s ease 0s;
  }

  &:after {
    content: "";
    position: absolute;
    right: 1.7em;
    top: .2em;
    bottom: .2em;
    border-left: 2px ridge ${BORDER_COLOR_BUTTON};
  }
`

export const SlideListStyled = styled('ul')`
  background: ${BG_COLOR_LIGHT};
  border-radius: 0 0 0.2em 0.2em;
  border: 1px solid ${BORDER_COLOR_BUTTON};
  padding: 0.2em 0;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
  margin-top: 0.25em;
`

export const SlideListItemStyled = styled('li')`
  color: ${FONT_COLOR_DARK};
  cursor: pointer;
  padding: 0.3em 0.2em;
  list-style: none;
  margin: 0;
  text-align: left;
  font-weight: 400;
  transition: color 0.3s, background 0.3s;

  &:hover {
    background: ${BG_COLOR_LIST_ITEM_HOVER};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${BG_COLOR_LIST_ITEM_HOVER};
  }
`
