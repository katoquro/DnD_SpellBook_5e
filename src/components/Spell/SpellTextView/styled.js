import styled from 'vue-styled-components'
import { BG_COLOR_LIGHT, cardClassColors, FONT_COLOR_GRAY } from '@app/components/common-styled'

export const SpellTextStyled = styled('div', { spellClass: String })`
  page-break-inside: avoid;
  background-color: ${BG_COLOR_LIGHT};
  margin: 0.3rem;
  border: 3px solid ${p => cardClassColors[p.spellClass]};
  border-radius: 5px;
  position: relative;
  width: 45%;

  @media print {
    width: auto;
  }
`

export const SpellTextContentStyled = styled('div')`
  padding: 0.2rem 1.7rem 0.9rem;
  background-color: ${BG_COLOR_LIGHT};
  border-radius: 5px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const SpellTextTitleStyled = styled('div')`
  color: hsl(187, 100%, 23%);
  text-transform: uppercase;
  font-size: 17px;
`

export const SpellTextTitleEnStyled = styled('div')`
  color: ${FONT_COLOR_GRAY};
  font-size: 12px;
`

export const SpellTextSchoolStyled = styled('div')`
  font-style: oblique;
`

export const SpellTextCellTitle = styled('div')`
  font-weight: 700;
`

export const SpellTextCellMaterials = styled('div')`
  margin-top: 5px;
`

export const SpellTextTextStyled = styled('div')`
  border-top: 2px solid rgba(221, 221, 221, 0.2);
  padding: 0.9rem 0 0;
  margin-top: 0.9rem;

  br {
    margin-top: 10px;
    display: block;
    content: ""; // chrome support
  }
`

export const SpellTextSourceStyled = styled('div')`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: default;
  font-size: 13px;
  font-weight: bold;
  padding: 0 5px 5px 0;
`
