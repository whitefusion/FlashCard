import React, {Component} from 'react'
import {StyleSheet, View,Text, Dimensions,KeyboardAvoidingView,
      TextInput, TouchableOpacity, Platform} from 'react-native'
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
      const tempDeck = {}
      tempDeck[tempId] = {
        id:tempId,
        title: this.state.text,
        numCards: 0,
        cards: []
      }
      this.props.createDeck(tempDeck)
      .then((res)=>{
        this.props.navigation.navigate('DeckDetail',{id:tempId,title:this.state.text})
      })
      .then(()=>{this.setState({text: ""})})
    }
  }
  
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
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
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  deckContainer : {
    height: 0.1*height,
    alignItems: 'center',
    justifyContent: "flex-end",
    marginBottom: 0.07*height,
    marginTop: -0.2*height
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
    borderWidth: Platform.OS==="ios" ?  1 : 0,
    width: 0.8*width,
    borderRadius: 5
  },
  addBtnContainer: {
    alignItems: 'center',
    marginTop: 0.05*height
  },
  addBtn: {
    width: 160,
    height: 35,
    borderRadius:5,
    backgroundColor: palette.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: 'white'
  }
})

export default connect((state)=>({deckList:state}),{createDeck})(NewDeck)