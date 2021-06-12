import { injectGlobal } from 'vue-styled-components'
import bgImageFull from '@app/img/bg2.jpg'

injectGlobal`
  html {
    height: 100%;
  }
  
  body {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: #222;
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 1.42857143;
    color: #2c3e50;
    counter-reset: p_num 0;

    /*prevent scroll to allocate width in webkit browsers*/
    overflow-y: overlay;
  }

  .bg-image {
    animation: changeBg 1500ms;
    animation-fill-mode: forwards;
    filter: blur(1.5px);
    -webkit-filter: blur(1.5px);
  }

  @keyframes changeBg {
    0% {
    }
    100% {
      background-image: url(${bgImageFull});
    }
  }

  @page {
    margin: 1.14cm 0.9cm 0.9cm;
  }
`
