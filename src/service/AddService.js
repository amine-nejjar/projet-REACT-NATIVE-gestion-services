import React from 'react';
import { StyleSheet, Text, View ,StatusBar,FlatList,ScrollView,Image} from 'react-native';
import {Container,Content,Form,Input,Item,Label,List,ListItem,Button,Title, Root ,Icon,Header,Left, Right, Body} from 'native-base';

import firebase from 'firebase';
import {Actions} from 'react-native-router-flux'
import logo from './../../assets/logo.png'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
require('firebase/auth');

export default class AddService extends React.Component{
    constructor(props){
        super(props);
       
        const user=firebase.auth().currentUser;

        this.state=({
            user_id: user.uid,
            noms :"",
            prixs:"",
            description:"",
            loading : true
        })

        
    }
    async componentDidMount() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ loading: false });}
    addaserviceintodatabse(name,price,descp){
        try{
            if(this.state.noms == '' || this.state.prix == '' || this.state.description == ''){
                alert('Tous les champs sont obligatoire')
                return AddService ;
            }
           
                var key = firebase.database().ref('Specialiste/'+this.state.user_id+'/Services/').push().key;
        firebase.database().ref('Specialiste/'+this.state.user_id+'/Services/').child(key).set({nom:name,prix:price,description:descp})
        this.goBack()
        }catch(error){
            console.log(error.toString())
        }
       
        
    }
    goBack(){
        Actions.pop();
    }

    render(){
        return(
            <ScrollView>
              <Header style ={{backgroundColor:'#e41b23'}}>
      <Left>
        <Button transparent onPress={this.goBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>Ajouter un service</Title>
      </Body>
      
    </Header>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}/>
            </View>
            
            <Form style={styles.form}>
                
                <Item floatingLabel>
              <Label>Nom</Label>
              <Input
                secureTextEntry={false}
                autoCapitalize="none"
                
                onChangeText= {(noms)=> this.setState({noms})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Prix</Label>
              <Input
                secureTextEntry={false}
                autoCapitalize="none"
                keyboardType='numeric'
                type="text" pattern="[0-9]*"
                onChangeText= {(prixs)=> this.setState({prixs})}
              />
            </Item>          
            <Item floatingLabel>
              <Label>Description</Label>
              <Input
                secureTextEntry={false}
                autoCapitalize="none"
                onChangeText= {(description)=> this.setState({description})}
              />
            </Item>
                            
                            <Button  style= {{marginTop: 40, width: 160, justifyContent: 'center', backgroundColor : "#e41b23"}}
               rounded onPress={()=>{this.addaserviceintodatabse(this.state.noms,this.state.prixs,this.state.description)}}><Text style={{fontSize:20}}>Add service</Text></Button>
                           
                        </Form>
             </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10
    },
    logoContainer: {
        flex: 2,
        marginBottom: 50,
        alignItems: 'center',
      },
      logo: {
        width: 120,
        height: 120,
      },
      textLogin: {
        color: 'rgba(255,255,255,0.1)',
        fontSize: 20,
        textAlign: 'center',
      },
      form: {
        alignItems: 'center',
        padding: 20,
        flex: 1,
      },
      
  });