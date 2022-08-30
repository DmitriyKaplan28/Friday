import React, { useEffect, useState } from 'react'

import { useDebounce } from '../../common/hooks/useDebounce'
import { searchPackNameAC } from '../../store/reducers/PacksParamsReducer'
import { useAppDispatch } from '../../store/store'

export const InputDebounce = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(searchPackNameAC(searchTerm))
  }, [debouncedSearchTerm])

  return (
    <div>
      <input placeholder="Search packs" onChange={e => setSearchTerm(e.target.value)} />
    </div>
  )
}
