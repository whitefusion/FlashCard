import React, {Component} from 'react'
import {View , Text, Dimensions,
        StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import TextButton from './TextButton'
import {Entypo, MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'
import {setLocalNotification, clearLocalNotification} from '../utility/utility'
import * as palette from '../utility/color'

const {height,width} = Dimensions.get('window')

class Quiz extends Component {
  id = this.props.navigation.state.params.id  

  state={
    curr: 0,
    showAnswer: false,
    score: 0,
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
      <View style={styles.window}>
        {
          this.state.curr < nCards ?
          (
            <View style={styles.container}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.headText}>Question </Text>
                  <Text style={styles.headText}> {this.state.curr+1} / {nCards} </Text>
                </View>
                <View>
                <TouchableOpacity onPress={this.toggleAnswer}> 
                    <MaterialCommunityIcons name={ this.state.showAnswer ? "lightbulb-on" : "lightbulb-on-outline"} size={30} color={palette.yellow} />
                </TouchableOpacity>
                </View>
              </View>
              <View style={styles.qContainer}>
                {
                  this.state.showAnswer ?
                  (<Text style={styles.aText}>{qList[this.state.curr]['answer']}</Text>)
                  : (<Text style={styles.qText}>{qList[this.state.curr]['q']}</Text>)
                }
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>{
                  this.setState({curr:this.state.curr+1,score:this.state.score+1})
                  }} style={styles.btn}>
                  <MaterialIcons name='check-circle' size={60} color={palette.green}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  this.setState({curr:this.state.curr+1})
                  }} sytle={styles.btn}>
                  <MaterialIcons name='cancel' size={60} color={palette.red}/>
                </TouchableOpacity>
              </View>
            </View>
          )
          : (
            <View style={styles.container}>
              <View style={styles.textContainer}>
              <Text style={styles.endTxt}>This is the end of this quiz</Text>
              <View style={styles.scoreBox }>
              <Text style={styles.scoreTxt}>Your score : {this.state.score} / {nCards}</Text>
              </View>
              </View>
              <View style={styles.endBtnContainer}>
              <TouchableOpacity style={styles.endBtn} onPress={()=>{this.setState({curr:0,score:0})}}>
                <View style={styles.inBtn}>
                <MaterialIcons name="replay" color={palette.blue} size={20} />
                <Text style={styles.endBtnTxt}>Restart Quiz</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.endBtn} onPress={()=>this.props.navigation.navigate('DeckDetail', {id:this.id,title:this.props.deckList[this.id].title})}>
                <View style={styles.inBtn}>
                <MaterialIcons name="menu" size={20} color={palette.blue} />
                <Text style={styles.endBtnTxt}>Back to {this.props.deckList[this.id].title}</Text>
                </View>
              </TouchableOpacity>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  window: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5f8ff',
    flex: 1,
  },
  container : {
    alignItems: 'center',
    width: 0.8*width,
    height: 0.75*height,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop:-10,
    shadowColor:'black',
    shadowRadius: 3,
    shadowOffset: {width: 0,height:0 },
    shadowOpacity: 0.4,

  },
  header: {
    flexDirection: 'row',
    width: 0.8*width,
    justifyContent: 'space-between',
    padding: 15,
    height: 0.1*height
  },
  headText : {
    fontSize: 14,
    fontWeight: '600'
  },
  qContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.7*width,
    height: 0.5*height,
  },
  qText: {
    fontSize: 24,
    fontWeight: '600'
  },
  aText: {
    fontSize: 18,
    fontWeight: '600'
  },
  btnContainer : {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 0.8*width,
  },
  textContainer :{
    alignItems: 'center',
    marginTop: 0.15*height,
  },
  endBtnContainer : {
    marginTop: 0.2*height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  endBtn: {
    width: 200,
    height: 32,
    borderColor: palette.blue,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  endBtnTxt: {
    fontSize: 14,
    color: palette.blue,
    padding: 3
  },
  scoreBox: {
    marginTop: 0.05*height,
  },
  endTxt : {
    fontSize: 18,
    fontWeight: '400',
  },
  scoreTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: palette.orange
  },
  inBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default connect((state)=>({deckList:state}))(Quiz)

