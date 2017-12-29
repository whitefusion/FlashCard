import React,{Component} from 'react'
import {Text, View, StyleSheet,FlatList} from 'react-native'
import {connect} from 'react-redux'
import {getDeck} from '../actions'

class DeckList extends Component {
  componentDidMount(){
    this.props.getDeck()
  }

  render() {
    console.log(this.props.deck)
    return (
      <View>
        <FlatList 
        data={Object.values(this.props.deck)}
        renderItem={({item})=><Text>{JSON.stringify(item)}</Text>}
        />
      </View>
    )
  }
} 

export default connect((deck)=>({deck}),{getDeck})(DeckList)