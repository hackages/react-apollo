import React, { PureComponent, Fragment } from 'react'
import { StyledModal } from '../styled/globalStyles'
import { CSSTransition } from 'react-transition-group'

function Slot({ children, slot, defaultSlot }) {
  let slottedChild = null
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      return null
    }

    if (child.props.slot === slot) {
      slottedChild = React.cloneElement(child)
    }
  })
  if (!slottedChild && defaultSlot) {
    slottedChild = defaultSlot
  }

  return slottedChild
}

export class Modal extends PureComponent {
  static defaultProps = {
    visible: false,
  }

  render() {
    const { children, onSubmit, onCancel, visible } = this.props
    const defaultFooter = (
      <Fragment>
        <button
          className="modal-default-button button-close"
          onClick={onCancel}
        >
          cancel
        </button>
        <button
          className="modal-default-button button-submit"
          onClick={onSubmit}
        >
          submit
        </button>
      </Fragment>
    )

    return (
      <CSSTransition
        in={visible}
        classNames="modal"
        timeout={{
          enter: 0,
          exit: 350,
        }}
        unmountOnExit
      >
        <StyledModal>
          <div className="modal-wrapper">
            <div className="modal-container">
              <div className="modal-header">
                <Slot defaultSlot={<h1>Default Header</h1>} slot="header">
                  {children}
                </Slot>
              </div>

              <div className="modal-body">
                <Slot defaultSlot={<content>Default body</content>} slot="body">
                  {children}
                </Slot>
              </div>

              <div className="modal-footer">
                <Slot slot="footer" defaultSlot={defaultFooter}>
                  {children}
                </Slot>
              </div>
            </div>
          </div>
        </StyledModal>
      </CSSTransition>
    )
  }
}
