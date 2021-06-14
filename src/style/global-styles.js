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

    @media print {
      background: #fff none;
      margin: 0;
      padding: 0;

      -webkit-print-color-adjust: exact;
    }
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
    size: landscape;
    
    // based on printing area A4 https://id.canon/en/support/8200392300
    margin: 0.7cm 1.8cm;
  }
`
