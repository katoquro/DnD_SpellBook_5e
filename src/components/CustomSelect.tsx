import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'

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
      (this.$refs.slideArea as HTMLElement).style.maxHeight = '0px'
    }
  },
  methods: {
    toggle: function () {
      this.open = !this.open
      const slideArea = this.$refs.slideArea

      if (this.open) {
        (slideArea as HTMLElement).style.maxHeight = '1000px'
      } else {
        (slideArea as HTMLElement).style.maxHeight = '0px'
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
              <div ref="slideArea" style={{
                maxHeight: '1000px',
                transition: 'max-height 400ms ease-out',
                overflow: 'hidden',

                position: 'absolute',
                left: 0,
                right: 0,
                zIndex: 33
              }}>
                  <ul class="list" >
                      {this.items.map((item: any) =>
                          <li key={item.key}
                              class="option"
                              onClick={m.stop(this.itemclick(item.key))}
                              domPropsInnerHTML={item.title}
                          />)
                      }
                  </ul>
              </div>
          </div>
      </div>
  }
})
