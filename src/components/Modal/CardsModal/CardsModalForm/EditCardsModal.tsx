import * as React from 'react'

export type EditCardsModalType = {
  open: boolean
  setOpen: (value: boolean) => void
  handleAddPack: (value: string, checked: boolean) => void
}
export const EditCardsModal = (props: EditCardsModalType) => {
  return (
    <div>
      {/*<CustomCardsModal title={'Add Pack'} setOpen={props.setOpen} open={props.open}>
        <div>edit cards</div>
      </CustomCardsModal>*/}
    </div>
  )
}
