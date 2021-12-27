import React from 'react';
import { StyleSheet, View, TextInput, Text, Pressable } from 'react-native';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
      }

  render() {
    return (
        <View style={styles.container}>
          
          <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Your Name'        
          />

          <Text
          style={styles.chooseBackgroundColor}
          >Choose Background Color
          </Text>

          <Pressable
            style={styles.startChattingButton}
            onPress={() => this.props.navigation.navigate('Chat')}
          >
            <Text style={styles.startChattingText}>Start Chatting</Text>
          </Pressable>


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

    }

    
   
 });
