import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, ScrollView, Image } from 'react-native';
import { Container, Button, Title, Icon, Header, List, ListItem, Left, TextInput, Right, Body, Form, Item, Label, Input } from 'native-base';
import { Actions, Reducer } from 'react-native-router-flux';
import firebase from 'firebase'
export default class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);

        const user = firebase.auth().currentUser;

        console.log(user.displayName + "*************")

        this.state = ({
            items: [],
            loading: true,
            user_id: user.uid,
            nom: '',
            prenom: '',
            metier: '',
            email: '',
            age: '',
            telephone : '',
            ville : ''

        })
    }
    updatedata(sname, fname, age, eml, met,tel,vil) {
        firebase.database().ref('Specialiste/' + this.props.sid).update({ Nom: sname, Prenom: fname,
             Age: age, Email: eml, Metier: met,Telephone: tel, Ville : vil });
        console.log(this.props.QTY)
        this.goBack()
    }
    goBack() {
        Actions.pop();
    }


    componentDidMount() {
        firebase.database().ref('Specialiste/' + this.props.sid).on('value', snapshot => {
            this.setState({ nom: snapshot.val().Nom });
            this.setState({ prenom: snapshot.val().Prenom });
            this.setState({ age: snapshot.val().Age });
            this.setState({ email: snapshot.val().Email });
            this.setState({ metier: snapshot.val().Metier });
            this.setState({ telephone: snapshot.val().Telephone });
            this.setState({ ville: snapshot.val().Ville });



        });
    }
    render() {
        return (
            <ScrollView >
                <Header style={{ backgroundColor: '#e41b23' }}>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Modifier les données</Title>
                    </Body>

                </Header>
                <View style={styles.logoContainer}>

                </View>
                <Form style={styles.form}>

                    <Item floatingLabel>
                        <Label>Nom</Label>
                        <Input
                            secureTextEntry={false}
                            autoCapitalize="none"
                            value={this.state.nom}
                            onChangeText={(nom) => this.setState({ nom })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Prenom</Label>
                        <Input
                            secureTextEntry={false}
                            autoCapitalize="none"
                            keyboardType='numeric'
                            value={this.state.prenom}
                            type="text" pattern="[0-9]*"
                            onChangeText={(prenom) => this.setState({ prenom })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Age</Label>
                        <Input
                            secureTextEntry={false}
                            autoCapitalize="none"
                            value={this.state.age}
                            onChangeText={(age) => this.setState({ age })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            secureTextEntry={false}
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Metier</Label>
                        <Input
                            secureTextEntry={false}
                            autoCapitalize="none"
                            value={this.state.metier}
                            onChangeText={(metier) => this.setState({ metier })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Metier</Label>
                        <Input
                            secureTextEntry={false}
                            autoCapitalize="none"
                            value={this.state.telephone}
                            onChangeText={(telephone) => this.setState({ telephone })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Ville</Label>
                        <Input
                            secureTextEntry={false}
                            autoCapitalize="none"
                            value={this.state.ville}
                            onChangeText={(ville) => this.setState({ ville })}
                        />
                    </Item>
                    <Button style={{ marginTop: 40, width: 160, justifyContent: 'center', backgroundColor: "#e41b23" }}
                        rounded onPress={() => { this.updatedata(this.state.nom, this.state.prenom, this.state.age,this.state.email,this.state.metier,this.state.telephone,this.state.ville); this.goBack }}><Text style={{ fontSize: 18,color:"white" }}>Modifier</Text></Button>
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
        padding: 10,

    },
    inputBox: {
        width: 300,
        height: 50,
        backgroundColor: '#855922',
        borderRadius: 25,
        paddingHorizontal: 16,
        color: '#000000',
        marginVertical: 10,
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