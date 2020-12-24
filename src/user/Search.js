import React from 'react'
import { cos, sin, acos } from 'mathjs';
import ProfileView from '../../Components/profileView'
// import {getUsersWithTxt} from '../Data/Database'
import firebaseConfig from '../../Data/Database'
import Firebase from 'firebase'
import { Actions } from 'react-native-router-flux';

import {StyleSheet, View, TextInput, Button, FlatList,Text, ActivityIndicator,Dimensions } from 'react-native'
import {Card} from 'react-native-shadow-cards';
import { Icon, Overlay,ButtonGroup,Header } from 'react-native-elements'
import _ from 'lodash'

class Search extends React.Component {
	constructor(props) {
		super(props)
		if (!Firebase.apps.length) {
			Firebase.initializeApp(firebaseConfig);
			  }
		this.searched_text=""
		this.state ={users: [],
					test : [],
					isLoading:false,
					visible:false,
					index:0,
					latitude:0,
					longitude:0
		}
	  }
	  componentDidMount(){
		
		this._loadUsers("");
	  }
	  componentWillMount(){
		var id=Firebase.auth().currentUser.uid
		let ref = Firebase.database().ref('users/'+id)
		ref.once('value', snapshot => {
				this.setState({latitude:snapshot.toJSON().latitude,
								longitude:snapshot.toJSON().longitude
							})
	  	})
	}
	_displaySpecialistProfile = (idSpecialist,Rate)=>{
		Actions.specialisteProfile({id:idSpecialist,Rate:Rate}); //this.props.navigation.navigate("SpecialistProfile", {idSpecialist: idSpecialist })
	}
	_calcRate(list){
		var rt=0;
		var rtf;
		list.forEach(elt=>{rt=rt+elt});
		rtf=rt.list.length;
		var round=Math.round(rtf * 10) / 10
		return round
	}
	
	_loadUsers = ()=> {
		this.setState({isLoading:true});
		var spec=[];
		let ref = Firebase.database().ref('Specialiste/').orderByChild("Metier").equalTo(this.props.metier);

		ref.once('value', snapshot => {
			snapshot.forEach((doc)=>{
				const full=doc.toJSON().Nom.toUpperCase()+" "+doc.toJSON().Prenom.toUpperCase()
				const first=doc.toJSON().Nom.toUpperCase()
				const second=doc.toJSON().Prenom.toUpperCase()
				const txt= this.searched_text.toUpperCase()
				const n1=full.startsWith(txt)
				const n2=first.startsWith(txt)
				const n3=second.startsWith(txt)
				if(n1 || n2 || n3 ){
				var rates=doc.toJSON().Rating;
				var rounded
				if(rates!=undefined){
					const keys=Object.values(rates);
					var fin=[];
					for(const key of keys){
						const val=Object.values(key);
						fin=fin.concat(val);
					}
					var rt=0;
					var rtf;
					fin.forEach(elt=>{rt=rt+elt});
					rtf=rt/fin.length
					rounded = Math.round(rtf * 10) / 10}
				else{
					rounded=0
				}
				var URL=doc.toJSON().URL
				if(URL==undefined){
					URL=""
				}
				var D = 6371 * acos(cos(this.state.latitude * 0.0174533) * cos(doc.toJSON().latitude * 0.0174533) * cos(0.0174533 * (this.state.longitude - doc.toJSON().longitude)) + sin(this.state.latitude * 0.0174533) * sin(doc.toJSON().latitude * 0.0174533));
				D= D.toFixed(1)
				spec.push({
					key:doc.key,
					Prenom:doc.toJSON().Prenom,
					Nom:doc.toJSON().Nom,
					Email:doc.toJSON().Email,
					Age:doc.toJSON().Age,
					Metier:doc.toJSON().Metier,
					Rating:rounded,
					Ville:doc.toJSON().Ville,
					Telephone:doc.toJSON().Telephone,
					URL:URL,
					Distance: D
				})}
				function compareD(a,b){
					if ( a.Distance < b.Distance ){
						return -1;
					  }
					  if ( a.Distance > b.Distance ){
						return 1;
					  }
					  return 0;
				}
				function compareR( a, b ) {
					if ( a.Rating > b.Rating ){
					  return -1;
					}
					if ( a.Rating < b.Rating ){
					  return 1;
					}
					return 0;
				  }
				if(this.state.index==0){
					spec.sort(compareR)
				}
				else{
					spec.sort(compareD)
				}
				
			});
			this.setState({test:spec,
					isLoading:false}
					);
			}) 
			
	}; 
	_displayLoading(){
		if(this.state.isLoading){
			return(
			<View style={styles.loading_container}>
				<ActivityIndicator size="large"/>
			</View>)
		}
	}
	_searchTextChanged = _.debounce((text) => {
		this.searched_text=text
		this._loadUsers(text);
	}, 1000)
	_updateIndex=(index)=>{
		this.setState({index:index})
	}
	_filterChanged(){
		this.setState({visible:false})
		this._loadUsers()
	}
	_DisplayFilter(){

        return(
        <Overlay visible={this.state.visible}  onClose={this.onClose} closeOnTouchOutside>
			<View style={styles.filter}>
                <Text>choisissez votre filtre</Text>
				<ButtonGroup
				underlayColor="#e53935"
				onPress={this._updateIndex}
				selectedIndex={this.state.index}
				buttons={[ 'Performance','Distance']}
				containerStyle={{height: 30}} />
				<View style={{flexDirection:"row",justifyContent:"space-between",width:140}}>
				<Button title="fermer" style={{width:50}} onPress={()=>{this.setState({visible:false})} }/>
				<Button title="choisir" color="#e53935" style={{width:50}} onPress={()=>{this._filterChanged()} }/>
				</View>
			</View>
		</Overlay>)
		 
	}
	
