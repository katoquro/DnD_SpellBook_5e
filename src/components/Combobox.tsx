import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

import $ from 'jquery'

import ComboboxItem from './ComboboxItem'

export default component({
  props: {
    value: {
      type: String,
      default: '0'
    },
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '#7986CB'
    },
    items: {
      type: Array,
      default: () => []
    },
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isOpen (): boolean {
      return (this.open != null) ? this.open : this.opened || false
    }
  },
  mounted () {
    if (!this.isOpen) {
      const el = $('#' + this.id).find('.combo_box_content')
      el.hide()
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
      const el = $('#' + this.id).find('.combo_box_content')
      if (this.open) {
        el.slideDown(400, () => {
          this.$emit('opened', true)
        })
      } else {
        el.slideUp(400, () => {
          this.$emit('opened', false)
        })
      }
    },
    itemclick (oEvent:string): void {
      this.$emit('iclick', oEvent)
    }
  },
  render (h): VNode {
    return <div id={this.id} class="combo_box" data-text={this.title} >
      <div class="combo_box_title" onClick={this.toggle}>{this.title}</div>
        <div class="combo_box_content">
          {this.items.map((item: any) =>
          <ComboboxItem
              key={item.key}
              val={item.key}
              checked={item.checked}
              title={item.title}
              subtitle={item.subtitle}

              on-lclick={this.itemclick}
              />
          )}
        </div>
      <div class="combo_box_arrow" onClick={this.toggle}>
        {this.isOpen
          ? (<span class="arr_up" ><i class="fa fa-arrow-up"/></span>)
          : (<span class="arr_down" ><i class="fa fa-arrow-down"/></span>)
        }
      </div>
    </div>
  }
})
