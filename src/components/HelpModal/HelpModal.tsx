import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import HelpModalContent from './HelpModalContent/HelpModalContent'
import { Store } from '@app/components/App/App'
import { CloseCrossBtnStyled, HelpModalStyled, ModalFrameStyled } from '@app/components/HelpModal/styled'

export default component({
  data: () => ({
    store: Store.state
  }),

  methods: {
    close() {
      Store.closeModWin()
    }
  },

  render(h): VNode {
    if (!this.store.bModalWinShow) {
      return <div />
    }

    return <HelpModalStyled onClick={this.close} onScroll={m.stop}>
      <ModalFrameStyled>
        <CloseCrossBtnStyled onClick={this.close}>×</CloseCrossBtnStyled>
          <HelpModalContent />
      </ModalFrameStyled>
    </HelpModalStyled>
  }
})
