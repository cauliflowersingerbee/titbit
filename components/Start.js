import React from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
      }

  render() {
    return (
        <View style={styles.container}>
          <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Your Name'        
          />
          <Text>Choose Background Color</Text>
          <Button
            title="Start Chatting"
            onPress={() => this.props.navigation.navigate('Chat')}
          />
        </View>
      )
   }
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
    },
 });
