import React, {Component} from 'react'
import {TextInput, View,StyleSheet, KeyboardAvoidingView,
        TouchableOpacity, Text,Dimensions} from 'react-native'
import TextButton from './TextButton'
import {connect} from 'react-redux'
import {generateId} from '../utility/utility.js'
import {createCard} from '../actions'
import * as palette from '../utility/color'

const {width,height} = Dimensions.get('window')

class AddCard extends Component {
  parentId = this.props.navigation.state.params.id

  state={
    q:"",
    a:""
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    if(this.state.q && this.state.a) {
      const id = generateId()
      const tempCard = {
        q: this.state.q,
        answer: this.state.a,
        parentId: this.parentId,
        id
      }
      this.props.createCard(tempCard)
      this.setState({q:'',a:''})
    }
  }

  render() {
    const title = this.props.navigation.state.params.title
    return (
      <View style={styles.window}>
       <KeyboardAvoidingView behavior="padding" style={styles.avoidView}>
        <View style={styles.createCardContainer}>
          <Text style={styles.createCardTitle}>Add a card to {title}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputType}>
            <Text>Question:</Text>
          </View>
          <TextInput
          value={this.state.q}
          style={styles.input}
          onChangeText={(text)=>{this.setState({q:text})}}/>
          <View style={styles.inputType}>
            <Text>Answer:</Text>
          </View>
          <TextInput
          value={this.state.a}
          style={styles.input}
          onChangeText={(text)=>{this.setState({a:text})}}/>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.handleSubmit} style={styles.submitBtn}>
            <Text style={styles.btnText}> Submit </Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
const styles= StyleSheet.create({
  window: {
    backgroundColor: 'white',
    height: height,
    width: width,
  },
  inputContainer:{
    alignItems: 'center'
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
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
    height: 0.1*height,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: "flex-end",
    marginTop: 0.03*height,
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
  avoidView: {  
    paddingBottom: 200
  }
})

export default connect((state)=>({deckList:state}),{createCard})(AddCard)