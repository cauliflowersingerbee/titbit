import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class CustomActions extends React.Component {

//Uploading image to Firestore
uploadImage = async (uri) => {
    //turning image into blob
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

//defining array of strings to be displayed in action sheet
onActionPress = () => {
   const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
   const cancelButtonIndex = options.length - 1;
   //react's context class used to pass data through component
   //tree without having to pass props manually
   this.context.actionSheet().showActionSheetWithOptions(
     {
       options,
       cancelButtonIndex,
     },
     async (buttonIndex) => {
       switch (buttonIndex) {
         case 0:
           console.log('user wants to pick an image');
           return;
         case 1:
           console.log('user wants to take a photo');
           return;
         case 2:
           console.log('user wants to get their location');
         default:
       }
     },
   );
 };


render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let’s you choose to send an image or your geolocation."
        style={[styles.container]}
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
   };

const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
   });
