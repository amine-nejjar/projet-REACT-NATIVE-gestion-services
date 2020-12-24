import React from 'react';
import {StyleSheet, View, Image, ImageBackground, Text} from 'react-native'
import {Container } from 'native-base'

import { Actions } from 'react-native-router-flux';
import specialist from './../assets/specialiste.png' 
import user from './../assets/person.png' 
import logoBackground from './../assets/background.jpg'
import { TouchableOpacity } from 'react-native-gesture-handler';


const redColor = '#e41b23';

export default class Account extends React.Component{
  registerSpt(){
    Actions.signup({QTY: "Specialist"});
  }
  registerUsr(){
    Actions.signup({QTY: "User"});
  }
  render(){
    return (
        <ImageBackground source={logoBackground} style={styles.backgroundImage} blurRadius={8}>
            <View style={{alignItems:"center"}}>
            <TouchableOpacity onPress={this.registerSpt}><Image source={specialist} style={styles.accountType}/></TouchableOpacity>
            <Text style={{fontSize:18,fontWeight:"bold", color:"white"}}> Specialiste </Text>
            </View>
            <View style={{alignItems:"center"}}>
            <TouchableOpacity onPress={this.registerUsr}><Image source={user} style={styles.accountType}/></TouchableOpacity>
            <Text style={{fontSize:18,fontWeight:"bold", color:"white"}}> Client </Text>
            </View>
        </ImageBackground>
    );
    }
}

const styles = StyleSheet.create({
    
    accountType : { 
        width:100,
        height: 100,
        alignItems: 'center',
        margin: 10,
        borderColor: redColor,
        borderWidth: 1,
        borderRadius: 30
    },
    backgroundImage: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})