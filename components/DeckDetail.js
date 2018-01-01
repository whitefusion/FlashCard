import React,{Component} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import TextButton from './TextButton'
import {connect} from 'react-redux'

class DeckDetail extends Component {
  render(){
    console.log(this.props.navigation.state.params.id)
    let deck = this.props.deckList[this.props.navigation.state.params.id]
    console.log(deck)
    let {title,numCards,cards,id} = deck
    return (
      <View>
        <Text> {title} </Text>
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
      </View>
    )
  }
}

export default connect((state)=>({deckList:state}))(DeckDetail)