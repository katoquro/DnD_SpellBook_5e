import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import { Store } from '@app/components/App/App'
import SpellCardView from './SpellCardView/SpellCardView'
import SpellTextView from './SpellTextView/SpellTextView'
import { Lang, spellDb } from '@app/data/SpellDb'

export default component({
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    store: Store.state
  }),
  render (h): VNode {
    const view = this.store.sView

    // TODO katoquro: 29/05/2021 border selected
    return 'card' === view
      ? <SpellCardView id={this.id} />
      : <SpellTextView id={this.id} />
  }
})

export function levelToL7dString (level: string, lang: Lang): string {
  if ('0' === level) {
    return spellDb.getUiString('cantrip', lang)
  } else {
    return level + ' ' + spellDb.getUiString('spell_level', lang)
  }
}

export function parseSourcesToL7dSting (sources: string, lang: Lang): string {
  const l7dSources = sources.split(',')
    .map((it) => it.trim())
    .map((it) => it.toLowerCase())
    .map((it) => spellDb.getUiString(it, lang))
    .join(', ')

  return spellDb.getUiString('data_source', lang) + ': ' + l7dSources
}
