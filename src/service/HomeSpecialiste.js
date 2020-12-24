import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image,Modal } from 'react-native';
import {Button,Title, Root ,Icon,Header,Left, Right, Body,Form,Input,Item,Label, } from 'native-base';
import firebase from 'firebase'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import edit from './../../assets/edit.png' 
import remove from './../../assets/remove.png' 
import { Actions, Reducer } from 'react-native-router-flux';



const redColor = '#e41b23';
export default class HomeSpecialiste extends React.Component {

  constructor(props) {
    super(props);

    const user = firebase.auth().currentUser;
    

    this.state = ({
      enabled: false,
      items: [],
      loading: true,
      user_id: user.uid,
      addModal: false,
      updateModal: false,
      noms: '',
      prix: '',
      description: '',
      nomUp: '',
      prixUp: '',
      descriptionUp: '',
      keyToUpdate: '',
      oldNom: '',
      oldPrix: '',
      oldDescription: ''
    })
  }
  addservice(noms, prix, description) {
    try{
      if(noms == '' || prix == '' || description == ''){
        alert('Tous les champs sont obligatoire')
      }else{
        var key = firebase.database().ref('Specialiste/'+this.props.eid+'/Services/').push().key;
        firebase.database().ref('Specialiste/'+this.props.eid+'/Services/').child(key).set({nom:noms,prix:prix,description:description})
        this.setState({addModal: false}) 
      }
    }catch(error){
        console.log(error.toString())
    }
  }
  updateservice(nom, prix, desc) {
    try{
        firebase.database().ref('Specialiste/'+this.props.eid+'/Services/'+this.state.keyToUpdate).set({nom:nom,prix:prix,description:desc})
        this.setState({updateModal: false}) 
        this.setState({keyToUpdate: ''})
      
    }catch(error){
        console.log(error.toString())
    }
  }


  letsUpdate(){
    firebase.database().ref('Specialiste/'+this.state.user_id+'/Services/'+this.state.keyToUpdate).on('value',snapshot => {
      this.setState({ oldNom: snapshot.val().nom });
      this.setState({ oldPrix: snapshot.val().prix });
      this.setState({ oldDescription: snapshot.val().description });
    });
    this.setState({updateModal: true})

  }

