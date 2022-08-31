import { CardsParamsType } from '../../api/cardsApi'
import { useAppSelector } from '../../store/store'

export const getCardsParams = (searchParams: URLSearchParams): CardsParamsType => {
  const { pageCount, page } = useAppSelector(state => state.cards)

  return {
    cardsPack_id: String(searchParams.get('cardsPack_id')),
    pageCount: Number(searchParams.get('pageCount')) || pageCount,
    page: Number(searchParams.get('pageCount')) || page,
  }
}
