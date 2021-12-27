import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
      }

  render() {
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Your Name'        
          />
          <Button
            title="Go to Chat"
            onPress={() => this.props.navigation.navigate('Chat')}
          />
        </View>
      )
}
}
