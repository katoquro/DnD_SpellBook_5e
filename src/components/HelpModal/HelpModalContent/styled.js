import styled, { css } from 'vue-styled-components'

const mdStyles = css`
  /* Headings */
  h1,h2,h3,h4,h5,h6{
    font-family: 'Open Sans', sans-serif;
    font-weight:700;
    color:#111111;
    line-height:1em;
    -webkit-font-smoothing: antialiased;
    margin: 15px 0px;
  }
  h1{ font-size:2.5em; }
  h2{ font-size:2em;  border-bottom: 1px solid #CCC; padding-bottom: 10px; }
  h3{ font-size:1.5em; }
  h4{ font-size:1.2em; }
  h5{ font-size:1em; }
  h6{ font-size:0.9em; }

  /* Elements */
  p{
    margin:1em 0em;
    text-align: justify;
  }

  /* Lists */
  ul, ol {
    margin: 1em 0;
    padding: 0 0 0 2em;
  }

  ol li {
    list-style-type: decimal;
    padding-bottom: 0.50em;
  }

  ul li {
    list-style-type: disc;
    padding-bottom: 0.50em;
  }

  li p:last-child {
    margin:0
  }

  dd {
    margin: 0 0 0 2em;
  }
`

export const HelpModalContentStyled = styled.div`
  padding: 0.7em 1.3em;
  color: #222;
  font-weight: 600;
  max-width: 90rem;
  
  ${mdStyles}
`
