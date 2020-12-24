import React, {component, Component} from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from '../src/Login';
import Signup from '../src/Signup';
import Account from '../src/Account';
import Home from '../src/service/HomeSpecialiste';
import AddService from '../src/service/AddService';
import UpdateService from '../src/service/UpdateService';
import MenuAdmin from '../src/admin/MenuAdmin';
import DemandeAdhesion from '../src/admin/DemandeAdhesion';
import DisplayListeSpecialiste from '../src/admin/DisplayListeSpecialiste';
import Search from '../src/user/Search';
import SpecialisteProfile from '../src/user/specialistProfile'
import HomeUser from '../src/user/HomeUser'
import PickImage from '../src/PickImage'
import home from '../src/service/Home'
import ViewProfile from '../src/service/ViewProfile'
import UpdateProfile from '../src/service/UpdateProfile'
import DisplayMetier from '../src/admin/DisplayMetier';

export default class Routes extends Component{
    render(){
        return (
            <Router>
                <Stack key='root' hideNavBar={true} >
                   <Scene key="login" component={Login} title='Login'  initial={true}/>
                   <Scene key="signup" component={Signup} title='Signup' /> 
                   <Scene key="account" component={Account} title='Account' /> 
                   <Scene key="home" component={Home} title='HomeSpecialiste' /> 
                   <Scene key="updateservice" component={UpdateService} title='UpdateService' />
                   <Scene key="addservice" component={AddService} title='AddService' /> 
                   <Scene key="menuAdmin" component={MenuAdmin} title='MenuAdmin' /> 
                   <Scene key="displayListeSpecialiste" component={DisplayListeSpecialiste} title='DisplayListeSpecialiste' /> 
                   <Scene key="demandeAdhesion" component={DemandeAdhesion} title='DemandeAdhesion' /> 
                   <Scene key="search" component={Search} title='Search' /> 
                   <Scene key="specialisteProfile" component={SpecialisteProfile} title='SpecialisteProfile' /> 
                   <Scene key="HomeUser" component={HomeUser} title='HomeUser' /> 
                   <Scene key="PickImage" component={PickImage} title='PickImage' /> 
                   <Scene key="homespec" component={home} title='Home' /> 
                   <Scene key="profile" component={ViewProfile} title='ViewProfile' />
                   <Scene key="editprofile" component={UpdateProfile} title='UpdateProfile' /> 
                   <Scene key="displayMetier" component={DisplayMetier} title='DisplayMetier' />
                </Stack>
            </Router>
        );
    }
}