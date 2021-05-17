import styled, { css } from 'vue-styled-components'

const color = '#222'

export const nonPrintingStyle = css`
  @media print {
    display: none !important;
  }
`
export const InfoTextStyled = styled.div`
  padding: 0.7em 1.3em;
  color: ${color};
  font-weight: 600;
  max-width: 90rem;
`
