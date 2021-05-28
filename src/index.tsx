import Vue from 'vue'

import './style/style.less'

import App, { Store } from './components/App/App'

export default new Vue({
  el: '#VueApp',
  data: {
    state: Store.state
  },
  render (h) {
    return <App ref="App"/>
  }
})
