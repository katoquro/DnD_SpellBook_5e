import Vue from 'vue'

import './style/style.less'

import App from './components/App/App'

export default new Vue({
  el: '#VueApp',
  render (h) {
    return <App/>
  }
})
