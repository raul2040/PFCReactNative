import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { Card, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import controller from '../utils/controller';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import FormValidation from '../utils/validation';
import * as firebase from 'firebase';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            company: {},
            isCompany: false
        }
    }

    register() {
        const that = this;
        const currentForm = this.state.isCompany ? 'companyForm':'userForm';
        this.validate = this.refs[currentForm].getValue();
        if (this.validate) {
            firebase.auth().createUserWithEmailAndPassword(
                this.validate.email, this.validate.password)
                .then((data) => {
                    this.state.isCompany ? controller.registerCompany(data, that.state.company) : controller.registerUser('email', that.state.user, data);
                    Toast.showWithGravity('Registro correcto, Bienvenido', Toast.LONG, Toast.BOTTOM);
                })
                .catch((error) => {
                    Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
                })
        }
    }

    onChange(key, data) {
        this.setState({ [key]: data });
    }

    changeSignUp() {
        this.setState((prevState) => {
            return {
                isCompany: !prevState.isCompany
            }
        })
    };


    render() {
        const companyForm = (
                <Form
                    ref='companyForm'
                    type={company}
                    options={companyOptions}
                    onChange={(v) => this.onChange('company', v)}
                    value={this.state.company}
                />
        );
        const userForm = (
                <Form
                    ref='userForm'
                    type={user}
                    options={userOptions}
                    onChange={(v) => this.onChange('user', v)}
                    value={this.state.user}
                />
        );
        const {currentForm, label} = this.state.isCompany ? {currentForm: companyForm, label:'usuario' } : {currentForm: userForm, label: 'Empresa'};
        const cardTitle = this.state.isCompany ? 'Empresa' : 'Usuario';
        return (
            <BackgroundImage source={require('../../assets/images/salchicha.jpg')}>
                <View>
                    <Card title={`Registrate cómo ${cardTitle}`}>
                        {currentForm}
                        <AppButton
                            bgColor="rgba(200, 200, 50, 0.9)"
                            title="Regístrarme"
                            action={this.register.bind(this)}
                            iconName="user-plus"
                            iconSize={30}
                            iconColor="#fff"
                        />
                        <Button
                            title={`¿Quieres registrarte cómo ${label}?`}
                            type="clear"
                            onPress={this.changeSignUp.bind(this)}
                        />
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
}


const company = t.struct({
    name: t.String,
    cif: t.String,
    email: t.String,
    password: t.String,
});

const companyOptions = {
    fields: {
        name: {
            label: 'Nombre (*)',
            placeholder: 'Nombre',
            help: 'Introduce un nombre de empresa',
        },
        cif: {
            label: 'Cif (*)',
            placeholder: 'Cif',
            help: 'Introduce un cif de empresa',
        },
        email: {
            label: 'Email (*)',
            placeholder: 'Email',
            help: 'Introduce un email',
            
        },
        password: {
            label: 'Contraseña (*)',
            password: true,
            secureTextEntry: true
        },
    }
}

const user = t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
});

const userOptions = {
    fields: {
        email: {
            label: 'Email  (*)',
            help: 'Introduce un email',
            error: 'Email incorrecto',
            autoCapitalize: 'none'
        },
        username: {
            label: 'Nombre de usuario  (*)',
            help: 'Introduce un nombre de usuario',
        },
        password: {
            help: 'Contraseña  (*)',
            error: 'Contraseña incorrecto',
            password: true,
            secureTextEntry: true
        },
    }
};