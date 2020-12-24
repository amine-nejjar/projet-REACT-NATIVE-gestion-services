import React, { useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image, TouchableOpacity, Linking ,Button,FlatList } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import firebaseConfig from '../../Data/Database'
import Firebase from 'firebase'
import {Overlay , Icon, Header} from 'react-native-elements'
import {Card} from 'react-native-shadow-cards';
import { Actions } from 'react-native-router-flux';
import {showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage  from "react-native-flash-message";


class SpecialistProfile extends React.Component {
    constructor(props){
        super(props)
        if (!Firebase.apps.length) {
			Firebase.initializeApp(firebaseConfig);
			  }
        this.state={
            specialist: undefined,
            isLoading:true,
            visible:false,
            visibleP:false,
            visibleS:false,
        }
    }
    componentDidMount(){
        let ref = Firebase.database().ref('Specialiste/').child(this.props.id)
        ref.once('value', snapshot => {
		this.setState({specialist:snapshot.val(),
                        isLoading:false,
                        stars:2
                    }
                );
        });
    }
    _getRating(){
        const rates=this.state.specialist.Rating;
        const keys=Object.values(rates);
        var fin=[];
        for(const key of keys){
            const val=Object.values(key);
            fin=fin.concat(val);
        }
        var rt=0;
        var rtf;
        fin.forEach(elt=>{rt=rt+elt});
        rtf=rt/fin.length
        var rounded = Math.round(rtf * 10) / 10
    }

    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    }
    onClose = () => this.setState({ visible: false});
    _submitRating(){
        let ref = Firebase.database().ref('Specialiste/'+this.props.id+'/Rating')
        ref.push({
            Rate: this.state.stars
          });
          showMessage({
            message: "Evaluation envoyée",
            description: "Votre evaluation a été ajouté ! merci.",
            type: "success",
          });
          this.setState({visible:false})
    }
    ratingCompleted=(rating) => {
        console.log("Rating is: " + rating);
        this.setState({stars:rating});
      }
      _callSpecialist(phone){
        Linking
        .openURL('tel:'+phone)
    }
    _sendSms(phone,name){
        Linking.openURL("sms://"+phone+"/?body=Hi "+name+", I'm interested in your services in KHADAMATI app.")
    }
    _displayRating(){
        if(this.state.specialist!=undefined){
        return(
        <Overlay visible={this.state.visible} onClose={this.onClose} closeOnTouchOutside>
                <View style={styles.rating_container}>
                    <View style={styles.ratingHead}>
                        <Text>Evaluer le service de {this.state.specialist.Prenom}</Text>
                    </View>
                    <View Style={styles.ratingBody}>
                        <Rating type='star' ratingCount={5} imageSize={30} showRating onFinishRating={this.ratingCompleted} />
                    </View>
                    <View style={styles.ratingFoot}>
                        <Button style={styles.ratingButton} title="fermer" onPress={() =>this.setState({visible:false}) } />
                        <Button style={styles.ratingButton} color="#e53935" title="voter" onPress={()=> this._submitRating()}/>
                    </View>
                </View>
        </Overlay>)
    }}
    _DisplayPerso(){
        if(this.state.specialist!=undefined){
            return(
            <Overlay visible={this.state.visibleP} onClose={this.onClose} closeOnTouchOutside>
                    <View style={{height:250, width:250,alignItems:"center"}}>
                    <Text style={{flex:2,fontSize:18,fontWeight:"bold"}}>Infos de {this.state.specialist.Prenom}</Text>
                    <View style={{flex:4}}>
                        <Text>Phone : {this.state.specialist.Telephone}</Text>
                        <Text>Age : {this.state.specialist.Age}</Text>
                        <Text>Email : {this.state.specialist.Email}</Text>
                        <Text>Address : {this.state.specialist.Ville}</Text>
                    </View>
                    <Button style={{flex:1}} title="close" onPress={() =>this.setState({visibleP:false}) }/>
                    </View>
            </Overlay>)
    }}
    _DisplayServ(){
        
        if(this.state.specialist!=undefined){
            const serv=this.state.specialist.Services;
            var fin=[];

            if(serv!=undefined){
                const keys=Object.values(serv);
                
                var id=0
                for(const key of keys){
                        fin.push({
                            key:id.toString(),
                            nom:key.nom,
                            description:key.description,
                            prix:key.prix
                        })
                        id=id+1
                    }}
            return(
            <Overlay visible={this.state.visibleS} onClose={this.onClose} closeOnTouchOutside>
                    <View style={{height:350, width:300,alignItems:"center"}}>
                    <Text style={{flex:2,fontSize:18,fontWeight:"bold"}}>services disponibles</Text>
                    <View style={{flex:7,width:290}}>
                    <FlatList
                        data={fin}
                        keyExtractor={(item) => item.key}
                        renderItem={({item}) => 
                        <Card elevation={10} style={{width:250, alignSelf:"center",marginBottom:8}}>
                            <View style={{marginHorizontal:5}}>
                                <Text>service : {item.nom}</Text>
                                <Text>description : {item.description}</Text>
                                <Text>prix : {item.prix}</Text>
                            </View>
                        </Card>
                        
                        
                        }
                        
                        style={{marginTop:40}}
                        />
                    </View>
                    <Button style={{flex:2}} title="close" onPress={() =>this.setState({visibleS:false}) }/>
                    </View>
            </Overlay>)
    }
    }
    render() {
        return (
        <View style={styles.main_container}>
        <Header
            leftComponent={<Icon name="arrowleft" type="antdesign" color="white" size={26} onPress={()=>{Actions.pop()}}/>}
            centerComponent={{ text: 'View Profile', style: { color: '#fff', fontSize:16 } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            containerStyle={{
                backgroundColor: '#e53935',
                justifyContent: "center",
                paddingTop:0,
                alignItems:"center",
                height:50,
                elevation:25
                }}
        />
            {this._displayLoading()}
            {this._displayProfile()}
            {this._displayRating()}
            {this._DisplayPerso()}
            {this._DisplayServ()}

            <FlashMessage position="top" autoHide={true} duration={3000}/>
        </View>
        )
    }
    _displayProfile(){
        if(this.state.specialist!=undefined){
            return(
               
                <View style={styles.main_container}>
                    <View style={styles.avatar}>
                        <Icon name="phone-call" color="white" type="feather" size={30} containerStyle={styles.icon1} onPress={() => this._callSpecialist(this.state.specialist.Telephone)}/>
                        <View style={styles.image_cont}>
                            <Image style={styles.image} source={{uri:this.state.specialist.URL}} />
                        </View>
                        <Icon name="message1" color="grey" type="antdesign" size={30} containerStyle={styles.icon2} onPress={() => this._sendSms(this.state.specialist.Telephone,this.state.specialist.Prenom)}/>
                    </View>
                    <View style={styles.info}>
                        <Text style={{fontSize:23,fontWeight:"bold",marginBottom:5}}>{this.state.specialist.Prenom} {this.state.specialist.Nom}</Text>
                        <Text style={{color:"grey", fontSize:18,marginBottom:5}}>{this.state.specialist.Metier}</Text>
                        <View style={styles.rating}>
                            <Icon size={20} color="red" name="star" type="feather"/>
                            <Text style={{color:"red"}}> {this.props.Rate} </Text>
                            <Text>(356 reviewers)</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.rate} onPress={() => this.setState({visible:true})}>
                    <Card style={styles.rateC} elevation={25} cornerRadius={25}  >
                        <Text style={{fontWeight:"bold", color:"white"}}>Evaluer le service de {this.state.specialist.Prenom.toUpperCase()}</Text>
                    </Card>
                    </TouchableOpacity>
                    <View style={styles.options}>
                        <TouchableOpacity onPress={()=>{this.setState({visibleP:true})}}>
                        <Card style={styles.optionC} elevation={10}>
                            <Icon color="#e53935" containerStyle={{flex:1}} name="user" type="antdesign"/>
                            <Text style={{fontSize:30,marginBottom:3,color:"grey"}}>|</Text>
                            <Text style={{flex:4,fontSize:15,marginLeft:6}}>Informations personnelles </Text>
                            <Icon containerStyle={{flex:1}} name="right"  type="antdesign"/>
                        </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.setState({visibleS:true})}}>
                        <Card style={styles.optionC} elevation={10}>
                            <Icon color="#e53935" containerStyle={{flex:1}} name="bars" type="antdesign"/>
                            <Text style={{fontSize:30,marginBottom:3,color:"grey"}}>|</Text>
                            <Text style={{flex:4,fontSize:15,marginLeft:6}}>Services proposés</Text>
                            <Icon containerStyle={{flex:1}} name="right"  type="antdesign"/>
                        </Card>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Card style={styles.optionC} elevation={10}>
                            <Icon color="#e53935" containerStyle={{flex:1}} name="map" type="feather"/>
                            <Text style={{fontSize:30,marginBottom:3,color:"grey"}}>|</Text>
                            <Text style={{flex:4,fontSize:15,marginLeft:6}}>itinéraire de Map</Text>
                            <Icon containerStyle={{flex:1}} name="right"  type="antdesign"/>
                        </Card>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    }

const styles = StyleSheet.create({

    main_container:{
        flex:1,
    },
    rating:{
        flexDirection:"row",
    },
    options:{
        flex:6,
        alignItems:"center"
    },
    optionC:{
        height:50,
        width:290,
        marginTop:20,
        flexDirection:"row",
        alignItems:"center"
    },
    icon1:{
        borderRadius:50,
        height:55,
        width:55,
        backgroundColor:"grey",
        marginHorizontal:40,
        justifyContent:"center",
        alignItems:"center",
        elevation:25

    },
    icon2:{
        borderRadius:50,
        borderColor:"grey",
        borderWidth:1,
        height:55,
        width:55,
        marginHorizontal:40,
        justifyContent:"center",
        alignItems:"center",
    },
    image:{
        height:130,
        width:130,
        borderRadius:500
    },
    avatar:{
        justifyContent:"center",
        alignItems:"center",
        flex:4,
        flexDirection:"row",
    },
    info:{
        flex:2,
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:25
        
    },
    rate:{
        flex:2,
        alignItems:"center",
    },
    rateC:{
        height:50,
        width:280,
        backgroundColor:"#e53935",
        justifyContent:"center",
        alignItems:"center"
    },


    rating_container:{
        height:200,
        width:300
    },
    ratingHead:{
        flex:2,
        alignItems:"center",
        justifyContent:"center"
    },
    ratingBody:{
        flex:6,
        alignItems:"center",
        justifyContent:"center"
    },
    ratingFoot:{
        flex:3,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    ratingButton:{
        margin:10
    },
    loading_container:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    })



export default SpecialistProfile