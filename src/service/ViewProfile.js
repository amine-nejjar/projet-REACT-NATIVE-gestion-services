import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image,ScrollView } from 'react-native';
import {Button,Title, Root ,Icon,Header,Left, Right, Body  } from 'native-base';
import firebase from 'firebase'
import logo from './../../assets/user.png'
import { Actions, Reducer } from 'react-native-router-flux';
export default class ViewProfile extends React.Component{
    constructor(props) {
        super(props);
    
        const user = firebase.auth().currentUser;
        
        console.log(user.displayName+"*************")
    
        this.state = ({
          items: [],
          loading: true,
          user_id: user.uid,
          nom : '',
          prenom : '',
          metier : '',
          email : '',
          age : '',
          quartier : '',
          telephone : '',
          ville : '',
          URL:""
        
        })
      }
      goBack(){
        Actions.pop();
    }
      componentDidMount() {
        firebase.database().ref('Specialiste/'+this.props.eid).on('value',snapshot => {
            var URL=snapshot.val().URL
            if(URL==undefined){
                URL=""
            }
            this.setState({ nom: snapshot.val().Nom });
            this.setState({ prenom: snapshot.val().Prenom });
            this.setState({ age: snapshot.val().Age });
            this.setState({ email: snapshot.val().Email });
            this.setState({ metier: snapshot.val().Metier });
            this.setState({ telephone: snapshot.val().Telephone });
            this.setState({ ville: snapshot.val().Ville,URL:URL });
          });}
    render(){
        return(
            <View style={styles.main_container}>
                   <Header style ={{backgroundColor:'#e41b23'}}>
      <Left>
        <Button transparent onPress={this.goBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body style={{marginLeft:48}}>
        <Title>Mon profile</Title>
      </Body>
      
    </Header>
                    
                    <View style={styles.avatar}>
                        <Image style={styles.image} source={{uri:this.state.URL}} />
                    </View> 
                    <View style={{alignItems:'center'}}>
                    <Text style={styles.name}>{this.state.nom} {this.state.prenom}</Text>
                    </View>
                    <View style={styles.form}>
                       
                        <Text style={styles.metier}><Text style={styles.name}>Age : </Text>{this.state.age} </Text>
                        <Text style={styles.metier}><Text style={styles.name}>Email :</Text> {this.state.email}</Text>
                        <Text style={styles.metier}><Text style={styles.name}>Telephone :</Text>  {this.state.telephone}</Text>
                        <Text style={styles.metier}><Text style={styles.name}>Ville :</Text> {this.state.ville}</Text>
                    </View>
                    
                    <View style={styles.req}>
                        <Button  style= {{marginTop: 40, width: 140, justifyContent: 'center', backgroundColor : "#e41b23"}}
               rounded onPress={()=>{Actions.editprofile({sid : this.props.eid})}}><Text style={{fontSize:18, color:"white"}}>Modifier</Text></Button>
                    </View>
                    </View>
                
        )
    }
    
};
const styles=StyleSheet.create({
    main_container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        
       
    },
    rating:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    services:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    button_container:{
        borderColor:"#72B48E",
        borderWidth:2,
        borderRadius:10,
        marginRight:7,
        marginLeft:7,
        marginTop:10,
        justifyContent: 'center'
    },
    button_title:{
        fontSize:10,
        fontWeight:"bold",
        color:"#e41b23"
    },
    image:{
        height:90,
        width:90,
        backgroundColor:"grey",
        borderRadius:200,
    },
    upside:{
        flex:6,
        flexDirection:"column"
    },
    downside:{
        flex:4,
        flexDirection:"row"
    },
    dev:{
        backgroundColor:"grey",
        height:1.2,
        marginRight:30,
        marginLeft:30
       
    },
    avatar:{
        flex:2,
        alignItems  :"center",
        marginTop: 40
        
    },
    infos:{
        flex:5,
        alignItems : "center"
    },
    req:{
        flex:5,
        marginTop : 70,
        alignItems : 'center'
        
    },
    name:{
        fontSize:19,
        fontWeight:"bold",
        marginBottom:2,
        alignItems : 'center',
        justifyContent : 'center',
        
    },
    metier:{
        color:"grey",
        fontSize : 16,
        padding :  4,
        marginLeft: 10
    },form: {
        padding: 20,
        flex: 1,
        marginLeft : 10
      },
})