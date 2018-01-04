import {
  insertCard,
  removeCard,} from '../utility/api'

export const ADD_CARD = "ADD_CARD"
export const REMOVE_CARD = "REMOVE_CARD"

export const createCard = (card) => dispatch => {
insertCard(card)
.then((res)=>dispatch(addCard(card)))
}

export const addCard =(card) => (
{
type: ADD_CARD,
card
}
)

export const deleteCard = (parentId,id) => dispatch => {
removeCard(parentId,id)
.then((res)=>dispatch(dropCard(parentId,id)))
}

export const dropCard = (parentId,id) => (
{
type: REMOVE_CARD,
id,
parentId
}
)