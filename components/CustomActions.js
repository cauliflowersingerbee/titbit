import React from "react";

export default class CustomActions extends React.Component {

//defining array of strings to be displayed in action sheet
onActionPress = () => {
   const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
   const cancelButtonIndex = options.length - 1;
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
