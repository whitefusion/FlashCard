import React, {Component} from 'react'
import {StyleSheet, View,Text, Dimensions,
      TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {createDeck} from '../actions'
import {generateId} from '../utility/utility'
import * as palette from '../utility/color'

let {height, width} = Dimensions.get('window')

class NewDeck extends Component {
  state = {
    text: ""
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    if(this.state.text){
      const tempId = generateId()
      console.log(tempId)
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
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.deckContainer}>
          <Text style={styles.newDeckTitle}>Create a new deck</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.deckTitleContainer}>
          <Text style={styles.deckTitle}> Deck Title: </Text>
          </View>
          <TextInput
          style={styles.input}
          value={this.state.text}
          onChangeText={(text)=>{this.setState({text})}}/>
        </View>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity
          onPress={this.handleSubmit}>
            <View style={styles.addBtn}>
              <Text style={styles.btnText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  deckContainer : {
    height: 0.1*height,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: "flex-end",
    marginTop: 0.1*height,
    marginBottom: 0.07*height
  },
  newDeckTitle :{
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent:'center'
  },
  deckTitleContainer: {
    width: width,
    marginBottom: 5
  },
  deckTitle: {
    fontSize: 12,
    color: '#777777',
    fontWeight: '800',
    marginLeft: 0.1*width
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    width: 0.8*width,
    borderRadius: 5
  },
  addBtnContainer: {
    alignItems: 'center',
    marginTop: 0.05*height
  },
  addBtn: {
    width: 200,
    height: 40,
    borderRadius:5,
    backgroundColor: palette.blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 20,
    color: 'white'
  }
})

export default connect((state)=>({deckList:state}),{createDeck})(NewDeck)