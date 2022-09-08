import React, { useEffect, useState } from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'

import SuperDoubleRange from '../../common/features/c8-SuperDoubleRange/SuperDoubleRange'
import { PATH } from '../../routing/Pages/Pages'
import {
  searchPackNameAC,
  setPacksParamsAC,
  setResetSettingsPacksAC,
} from '../../store/reducers/PacksParamsReducer'
import { addPackTC, setCardPacksTC } from '../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { InputDebouncePack } from '../InputDebounce/InputDebouncePack'
import { PaginationControlled } from '../Pagination/Pagination'
import { ColorToggleButton } from '../ToggleButton/ColorToggleButton'

import { AddPackModal } from './AddPackModal'
import s from './Packs.module.css'
import { StickyHeadTable } from './Table/Table'

export const initialOptions = [4, 8, 16, 32, 64]
export type ModeModalType = 'close' | 'add' | 'edit' | 'delete'

export const Packs = () => {
  const [modeModal, setModeModal] = useState<ModeModalType>('close')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [alignment, setAlignment] = useState<string>('all')
  const [on, setOn] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.paramsPacks.page)
  const pageCount = useAppSelector(state => state.paramsPacks.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const min = useAppSelector(state => state.paramsPacks.min)
  const max = useAppSelector(state => state.paramsPacks.max)
  const sortPacks = useAppSelector(state => state.paramsPacks.sortPacks)
  const packName = useAppSelector(state => state.paramsPacks.packName)
  const user_id = useAppSelector(state => state.paramsPacks.user_id)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const onChangePageCount = (value: number) => {
    dispatch(setPacksParamsAC({ pageCount: value, page: 1 }))
  }

  const setPage = (value: number) => {
    dispatch(setPacksParamsAC({ page: value }))
  }
  const changeFilterInput = (value: string) => {
    dispatch(searchPackNameAC(value))
  }

  const onClickReset = () => {
    dispatch(setResetSettingsPacksAC())
    setSearchTerm('')
    setAlignment('all')
    setOn(false)
  }
  const handleOpen = () => {
    setOpen(!open)
    setModeModal('add')
  }
  const handleAddPack = (value: string, checked?: boolean | undefined) => {
    dispatch(addPackTC(value, checked))
  }

  useEffect(() => {
    dispatch(setCardPacksTC())
  }, [page, pageCount, min, max, sortPacks, packName, user_id])
  if (!isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }

  return (
    <div>
      <div className={s.wrapper}>
        <h3 className={s.mainTitle}>Packs list</h3>
        <Button onClick={handleOpen}>Add Pack</Button>
        <AddPackModal
          open={open}
          setOpen={setOpen}
          handleAddPack={handleAddPack}
          modeModal={modeModal}
          setModeModal={setModeModal}
        />
        <div className={s.filter}>
          <InputDebouncePack width={350} callback={changeFilterInput} />
          <ColorToggleButton
            setAlignment={setAlignment}
            alignment={alignment}
            setOn={setOn}
            on={on}
          />
          <SuperDoubleRange />
          <div className={s.reset} onClick={onClickReset}>
            <button>
              <FilterAltOffIcon />
            </button>
          </div>
        </div>
        <StickyHeadTable modeModal={modeModal} setModeModal={setModeModal} />
        <div className={s.pagination}>
          <PaginationControlled
            page={page}
            count={pageCount}
            totalCount={cardPacksTotalCount}
            changePageCount={onChangePageCount}
            setPage={setPage}
          />
          {/* <PaginationControlled page={page} count={pageCount} />
          <span className={s.title}>Show</span>
          <SuperSelect
            value={pageCount}
            options={initialOptions}
            onChangeOption={onChangePageCount}
          />
          <span className={s.title}>Cards per Page</span>*/}
        </div>
      </div>
    </div>
  )
}
