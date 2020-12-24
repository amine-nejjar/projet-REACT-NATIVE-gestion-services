import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, Title, Root, Icon, Header, Left, Right, Body } from 'native-base';
import firebase from 'firebase'
import logo from './../../assets/user.png'
import { Actions, Reducer } from 'react-native-router-flux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Logout from './../../assets/logout.png'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        const user = firebase.auth().currentUser;

        this.state = ({
            items: [],
            loading: true,
            user_id: user.uid,
            nom: '',
            prenom: '',
            metier: '',
            email: '',
            age: '',
            quartier: '',
            telephone: '',
            ville: '',
            URL:"",
            loading : true
        })
    }
    goBack(){
        Actions.pop();
    }
    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          });
          this.setState({loading:false})
        firebase.database().ref('Specialiste/' + this.state.user_id).on('value', snapshot => {
            var URL = snapshot.val().URL
            if(URL==undefined){
                URL=""
            }
            this.setState({ nom: snapshot.val().Nom,prenom: snapshot.val().Prenom,URL:URL });
          
        });
    }
    render() {
        if(this.state.loading){
            return(<Root><AppLoading/></Root>)
        }else{
        return (
            <View style={styles.main_container}>

                <Header style={{ backgroundColor: '#e41b23' }}>
                    
                    <Body style={{justifyContent:"center", alignItems:"center"}}>
                        <Title>Menu principal</Title>
                    </Body>

                </Header>
                <View style={styles.avatar}>
                    <Image style={styles.image} source={{uri:this.state.URL}} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.name}>Bienvenu {this.state.prenom}!</Text>
                </View>


                <View style={styles.req}>
                    <Button style={{ marginTop: 40, width: 140, justifyContent: 'center', backgroundColor: "#e41b23" }}
                        rounded onPress={() => { Actions.home({ eid: this.state.user_id }) }}><Text style={{ fontSize: 18,color:"white" }}>Mes services</Text></Button>
                    <Button style={{ marginTop: 20, width: 140, justifyContent: 'center', backgroundColor: "#e41b23" }}
                        rounded onPress={() => { Actions.profile({ eid: this.state.user_id }) }}><Text style={{ fontSize: 18,color:"white" }}>Mon profile</Text></Button>
   
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

        )}
    }
};
const styles = StyleSheet.create({
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 40,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    main_container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    

    },
    rating: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    services: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button_container: {
        borderColor: "#72B48E",
        borderWidth: 2,
        borderRadius: 10,
        marginRight: 7,
        marginLeft: 7,
        marginTop: 10,
        justifyContent: 'center'
    },
    button_title: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#e41b23"
    },
    image: {
        height: 110,
        width: 110,
        backgroundColor: "grey",
        borderRadius: 200,
    },
    upside: {
        flex: 6,
        flexDirection: "column"
    },
    downside: {
        flex: 4,
        flexDirection: "row"
    },
    dev: {
        backgroundColor: "grey",
        height: 1.2,
        marginRight: 30,
        marginLeft: 30

    },
    avatar: {
        flex: 2,
        alignItems: "center",
        marginTop: 40

    },
    infos: {
        flex: 5,
        alignItems: "center"
    },
    req: {
        flex: 5,
        marginTop: 40,
        alignItems: 'center'

    },
    name: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 2,
        alignItems: 'center',


    },
    metier: {
        color: "grey",
        fontSize: 16,
        padding: 4,
        marginLeft: 10
    }, form: {
        padding: 20,
        flex: 1,
        marginLeft: 10
    },
})