import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import Card from './Card'
import { Store } from './App/App'
import Spell from './Spell/Spell'

export default component({
  methods: {
    getCardRefs (): VNode[] {
      return this.$data.cache
    },
  },

  render (h): VNode {
    const cache: VNode[] = []

    // todo rename
    const store: any = Store

    const pinnedCards = store.aLockedItemsList().map((item: any) => {
      return <Card
        ref="itemCard"
        key={item.name}
        id={item.id}
        name={item.name}
        tooltip={item.tooltip}
        text={item.text}
        src={item.src}
        className={item.className}
        source={item.source}
        school={item.school}
        level={item.level}
        duration={item.duration}
        castingTime={item.castingTime}
        range={item.range}
        materials={item.materials}
        ritual={item.ritual}
        components={item.components}
        castingTimeTitle={item.castingTimeTitle}
        durationTitle={item.durationTitle}
        rangeTitle={item.rangeTitle}
        componentsTitle={item.componentsTitle}
        color={item.color}
        view={store.state.sView}
        selected={item.selected}
        locked={item.locked}
        pre={item.pre}
        editable={item.editable}
        v-on:unlock={() => store.unlockCard(item.id)}
        v-on:hide={() => store.hideCard(item.id)}
        v-on:select={() => store.selectLockedCard(item)}
      />
    })

    cache.push(...pinnedCards)

    const filteredCards = store.aItemsList().map((item: any) => {
      return <Card
        ref="itemCard"
        key={item.name}
        id={item.id}
        name={item.name}
        tooltip={item.tooltip}
        text={item.text}
        src={item.src}
        className={item.className}
        source={item.source}
        school={item.school}
        level={item.level}
        duration={item.duration}
        castingTime={item.castingTime}
        range={item.range}
        materials={item.materials}
        ritual={item.ritual}
        components={item.components}
        castingTimeTitle={item.castingTimeTitle}
        durationTitle={item.durationTitle}
        rangeTitle={item.rangeTitle}
        componentsTitle={item.componentsTitle}
        color={item.color}
        view={store.state.sView}
        selected={item.selected}
        locked={false}
        pre={item.pre}
        editable={item.editable}
        v-on:lock={() => store.lockCard(item.id)}
        v-on:hide={() => store.hideCard(item.id)}
        v-on:select={() => store.selectCard(item)}
        v-on:cancel={store.cancelCard.bind(store)}
        v-on:input={store.saveCard.bind(store)}
      />
    })

    cache.push(...filteredCards)

    this.$data.cache = cache

    const lockedArea = store.aLockedItemsList().length > 0 && store.state.bCardsAreVisible
      ? <div id='lockedItemsArea'>
        <div class='flex_row noprint'>
          <span class='topHeader'>Закрепленные заклинания ({store.aLockedItemsList().length})</span>
          <span class='bUnlockAll' onClick={store.unlockAll.bind(store)}>Открепить все</span>
        </div>
        <div class='content row'>
          {pinnedCards}
        </div>
        <div class='flex_row noprint'>
          <span class='bottomHeader'>Каталог заклинаний ({store.aItemsList().length})</span>
        </div>
      </div>
      : null

    return <div class='p_cont' ref="cardContainer">
      {lockedArea}

      <div class="row spellContainer" data-itemcount={store.aItemsList().length}>
        <span class='itemCounter noprint'
          title='Количество элементов'>{store.aItemsList().length}
        </span>
        <div style={{ display: 'flex' }}>
          {store.aItemsList().map((item: any) => <Spell id={item.id} />)}
        </div>
        {filteredCards}
      </div>
    </div>
  }
})
