import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/DeckList'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import deck from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Constants} from 'expo'
import NewDeck from './components/NewDeck'

function HeadBar({...props}){
  return (
    <View style={{height:Constants.statusBarHeight}}>
      <StatusBar {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  render() {
    const store = createStore(deck,composeWithDevTools(applyMiddleware(thunk)))
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          {/* <HeadBar barStyle="default"/> */}
          <NewDeck />
          <DeckList />
        </View>
      </Provider>
    );
  }
}


