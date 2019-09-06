import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import BackGroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation'; //NavigationActions sirve para cambiar de ruta básicamente
import Toast from 'react-native-simple-toast'; //Nos sirve para mostrar notificaciones al usuario
import * as firebase from 'firebase';
import facebookConfig from '../utils/facebook';
import googleConfig from '../utils/google';
import * as Facebook from 'expo-facebook';
import { Google } from 'expo';
import controller from '../utils/controller';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import FormValidation from '../utils/validation';
import { SocialIcon, Card, Button, Icon } from 'react-native-elements'

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

    async facebook() {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            facebookConfig.config.application_id,
            { permissions: facebookConfig.config.permissions }
        )
        if (type === 'success') {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credentials)
                .then((usr) => {
                    controller.registerUser('facebook', usr)
                })
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
                const credentials = firebase.auth.GoogleAuthProvider.credential(null, result.accessToken);
                firebase.auth().signInWithCredential(credentials)
                    .then((usr) => {
                        controller.registerUser('google', usr);
                    })
                    .catch(error => {
                        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
                    })
            })
            .catch((error) => {
                Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM)
            })

    }

    render() {
        return (
            <BackGroundImage source={require('../../assets/images/salchicha.jpg')}>
                <View style={{ height: '100%', justifyContent:'flex-end'}}>
                    <SocialIcon
                        title='Continua con Facebook'
                        type='facebook'
                        button
                        onPress={this.facebook.bind(this)}
                    />
                    <SocialIcon
                        title='Continua con Google'
                        button
                        type='google-plus-official'
                        onPress={this.google.bind(this)}
                    />
                    <SocialIcon
                        title='Regístrate'
                        button
                        onPress={this.register.bind(this)}
                        style={{ backgroundColor: 'rgba( 250, 232, 50, 0.9)' }}
                    />
                    <Button
                        title="¿ya tienes cuenta? Inicia sesión"
                        type="clear"
                        onPress={this.login.bind(this)}
                    />
                </View>
            </BackGroundImage>
        )
    }
}