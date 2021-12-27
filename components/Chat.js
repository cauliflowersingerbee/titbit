import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Chat extends Component {

  render() {
    //let name = this.props.route.params.name; // OR ...
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    let {bgcolor} = this.props.route.params;
return (
  <View style={{
    flex: 1,
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor: bgcolor ? bgcolor : "white",}}>
        
</View>
)
    

  };
}
