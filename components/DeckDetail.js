import React,{Component} from 'react'
import {View,Text,TouchableOpacity, TouchableHighlight,
        SectionList,Platform, Separator,FlatList} from 'react-native'
import TextButton from './TextButton'
import {connect} from 'react-redux'
import {deleteCard} from '../actions'
import Swipeout from 'react-native-swipeout'
import {Entypo} from '@expo/vector-icons'

class DeckDetail extends Component {
  render(){
    let deck = this.props.deckList[this.props.navigation.state.params.id]
    let {title,numCards,cards,id} = deck
    const _keyExtractor = (item,index) => (item.id)
    let swipeBtns = [{
      text:'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { }
    }]
    return (
      <View>
        <Text> {title} </Text>
        <Text> {numCards} cards </Text>
        {
          numCards ? 
          <TextButton onPress={()=>this.props.navigation.navigate('Quiz', {id})}>
          Start a quiz !
          </TextButton> :
          <Text> This deck contains no cards, add one first ! </Text>
        }
  
        <TextButton onPress={()=>this.props.navigation.navigate('AddCard',{title,id})}>
          Create a new card 
        </TextButton>
        <FlatList 
        data={cards}
        keyExtractor={_keyExtractor}
        renderItem={
          ({item,index}) => 
          (
            <View>
              <Text>{index+1}. {item.q}</Text>
              <TouchableHighlight onPress={()=>{this.props.deleteCard(item.parentId,item.id)}}>
                <Entypo name='circle-with-minus' size={20} color='gray'></Entypo>
              </TouchableHighlight>
            </View>
          )
        }
        />
      </View>
    )
  }
}

export default connect((state)=>({deckList:state}),{deleteCard})(DeckDetail)