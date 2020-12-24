import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as Font from 'expo-font';
import firebase from 'firebase';
import { TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';


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

export default class DemandeAdhesion extends Component {

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
                if (doc.toJSON().enabled === 0) {
                    specialiste.push({
                        key: doc.key,
                        FirstName: doc.toJSON().Prenom,
                        LastName: doc.toJSON().Nom,
                        Email: doc.toJSON().Email,
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
            containerStyle={{}}
            textsinputStyle={{ fontFamily: 'JostRegular' }}


        />;
    };
    Addmettre = (key) => {
        firebase.database().ref('Specialiste/' + key).update({
            enabled : 1 
        });
    };
    //Loading police 
    async componentDidMount() {
        await Font.loadAsync({
            'JostRegular': require('./../../Ressource/Fonts/Jost-Regular.ttf'),
            //'LemonadaLight': require('./../Ressource/Fonts/Lemonada-Light.ttf'),
        });
    }
    Next() {
        Actions.DisplayMap()
    }
    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.specialiste}
                    keyExtractor={(item, index) => item.key}
                    renderItem={({ item, index }) => {
                        return (
                            
                                <View style={styles.ContainerList}>
                                    <Text style={styles.flatListStyleitem}>
                                        {item.FirstName }
                                        {item.LastName}
                                        
                                </Text>
                                <TouchableOpacity onPress={() => { this.Addmettre(item.key)}}>
                                    <Text style={styles.text1}>
                                        <AntDesign name="checkcircle" size={15} color="white" />                                         
                                           Admettre   
                                          
                                       </Text>
                                    </TouchableOpacity>
                                    
                                </View>
                       
                        );
                    }}
                    ItemSeparatorComponent={this.renderSeparator}
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
        marginLeft: 20,

    },
    text1: {
        marginRight : 15 ,
        paddingVertical: 3,
        fontSize: 18,
        paddingHorizontal: 5 ,
        borderRadius: 8,
        backgroundColor: '#e60000',
        fontFamily: 'JostRegular',
        color: 'white',
    },
    ContainerIcone: {
        marginRight: 20,
    }
});