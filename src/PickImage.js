import React, { Component } from 'react';
import { Image, StyleSheet, Button, Text, View, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

const firebaseConfig = {
    apiKey: "AIzaSyCqItK8rcSio8oli4Wim59VTfFwxKDyVdw",
    authDomain: "khadamati-86562.firebaseapp.com",
    databaseURL: "https://khadamati-86562.firebaseio.com",
    projectId: "khadamati-86562",
    storageBucket: "khadamati-86562.appspot.com",
    messagingSenderId: "864213111293",
    appId: "1:864213111293:web:acf93e55a7a57706e9c994",
    measurementId: "G-859KX4SPTF"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default class PickImage extends Component {
    constructor(props) {
        super(props);
        const user = firebase.auth().currentUser;
        

        this.state = ({
            url: '',
            user_id: user.uid,
        });
        console.log(this.state.user_id);
    }
    
    onChooseImagePress = async (key) => {

        //let result = await ImagePicker.launchCameraAsync(); 
        let result = await ImagePicker.launchImageLibraryAsync(); 
        if (!result.cancelled) {
            this.uploadImage(result.uri, "Photo_Profile_"+key)
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert('Error:', error.message);
                });
        }
    }
    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);

    }
    componentDidUpdate() {
             
        console.log("URL de l image ------------------------------------------------------------------------ ");
        console.log(this.state.url);
        if (firebase.auth().currentUser.displayName === 'User') {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).update(
                {
                    URL: this.state.url,
                }
            ).then(() => {
                console.log('INSERTED USER!');
            }).catch((error) => {
                console.log(error);
            });
        }
        if (firebase.auth().currentUser.displayName === 'Specialiste') {
            firebase.database().ref('Specialiste/' + firebase.auth().currentUser.uid).update(
                {
                    URL: this.state.url,
                }
            ).then(() => {
                console.log('INSERTED SPECIALISTE!');
            }).catch((error) => {
                console.log(error);
            });
        }  
    }
   /* async componentDidMount() {
        await Font.loadAsync({
            'JostRegular': require('./Ressource/Fonts/Jost-Regular.ttf'),
            'LemonadaLight': require('./Ressource/Fonts/Lemonada-Light.ttf'),
        });
    }*/
    async  PushImageURI(key) {
        const ref = firebase.storage().ref('images/Photo_Profile_'+key);
        const url = await ref.getDownloadURL();

        this.setState({
            url,
        });   
         console.log("la valeur de url durant le update");
         console.log(this.state.url);
          
    }
    Next() {
        Actions.login()
    }
    render() {

        return (
             
            <View style={styles.container}>
                
                <Text style={styles.text2}>
                    C'est presque fini  ! 
                </Text>
                <Text style={styles.text2}>
                    Choisissez votre photo de profil 
                </Text>
                <View style={styles.iconeCamera}>
                    <View style={{ marginTop: 20,  }}>
                        <FontAwesome name="plus" size={40} color="black" />
                    </View>
                    <View style={{ marginLeft: 10, }}>
                        <Entypo name="camera" size={60} color="black" onPress={() => { this.onChooseImagePress(firebase.auth().currentUser.uid); this.PushImageURI(firebase.auth().currentUser.uid);}}/>
                    </View>
                    
                </View>
                
                <TouchableOpacity  onPress={() => { this.PushImageURI(firebase.auth().currentUser.uid); this.Next(); }}>
                    <View style={styles.ContainerNext}>
                        <Text style={styles.text}>
                            Suivant
                        </Text>
                        <View>
                            <AntDesign name="arrowright" size={30} color="white" />
                        </View>
                    </View> 
                    </TouchableOpacity>
                </View> 
          
        );

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',  
        //justifyContent: 'center',
       // marginTop: 200,
        alignItems: 'center',
        marginTop : 100 ,
    },
    iconeCamera: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 8,
        borderRadius: 100,
        //alignItems: 'center',

        paddingHorizontal: 10 ,
        paddingVertical: 10,
        marginBottom: 70,
        marginTop : 50 ,


    },
    container1: {

        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,

    },

    text: {
       color: 'white',
        fontSize: 25,
        //fontFamily: 'JostRegular',

    },
    ContainerNext: {
          
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',    
        borderRadius: 8,
        backgroundColor: '#e60000',
        marginHorizontal : 130 ,
        //fontFamily: 'JostRegular',
        marginVertical: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        
    },
    text2: {
       
        alignItems: 'center',
        fontSize: 20,
        //fontFamily: 'JostRegular',
        justifyContent: 'center',    

    }
  

});