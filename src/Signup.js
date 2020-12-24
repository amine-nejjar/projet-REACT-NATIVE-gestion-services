import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, TouchableOpacity, Alert, ScrollView, ActivityIndicator} from 'react-native';
import {Container, Content, Header, Form, Input, Item, Label, Button, Icon, Picker} from 'native-base'
import logo from './../assets/logo.png'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';


import { getCurrentFrame } from 'expo/build/AR';
import { Actions } from 'react-native-router-flux';
const redColor = '#e41b23';
const {width: WIDTH}= Dimensions.get('window');

import * as firebase from 'firebase';

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

export default class Signup extends React.Component{

  constructor(props){
    super(props)

    this.state =({
      nom: '',
      prenom: '',
      age: '',
      telephone: '',
      specialite: '',
      ville: '',
      email: '',
      password: '',
      statut: this.props.QTY,
      enabled: '',
      metiers:[],
      icon: "eye-off",
      showPassword: true,
      indicator: false,
      errorMessage: '',
            locat: { latitude: 0, longitude: 0 },
    })}
    changeIcon(){
      this.setState(prevState=> ({
        icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
        showPassword: !prevState.showPassword
      }));
    }
    componentWillMount() {
      this._getLocation();
      const MetierRef = firebase.database().ref().child('Metiers');
      MetierRef.on('value', (data) => {
        const metier = [];
        console.log(data.toJSON());
        data.forEach((doc) => {
            metier.push({
                key: doc.key,
                designation: doc.toJSON().Designation,
            });
            this.setState({
                metiers: metier
            });
            console.log("metiers: "+this.state.metiers.designation);
        });
    });    
  }

  login() {
    Actions.login();
  }
  PickImage() {
      Actions.PickImage();
  }

