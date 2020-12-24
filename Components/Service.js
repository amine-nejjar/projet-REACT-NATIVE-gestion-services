import React from 'react';
import { StyleSheet, Text, View, Image, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'
import { Component } from 'react';

import edit from './../assets/draw.png' 
import remove from './../assets/remove.png' 


const redColor = '#e41b23';

export default class Service extends Component {
    render() {
      return (
        <View style={styles.Container}>
            <View style={{flexDirection: 'row',}}>
                <Text style={styles.title}>The title</Text>
            </View>
            <View style={{flexDirection: 'row-reverse',}}>
                <Text style={styles.price}>Prix:  100$</Text>
            </View>
            <View>
                <Text style={styles.description}>he you will find a little description about the service and I'm just writing becuz I wanna test the this are when it's full I mean witch a lot of letters how react will manage it :p</Text>
            </View>
            <View style={{flexDirection: 'row-reverse',}}>
                <TouchableOpacity>
                    <Image source={edit} style={styles.edit_delete}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={remove} style={styles.edit_delete}/>
                </TouchableOpacity>
            </View>
        </View>
      )
    }
  }

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
        paddingRight: 10,
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
        elevation: 5,
    }

})

