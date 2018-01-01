import {fetchDeck,insertDeck,insertCard} from '../utility/api'

export const ADD_DECK = "ADD_DECK"
export const REMOVE_DECK = "REMOVE_DECK"
export const ADD_CARD = "ADD_CARD"
export const REMOVE_CARD = "REMOVE_CARD"
export const EDIT_DECK = "EDIT_DECK"
export const EDIT_CARD = "EDIT_CARD"
export const RECEIVE_DECK = "RECEIVE_DECK"

export const getDeck = () => dispatch => {
  fetchDeck()
  .then((res)=>{
    dispatch(receiveDeck(res))
  })
}

export const receiveDeck = (deckList)  => (
  {
    type: RECEIVE_DECK,
    deckList 
  }
)

export const createDeck = (deck) => dispatch => (
  insertDeck(deck)
  .then((res) => {
    dispatch(addDeck(deck))
  })
)

export const addDeck = (deck) => (
  {
    type: ADD_DECK,
    deck
  }
)

export const removeDeck = ({id}) => (
  {
    type:REMOVE_DECK,
    id
  }
)

export const editDeck = ({id,title}) => (
  {
    type:EDIT_DECK,
    id,
    title
  }
)

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

export const editCard = ({id,parentId,q,ans})=> (
  {
    type: EDIT_CARD,
    id,
    parentId,
    q,
    ans
  }
)

export const removeCard = ({id,parentId}) => (
  {
    type: REMOVE_CARD,
    id,
    parentId
  }
)