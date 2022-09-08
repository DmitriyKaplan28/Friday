import React, { useEffect, useState } from 'react'

import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'

import { CardsType } from '../../api/cardsApi'
import { BackPage } from '../../common/features/c11-BackPage/BackPage'
import { PATH } from '../../routing/Pages/Pages'
import { getCardsTC, updateCardGradeTC } from '../../store/reducers/CardsReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import s from '../ComonnStylePage.module.css'

const grades = [
  { value: 1, label: 'Not a chance' },
  { value: 2, label: 'Tough' },
  { value: 3, label: 'So-so' },
  { value: 4, label: 'Not that easy' },
  { value: 5, label: 'Easy' },
]

const getCard = (cards: CardsType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

export const Learn = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [first, setFirst] = useState(true)
  const [value, setValue] = useState('')
  const [grade, setGrade] = useState(0)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const { packId, packName } = useParams<'packId' | 'packName'>()

  const dispatch = useAppDispatch()

  const { cards } = useAppSelector(state => state.cards)

  const [card, setCard] = useState<CardsType>({
    _id: '',
    cardsPack_id: '',
    user_id: '',
    answer: '',
    question: '',
    grade: 1,
    shots: 0,
    comments: '',
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
    __v: 0,
  })

  const onNext = () => {
    if (packId) {
      setIsChecked(false)
      dispatch(updateCardGradeTC(card._id, grade))
      setCard(getCard(cards))
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const onShowAnswer = () => setIsChecked(true)

  useEffect(() => {
    if (first) {
      packId && dispatch(getCardsTC(packId))
      setFirst(false)
    }
    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }, [dispatch, packId, cards, first])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div>
      <BackPage title={'Packs List'} route={PATH.PACKS} />
      <div className={s.card}>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '347px' },
          }}
        >
          <p>Learn {packName}</p>
          <div>
            <div>Question: {card.question}</div>
            <div>Number of attempts to answer the question: {card.shots}</div>
            {isChecked ? (
              <>
                <div>Answer: {card.answer}</div>
                <div>
                  <FormControl>
                    <FormLabel>Rate yourself:</FormLabel>
                    <RadioGroup value={value} onChange={handleChange}>
                      {grades.map((grade, i) => (
                        <FormControlLabel
                          key={'grade-' + i}
                          value={grade.value}
                          control={<Radio onChange={() => setGrade(grade.value)} />}
                          label={grade.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <button className={s.button} type={'submit'} onClick={onNext}>
                    next
                  </button>
                </div>
              </>
            ) : (
              <div>
                <button className={s.button} type={'submit'} onClick={onShowAnswer}>
                  Show answer
                </button>
              </div>
            )}
          </div>
        </Box>
      </div>
    </div>
  )
}
