import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, Linking} from 'react-native'
import { Divider, Button,Icon } from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';

class ProfileView extends React.Component{
    _callSpecialist(phone){
        Linking
        .openURL('tel:'+phone)
    }

    render(){
        const user=this.props.user
        const displayProfile = this.props.displayDetail
        var dist=user.Distance
        if(dist==undefined){
            dist=""
        }
        return(
                <Card style={styles.card} elevation={15} cornerRadius={15} onPress={() => displayProfile(user.key)}>
                    <View style={styles.avatar}>
                        <Image style={styles.image} source={{uri:user.URL}} />
                    </View>
                    <TouchableOpacity style={styles.info} onPress={() => displayProfile(user.key,user.Rating)}>
                        <Text adjustsFontSizeToFit={true} style={styles.name}>{user.Prenom} {user.Nom}</Text>
                        <Text style={styles.metier}>{user.Metier}</Text>
                        <View style={styles.distances}>
                            <Icon name="location" size={18} type="evilicon"/>
                            <Text style={styles.distance_txt}> {dist}Km loin</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.actions}>
                        <View style={styles.rating}>
                            <Icon color={"red"} size={20} name="star" type="feather"/>
                            <Text style={styles.rate}> {user.Rating}</Text>
                        </View>
                    </View>
                </Card>
        )
    }
}
const styles=StyleSheet.create({

    card:{
        height:90,
        marginVertical:15,
        marginHorizontal:20,
        flexDirection:"row",
    },
    container:{
        marginHorizontal:20
    },
    avatar:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        height:70,
        width:70,
        borderRadius:100
    },
    info:{
        flex:2,
        marginVertical:12
    },
    actions:{
        flex:1,
        
    },
    name:{
        flex:2,
        fontSize:16,
        fontWeight:"bold",
        fontFamily:"sans-serif"
    },
    metier:{
        flex:1,
        fontSize:12,
        fontStyle:"italic",
        paddingLeft:5,
        color:"gray"
    },
    distances:{
        flex:1,
        flexDirection:"row",
        alignItems:"flex-end"
    },
    distance_txt:{
        fontSize:12,
        textAlign:"left",
        fontStyle:"italic",
        fontWeight:"bold",
        color:"gray"
    },
    rating:{
        flexDirection:"row",
        marginVertical:12,
        alignItems:"flex-end"
    },
    rate:{
        fontWeight:"bold",
        fontSize:16,
        color:"red"

    }


    
})

export default ProfileView