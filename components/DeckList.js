import React,{Component} from 'react'
import {Dimensions,Text, View, StyleSheet,
        FlatList,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {getDeck} from '../actions'
import * as palette from '../utility/color'
let {height, width} = Dimensions.get('window')

class DeckList extends Component {
  componentDidMount(){
    this.props.getDeck()
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    console.log(this.props.deck)
    return (
      <View>
        <View style={styles.headerContainer}>
        <Text style={styles.header}> Deck List </Text>
        </View>
        <View style={styles.deckList}>
        <FlatList 
        data={Object.values(this.props.deck)}
        keyExtractor={this._keyExtractor}
        renderItem={({item})=>(
          <View style={styles.deckItem}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('DeckDetail',{id:item.id,title:item.title})}>
              <Text style={styles.deckTitle}>{item.title}</Text>
              <Text style={styles.deckText}> {item.numCards} {item.numCards > 1 ? 'questions' : 'question'} </Text>
            </TouchableOpacity>
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
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: "flex-end"
  },
  header:{
    fontSize: 30,
    fontWeight: 'bold',
  },
  deckList : {
    marginTop: 20,
    alignItems: 'center'
  },
  deckItem : {
    height: 0.1*height,
    width: 0.8*width,
    marginBottom:20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: palette.teal_blue,
  },
  deckTitle : {
    color: 'white',
    fontSize: 20,
    fontWeight: '800'
  },
  deckText: {
    fontWeight: '600',
    color: 'white'
  }
})

export default connect((deck)=>({deck}),{getDeck})(DeckList)