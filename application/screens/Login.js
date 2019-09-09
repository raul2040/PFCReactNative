import React, { Component } from 'react';
import { View, AsyncStorage} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import t from 'tcomb-form-native';
import FormValidation from '../utils/validation';
import { Card, CheckBox } from 'react-native-elements';
const Form = t.form.Form;
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';
import controller from '../utils/controller';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            isCompany: false
        }
        // Definimos el esqueleto del formulario y sus opciones.
        this.user = t.struct({
            email: FormValidation.email,
            password: FormValidation.password
        })
        this.options = {
            fields: {
                email: {
                    help: 'Introduce tu email',
                    error: 'Email incorrecto',
                    autoCapitalize: 'none'
                },
                password: {
                    help: 'Introduce tu password',
                    error: 'Password incorrecto',
                    password: true,
                    secureTextEntry: true  //Simplemente para referenciar que este campo va a mostrar *  en lugar de los caracteres.
                }
            }
        };
    }
    async login() {
        const validate = this.refs.form.getValue(); // Así validamos el formulario
        const that = this;
        if (validate) {
            firebase.auth().signInWithEmailAndPassword(validate.email, validate.password)
                .then(async (data) => {
                    controller.initSession(that.state.isCompany, data.user.uid)
                    await that.isCompany();
                    Toast.showWithGravity('Bienvenido', Toast.LONG, Toast.BOTTOM) // Le pasamos el mensaje, la duración  y la posición.
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        Toast.showWithGravity('Password Incorrecto', Toast.LONG, Toast.BOTTOM);
                    }
                    else {
                        Toast.showWithGravity(errorMessage, Toast.LONG, Toast.BOTTOM);
                    }
                })
        }

    }

    async isCompany() {
        await AsyncStorage.setItem('isCompany', JSON.stringify(this.state.isCompany));
    }

    render() {
        return (
            <BackgroundImage source={require('../../assets/images/salchicha.jpg')}>
                <View>
                    <Card title="Iniciar sesión">
                        <Form
                            ref="form"
                            type={this.user}
                            options={this.options}
                        />
                        <CheckBox
                            center
                            title='Soy empresa'
                            iconRight
                            iconType='material'
                            checkedIcon='clear'
                            uncheckedIcon='add'
                            checkedColor='red'
                            checked={this.state.isCompany}
                            onPress={() => {
                                this.setState((prevState) => {
                                    return {
                                        isCompany: !prevState.isCompany
                                    }
                                })
                            }}
                        />
                        <AppButton
                            bgColor="rgba(111, 38, 74, 0.7)"
                            title="Login"
                            action={this.login.bind(this)}
                            iconName="sign-in"
                            iconSize={30}
                            iconColor="#fff"
                        />
                    </Card>
                </View>
            </BackgroundImage>
        );
    }
}