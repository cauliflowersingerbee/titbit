import React from "react";
import firebase from "firebase";
import "firebase/firestore";
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';



export default class CustomActions extends React.Component {
    

//taking photo
takePhoto = async () => {
    // permission to access user camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    try {
    //accessing camera
      if (status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
        }).catch((error) => {
          console.error(error);
        });
        if (!result.cancelled) {
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

//choosing photo from library
pickImage = async () => {
    //asking user permission to access gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    try {
        if (status === "granted") {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
          }).catch((error) => {
            console.error(error);
          });
          if (!result.cancelled) {
            const imageUrl = await this.uploadImage(result.uri);
            this.props.onSend({ image: imageUrl });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  

//Uploading image to Firestore
uploadImage = async (uri) => {
    //turning file into blob
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
    //creating reference to storage
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    //using put to store content retrieved from Ajax request
    const snapshot = await ref.put(blob);
    //closing the connection
    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  //accessing and sending user location
  getLocation = async () => {
    //first get permission from user
    const { status } = await Location.requestForegroundPermissionsAsync();
    try {
    if(status === 'granted') {
      let result = await Location.getCurrentPositionAsync({}).catch(
        (error) => {
          console.error(error);
        });
 
      if (result) {
        this.props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
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
        accessibilityHint="Lets you choose to send an image or your geolocation."
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

//creating proptype for context
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
