import * as React from 'react'
/*import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { getCardsParams } from '../../../../common/utils/GetParams'
import { getCardsTC, setPageCountCardsAC } from '../../../../store/reducers/CardsReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import s from '../../Packs.module.css'

import { Cards } from './Cards/Cards'

export const Pack = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const [searchParams] = useSearchParams()
  const { page, pageCount, cardsTotalCount } = useAppSelector(state => state.cards)
  const params = getCardsParams(searchParams) //может обернуть в useMemo
  const pagesCount = Math.ceil(cardsTotalCount / params.pageCount)
  //const myId = useAppSelector(state => state.profile.user._id)
  const myId = '6310d4623e59981245ea31ef'
  /!*const onChangePageCount = (value: number) => {
    dispatch(setPageCountCardsAC(value))
  }*!/

  useEffect(() => {
    dispatch(getCardsTC(params))
  }, [page, pageCount, cardsTotalCount])
  debugger
  const a = cards[0]._id

  return (
    <div className={s.wrapper}>
      {a === myId ? (
        <Cards name="My Pack" cards={cards} />
      ) : (
        <Cards name="Friends Pack" cards={cards} />
      )}
    </div>
  )
}*/
