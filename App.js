import React, { Component } from 'react';
import Chat from './components/Chat';
import Start from './components/Start';
// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Alert, Text, TextInput, View, Button, ScrollView } from 'react-native';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  render() {
  return (
    <NavigationContainer>
    <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

}
