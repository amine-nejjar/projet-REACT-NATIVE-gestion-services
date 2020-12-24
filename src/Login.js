import React from 'react';
import { StyleSheet, Text, View, Image, Alert, ImageBackground, TouchableOpacity,ActivityIndicator } from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label,Icon} from 'native-base'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

import logo from './../assets/logo.png'
import logoBackground from '../assets/background_cmp.jpg'
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

const redColor = '#e41b23';
const firebaseConfig = {
  apiKey: "AIzaSyCqItK8rcSio8oli4Wim59VTfFwxKDyVdw",
  authDomain: "khadamati-86562.firebaseapp.com",
  databaseURL: "https://khadamati-86562.firebaseio.com",
  projectId: "khadamati-86562",
  storageBucket: "khadamati-86562.appspot.com",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Login extends React.Component{
  constructor(props){
    super(props)

    this.state =({
      email: '',
      password: '',
      icon: "eye-off",
      showPassword: true,
      indicator: false,
    })
    }
    changeIcon(){
      this.setState(prevState=> ({
        icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
        showPassword: !prevState.showPassword
      }));
    }
  chooseAccount(){
    Actions.account();
  }
  

  LoginUser(email, password){
    activateKeepAwake();
    if( this.state.email=='' ){
      alert("Veillez saisir l'email")
      return;
    }
    else if(this.state.password.length<6){
      alert("Le mot de passe contient au moins 6 caractères")
      return;
    }
    else {
      try{
        this.setState({
          indicator: true,
        })
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user){
        statut = firebase.auth().currentUser.displayName
        if(statut == 'Specialiste'){
          Actions.homespec();
        }else if(statut == 'User'){
          Actions.HomeUser();
        }else{
          Actions.menuAdmin();
        }             
        })
      }catch(error){
        console.log(console.error.toString());
      }
    }
  }
  render(){
    return (
      <View style = {styles.Container}>
        <Container>
          <View style={styles.logoContainer}>
            <ImageBackground source={logoBackground} style={styles.backgroundImage}>
              <Image source={logo} style={styles.logo}/>
              <Text style={{fontSize: 20, marginTop: 10}}>Welcome Back!</Text>
            </ImageBackground>
          </View>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                secureTextEntry={false}
                autoCapitalize="none"
                onChangeText= {(email)=> this.setState({email})}
              />
            </Item>

            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={this.state.showPassword}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText= {(password)=> this.setState({password})}
              />
              <Icon name={this.state.icon} onPress={()=> this.changeIcon()}/>
            </Item>


            <TouchableOpacity onPress= {()=> this.LoginUser(this.state.email, this.state.password)}>
              
              <Button style= {{marginTop: 40, width: 160, justifyContent: 'center', backgroundColor : "#e41b23"}}
                rounded
                >
                <Text style={{color : 'white'}}>Login</Text>
              </Button>
            </TouchableOpacity>
            <ActivityIndicator animating={this.state.indicator} size="large" color="#e41b23" />
          </Form>
          <View style={styles.signUp}>
            <Text style={{fontSize: 12}}>New to Khadamat?</Text>
            <TouchableOpacity onPress={this.chooseAccount}><Text style={{fontSize: 16, color: redColor, }}>Create Account Here</Text></TouchableOpacity>
          </View>
        </Container>
      </View>
    );
  }
}

  
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    flex: 2,
    marginBottom: 50,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    padding: 20,
    alignSelf: 'stretch',
    borderBottomRightRadius: 80,
    overflow: "hidden"
  },
  logo: {
    width: 80,
    height: 80,
  },
  form: {
    alignItems: 'center',
    padding: 20,
    flex: 2,
  },
  signUp : {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  }
})
