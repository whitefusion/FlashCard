import React,{Component} from 'react'
import {Dimensions,Text, View, StyleSheet,TouchableWithoutFeedback,
        FlatList,TouchableOpacity,Animated, TouchableHighlight, Platform} from 'react-native'
import {connect} from 'react-redux'
import {getDeck, deleteDeck} from '../actions'
import * as palette from '../utility/color'
import {Entypo,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons';

let {height, width} = Dimensions.get('window')

class DeckList extends Component {
  state = {
    deleteBtn: false
  }

  componentDidMount(){
    this.props.getDeck()
  }

  _keyExtractor = (item, index) => item.id;

  handlePress = (item) => {
    this.props.navigation.navigate('DeckDetail',{id:item.id,title:item.title})
  }

  toggleManage = () => {
    this.setState({deleteBtn: !this.state.deleteBtn})
  }

  render() {
    console.log(this.props.deck)
    return (
      <View >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Your Decks </Text>
          <TouchableWithoutFeedback onPress={this.toggleManage}>
            <View style={styles.manageContainer}>
              <Text style={styles.manage}> Manage </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.deckList}>
        <FlatList 
        data={Object.values(this.props.deck)}
        keyExtractor={this._keyExtractor}
        renderItem={({item})=>(
          <View style={styles.deckItem}>
            {this.state.deleteBtn?
              (
              <View style={styles.deleteBtnContainer}>
                <TouchableOpacity onPress={()=>{this.props.deleteDeck(item.id)}}>
                  <Entypo name="circle-with-minus" color='red' size={24}></Entypo>
                </TouchableOpacity>
              </View>
              )
              : (<View style={styles.deleteBtnContainer}></View>)
            }
            <View>
            <TouchableOpacity onPress={this.handlePress.bind(this,item)}>
              <View style={styles.itemContainer}>
                <View style={styles.deckTitleContainer}>
                  <Text style={styles.deckTitle}>{item.title} </Text>
                  <Text style={styles.deckText}>{item.numCards} {item.numCards > 1 ? 'cards' : 'card'} </Text>
                </View>
                <View style={styles.arrowContainer}>
                  {
                    Platform.OS === 'ios' ?
                    <SimpleLineIcons name="arrow-right" color={palette.blue} size={20}></SimpleLineIcons> :
                    <Ionicons name="md-arrow-forward" color={palette.blue} size={20} />
                  }
                  
                </View>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        )}
        />
        </View>
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  headerContainer: {
    height: 0.1*height,
    flexDirection: 'row',
    marginTop: 0.05*height,
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  manageContainer: {
    marginRight: 15,
    marginBottom: 6
  },
  manage:{
    color: palette.blue
  },
  header:{
    fontSize: 30,
    fontWeight: 'bold',
  },
  arrowContainer: {
    marginTop: 7,
    marginRight:-20
  },
  deleteBtnContainer: {
    alignItems: 'center',
    justifyContent:'center',
    width: 0.1*width
  },
  deckList : {
    marginTop: 20,
    backgroundColor: 'white'
  },
  deckItem : {
    flexDirection: 'row',
    width: width,
    padding: 0,
    borderBottomColor:'#c4c4c4',
    borderBottomWidth: 0.8,
    paddingVertical: 8,
  },
  itemContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 0.8*width
  },
  deckTitleContainer: {
  },
  deckTitle : {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  deckText: {
    fontWeight: '300',
    color: 'black'
  }
})

export default connect((deck)=>({deck}),{getDeck,deleteDeck})(DeckList)