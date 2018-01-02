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
    case ACT.REMOVE_CARD:
      const parentId = action.parentId
      const id = action.id
      const targetCards = state[parentId]['cards']
      let targetIndex = 0
      targetCards.forEach((item,index) => {
          if(item.id === id){
            targetIndex = index
          }
      })
      const newCards = [...targetCards.slice(0,targetIndex), 
                        ...targetCards.slice(targetIndex+1)]
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          numCards: state[parentId]['numCards']-1,
          cards: newCards
        }
      }
    case ACT.REMOVE_DECK:
      const tempState = {...state}
      tempState[action.id] = undefined
      delete tempState[action.id]
      return tempState
    default:
      return state
  }
}

