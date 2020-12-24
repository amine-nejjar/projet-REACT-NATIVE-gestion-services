import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, TouchableOpacity, Button} from 'react-native';
import Routes from './routes/Routes';
console.disableYellowBox = true;
const {width: WIDTH}= Dimensions.get('window');
export default class App extends React.Component{
  render(){
    return (
      <Routes/>
    );
  }
}

const styles= StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#FFFEE9",
    paddingTop: 80,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  inputContainer: {
    marginTop: 10,
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  btnLogin: {
    backgroundColor: '#77C3B1',
    width: WIDTH - 55,
    height: 45,
    borderRadius: 50,
    marginTop: 40,
    justifyContent: 'center'
  },
  textLogin: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 20,
    textAlign: 'center',
  },
  signupContainer:{
    marginTop: 30,
    justifyContent: 'center'
  },
  textSignup: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
  },
  btnSignup: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 15,
    color: 'rgba(0,0,0,1)',
  },
})