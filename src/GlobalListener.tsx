export interface GlobalListener {
    CtrlA (handler : ()=>void): void
}

class DocumentListener implements GlobalListener {
    private fCtrlIsPressed: boolean = false
    CtrlAHandler?: () => void ;

    constructor () {
      document.addEventListener('keydown', (event) => {
        // CTRL
        if (event.which === 17) {
          this.fCtrlIsPressed = true
        }

        // A letter
        if (event.which === 65 && this.fCtrlIsPressed) {
          if (this.CtrlAHandler) {
            this.CtrlAHandler()
            event.preventDefault()
            return false
          }
        }
      })

      document.addEventListener('keyup', (event) => {
        // CTRL
        if (event.which === 17) {
          this.fCtrlIsPressed = false
        }
      })
    }

    CtrlA (handler: () => void): void {
      this.CtrlAHandler = handler
    }
}

export const GLOBAL_LISTENER: GlobalListener = new DocumentListener()
