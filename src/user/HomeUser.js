import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Animated,
  Easing
} from 'react-native';
import Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Logout from './../../assets/logout.png'


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      topPosition:new Animated.Value(10)
    };
  }
   _loadServices(){
    let ref = Firebase.database().ref('Metiers/');
    const list=[];
    ref.once('value', snapshot => {
      
      snapshot.forEach(doc=>{
        list.push({
          id:doc.key,
          title:doc.toJSON().Designation,
          image:"../../assets/services_"+doc.toJSON().Designation+".png"
        })
      });
      this.setState({data:list});
    })
  }
  componentDidMount(){
    this._loadServices();
    Animated.timing(
      this.state.topPosition,{
        toValue:0,
        duration:3000,
        easing:Easing.linear
      }
    ).start()
  }
  clickEventListener(item) {
    Alert.Alert(item.title)
  }
  _imgTodisp(arg){
    if(arg==='Médecin'){
      return(
          <TouchableOpacity style={styles.card} onPress={()=>{Actions.search({metier:arg})}}>
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={require('../../assets/services_Médecin.png')} />
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{arg}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              )
    }
    else if(arg==='Technicien'){
      return(
            <TouchableOpacity style={styles.card} onPress={()=>{Actions.search({metier:arg})}}>
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={require('../../assets/services_Technicien.png')} />
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{arg}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              )
    }else if(arg==='Chauffeur'){
      return(
      <TouchableOpacity style={styles.card} onPress={()=>{Actions.search({metier:arg})}} >
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={require('../../assets/services_chauffeur.png')} />
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{arg}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              )
    }
    else{
      return(
      <TouchableOpacity style={styles.card} onPress={()=>{Actions.search({metier:arg})}}>
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={require('../../assets/services_Plombier.png')} />
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{arg}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              )}
  }

  render() {
    return (
      <View style={styles.main}>
      <View style={styles.upper}>
          <Image style={styles.image} source={require('../../assets/logo_sans.png')} />
          <Text style={{fontSize:18,marginLeft:5}}>qu'est-ce que vous cherchez? </Text>
      </View>
      <Animated.View style={[styles.container,{top:this.state.topPosition}]}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return this._imgTodisp(item.title)
          }}/>
      </Animated.View>
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
    );
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
  main:{
    flex:1,
  },
  upper:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  image:{
    height:60,
    width:60,
    marginRight:5
  },
  container:{
    flex:3,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor:"white",
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 70,
    width: 70,
    alignSelf:'center'
  },
  title:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
}); 