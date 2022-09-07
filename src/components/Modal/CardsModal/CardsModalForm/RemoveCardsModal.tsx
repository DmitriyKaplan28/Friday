import * as React from 'react'

import { CustomCardsModal } from '../CustomCardsModal'

export type RemoveCardsModalType = {
  open: boolean
  setOpen: (value: boolean) => void
  handleAddPack: (value: string, checked: boolean) => void
}
export const RemoveCardsModal = (props: RemoveCardsModalType) => {
  return (
    <div>
      {/* <CustomCardsModal title={'Add Pack'} setOpen={props.setOpen} open={props.open}>
        <div>Do you really want to remove Card Name? All cards will be deleted.</div>
      </CustomCardsModal>*/}
    </div>
  )
}