  getInfo() {
    Actions.getinfo();
  }
  
  
  async componentDidMount() {

    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ loading: false });
    
    firebase.database().ref('Specialiste/'+this.props.eid+'/Services').on('value', snapshot => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          nom: child.val().nom,
          prix: child.val().prix,
          description: child.val().description,
          id: child.key,
        });
      });
      this.setState({ menu: items });
    });

    firebase.database().ref('Specialiste/'+this.props.eid).on('value',snapshot => {
      if(snapshot.val().enabled==1){
        this.setState({enabled: true})
      }
    });

    
  }


  delete(element) {
    firebase.database().ref('Specialiste/'+this.props.eid+'/Services/'+ element).remove().then(function () {
    })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
  }
  render() {
    if(!this.state.enabled){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
          <Text style={{fontSize:14,}}>Votre compte n'est pas encore activé</Text>
        </View>
      );
    }else{
      if (this.state.loading) {
        return (
          <View></View>
        );
      } else {
      return (
       <View>
  
        <Header style ={{backgroundColor:'#e41b23'}}>
        <Left>
          <Button transparent onPress={()=>{Actions.homespec({id:this.state.user_id})}}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Vos Services</Title>
        </Body>
        <Right>
        <Button onPress={()=> {this.setState({addModal: true})}} transparent>
            <Icon name='add' />
          </Button>
          </Right>
      </Header>
      <Modal
        visible={this.state.updateModal} 
        animationType='slide'
        transparent = {true}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <Form style={styles.form}>
              <Item floatingLabel>
                <Label>Nom</Label>
                <Input
                  secureTextEntry={false}
                  autoCapitalize="none"
                  value = {this.state.oldNom}
                  onChangeText= {(oldNom)=> this.setState({oldNom})}
                />
              </Item>
              <Item floatingLabel>
                <Label>Prix</Label>
                <Input
                  secureTextEntry={false}
                  autoCapitalize="none"
                  keyboardType='numeric'
                  value= {this.state.oldPrix}
                  type="text" pattern="[0-9]*"
                  onChangeText= {(oldPrix)=> this.setState({oldPrix})}
                />
              </Item>          
              <Item floatingLabel>
                <Label>Description</Label>
                <Input
                  secureTextEntry={false}
                  autoCapitalize="none"
                  value= {this.state.oldDescription}
                  onChangeText= {(oldDescription)=> this.setState({oldDescription})}
                />
              </Item>
              <TouchableOpacity onPress={()=>{this.updateservice(this.state.oldNom, this.state.oldPrix, this.state.oldDescription)}}>
                <Button style= {{marginTop: 40, width: 140, justifyContent: 'center', backgroundColor : "#e41b23"}}
                  rounded
                >
                  <Text style={{color : 'white'}}>Modifier</Text>
                </Button>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.setState({updateModal : false})}}>
                <Text style={{fontSize: 16, color: 'grey', paddingTop: 10 }}>Annuler</Text>
              </TouchableOpacity>
            </Form>
          </View>
        </View>      
      </Modal>
      <Modal 
        visible={this.state.addModal} 
        animationType='slide'
        transparent = {true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
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
                  onChangeText= {(prix)=> this.setState({prix})}
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
              <TouchableOpacity onPress={()=>{this.addservice(this.state.noms, this.state.prix, this.state.description)}}>
                <Button style= {{marginTop: 40, width: 140, justifyContent: 'center', backgroundColor : "#e41b23"}}
                rounded
                >
                  <Text style={{color : 'white'}}>Ajouter</Text>
                </Button>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> {this.setState({addModal : false})}}>
                <Text style={{fontSize: 16, color: 'grey', paddingTop: 10 }}>Annuler</Text>
              </TouchableOpacity>
              </Form>
            </View>
          </View>
        </Modal>
        <FlatList
            data={this.state.menu}
            keyExtractor={elem => elem.id}
            renderItem={(elem) => (
              <View style={styles.Container}>
              <View style={{flexDirection: 'row',}}>
                  <Text style={styles.title}>{elem.item.nom}</Text>
              </View>
              <View style={{flexDirection: 'row-reverse',}}>
                  <Text style={styles.price}>Prix: {elem.item.prix}</Text>
              </View>
              <View>
                  <Text style={styles.description}>{elem.item.description}</Text>
              </View>
              <View style={{flexDirection: 'row-reverse',}}>
                  <TouchableOpacity  onPress={() => this.setState({keyToUpdate: elem.item.id}, this.letsUpdate())
      } >
                      <Image source={edit} style={styles.edit_delete}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.delete(elem.item.id)}}>
                      <Image source={remove} style={styles.edit_delete}/>
                  </TouchableOpacity>
              </View>
          </View>
  
            )} ></FlatList></View>
         
          )
    }
    }
}

};
const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#eeeeee',
    elevation: 2,
    padding: 10,
    margin: 10,
},
title: {
    paddingLeft: 5,
    flex: 1,
    alignItems: 'flex-start',
    borderBottomColor: redColor,
    borderBottomWidth: 0.5,
    fontSize: 20,
    fontWeight: 'bold'
},
price: {
    paddingRight: 20,
    fontSize: 15,
    color: '#454343',
    fontStyle: 'italic',
},
description: {
    padding: 10,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 13,
    fontStyle: 'italic'
},
edit_delete: {
    margin: 2.5,
    alignItems: 'flex-end',
    width: 22,
    height: 22,
    borderWidth: 0.5,
    borderColor: '#eeeeee',
    
},
modalContainer: {
  backgroundColor: '#000000aa',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}, 
modalContents: {
  backgroundColor: "#ffffff",
  marginLeft: 50,
  marginRight: 50,
  padding: 10,
  borderRadius:20,
  justifyContent: 'center',
  alignItems: 'center'
},
form: {
  alignItems: 'center',
  padding: 10,
},
itemStyle: {
  backgroundColor: '#E4E4E4',
  width: 200,
  borderRadius: 10,
  padding: 5,
  margin: 5,
  alignItems: 'center'
}

});