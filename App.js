import React, { Component } from 'react';
import Chat from './components/Chat';
import Start from './components/Start';
// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends Component {

  render() {
  return (
    <NavigationContainer>
    <Stack.Navigator
        initialRouteName="Titbit"
      >
        <Stack.Screen
          name="Titbit"
          component={Start}
          options={{ title: 'Let\'s get chatting!' }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

}
