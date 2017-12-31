import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import TextButton from './TextButton'

export default DeckDetail = (props) => {
  const id = props.navigation.state.params.id
  const title = props.navigation.state.params.title
  return (
    <View>
      <Text> {title} </Text>
      <TextButton onPress={()=>props.navigation.navigate('Quiz', {id})}>
        Start a quiz !
      </TextButton>
      <TextButton onPress={()=>props.navigation.navigate('AddCard',{title,id})}>
        Create a new question
      </TextButton>
    </View>
  )
}