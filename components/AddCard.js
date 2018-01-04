import React, {Component} from 'react'
import {TextInput, View,StyleSheet, KeyboardAvoidingView,
        TouchableOpacity, Text,Dimensions,Platform} from 'react-native'
import TextButton from './TextButton'
import {connect} from 'react-redux'
import {generateId} from '../utility/utility.js'
import {createCard} from '../actions'
import * as palette from '../utility/color'

const {width,height} = Dimensions.get('window')

class AddCard extends Component {
  parentId = this.props.navigation.state.params.id

  state={
    question:"",
    answer:""
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    if(this.state.question && this.state.answer) {
      const id = generateId()
      const tempCard = {
        q: this.state.question,
        answer: this.state.answer,
        parentId: this.parentId,
        id
      }
      this.props.createCard(tempCard)
      this.props.navigation.goBack()
      this.setState({question:'',answer:''})
    }
  }

  render() {
    const title = this.props.navigation.state.params.title

    return (
       <KeyboardAvoidingView behavior="padding" style={styles.window}>
        <View style={styles.createCardContainer}>
          <Text style={styles.createCardTitle}>Add a card to {title}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputType}>
            <Text>Question:</Text>
          </View>
          <TextInput
          value={this.state.question}
          style={styles.input}
          onChangeText={(text)=>{this.setState({question:text})}}/>
          <View style={styles.inputType}>
            <Text>Answer:</Text>
          </View>
          <TextInput
          value={this.state.answer}
          style={styles.input}
          onChangeText={(text)=>{this.setState({answer:text})}}/>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.handleSubmit} style={styles.submitBtn}>
            <Text style={styles.btnText}> Submit </Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
  }
}
const styles= StyleSheet.create({
  window: {
    backgroundColor: 'white',
    flex: 1
  },
  inputContainer:{
    alignItems: 'center'
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: Platform.OS==="ios" ?  1 : 0,
    width: 0.8*width,
    borderRadius: 3,
    alignItems: 'center',
    marginBottom: 15
  },  
  inputType: {
    marginLeft: -0.64*width,
    marginVertical: 5
  },
  createCardContainer : {
    // height: 0.1*height,
    // marginBottom: 10,
    alignItems: 'center',
    justifyContent: "flex-end",
    marginTop: 0.1*height,
    marginBottom: 0.05*height
  },
  createCardTitle :{
    fontSize: 30,
    fontWeight: 'bold',
  },
  submitBtn: {
    width: 150,
    backgroundColor: palette.blue,
    borderRadius:3,
    alignItems: 'center',
    paddingVertical: 8
  },
  btnText: {
    color:'white',
    fontSize: 16
  },
  btnContainer: {
    alignItems:'center',
    marginTop: 15
  },
})

export default connect((state)=>({deckList:state}),{createCard})(AddCard)