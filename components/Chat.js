import React, { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
//importing firebase:
import * as firebase from 'firebase';
import "firebase/firestore";
//const firebase = require('firebase');
//require('firebase/firestore');

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
      uid: 0,
      user: {
         _id: "",
        name: "",
        avatar: "",
        },
    };
  //initializing firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }

  // referencing Firestore message collection
  this.referenceChatMessages = firebase.firestore().collection("messages");

  };

  componentDidMount() {

    //adding name to top of chat screen
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    //signing in anonymously
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }         
    //updating user state with currently active user data
    this.setState({
      uid: user.uid,
      loggedInText: 'Hello there',
      messages: [],
      user: {
        _id: user.uid,
        name: name,
        avatar: "https://placeimg.com/140/140/any",
       },
    });

   // listening to updates in the collection
   this.unsubscribe = this.referenceChatMessages
   .orderBy("createdAt", "desc")
   .onSnapshot(this.onCollectionUpdate);
    //referencing current user
    this.referenceChatMessagesUser = firebase.firestore().collection("messages").where("uid", "==", this.state.uid);

  
    //this.unsubscribeChatMessageUser = this.referenceChatMessagesUser.onSnapshot(this.onCollectionUpdate);
   });
  };
  


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
addMessages() { 
  const message = this.state.messages[0];
  // add a new messages to the collection
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
      this.addMessages();
    })
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
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: this.state.name,
          }}
      />    
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




