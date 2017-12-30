import React, {Component} from 'react'
import {StyleSheet, View,Text, Dimensions,
      TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {createDeck} from '../actions'
import {generateDeckId} from '../utility/utility.js'
import * as palette from '../utility/color'

let {height, width} = Dimensions.get('window')

class NewDeck extends Component {
  state = {
    text: ""
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const tempId = generateDeckId()
    const tempDeck = {}
    tempDeck[tempId] = {
      id:tempId,
      title: this.state.text,
      numCards: 0,
      cards: []
    }
    this.props.createDeck(tempDeck)
    this.setState({text: ""})
  }
  
  render() {
    return (
      <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
      <TextInput
       style={styles.input}
       value={this.state.text}
       onChangeText={(text)=>{this.setState({text})}}/>
       </View>
      <TouchableOpacity
       style={styles.addBtn}
       onPress={this.handleSubmit}>
        <View>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    width: 0.8*width,
    borderRadius: 10
  },
  addBtn: {
    width: 80,
    height: 20,
    paddingHorizontal: 10,
    backgroundColor: palette.green,
    marginTop: 10,
    marginLeft: 20,
    alignItems: 'center',
  }
})

export default connect((state)=>({deckList:state}),{createDeck})(NewDeck)