import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import Card from './Card'

export default component({
  methods: {
    getCardRefs ():VNode[] {
      return this.$data.cache
    },
  },
  render (h): VNode {
    const cache: VNode[] = []

    const vue: any = this.$parent

    const pinnedCards = vue.aLockedItemsList.map((item: any) => {
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
                view={vue.sView}
                selected={item.selected}
                locked={item.locked}
                pre={item.pre}
                editable={item.editable}
                v-on:unlock={() => vue.unlockCard(item)}
                v-on:hide={() => vue.hideCard(item)}
                v-on:select={() => vue.selectLockedCard(item)}
            />
    })

    cache.push(...pinnedCards)

    const filteredCards = vue.aItemsList.map((item: any) => {
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
                view={vue.sView}
                selected={item.selected}
                locked={false}
                pre={item.pre}
                editable={item.editable}
                v-on:lock={() => vue.lockCard(item)}
                v-on:hide={() => vue.hideCard(item)}
                v-on:select={() => vue.selectCard(item)}
                v-on:cancel={vue.cancelCard}
                v-on:input={vue.saveCard}
            />
    })

    cache.push(...filteredCards)

    this.$data.cache = cache

    const lockedArea = vue.aLockedItemsList.length > 0 && vue.bCardsAreVisible
      ? <div id='lockedItemsArea'>
                <div class='flex_row noprint'>
                    <span class='topHeader'>Закрепленные заклинания ({vue.aLockedItemsList.length})</span>
                    <span class='bUnlockAll' onClick={vue.unlockAll}>Открепить все</span>
                </div>
                <div class='content row'>
                    {pinnedCards}
                </div>
                <div class='flex_row noprint'>
                    <span class='bottomHeader'>Каталог заклинаний ({vue.aItemsList.length})</span>
                </div>
            </div>
      : null

    return <div class='p_cont' ref="cardContainer">
        {lockedArea}
        <div class="row spellContainer" data-itemcount={vue.aItemsList.length}>
        <span class='itemCounter noprint' v-show="aLockedItemsList.length<1"
            title='Количество элементов'>{vue.aItemsList.length}</span>
            {filteredCards}
        </div>
    </div>
  }
})
