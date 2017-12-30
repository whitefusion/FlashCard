import {AsyncStorage} from "react-native"
import {FLASHCARD_STORAGE_KEY, setResult} from "./_flashcard"

export const fetchDeck = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
  .then(setResult)
}

export const insertDeck = (deck) => {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,JSON.stringify(deck))
}

