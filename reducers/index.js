import * as ACT from "../actions"

export default function deck(state = {},action){
  switch(action.type){
    case ACT.RECEIVE_DECK:
      const deckList = JSON.parse(action.deckList)
      return {...state,...deckList}
    default:
      return state
  }
}

