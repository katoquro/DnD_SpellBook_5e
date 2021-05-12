import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'

// @ts-ignore
import $ from 'jquery'

export default component({
  props: {
    selected: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    bOpen: {
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
      return (this.open != null) ? this.open : this.bOpen || false
    }
  },
  mounted: function () {
    if (!this.isOpen) {
      const el = $('#' + this.id).find('.combo_box_content')
      el.hide()
    }
  },
  methods: {
    toggle: function () {
      this.open = !this.open
      const el = $('#' + this.id).find('.list')
      if (this.open) {
        el.slideDown(200)
      } else {
        el.slideUp(300)
      }
    },
    itemclick (sKey: any): (event: MouseEvent) => void {
      return () => {
        this.toggle()
        this.$emit('iclick', sKey)
      }
    }
  },
  render (h): VNode {
    return <div id={this.id}>
            {this.title.length > 0
              ? (<label class='filterLabel'>{this.title}</label>)
              : ''}
              <div class="customSelect" onClick={this.toggle}>
                <div class="label">{this.selected}</div>
                <ul class="list" style="display: none;">
                    {this.items.map((item:any) =>
                        <li key={item.key}
                            class="option"
                            onClick={m.stop(this.itemclick(item.key))}
                            domPropsInnerHTML={item.title}
                        />)
                    }

                  </ul>
                </div>
            </div>
  }
})
