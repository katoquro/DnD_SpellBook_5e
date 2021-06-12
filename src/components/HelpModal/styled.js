import styled from 'vue-styled-components'
import { BG_COLOR_LIGHT, FONT_COLOR_DARK } from '@app/components/common-styled'

export const HelpModalStyled = styled('div')`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-y: hidden;
  z-index: 999;
`

export const ModalFrameStyled = styled('div')`
  padding: 0.3em;
  width: 60%;
  max-width: 1000px;
  min-height: 15em;
  max-height: 95%;
  top: 1em;
  background: ${BG_COLOR_LIGHT};
  color: ${FONT_COLOR_DARK};
  position: relative;
  overflow-y: scroll;
  margin: 0 auto;
`

export const CloseCrossBtnStyled = styled('div')`
  position: absolute;
  top: -0.2em;
  right: 0.4em;
  padding: 0.1em 0.2em;
  font-size: 300%;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);

  &:hover {
    color: rgba(0, 0, 0, 0.4);
  }
`
