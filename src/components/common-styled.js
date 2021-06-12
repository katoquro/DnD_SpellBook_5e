import styled, { css } from 'vue-styled-components'

export const FONT_COLOR_LIGHT = 'hsl(0,0%,95%)'
export const FONT_COLOR_GRAY = 'hsl(0,0%,60%)'
export const FONT_COLOR_DARK = 'hsl(220,60%,10%)'
export const BG_COLOR_LIGHT = 'hsl(0,0%,98%)'
export const BG_COLOR_LIGHT_DIMMED = 'hsl(0,0%,90%)'
export const OUTLINE_COLOR_LIGHT = 'hsla(0, 0%, 98%, 0.8)'
export const OUTLINE_COLOR_DARK = 'hsl(214, 52%, 53%)'

export const cardClassColors = {
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

export const nonPrintingStyle = css`
  @media print {
    display: none !important;
  }
`

export const NonPrintable = styled('div')`
  ${nonPrintingStyle}
`

export const FlexWrap = styled('div', {
  column: Boolean,
  wrap: {
    type: Boolean,
    default: true
  },
  basis: String,
  grow: Number
})`
  display: flex;
  flex-wrap: ${p => p.wrap ? 'wrap' : 'nowrap'};;
  flex-direction: ${p => p.column ? 'column' : 'row'};
  flex-basis: ${p => p.basis ? p.basis : 'auto'};
  flex-grow: ${p => p.grow ? p.grow : 'unset'};
`

// TODO katoquro: 31/05/2021 all bellow move to components

export const InfoTextStyled = styled.div`
  padding: 0.7em 1.3em;
  color: #222;
  font-weight: 600;
  max-width: 90rem;
`
