import styled from 'vue-styled-components'
import { BG_COLOR_BUTTON } from '@app/components/SideBar/styled'
import { FONT_COLOR_LIGHT } from '@app/components/common-styled'

export const CheckboxButtonStyled = styled('div')`
  background: ${BG_COLOR_BUTTON};
  color: ${FONT_COLOR_LIGHT};
  cursor: pointer;
  margin: 5px 0;
  padding: 3px 0;
`
