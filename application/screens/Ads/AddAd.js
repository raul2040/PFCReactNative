import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import { View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { options, Ad } from '../../forms/ad';
import t from 'tcomb-form-native';
import { Card } from 'react-native-elements';
const Form = t.form.Form;
import Toast from 'react-native-simple-toast';
import AppButton from '../../components/AppButton';


export default class AddAd extends Component {
    constructor() {
        super();
        this.state = {
            ad: {
                name: '',
                address: '',
                capacity: 0,
                description: '',
                nComments:0,
                ratingCounter:0
            }
        };
    }

    save() {
        const validate = this.refs.form.getValue();
        if (validate) {
            let data = {};
            const key = firebase.database().ref().child('ads').push().key; //De esta forma creamos un id único para nuestro registro.
            data[`ads/${key}`] = this.state.ad;
            firebase.database().ref().update(data)
                .then(() => {
                    Toast.showWithGravity('Anuncio dado de alta', Toast.LONG, Toast.BOTTOM);
                    this.props.navigation.navigate('ListAds')
                })
                .catch((error) => {
                    Toast.showWithGravity(`Se ha producido un error: ${error.message}`, Toast.LONG, Toast.BOTTOM);

                })
        }
    }

    onChange(ad) {
        this.setState({ ad })
    }

    render() {
        const { ad } = this.state;

        return (
            <BackgroundImage source={require('../../../assets/images/bg-auth.jpg')}>
                <View style={styles.container}>
                    <Card title='Formulario de Anuncios'>
                        <View>
                            <Form
                                ref="form"
                                type={Ad}
                                options={options}
                                value={ad}
                                onChange={(v) => this.onChange(v)}
                            />
                        </View>
                        <AppButton
                            bgColor='rgba(255, 38, 74, 0.9)'
                            title='Subir anuncio'
                            action={this.save.bind(this)}
                            iconName='plus'
                            iconSize={30}
                            iconColor='#fff'
                        />
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        padding: 10
    }
})