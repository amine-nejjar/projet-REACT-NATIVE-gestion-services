import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { Form, Input, Item, Label, Button} from 'native-base'
import add from './../../assets/add.png'
import remove from './../../assets/remove.png'
import firebase from 'firebase';
import { TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const redColor = '#e41b23';
const MetierRef = firebase.database().ref().child('Metiers');

export default class DisplayMetier extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            metiers: [],
            openModal: false,
            newMetier: '',
        });
    }

    componentWillMount() {
        MetierRef.on('value', (data) => {
            const metier = [];
            data.forEach((doc) => {
                metier.push({
                    key: doc.key,
                    designation: doc.toJSON().Designation,
                });
                this.setState({
                    metiers: metier
                });
            });
        });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: redColor,
                    
                }}
            />
        );
    };

    addMetier(metier){
        if(metier==''){
            alert("Veuillez saisir la désignation du metier!")
        }else{
            firebase.database().ref('Metiers/').push({
                Designation: metier,
              }).then((data)=>{
                this.setState({ newMetier: ''})
                alert("Metier ajouté")
              }).catch((error)=>{
                console.log('can\'t add the metier')
              })
        }
    }

    removeMetier(key) {
        firebase.database().ref('Metiers/' + key).remove();
    }
    
    handleSubmit(event) {
        event.preventDefault();
    }
    
    render() {
        return (
            <View style={styles.MainContainer}>
                <Modal 
                visible={this.state.openModal} 
                animationType='slide'
                transparent = {true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContents}>
                            <Form style={styles.form} onSubmit={this.handleSubmit}>
                                <Item floatingLabel>
                                    <Label>Désignation: </Label>
                                    <Input
                                        secureTextEntry={false}
                                        autoCapitalize="none"
                                        onEndEditing=''
                                        onChangeText= {(newMetier)=> this.setState({newMetier})}
                                    />
                                </Item>
                                <TouchableOpacity onPress={()=>{this.addMetier(this.state.newMetier)}}>
                                    <Button style= {{marginTop: 40, width: 140, justifyContent: 'center', backgroundColor : "#e41b23"}}
                                        rounded
                                        >
                                        <Text style={{color : 'white'}}>Ajouter</Text>
                                    </Button>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {this.setState({openModal : false})}}><Text style={{fontSize: 16, color: 'grey', paddingTop: 10 }}>Annuler</Text></TouchableOpacity>
                            </Form>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={this.state.metiers}
                    keyExtractor={(item, index) => item.key}
                    renderItem={({ item, index }) => {
                        if(this.state.metiers.length==0){
                            return (
                                <View>
                                    <Text>Viiiiiiiide{console.log("viiiide")}</Text>
                                </View>
                            );
                        }else{
                            return (
                                <TouchableWithoutFeedback>
                                    <View style={styles.ContainerList}>
                                        <Text style={styles.flatListStyleitem}>
                                            {item.designation}
                                        </Text> 
                                        <TouchableOpacity onPress = { ()=> {this.removeMetier(item.key)}}>
                                            <Image source={remove} style={{width: 18, height: 18}}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback >
                            );
                        }
                    }}
                    ItemSeparatorComponent={this.renderSeparator}
                >
                </FlatList>
                <TouchableOpacity
                activeOpacity={0.6}
                onPress = {()=> this.setState({openModal : true})}
                style={styles.TouchableOpacityStyle}>
                    <Image
                        source={add}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
            </View>
        );
      }
    }
    
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
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
    ContainerList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        width: 250,
        height: 40,
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    flatListStyleitem: {
        fontSize: 20,
        margin: 5,
        fontFamily: 'JostRegular',
        marginLeft : 20,
       
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
        padding: 20,
        borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignItems: 'center',
        padding: 20,
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