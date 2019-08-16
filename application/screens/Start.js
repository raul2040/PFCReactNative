import React,{Component} from 'react';
import {View} from 'react-native';
import BackGroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation'; //NavigationActions sirve para cambiar de ruta básicamente
import Toast from 'react-native-simple-toast'; //Nos sirve para mostrar notificaciones al usuario
import * as firebase from 'firebase';
import facebookConfig from '../utils/facebook';
import googleConfig from '../utils/google';
import * as Facebook from 'expo-facebook';
import { Google } from 'expo';
import addDataToDB from '../utils/addDataToDB';

export default class Start extends Component {
    static navigationOptions = {
        title: 'Khacer! App'
    }
    login() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Login'
        })
        this.props.navigation.dispatch(navigateAction)
    }

    register() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Register'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    async facebook(){
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            facebookConfig.config.application_id,
            {permissions: facebookConfig.config.permissions}
         )
        if(type === 'success') {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credentials)
                .catch(error => {
                    Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
                })
        } else if (type === 'cancel') {
            Toast.showWithGravity('Inicio de sesión cancelado', Toast.LONG, Toast.BOTTOM);
        } else {
            Toast.showWithGravity('Error desconocido', Toast.LONG, Toast.BOTTOM);
        }
    }

    async google() {
        await Google.logInAsync(googleConfig.config)
            .then((result) => {
                addDataToDB(result)
                const credentials = firebase.auth.GoogleAuthProvider.credential(null, result.accessToken);
                firebase.auth().signInWithCredential(credentials)
                    .catch(error => {
                        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
                    })
            })
            .catch((error) => {
                Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM)
            })

    }
    render() {
        return(
            <BackGroundImage source={require('../../assets/images/login-bg.jpg')} >
                <View style={{justifyContent: 'center', flex: 1}}>
                    <AppButton
                        bgColor="rgba(111, 38, 74, 0.7)"
                        title="Entrar"
                        action={this.login.bind(this)}
                        iconName="sign-in"
                        iconSize={30}
                        iconColor="#fff"
                    />
                    <AppButton
                        bgColor="rgba(200, 200, 50, 0.7)"
                        title="Regístrarme"
                        action={this.register.bind(this)}
                        iconName="user-plus"
                        iconSize={30}
                        iconColor="#fff"
                    />
                     <AppButton
                        bgColor="rgba(67, 67, 146, 0.7)"
                        title="Facebook"
                        action={this.facebook.bind(this)}
                        iconName="facebook"
                        iconSize={30}
                        iconColor="#fff"
                    />
                    <AppButton
                        bgColor="rgba(67, 67, 146, 0.7)"
                        title="Google"
                        action={this.google.bind(this)}
                        iconName="google"
                        iconSize={30}
                        iconColor="#fff"
                    />
                </View>
            </BackGroundImage>
        )
    }
}