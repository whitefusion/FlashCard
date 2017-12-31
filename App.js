import React from 'react';
import { StyleSheet, Text, View, 
        StatusBar, Platform} from 'react-native';
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import deck from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Constants} from 'expo'
import NewDeck from './components/NewDeck'
import { TabNavigator,StackNavigator } from 'react-navigation'
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import AddCard from './components/AddCard'
import {Quiz} from './components/Quiz'

function HeadBar({...props}){
  return (
    <View style={{height:Constants.statusBarHeight}}>
      <StatusBar {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
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
  },
},  {
  navigationOptions: {
    header: null
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  AddCard :{
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
})

export default class App extends React.Component {
  render() {
    const store = createStore(deck,composeWithDevTools(applyMiddleware(thunk)))
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <HeadBar barStyle="default"/>
          <MainNavigator />
          {/* <Tabs /> */}
        </View>
      </Provider>
    );
  }
}


