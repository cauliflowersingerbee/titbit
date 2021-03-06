import React, { Component } from 'react';
import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat'
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from 'react-native';
//importing firebase:
import * as firebase from 'firebase';
import "firebase/firestore";
//importing asyncStorage:
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';


//configuring firebase:
const firebaseConfig = {
  apiKey: "AIzaSyD8TKk1420b4YNd6hB8e4oiz1ATXlad784",
  authDomain: "titbit-753a6.firebaseapp.com",
  projectId: "titbit-753a6",
  storageBucket: "titbit-753a6.appspot.com",
  messagingSenderId: "29843296666",
  appId: "1:29843296666:web:1ecc30389947f4740a2a23"
};


export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      loggedInText: "",
      uid: 0,
      user: {
      _id: "",
      name: "",
      avatar: "",
      },
      isConnected: false,
    };
  //initializing firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }

  // referencing Firestore message collection
  this.referenceChatMessages = firebase.firestore().collection("messages");
  this.referenceChatMessagesUser = null;
  };

  // saving message to AsyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages', 
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
    console.log(error.message);
    }
  }

  // deleting message from AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  //reading messages from async storage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };


  componentDidMount() {

    //adding name to top of chat screen
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // checking if user is online 
    NetInfo.fetch().then(connection => {
      //Checking if user is online
      if (connection.isConnected) {
        this.setState({ isConnected: true });

         // listens for updates in the collection
         this.unsubscribe = this.referenceChatMessages
         .orderBy("createdAt", "desc")
         .onSnapshot(this.onCollectionUpdate)

        // anonymous authentication of user
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          //(using try catch block to fix 'possible unhandled promise 
          //rejection' error)
          if (!user) {
            //await firebase.auth().signInAnonymously();
            try {
                let response = await firebase.auth().signInAnonymously()
                user = response.user
            } catch (error) {
                console.error(error)
            }
        }
          //updating user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any",
            },
          });
          //referencing current user
          this.referenceChatMessagesUser = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);
        });
         //saving messages locally to asyncStorage
         this.saveMessages();
      } else {
        this.setState({ isConnected: false });
        //getting messages from asyncStorage
        this.getMessages();
      }
    });

  }


  //function to listen for changes in collection and retrieve that change in order to update state and render in view
onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    let data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
      },
    });
  });
  this.setState({
    messages: messages
  });
  
};

componentWillUnmount() {
  this.unsubscribe();
  this.authUnsubscribe();
};


//Adding messages to database
addMessage() { 
  const message = this.state.messages[0];
  // add new messages to collection
  this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      uid: this.state.uid,
  });
}

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.saveMessages();
      this.addMessage();
    });
  }

  renderBubble(props) {
    //adding color to text bubbles
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#F9564F'
          },
          left: {
						backgroundColor: '#F3C677',
					},
        }}
      />
    )
  }

  // renders  chat input field toolbar only when user is online
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }
  

  render() {

    //rendering color picked by user
    let {bgColor} = this.props.route.params;
  

return (
  <View style={{
      flex: 1,
      alignItems:'center', 
      justifyContent:'center', 
      backgroundColor: bgColor ? bgColor : "#fff"}}>
  
    <View style={styles.giftedChat}>
          <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.user._id,
          name: this.state.name,
          avatar: this.state.user.avatar
          }}
      />    
        <Text>{this.state.loggedInText}</Text>
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
  </View>

</View>
)}}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems:'center', 
      justifyContent:'center'
  },
  giftedChat: {
      flex: 1,
      width: "88%",
      borderRadius: 5,
      paddingBottom: 10,
      justifyContent: "center",
  },
})




