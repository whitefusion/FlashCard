import React, {Component} from 'react'
import {TextInput, View, TouchableOpacity, Text} from 'react-native'

class AddCard extends Component {
  render() {
    const title = this.props.navigation.state.params.title
    return (<Text>Add a new card to {title}</Text>)
  }
}

export default AddCard