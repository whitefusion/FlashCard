import React from 'react';
import { StyleSheet, Text, View, 
        StatusBar, Platform} from 'react-native';
import DeckList from './components/DeckList'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import deck from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Constants} from 'expo'
import NewDeck from './components/NewDeck'
import { TabNavigator } from 'react-navigation'
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

function HeadBar({...props}){
  return (
    <View style={{height:Constants.statusBarHeight}}>
      <StatusBar {...props}/>
    </View>
  )
}

const MainTabs = TabNavigator({
  DeckList : {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: <MaterialCommunityIcons name='cards-outline' size={25}/>
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions : {
      tabBarLabel: "Add",
      tabBarIcon: <MaterialIcons name='add-circle-outline' size={25}/>
    }
  }
})

export default class App extends React.Component {
  render() {
    const store = createStore(deck,composeWithDevTools(applyMiddleware(thunk)))
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <HeadBar barStyle="default"/>
          <MainTabs />
          {/* <NewDeck /> */}
          {/* <DeckList /> */}
        </View>
      </Provider>
    );
  }
}


