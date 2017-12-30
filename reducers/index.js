import * as ACT from "../actions"

export default function deck(state = {},action){
  switch(action.type){
    case ACT.RECEIVE_DECK:
      console.log(action.deckList)
      const deckList = JSON.parse(action.deckList)

      return {...state,...deckList}
    case ACT.ADD_DECK:
      return {...state,...deckList}
    default:
      return state
  }
}

