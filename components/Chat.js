import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text } from 'react-native';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };


  render() {
    //let name = this.props.route.params.name; // OR ...
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    let {bgcolor} = this.props.route.params;
return (
  <View>
    <View style={{
      flex: 1,
      alignItems:'center', 
      justifyContent:'center', 
      backgroundColor: bgcolor ? bgcolor : "#fff"}}>

          <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          }}
      />    
  </View>

  </View>


)
    

  };
}
