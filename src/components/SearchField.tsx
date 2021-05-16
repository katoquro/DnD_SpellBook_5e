import { VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import FaIcon from './FaIcon'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'

export default tsx.component({
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    ios: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    innerId (): string {
      return 'sf_' + this.id
    }
  },
  methods: {
    input (event: Event) {
      this.$emit('input', (event.target as HTMLInputElement).value)
    },
    clean () {
      this.$emit('input', '')
    },
    random (event: MouseEvent) {
      event.preventDefault()
      this.$emit('searchrndom')
    }
  },
  render (h): VNode {
    return <div id={this.id}>
            <label class='filterLabel' for={this.innerId}>{this.title}</label>
            <div style={{ display: 'flex' }}>
                <div class="customInput">
                    {this.ios
                      ? (
                            <textarea
                                id={this.innerId}
                                onInput={this.input}
                                rows={1}
                                style="width:100%; height: 3rem; font-size:110%">{this.value}</textarea>
                        )
                      : (
                            <input
                                id={this.innerId}
                                type="text"
                                value={this.value}
                                onInput={this.input} />
                        )
                    }

                    <span class="cross" onClick={this.clean} />
                </div>
                <a id="bRandom"
                    href="#random"
                    class="bt flexChild"
                    title="Случайное заклинание"
                    onClick={this.random}><FaIcon icon={faDiceD20}/></a>
            </div>
        </div>
  }
})
