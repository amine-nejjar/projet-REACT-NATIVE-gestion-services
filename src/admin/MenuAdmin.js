import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, Animated } from 'react-native';
//import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as Font from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import Logout from './../../assets/logout.png'


export default class MenuAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,

        };
    }
    //Loading police 
    async componentDidMount() {
        await Font.loadAsync({
            'JostRegular': require('./../../Ressource/Fonts/Jost-Regular.ttf'),
          //  'LemonadaLight': require('./../Ressource/Fonts/Lemonada-Light.ttf'),           
        });
        this.setState({
            loading: false 
        });
    }
    DemandeAdhesion() {
        Actions.demandeAdhesion()
    };
    ListeProfesionnel() {
        Actions.displayListeSpecialiste()
    }
    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Image style={styles.container1} source={require('./../../assets/logo.png')} />
              </View>
                )
            
        }
        return (
            <View style={styles.Container}>
                <Image style={styles.Logo} source={require('./../../assets/logo.png')} />

                <Text style={styles.Menu}>Espace Administrateur</Text>
                <FontAwesome5 name="users-cog" size={70} color="black" />
                <View style={styles.container2}>
                    <TouchableOpacity onPress={() => { this.ListeProfesionnel() }}>
                        <Text style={styles.text1}>
                            Liste Professionnels
                       </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity onPress={() => { this.DemandeAdhesion() }}>
                        <Text style={styles.text3}>
                            Demandes d'Adhesion
                      </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity onPress={()=>{this.GererMetiers()}}>
                        <Text style={styles.text1}>
                            Gestion des métiers
                      </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => { Actions.login() }}
                style={styles.TouchableOpacityStyle}>
                    <Image
                        source={Logout}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    GererMetiers(){
        Actions.displayMetier()
    }
}
const styles = StyleSheet.create({
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
    },
    Container: {
        flex: 1,
        alignItems: 'center',
        fontSize: 25,
    },
    Logo: {
        
        width: 130,
        height: 130,
        marginTop : 60,

    },
    Menu: {
        marginBottom: 10,
        fontSize: 23,  
        //fontWeight: 'bold',
        fontFamily: 'JostRegular',
        marginTop: 20,
        backgroundColor: 'black',
        color: 'white',
        paddingHorizontal : 80 ,
        
    },
    AdmineIcon: {
        marginBottom: 15,      
    },
    container2: {
        alignItems: 'center', 
   },
   text1: {
       marginTop: 15,
       paddingBottom: 5,
       paddingTop: 5,
       fontSize : 20,
       paddingLeft: 20,
       paddingRight: 20,
       borderRadius : 8 ,
       backgroundColor: '#e60000',
       fontFamily: 'JostRegular',
       color: 'white',
    },
    text2: {
        marginTop : 15 ,
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 20,
        paddingLeft: 58,
        paddingRight: 58,
        borderRadius: 8,
        backgroundColor: '#e60000',
        fontFamily: 'JostRegular',
        color: 'white',
    },
    text3: {
        marginTop: 15,
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        backgroundColor: '#e60000',
        fontFamily: 'JostRegular',
        color: 'white',
    },
    container1: {
      
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
  
    },
});