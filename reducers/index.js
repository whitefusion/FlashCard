import * as ACT from "../actions"

export default function deck(state = {},action){
  console.log(action.type)
  const card = action.card
  const parentId = action.parentId
  const id = action.id
  const tempState = {...state}
  switch(action.type){
    case ACT.RECEIVE_DECK:
      const deckList = JSON.parse(action.deckList)
      return {...state,...deckList}
    case ACT.ADD_DECK:
      return {...state,...action.deck}
    case ACT.REMOVE_DECK:
      tempState[action.id] = undefined
      delete tempState[action.id]
      return tempState
    case ACT.ADD_CARD:
      return {
        ...state,
        [card.parentId]:{
          ...state[card.parentId],
          numCards: state[card.parentId]['numCards']+1,
          cards: [...state[card.parentId]['cards'],card]
        }
      }
    case ACT.REMOVE_CARD:
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
    default:
      return state
  }
}

