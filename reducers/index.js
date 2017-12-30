import * as ACT from "../actions"

export default function deck(state = {},action){
  switch(action.type){
    case ACT.RECEIVE_DECK:
      console.log('receive deck')
      const deckList = JSON.parse(action.deckList)
      return {...state,...deckList}
    case ACT.ADD_DECK:
      console.log('add deck')
      return {...state,...action.deck}
    default:
      return state
  }
}

