import React, {Component} from 'react'
import {StyleSheet, View,Text,
      TextInput,} from 'react-native'
import {connect} from 'react-redux'
import {createDeck} from '../actions'
import {generateDeckId} from '../utility/utility.js'

class NewDeck extends Component {
  state = {
    currText: ""
  }

  handleInput = (evt) => {
    const v = evt.target.value
    this.setState({currText:v})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const tempDeck = {
      title: this.state.currText,
      id: generateDeckId(),
      Cards: [],
      numCards : 0
    }
    this.props.createDeck(tempDeck)
  }
  
  render() {
    return (
      <View>
      <Text> This is add deck view </Text>
      <TextInput
       style={{height: 40, borderColor: 'gray', borderWidth: 1}}
       value={this.state.currText}
       onChangeText={this.handleInput}/>
      </View>
    )
  }
}

export default connect((state)=>({deckList:state}),{createDeck})(NewDeck)