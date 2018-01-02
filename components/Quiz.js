import React, {Component} from 'react'
import {View , Text, TouchableOpactiy,
        StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import TextButton from './TextButton'
import {Entypo} from '@expo/vector-icons'
import {setLocalNotification, clearLocalNotification} from '../utility/utility'

class Quiz extends Component {
  id = this.props.navigation.state.params.id  

  state={
    curr: 0,
    showAnswer: false,
    score: 0
  }

  toggleAnswer = (evt) => {
    evt.preventDefault()
    this.setState({showAnswer: !this.state.showAnswer})
  }

  render(){
    const _keyExtractor = (item, index) => item.id
    const qList = this.props.deckList[this.id]['cards']
    const nCards = this.props.deckList[this.id]['numCards']
    if(this.state.curr === nCards) {
      clearLocalNotification()
      .then(setLocalNotification())
    }
    return (
      <View>
        {
          this.state.curr < nCards ?
          (
            <View>
              <View>
                <Text> Question </Text>
                <Text>{this.state.curr+1} / {nCards} </Text>
              </View>
              <View>
                {
                  this.state.showAnswer ?
                  (<Text>{qList[this.state.curr]['answer']}</Text>)
                  : (<Text>{qList[this.state.curr]['q']}</Text>)
                }
              </View>
              <View>
                <TextButton onPress={this.toggleAnswer}> 
                {this.state.showAnswer ? 'Question' : 'Answer'} 
                </TextButton>
              </View>
              <View>
                <TextButton onPress={()=>{
                  this.setState({curr:this.state.curr+1,score:this.state.score+1})
                  }}>
                  <Entypo name='check' size={25}/>
                </TextButton>
                <TextButton onPress={()=>{
                  this.setState({curr:this.state.curr+1})
                  }}>
                  <Entypo name='cross' size={25}/>
                </TextButton>
              </View>
            </View>
          )
          : (
            <View>
              <Text>This is the end of quiz .</Text>
              <Text> Your score : {this.state.score} / {nCards} </Text>
              <TextButton onPress={()=>{this.setState({curr:0,score:0})}}>
                Restart Quiz
              </TextButton>
              <TextButton onPress={()=>this.props.navigation.navigate('DeckList')}>
                Back to Your Decks
              </TextButton>
            </View>
          )
        }
      </View>
    )
  }
}

export default connect((state)=>({deckList:state}))(Quiz)

