import {AsyncStorage} from "react-native"
export const FLASHCARD_STORAGE_KEY = "Happy New Year"

const data_static = {
  '6madl6jew3vvkjzxg8o9u2':{
    title:"C++ test",
    id: '6madl6jew3vvkjzxg8o9u2',
    numCards:5,
    cards: [
      {
        id:'vksms6aos7x6uj2wr9xdpl',
        parentId: '6madl6jew3vvkjzxg8o9u2',
        q: "What is the difference between array and list ?",
        answer: "Array is used when you want to access a single element. List is good if you only want to iterate."
      },
      {
        id:'2di84qlkggvsi5fca4vvrh',
        parentId: '6madl6jew3vvkjzxg8o9u2',
        q: "For element insert and remove, which one is faster? Array or List? ",
        answer: "List. Since we only need to change the pointer in the list for insert and remove.But in array, we might need expand array size for insertion; for remove, we might need to copy the whole array. "
      },
      {
        id:'32umvp6j4wr0pkw0paqkuo',
        parentId: '6madl6jew3vvkjzxg8o9u2',
        q: "What are the differences between overriding and overloading?",
        answer: "Overriding occurs when there is inheritance; function that are overloaded have different function signature; Overriden functions have different scope; Overloading is used to have same name functions which behave differently depending upon parameters passed to them."
      },
      {
        id:'tl4c81ny0p16l6piz1otui',
        parentId: '6madl6jew3vvkjzxg8o9u2',
        q: "What is a virtual function?",
        answer: "Virtual functions are functions that are resolved by the compiler, at run time, to the most derived version with the same signature."
      },
      {
        id:'ndd16kj4l0qbqicfzsg1ra',
        parentId: '6madl6jew3vvkjzxg8o9u2',
        q: "What is a pure virtual function?",
        answer: "A pure virtual function is a function with no implementation in the base class, making the base class abstract. Derived classes are forced to override the pure virtual function if they want to be instantiated."
      }
    ]
  },
  'l35inqgkxld83bcls63ucj':{
    title:"Dice",
    id: 'l35inqgkxld83bcls63ucj',
    numCards:1,
    cards: [
      {
        id:'0vjsz3zzf477hn0qso9owa',
        parentId: 'l35inqgkxld83bcls63ucj',
        q:"Pick an integer between 1 and 6, inclusive",
        answer: Math.ceil(Math.random()*6)
      },
    ]
  },
  '0ogpuxwq2e27mi68vutjjg' :{
    title: "Coin",
    id: "0ogpuxwq2e27mi68vutjjg",
    numCards:1,
    cards: [
        {
          id:'t4ci0vu8iq2guvbmnhk0ru',
          parentId: '0ogpuxwq2e27mi68vutjjg',
          q:"Selfie or Flower ?",
          answer: Math.floor(Math.random()*2) ? "Selfie" : "Flower"
        }
    ]
  }
}

const setDefault = () => {
  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY,JSON.stringify(data_static))
  return JSON.stringify(data_static)
}

export const setResult = (res) => {
  return res ? res : setDefault()
}