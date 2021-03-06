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
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import {setLocalNotification} from './utility/utility'
import * as palette from './utility/color'

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
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' color={tintColor} size={25}/>
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions : {
      tabBarLabel: "Add",
      tabBarIcon: ({tintColor}) => <MaterialIcons name='add-circle-outline' color={tintColor} size={25}/>
    }
  },
},  {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? palette.blue : 'white',
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({navigation,header}) => ({
      header: Platform.OS === 'ios' ? header : null,
      headerStyle: {
        marginTop: -20
      },
      headerTitle: `${navigation.state.params.title}` ,
    })
  },
  AddCard :{
    screen: AddCard,
    navigationOptions: ({header}) => ({
      headerStyle: {
        marginTop: -20
      },
      header: Platform.OS === 'ios' ? header : null,
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions:({header}) => ({
      headerStyle: {
        marginTop: -20
      },
      header: Platform.OS === 'ios' ? header : null,
    })
  }
},{
  headerMode: 'float',
  cardStyle: {
    paddingTop: 0,
    marginTop: 0,
  },
  navigationOptions: {
    paddingTop: 0,
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    const store = createStore(deck,composeWithDevTools(applyMiddleware(thunk)))
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <HeadBar barStyle="default"/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}


