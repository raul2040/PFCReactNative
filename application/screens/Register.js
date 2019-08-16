import React, {Component} from 'react';
import  {View} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import {Card} from 'react-native-elements';
import Toast from 'react-native-simple-toast';

import t from  'tcomb-form-native'; 
const Form = t.form.Form;
import FormValidation from '../utils/validation';

import * as firebase from 'firebase';


export default class Register extends Component{
    constructor() {
        super();

        this.state = {
            user: {}
        }

        this.samePassword = t.refinement(t.String, (s) => {
            return s === this.state.user.password
        });


        // here we are: define your domain model
        this.user = t.struct({
            email: FormValidation.email,
            password: FormValidation.password,
            password_confirmation: this.samePassword
        });

        this.options = {
            fields :{
                email: {
                    help: 'Introduce un email',
                    error: 'Email incorrecto',
                    autoCapitalize: 'none'
                },
                password: {
                    help: 'Introduce un password',
                    error: 'Password incorrecto',
                    password: true,
                    secureTextEntry: true
                },
                password_confirmation: {
                    help: 'Repite el password',
                    error: 'Los passwords no coinciden',
                    password: true,
                    secureTextEntry: true
                }
            }
        };
        this.validate = null;
    }

    register() {
        this.validate = this.refs.form.getValue();
        if(this.validate) {
            firebase.auth().createUserWithEmailAndPassword(
                this.validate.email, this.validate.password
            )
            .then(() => {
                Toast.showWithGravity('Registro correcto, Bienvenido', Toast.LONG, Toast.BOTTOM);
            })
            .catch((error) => {
                Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
            })
        }
    }

    onChange(user) {
        this.setState({user});
    }

    render() {
        return(
            <BackgroundImage source={require('../../assets/images/login-bg.jpg')}>
                <View>
                    <Card title='Regístrate'>
                        <Form
                            ref='form'
                            type={this.user}
                            options={this.options}
                            onChange={(v) => this.onChange(v)}
                            value={this.state.user}
                        />   
                        <AppButton
                            bgColor="rgba(200, 200, 50, 0.9)"
                            title="Regístrarme"
                            action={this.register.bind(this)}
                            iconName="user-plus"
                            iconSize={30}
                            iconColor="#fff"
                        />  
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
}