import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

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
      (this.$refs.slideArea as HTMLElement).style.maxHeight = '0px'
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
      const slideArea = this.$refs.slideArea

      if (this.open) {
        (slideArea as HTMLElement).style.maxHeight = '1000px'
      } else {
        (slideArea as HTMLElement).style.maxHeight = '0px'
      }
    },
    itemclick (oEvent:string): void {
      this.$emit('iclick', oEvent)
    }
  },
  render (h): VNode {
    return <div id={this.id} class="combo_box" data-text={this.title} >
      <div class="combo_box_title" onClick={this.toggle}>{this.title}</div>
       <div ref="slideArea" style={{ maxHeight: '1000px', transition: 'max-height 300ms', overflow: 'hidden' }}>
        <div class="combo_box_content">
          {this.items.map((item: any) =>
          <ComboboxItem
              key={item.key}
              val={item.key}
              checked={item.checked}
              title={item.title}
              subtitle={item.subtitle}

              v-on:lclick={this.itemclick}
              />
          )}
        </div>
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
