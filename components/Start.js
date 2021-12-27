import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Pressable, ImageBackground } from 'react-native';
import image from '../assets/titbit-assets/background-image.png' ;

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '',
        bgcolor: '' 
       };
      }

    changeBgColor = (newColor) => {
      this.setState({ bgcolor: newColor });
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
          
          <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({name: text})}
          value={this.state.name}
          placeholder='Your Name'        
          />
          
          <View style={styles.colorSelector}>
          <Text
          style={styles.chooseBackgroundColor}
          >Choose Background Color
          </Text>

							<View style={styles.colorPicker}>
	
								<TouchableOpacity
									onPress={() => this.changeBgColor(this.colors.colorOne)}
								>
									<View style={styles.colorOne}></View>
								</TouchableOpacity>
                 
								<TouchableOpacity
									onPress={() => this.changeBgColor(this.colors.colorTwo)}
								>
									<View style={styles.colorTwo}></View>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => this.changeBgColor(this.colors.colorThree)}
								>
									<View style={styles.colorThree}></View>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => this.changeBgColor(this.colors.colorFour)}
								>
									<View style={styles.colorFour}></View>
								</TouchableOpacity>
							</View>
              </View>

          <Pressable
            style={styles.startChattingButton}
            onPress={() => this.props.navigation.navigate('Chat', { 
              name: this.state.name, 
              bgcolor: this.state.bgcolor,
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
    textInput: {
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
