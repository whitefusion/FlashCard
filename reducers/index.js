import * as ACT from "../actions"

export default function deck(state = {},action){
  console.log(action.type)
  switch(action.type){
    case ACT.RECEIVE_DECK:
      const deckList = JSON.parse(action.deckList)
      return {...state,...deckList}
    case ACT.ADD_DECK:
      return {...state,...action.deck}
    case ACT.ADD_CARD:
      const card = action.card
      return {
        ...state,
        [card.parentId]:{
          ...state[card.parentId],
          numCards: state[card.parentId]['numCards']+1,
          cards: [...state[card.parentId]['cards'],card]
        }
      }
    default:
      return state
  }
}

