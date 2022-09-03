import React, { ChangeEvent, useEffect, useState } from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'

import SuperSelect from '../../common/features/c5-SuperSelect/SuperSelect'
import SuperDoubleRange from '../../common/features/c8-SuperDoubleRange/SuperDoubleRange'
import { PATH } from '../../routing/Pages/Pages'
import { setShowModalAC } from '../../store/reducers/ModalReducer'
import { setPacksParamsAC, setResetSettingsPacksAC } from '../../store/reducers/PacksParamsReducer'
import { addPackTC, setCardPacksTC } from '../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { CustomModal } from '../CustomModal/CustomModal'
import { InputDebounce } from '../InputDebounce/InputDebounce'
import { PaginationControlled } from '../Pagination/Pagination'
import { ColorToggleButton } from '../ToggleButton/ColorToggleButton'

import s from './Packs.module.css'
import { StickyHeadTable } from './Table/Table'

export const initialOptions = [4, 8, 16, 32, 64]

export const Packs = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [alignment, setAlignment] = useState<string>('all')
  let [on, setOn] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  // const { page, pageCount, min, max, sortPacks, packName, user_id } = useAppSelector(
  //   state => state.paramsPacks
  // )
  const page = useAppSelector(state => state.paramsPacks.page)
  const pageCount = useAppSelector(state => state.paramsPacks.pageCount)
  const min = useAppSelector(state => state.paramsPacks.min)
  const max = useAppSelector(state => state.paramsPacks.max)
  const sortPacks = useAppSelector(state => state.paramsPacks.sortPacks)
  const packName = useAppSelector(state => state.paramsPacks.packName)
  const user_id = useAppSelector(state => state.paramsPacks.user_id)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const onChangePageCount = (value: number) => {
    dispatch(setPacksParamsAC({ pageCount: value, page: 1 }))
  }
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }
  const onClickReset = () => {
    dispatch(setResetSettingsPacksAC())
    setSearchTerm('')
    setAlignment('all')
    setOn(false)
  }

  const handleAddPack = () => {
    dispatch(addPackTC(value, checked))
    dispatch(setShowModalAC(false))
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
        <CustomModal title={'Add Pack'}>
          <TextField
            onChange={onChangeTitle}
            value={value}
            sx={{ width: 350, marginBottom: 3 }}
            label="Name pack"
            variant="standard"
          />
          <FormControlLabel
            sx={{ marginBottom: 3 }}
            label="Private pack"
            control={<Checkbox checked={checked} onChange={handleChange} />}
          />

          <div className={s.btnGroup}>
            <Button variant="outlined" size="large">
              Cancel
            </Button>
            <Button variant="contained" size="large" onClick={handleAddPack}>
              Save
            </Button>
          </div>
        </CustomModal>
        <div className={s.filter}>
          <InputDebounce width={350} value={searchTerm} onChangeValue={setSearchTerm} />
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
        <StickyHeadTable />
        <div className={s.pagination}>
          <PaginationControlled page={page} count={pageCount} />
          <span className={s.title}>Show</span>
          <SuperSelect
            value={pageCount}
            options={initialOptions}
            onChangeOption={onChangePageCount}
          />
          <span className={s.title}>Cards per Page</span>
        </div>
      </div>
    </div>
  )
}
