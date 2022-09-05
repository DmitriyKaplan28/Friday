//state
import { CardsParamsType } from '../../api/cardsApi'

const initialState: CardsParamsType = {
  cardsPack_id: '',
  cardQuestion: '',
  sortCards: '0update',
  page: 1,
  pageCount: 4,
}

export const cardsParamsReducer = (
  state: CardsParamsType = initialState,
  action: CardsParamsACType
): CardsParamsType => {
  switch (action.type) {
    case 'SET-CARD-USER-ID':
      return { ...state, cardsPack_id: action.cardsPackId }
    case 'SET-CURRENT-PAGE':
      return { ...state, page: action.page }
    case 'SET-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'SET-FILTER-QUESTION':
      return { ...state, cardQuestion: action.filter }
    case 'SET-SORT-CARD':
      return { ...state, sortCards: action.sort }
    default:
      return state
  }
}
// Action
export const setCardsPackIdAC = (cardsPackId: string) =>
  ({ type: 'SET-CARD-USER-ID', cardsPackId } as const)

export const setPageCurrentCardsAC = (page: number) => ({ type: 'SET-CURRENT-PAGE', page } as const)

export const setPageCountCardsAC = (pageCount: number) =>
  ({ type: 'SET-PAGE-COUNT', pageCount } as const)

export const setFilterQuestionCardAC = (filter: string) =>
  ({ type: 'SET-FILTER-QUESTION', filter } as const)

export const setSortCardAC = (sort: string) => ({ type: 'SET-SORT-CARD', sort } as const)

//thunk

// types
export type CardsParamsACType = ReturnType<
  | typeof setCardsPackIdAC
  | typeof setPageCurrentCardsAC
  | typeof setPageCountCardsAC
  | typeof setFilterQuestionCardAC
  | typeof setSortCardAC
>
