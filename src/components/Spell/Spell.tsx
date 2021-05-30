import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import { Store } from '../App/App'
import SpellCardView from './SpellCardView'
import SpellTextView from './SpellTextView'

export default component({
  props: {
    id: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    view: Store.state.sView
  }),
  render (h): VNode {
    // TODO katoquro: 29/05/2021 border selected
    return 'card' === this.view
      ? <SpellCardView id={this.id} />
      : <SpellTextView id={this.id} />
  }
})
