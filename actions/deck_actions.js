import {fetchDeck,
  insertDeck,
  removeDeck} from '../utility/api'

export const ADD_DECK = "ADD_DECK"
export const REMOVE_DECK = "REMOVE_DECK"
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
  
  export const deleteDeck = (id) => dispatch => {
  removeDeck(id)
  .then((res)=>{dispatch(dropDeck(id))})
  }
  
  export const dropDeck = (id) => (
  {
  type:REMOVE_DECK,
  id
  }
  )