import { CardsParamsType } from '../../api/cardsApi'

export const getCardsParams = (searchParams: URLSearchParams): CardsParamsType => {
  return {
    cardsPack_id: String(searchParams.get('cardsPack_id')),
  }
}
