import React, { Component } from 'react';
import { AsyncStorage, Text, View, Image } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import { Card, Input } from 'react-native-elements';
import AppButton from '../components/AppButton';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';
import EditUser from '../components/User/EditUser';


export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {}
        }
        this.refsUser = null;
    }

    componentDidMount() {
        this.fetch().then((usrID) => {
            this.refsUser = firebase.database().ref().child(`users/${usrID}`);
            this.refsUser.on('value', snapshot => {
                const user = snapshot.val();
                this.setState({
                    user
                })
            });
        });
    }

    saveChanges(user) {
        const updatedUser = Object.assign(this.state.user, user);
        this.refsUser.update(updatedUser)
    };

    render() {
        const { profileImage, description, Age, musicGenre, town, username } = this.state.user;
        return (
            <BackgroundImage source={require('../../assets/images/bg-auth.jpg')}>
                <Card
                    title={username}
                    image={{ uri: profileImage }}>
                    <Text style={{ marginBottom: 15 , marginTop: 15 }}>
                        Descripción: {description}
                    </Text>
                    <Text style={{ marginBottom: 15, marginTop: 15 }}>
                        Edad: {Age}
                    </Text>
                    <Text style={{ marginBottom: 15, marginTop: 15 }}>
                        Población: {town}
                    </Text>
                    <Text style={{ marginBottom: 15, marginTop: 15 }}>
                        Géneros de Música favoritos: {musicGenre}
                    </Text>
                    <View style={{ marginTop: 12 }}>
                        <EditUser
                            saveChanges={this.saveChanges.bind(this)}
                            user={this.state.user}
                        />
                    </View>
                </Card>
            </BackgroundImage>
        );
    }


    async fetch() {
        try {
            let user = await AsyncStorage.getItem('userID');
            if (user) {
                let parsed = JSON.parse(user);
                this.setState({
                    user: parsed
                })
                return parsed;
            }
        } catch (error) {
            Toast.showWithGravity('Error obteniendo', Toast.LONG, Toast.BOTTOM);
        }
    }
}