	render() {
	return (
		
		<View style={styles.main_container}>
			<Header
				leftComponent={<Icon name="arrowleft" type="antdesign" color="white" size={26} onPress={()=>{Actions.pop()}}/>}
				centerComponent={{ text: 'Trouvez un spécialiste', style: { color: '#fff', fontSize:16 } }}
				rightComponent={{ icon: 'home', color: '#fff' }}
				containerStyle={{
					backgroundColor: '#e53935',
					justifyContent: "center",
					paddingTop:0,
					alignItems:"center",
					height:50,
					elevation:25,
					marginBottom:10
					}}
			/>
			<Card style={styles.searchBar} elevation={15} >
				<Icon name="search1" type="antdesign" style={{flex:1,justifyContent:"center"}}/>	
				<TextInput style={{flex:7,marginHorizontal:10}} placeholder="Chercher un spécialiste" onChangeText={(text)=> this._searchTextChanged(text)} />
				<View style={styles.try} >
				<Icon name="settings" type="octicon" onPress={() => {this.setState({visible:true})}} /></View>
			</Card>
			<FlatList
			data={this.state.test}
			keyExtractor={(item) => item.key}
  			renderItem={({item}) => <ProfileView user={item} displayDetail={this._displaySpecialistProfile} />}
			style={{marginTop:20}}
        	/>
			{this._DisplayFilter()}
			{this._displayLoading()}
		</View>
	  )
	}
  }
  
  const styles = StyleSheet.create({
	main_container: {
	  flex: 1,
	  backgroundColor:"white",
	  
	//   top:50
	},
	filter:{
		height:170,
		width:250,
		alignItems:"center",
		justifyContent:"space-evenly"
	},
	searchBar:{
		height:50,
		marginHorizontal:20,
		flexDirection:"row",
		paddingHorizontal:6
		
	},
	try:{
		flex:1,
		justifyContent:"center"
	},
	search:{
		marginLeft:10,
		marginRight:10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,  
		elevation: 5,
		backgroundColor:"white"
	},
	textinput: {
		marginLeft: 5,
		marginRight: 5,
		height: 50,
	  	borderColor: 'black',
	  	borderWidth: 1,
		paddingLeft: 5,
	},
	loading_container:{
		position:'absolute',
		left:0,
		right:0,
		top:100,
		bottom:0,
		alignItems:'center',
		justifyContent:'center'
	}
  })
export default Search