import Vue from 'vue'

import './style/global-styles'

import App, { Store } from './components/App/App'

export default new Vue({
  el: '#VueApp',
  data: {
    state: Store.state
  },
  render(h) {
    return <App ref="App"/>
  }
})
