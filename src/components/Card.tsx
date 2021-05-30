import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import FaIcon from './FaIcon'
import { faEyeSlash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'

export default component({
  props: {
    name: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    castingTimeTitle: {
      type: String,
      default: 'Casting time'
    },
    castingTime: {
      type: String,
      default: ''
    },
    rangeTitle: {
      type: String,
      default: 'Range'
    },
    range: {
      type: String,
      default: ''
    },
    componentsTitle: {
      type: String,
      default: 'Components'
    },
    components: {
      type: String,
      default: ''
    },
    durationTitle: {
      type: String,
      default: 'Duration'
    },
    duration: {
      type: String,
      default: ''
    },
    materials: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      default: ''
    },
    school: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    ritual: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    view: {
      type: String,
      default: 'card'
    },
    selected: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    },
    pre: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      viewClass: 'cardView',
      textSize: 0,
      cardWidth: 0
    }
  },
  computed: {
    mainClass: function () {
      return (this.view === 'card') ? 'cardContainer' : 'textCardContainer'
    },
    srcTitle: function () {
      return 'Источник: ' + this.source
    },
    materialsLine: function () {
      return this.materials ? '(' + this.materials + ')' : ''
    },
    cardView: function () {
      return (this.view === 'card')
    },
    selectedClass: function () {
      return this.selected ? 'selected' : ''
    },
    colorClass: function () {
      return this.color ? this.color : ''
    },
    preparedText: function () {
      return this.text ? this.text.split(/<br>/g).map(el => '<p>' + el + '</p>').join('') : ''
    },
    ritualMark: function () {
      return this.ritual ? '(' + this.ritual + ') ' : ''
    },
    textSizeStyle (): string {
      return this.textSize ? 'font-size: ' + this.textSize + 'px' : ''
    },
    cardWidthStyle (): string {
      return (this.cardWidth > 0 && this.cardView) ? 'width: ' + this.cardWidth + 'px' : ''
    },
    editableButtons: function () {
      return this.editable ? '' : 'display: none'
    }
  },
  mounted: function () {
    const oText = this.$refs.itemText as Element
    const styleText = window.getComputedStyle(oText, null).getPropertyValue('font-size')
    this.textSize = parseFloat(styleText)

    const oContainer = this.$refs.cardContainer as Element
    const styleContainer = window.getComputedStyle(oContainer, null).getPropertyValue('width')
    this.cardWidth = parseFloat(styleContainer)
  },
  methods: {
    lock: function (oEvent: Event) {
      this.$emit('lock', oEvent)
    },
    unlock: function (oEvent: Event) {
      this.$emit('unlock', oEvent)
    },
    hide: function (oEvent: Event) {
      this.$emit('hide', oEvent)
    },
    select: function (oEvent: Event) {
      this.$emit('select', oEvent)
      return false
    },

    onTextMin: function () {
      this.textSize--
    },
    onTextMax: function () {
      this.textSize++
    },

    onTextCancel: function () {
      this.$emit('cancel', { id: this.id })
    },
    onTextSave: function () {
      const oEl = this.$refs.itemText as HTMLElement
      const sText = oEl.innerHTML
      this.$emit('input', {
        id: this.id,
        text: sText
      })
    },

    autosizeText: function () {
      const oEl = this.$refs.itemText as HTMLElement
      // const style = window.getComputedStyle(oEl, null).getPropertyValue('scrollWidth')

      if (this.textSize > 7 && oEl.scrollHeight > oEl.offsetHeight) {
        this.textSize -= 0.3
        return true
      } else {
        return false
      }
    },
    onCardWidthMax: function () {
      this.cardWidth += 10
    },
    onCardWidthMin: function () {
      this.cardWidth -= 10
    },
    setCardWidth: function (nWidth: number) {
      this.cardWidth = nWidth
    }
  },

  render (h): VNode {
    return <div class={`${this.mainClass} ${this.viewClass} ${this.colorClass}`} onClick={m.ctrl(this.select)} onDblclick={m.stop(this.select)} ref="cardContainer" style={this.cardWidthStyle}>
      {this.cardView
        ? (
          <div class={`spellCard ${this.selectedClass}`} >
            <div class="content">
              { this.locked
                ? (<span class="bUnlockItem" title="Открепить обратно" onClick={m.stop(this.unlock)}><FaIcon icon={faUnlock} aria-hidden="true"/></span>)
                : (<span class="bLockItem" title="Закрепить заклинание (не будут действовать фильтры)" onClick={m.stop(this.lock)}><FaIcon icon={faLock} aria-hidden="true"/></span>)
              }
              <span class="bHideItem" title="Скрыть заклинание (будет внизу панели фильтров)" onClick={m.stop(this.hide)}><FaIcon icon={faEyeSlash} aria-hidden="true"/></span>
              <h1 title={this.tooltip} contenteditable={this.editable}>{this.name} {this.ritualMark}</h1>
              <div class="row">
                <div class="cell castingTime" contenteditable={this.editable}>
                  <b>{this.castingTimeTitle}</b>
                  <span>{this.castingTime}</span>
                </div>
                <div class="cell range" contenteditable={this.editable}>
                  <b>{this.rangeTitle}</b>
                  <span>{this.range}</span>
                </div>
              </div>
              <div class="row">
                <div class="cell components" contenteditable={this.editable}>
                  <b>{this.componentsTitle}</b>
                  <span>{this.components}</span>
                </div>
                <div class="cell duration" contenteditable={this.editable}>
                  <b>{this.durationTitle}</b>
                  <span>{this.duration}</span>
                </div>
              </div>
              <div class="materials" contenteditable={this.editable} >{this.materials}</div>
              <div class="text" domPropsInnerHTML={this.preparedText} style={this.textSizeStyle} ref="itemText" contenteditable={this.editable}>
              </div>

              <div class="sizeButtonsContainer noprint">
                <span class="textMin itemButton" title="Уменьшить размер текста" onClick={m.stop(this.onTextMin)}>–</span>

                <span class="textCancel itemButton" title="Отменить" onClick={m.stop(this.onTextCancel)} style={this.editableButtons}>✖</span>
                <span class="textSave itemButton" title="Сохранить" onClick={m.stop(this.onTextSave)} style={this.editableButtons}>✔</span>

                <span class="textMax itemButton" title="Увеличить размер текста" onClick={m.stop(this.onTextMax)} >+</span>
              </div>
              <b class="class">{this.className}</b>
              <b class="school">{this.level}, {this.school} <span title={this.srcTitle}>({this.src})</span></b>
            </div>
          </div>
          )
        : (
          <div class="inner">
            {this.locked
              ? (<span class="bUnlockItem noprint" title="Открепить обратно" onClick={m.stop(this.unlock)}>
                  <FaIcon icon={faUnlock} aria-hidden="true" />
                </span>)
              : (<span class="bLockItem noprint" title="Закрепить заклинание (не будут действовать фильтры)"
                    onClick={m.stop(this.lock)}><FaIcon icon={faLock} aria-hidden="true" /></span>)
            }
            <span class="bHideItem noprint" title="Скрыть заклинание (будет внизу панели фильтров)" onClick={m.stop(this.hide)}><FaIcon icon={faEyeSlash} aria-hidden="true"/></span>
            <div class="flex">
              <div class="flex column primal">
                <h1 title={this.tooltip} contenteditable={this.editable}>{this.name}</h1>
                <div class="second_name" contenteditable={this.editable}>[{this.tooltip}]</div>
                <div class="school_level" contenteditable={this.editable}>{this.level}, {this.school} {this.ritualMark}</div>
              </div>
              <div class="flex secondal">
                <div class="column thirdal">
                  <div class="cvasi_row"><div class="subtitle" contenteditable={this.editable}>{this.castingTimeTitle}</div> <div>{this.castingTime}</div></div>
                  <div class="cvasi_row"><div class="subtitle" contenteditable={this.editable}>{this.rangeTitle}</div> <div>{this.range}</div></div>
                </div>
                <div class="column thirdal">
                  <div class="cvasi_row"><div class="subtitle" contenteditable={this.editable}>{this.componentsTitle}</div> <div>{this.components} {this.materials ? '*' : ''}</div></div>
                  <div class="cvasi_row"><div class="subtitle" contenteditable={this.editable}>{this.durationTitle}</div> <div>{this.duration}</div></div>
                </div>
              </div>
            </div>
            <div class="sizeButtonsContainer noprint">
              <span/>
              <span class="textCancel noprint itemButton" title="Отменить" onClick={m.stop(this.onTextCancel)} style={this.editableButtons} >✖</span>
              <span class="textSave noprint itemButton" title="Сохранить" onClick={m.stop(this.onTextSave)} style={this.editableButtons} >✔</span>
              <span/>
            </div>
            <div class="text" domPropsInnerHTML={this.preparedText} contenteditable={this.editable} ref="itemText"/>
            <div class="material_components" contenteditable={this.editable}>{this.materialsLine}</div>
            <div class="source" title={this.srcTitle}>({this.src})</div>
          </div>
          )
      }
      </div>
  }
})