  _getLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted ') {
          console.log('PERMISSIOM NOT GRANTED');
          this.setState({
              errorMessage: 'PERMISSION GRANTED',
          });
      }

      const location = await Location.getCurrentPositionAsync();
      console.log('Latitude');
      console.log(location.coords.latitude);
      console.log('Longitude');
      console.log(location.coords.longitude);
      this.setState({
          locat: { latitude: location.coords.latitude, longitude: location.coords.longitude }
      });
  };

  

  SignUpUser(nom, prenom, age, telephone, specialite, ville, email, password, statut,latitudes,longitudes){
    try{
      if(this.state.nom=='' || prenom=='' || age=='' || telephone=='' || ville=='' || email=='' ){
        alert("Tous les champs doivent etre remplies")
        return;
      }
      else if(this.state.statut=='Specialist' && specialite==''){
        alert("Vous devez choisir la spécialité")
        return;
      } else if(this.state.telephone.length!=10 || (this.state.telephone.substring(0,2)!='06' && this.state.telephone.substring(0,2)!='07') ){
        alert("Le numéro de téléphone est invalide")
        return;
      } else if(this.state.password.length<6){
        alert("Le mot de passe doit contient au moins 6 caractères")
        return;
      } else{
        this.setState({
          indicator: true,
        })
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function success(userData){
          console.log(firebase.auth().currentUser.uid);
          if(statut=='Specialist'){
            const update = {
              displayName: 'Specialiste',
            };
            firebase.auth().currentUser.updateProfile(update);
            firebase.database().ref('Specialiste/').child(firebase.auth().currentUser.uid).set({
              Nom: nom,
              Prenom: prenom,
              Age: age,
              Telephone: telephone,
              Ville: ville,
              Metier: specialite,
              Email: email,
              Password: password,
              enabled: 0,
              latitude: latitudes,
              longitude: longitudes,
              URL: ''
            }).then((data)=>{
              Actions.PickImage();
              console.log('data ' , data)
            }).catch((error)=>{
              console.log('error ' , error)
            })
          }else {
            const update = {
              displayName: 'User',
            };
            firebase.auth().currentUser.updateProfile(update);
            firebase.database().ref('users/').child(firebase.auth().currentUser.uid).set({
              Nom: nom,
              Prenom: prenom,
              Age: age,
              Telephone: telephone,
              Ville: ville,
              Email: email,
              Password: password,
              Statut: 'User',
              latitude: latitudes,
              longitude: longitudes,
              URL: ''
            }).then((data)=>{
              console.log("1")
              Actions.PickImage();
              console.log('data ' , data)
            }).catch((error)=>{
              console.log("2")
              console.log('error ' , error)
            })
          }
        })
      }
    }catch(error){
      console.log("******1");
      console.log(console.error.toString());
    }
  }
  render(){
    let metierItems = this.state.metiers.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });
    return (
      <ScrollView style = {{padding: 20, marginTop: 20}}>
        <View style = {styles.Container}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo}/>
          </View>
          <Form style={styles.form}>
            <Item floatingLabel>
                <Label>Nom</Label>
                <Input
                  secureTextEntry={false}
                  autoCapitalize="none"
                  onChangeText= {(nom)=> this.setState({nom})}
                />
              </Item>
              <Item floatingLabel>
                <Label>Prenom</Label>
                <Input
                  secureTextEntry={false}
                  autoCapitalize="none"
                  onChangeText= {(prenom)=> this.setState({prenom})}
                />
              </Item>
              <Item floatingLabel>
                <Label>Age</Label>
                <Input
                  secureTextEntry={false}
                  autoCapitalize="none"
                  onChangeText= {(age)=> this.setState({age})}
                />
              </Item>
              <Item floatingLabel>
                <Label>Téléphone</Label>
                <Input
                  secureTextEntry={false}
                  autoCapitalize="none"
                  onChangeText= {(telephone)=> this.setState({telephone})}
                />
              </Item>
              {(this.state.statut=='Specialist')?(
                <Item style={{marginTop: 15}} >
                <Label>Métier:</Label>
                <Picker
                  style={{ width: 150, height: 40 }}
                  textStyle={{ color: 'grey' }}
                  selectedValue = {this.state.specialite}
                  onValueChange = {(itemValue) => {this.setState({specialite: itemValue})}}
                >
                  {this.state.metiers.map((branches, i) => {
                    return (
                      <Picker.Item label={branches.designation} value={branches.designation} key={i} />
                    );
                  }
                  )}
                </Picker>
                </Item>
              ):null}
              <Item style={{marginTop: 15}}>
                <Label>Ville: </Label>
                <Picker
                  style={{ width: 150, height: 40 }}
                  textStyle={{ color: 'grey' }}
                  selectedValue = {this.state.ville}
                  onValueChange = {(itemValue) => {this.setState({ville: itemValue})}}
                >
                  <Picker.Item label={'Tanger'} value={'Tanger'} key={1} />
                  <Picker.Item label={'Rabat'} value={'Rabat'} key={2} />
                  <Picker.Item label={'Casablanca'} value={'Casablanca'} key={3} />
                  <Picker.Item label={'Marrakech'} value={'Marrakech'} key={4} />
                  <Picker.Item label={'Agadir'} value={'Agadir'} key={5} />
                  <Picker.Item label={'Laayoune'} value={'Laayoune'} key={6} />
                  <Picker.Item label={'Dakhla'} value={'Dakhla'} key={7} />
                </Picker>
              </Item>
           
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

              <TouchableOpacity onPress= {()=> this.SignUpUser(this.state.nom, this.state.prenom, this.state.age, this.state.telephone, this.state.specialite, this.state.ville, this.state.email, this.state.password, this.state.statut,this.state.locat.latitude, this.state.locat.longitude)}>
                <Button style= {{marginTop: 40, width: 160, justifyContent: 'center', backgroundColor : "#e41b23"}}
                  rounded
                  >
                  <Text style={{color : 'white'}}>Sign up</Text>
                </Button>
              </TouchableOpacity>
              <ActivityIndicator animating={this.state.indicator} size="large" color="#e41b23" />
            </Form>
            <View style={styles.login}>
              <Text style={{fontSize: 12}}>You have an account?</Text>
              <TouchableOpacity onPress={this.login}><Text style={{fontSize: 16, color: redColor, }}>Login here</Text></TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles= StyleSheet.create({
  logoContainer: {
    flex: 2,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  form: {
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  login : {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50
  }
})


