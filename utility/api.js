import {AsyncStorage} from "react-native"
import {FLASHCARD_STORAGE_KEY, setResult} from "./_flashcard"

export const fetchDeck = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
  .then((res)=>setResult(res))
}

export const insertDeck = (deck) => {
  return (deck) ? 
        AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,JSON.stringify(deck)) 
        : AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
}

export const fetchDeckById = (id) => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
  .then((res)=>{
    const data = JSON.parse(res)
    return data[id]
  })
}

export const insertCard = (card) => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
         .then((res)=>{
           const data = JSON.parse(res)
           const newData = {
             ...data,
             [card.parentId]:{
               ...data[card.parentId],
               numCards: data[card.parentId]['numCards']+1,
               cards: [...data[card.parentId]['cards'],card]
             }
           }
           AsyncStorage.setItem(FLASHCARD_STORAGE_KEY,JSON.stringify(newData))
         })
}

export const removeCard = (parentId,id) => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
         .then((res)=> {
           const data = JSON.parse(res)
           const targetCards = data[parentId]['cards']
           let targetIndex = 0
           targetDeck.forEach((item,index) => {
                if(item.id === id){
                  targetIndex = index
                  break
                }
           })
           const newCards = [...targetCards.slice(0,targetIndex), 
                             ...targetCards.slice(targetIndex+1)]
           const newDeckList = {
             ...data,
             [parentId]: {
               ...data[parentId],
               cards: newCards
             }
           }

           AsyncStorage.setItem(FLASHCARD_STORAGE_KEY,JSON.stringify(newDeckList))
         })
}