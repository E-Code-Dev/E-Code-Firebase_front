import type { VFC, ReactNode } from 'react'

import { ModalCard, OverlayModal } from './styled'

type BaseModalProps = {
  showFlag: boolean
  children: ReactNode
}

const BaseModal: VFC<BaseModalProps> = (props) => {
  const { showFlag, children } = props
  return (
    <div>
      {showFlag && (
        <OverlayModal>
          <ModalCard>{children}</ModalCard>
        </OverlayModal>
      )}
    </div>
  )
}

export default BaseModal
