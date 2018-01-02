import React,{Component} from 'react'
import {View,Text,TouchableOpacity, TouchableHighlight, Alert,
        StyleSheet,Platform, Separator,FlatList,Dimensions} from 'react-native'
import TextButton from './TextButton'
import {connect} from 'react-redux'
import {deleteCard} from '../actions'
import Swipeout from 'react-native-swipeout'
import {Entypo,Feather} from '@expo/vector-icons'
import * as palette from '../utility/color'

const {width,height}  = Dimensions.get('window')

class DeckDetail extends Component {

  state = {
    deleteBtn: false
  }

  toggleDeleteBtn = () => {
    this.setState({deleteBtn: !this.state.deleteBtn})
  }

  handleQuizStart = (id,numCards) => {
    console.log(numCards, id)
    if(numCards){
      this.props.navigation.navigate('Quiz', {id})
    } else {
      Alert.alert("No card",
                  "Please add a card first.",
                  [{text:'Ok',onPress: () => console.log('Cancel Pressed'), style: 'cancel'}],
                  { cancelable: true })
    }
  }

  render(){
    let deck = this.props.deckList[this.props.navigation.state.params.id]
    let {title,numCards,cards,id} = deck
    const _keyExtractor = (item,index) => (item.id)
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.headerContainer}>
          <View style={styles.deckTextContainer}>
            <Text style={styles.deckName}>{title} </Text>
            <Text style={styles.cardNum}> {numCards} cards </Text>
          </View>
          <View style={styles.trashContainer}>
            <TouchableOpacity onPress={this.toggleDeleteBtn}>
              <Entypo name="trash" color={palette.blue} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
          
          <TouchableOpacity onPress={this.handleQuizStart.bind(this,id,numCards)}
            style={styles.btn}>
            <View style={styles.inBtn}>
              <Entypo name='controller-play' size={15} color={palette.blue} />
              <Text style={styles.inBtnText}>Start a quiz</Text>
            </View>
          </TouchableOpacity> 
          
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddCard',{title,id})}
           style={styles.btn}>
            <View style={styles.inBtn}>
              <Entypo name="documents" size={15} color={palette.blue} />
              <Text style={styles.inBtnText}>Add a card </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList 
          data={cards}
          keyExtractor={_keyExtractor}
          extraData={this.state}
          renderItem={ ({item,index}) => (
                <View style={styles.qListContainer}>
                  <Text>{index+1}. {item.q}</Text>
                  <View>
                  {this.state.deleteBtn?
                    (<View>
                      <TouchableOpacity onPress={()=>{this.props.deleteCard(item.parentId,item.id)}}>
                        <Entypo name='circle-with-minus' size={20} color='red'></Entypo>
                      </TouchableOpacity>
                    </View>)
                    :(<View></View>)
                  }
                  </View>
                </View>
              )
          }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    marginBottom: 15
  },
  qListContainer: {
    flexDirection: 'row',
    height: 40
  },
  deckTextContainer: {
    marginLeft: 10,
    marginBottom: 15
  },
  trashContainer: {
    marginTop: 0.03*height,
    marginRight: 15
  },
  deckName:{
    fontSize: 30,
    fontWeight: '700'
  },
  cardNum:{
    fontSize: 15,
    fontWeight: '300'
  },
  btnContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inBtn:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    borderRadius: 5,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 135,
    height: 30,
    backgroundColor: '#e3edfc'
  },
  inBtnText :{
    color: palette.blue,
    marginLeft: 10
  }
})

export default connect((state)=>({deckList:state}),{deleteCard})(DeckDetail)