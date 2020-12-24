import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as Font from 'expo-font';
import firebase from 'firebase';
import { TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import ProfileView from '../../Components/profileView'


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


// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const rootRef = firebase.database().ref();
const SpecialisteRef = rootRef.child('Specialiste');

export default class DisplayListeSpecialiste extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            specialiste: [],
            newAnimalName: '',
            search: '',

        });

    }
    componentWillMount() {

        SpecialisteRef.on('value', (data) => {
            const specialiste = [];
            console.log(data.toJSON());
            data.forEach((doc) => {
                var URL = doc.toJSON().URL
                if(URL==undefined){
                    URL=""
                }
                if (doc.toJSON().enabled === 1) {
                    specialiste.push({
                        key: doc.key,
                        Prenom: doc.toJSON().Prenom,
                        Nom: doc.toJSON().Nom,
                        Metier:doc.toJSON().Metier,
                        Email: doc.toJSON().Email,
                        URL:URL,
                        Rating:5
                    });
                }

                this.setState({
                    specialiste: specialiste.sort((a, b) => {
                        return (a.specialiste < b.specialiste);
                    }),

                });
            });


        });
    }
    /*onPressAdd = () => {
        if (this.state.newAnimalName.trim() === '') {
             alert('blank');
             return;
         }
        SpecialisteRef.push({
            FirstName: this.state.newAnimalName
        });
    }*/
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 3,
                    width: "98%",
                    backgroundColor: "black",
                    marginLeft: "1%"
                }}
            />
        );
    };
   renderHeader = () => {
       return <SearchBar
           round
           searchIcon={{ size: 24 }}
           placeholder="Type Here..."
           containerStyle={{  }}
           lightTheme={true}
           textsinputStyle={{ fontFamily: 'JostRegular' }}
          

             />;
    };
    remove(key) {
        firebase.database().ref('Specialiste/' + key).remove();
    }
    //Loading police 
    async componentDidMount() {
        await Font.loadAsync({
            'JostRegular': require('./../../Ressource/Fonts/Jost-Regular.ttf'),
        //    'LemonadaLight': require('./Ressource/Fonts/Lemonada-Light.ttf'),
        });
    }
    Next() {
        Actions.DisplayMap()
    }
    _displaySpecialistProfile = (idSpecialist,Rate)=>{
		console.log("Display profile for id :" + idSpecialist)
	}
    render() {
        
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.specialiste}
                    keyExtractor={(item) => item.key}
                    renderItem={({item}) => <ProfileView user={item} displayDetail={this._displaySpecialistProfile} />}
                    style={{flex:1}}
                    ListHeaderComponent={this.renderHeader}
                >
                </FlatList>

            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',        
        marginTop: 50,
        //marginBottom: 100 ,
        justifyContent: 'center',
    },
    ContainerList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flatListStyleitem: {
        fontSize: 30,
        margin: 5,
        fontFamily: 'JostRegular',
        marginLeft : 20,
       
    },
    ContainerIcone: {
        marginRight : 20 ,
    }
});




/*                <TextInput
                    keyboardType='default'
                    placeholder='entre le nom annimal '
                    placeholderTextColor='White'

                    onChangeText={
                        (text) => {
                            this.setState({ newAnimalName: text });
                        }
                    }
                    value={this.state.newAnimalName}
                />

                <Button title="Show List" onPress={this.onPressAdd} />
                */
/* onPress={() => { this.remove(item.key) }} */