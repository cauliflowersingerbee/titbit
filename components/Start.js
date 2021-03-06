import React from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, Pressable, ImageBackground } from 'react-native';
import image from '../assets/titbit-assets/background-image.png' ;
import userIcon from '../assets/titbit-assets/titbit-user-icon.png' ;

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        name: '',
        bgColor: ''
    };
}

    changeBgColor = (newColor) => {
      this.setState({ bgColor: newColor });
    };

    colors = {
      colorOne: "#090C08",
      colorTwo: "#474056",
      colorThree: "#8A95A5",
      colorFour: "#B9C6AE",
  };

  render() {
    return (
        <View style={styles.container}>

           <ImageBackground source={image} resizeMode="cover" style={styles.bgImage}>
           
           <Text style={styles.titleText}>Titbit</Text>
          
          <View style={styles.box}>
          
          <View style={styles.inputBox}>

          <Image source={userIcon} style={styles.userIcon}/>

          <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({name: text})}
          value={this.state.name}
          placeholder='Your Name'        
          />
          </View>
          
          
          <View style={styles.colorSelector}>
          <Text
          style={styles.chooseBackgroundColor}
          >Choose Background Color
          </Text>

							<View style={styles.colorPicker}>
	
								<TouchableOpacity
                accessible={true}
                accessibilityLabel="Select Rich Black background"
                accessibilityHint="Choose Rich Black background for the chat screen"
                accessibilityRole="button"
                onPress={() => this.changeBgColor(this.colors.pink)}
									onPress={() => this.changeBgColor(this.colors.colorOne)}
								>
									<View style={styles.colorOne}></View>
								</TouchableOpacity>
                 
								<TouchableOpacity
                 accessible={true}
                 accessibilityLabel="Select Purple Taupe background"
                 accessibilityHint="Choose Purple Taupe background for the chat screen"
                 accessibilityRole="button"
									onPress={() => this.changeBgColor(this.colors.colorTwo)}
								>
									<View style={styles.colorTwo}></View>
								</TouchableOpacity>

								<TouchableOpacity
                 accessible={true}
                 accessibilityLabel="Select Light Slate Gray background"
                 accessibilityHint="Choose Light Slate Gray background for the chat screen"
                 accessibilityRole="button"
									onPress={() => this.changeBgColor(this.colors.colorThree)}
								>
									<View style={styles.colorThree}></View>
								</TouchableOpacity>

								<TouchableOpacity
                 accessible={true}
                 accessibilityLabel="Select Laurel Green background"
                 accessibilityHint="Choose  Laurel Green for the chat screen"
                 accessibilityRole="button"
									onPress={() => this.changeBgColor(this.colors.colorFour)}
								>
									<View style={styles.colorFour}></View>
								</TouchableOpacity>
							</View>
              </View>

          <Pressable
            style={styles.startChattingButton}
            accessible={true}
							accessibilityLabel="Start chatting"
							accessibilityHint="Lets you enter the chat screen"
							accessibilityRole="button"
            onPress={() =>
              this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
              })}
          >  
            
            <Text style={styles.startChattingText}>Start Chatting</Text>
          </Pressable>

          </View>
          </ImageBackground>
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
    box: {
		width: '88%',
		height: '44%',
		marginBottom: 30,
		backgroundColor: '#ffffff',
		flexGrow: 1,
		flexShrink: 0,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingTop: 30,
		paddingBottom: 30,
		borderRadius: 10,
		height: 260,
		minHeight: 260,
		maxHeight: 300,
	},
  inputBox: {
    flexDirection: 'row',
		alignItems: 'flex-start',
		width: '88%',
		borderRadius: 5,
		marginBottom: 25,
		padding: 10,
    backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#000',
    height: 50,
    fontSize: 16, 
    fontWeight: '300', 
    color: '#757083',
  },
    textInput: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		width: '88%',
		borderRadius: 5,
		marginBottom: 5,
    backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#fff',
    height: 30,
    fontSize: 16, 
    fontWeight: '300', 
    color: '#757083',
	},
    chooseBackgroundColor: {
        fontSize: 16, 
        fontWeight: '300', 
        color: '#757083',
        opacity: 100,
        marginLeft: 20
    },
    startChattingButton: { 
        padding: 20,
        alignItems: 'center',
        width: '88%',
        borderRadius: 0,
        backgroundColor: '#757083',
    },
    startChattingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',

    },

    bgImage: {
      flex: 1,
      width: "100%",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

    },

    userIcon:{
      padding: 10,
      margin: 5,
      height: 20,
      width: 20,
      resizeMode: 'stretch',
      alignItems: 'center',
      opacity: 0.5
  },

    titleText: {
      fontSize: 45, 
      fontWeight: '600', 
      color: '#fff'
    },

    box: {
      width: '88%',
      height: '44%',
      marginBottom: 10,
      backgroundColor: '#ffffff',
      flexGrow: 1,
      flexShrink: 0,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingTop: 30,
      paddingBottom: 30,
      borderRadius: 5,
      height: 300,
      minHeight: 260,
      maxHeight: 300,
    },
    colorSelector: {
      flex: 1,
      width: '70%',
      textAlign: 'center',
    },
    
    colorPicker: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    colorOne: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#090C08',
    },
    colorTwo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#474056',
    },
    colorThree: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#8A95A5',
    },
    colorFour: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#B9C6AE',
    },

    
   
 });
