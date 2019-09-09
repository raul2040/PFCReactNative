import React, { Component } from 'react';
import { AsyncStorage, Text, View, Image } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import { Card, Input } from 'react-native-elements';
import AppButton from '../components/AppButton';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';
import EditUser from '../components/User/EditUser';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            canEdit: false
        }
        this.profileRef = null;
    }

    componentDidMount() {
        if (!this.props.navigation.state.params) {
            this.fetch().then((userID) => {
                this.profileRef = firebase.database().ref().child(`users/${userID}`);
                this.profileRef.on('value', snapshot => {
                    const user = snapshot.val();
                    this.setState({
                        user,
                        canEdit: true
                    })
                });
            });
        }
        else {
            const { user } = this.props.navigation.state.params;
            this.setState({
                user
            })
        }
    }


    saveChanges(user) {
        const updatedUser = Object.assign(this.state.user, user);
        this.profileRef.update(updatedUser)
    };

    async addFriend() {
        const currentUser = await AsyncStorage.getItem('userID');
        const toUser = this.state.user.id;
        await this.sendInvitation(JSON.parse(currentUser), toUser);
    };

    sendInvitation(fromUserID, toUserID) {
        let areFriends = false;
        let friendsID = Object.keys(this.state.user.friends);
        areFriends = friendsID.includes(toUserID);
        if (!areFriends) {
            let toUserFriendsRef = firebase.database().ref().child(`users/${toUserID}/friends`);
            toUserFriendsRef.on('value', snapshot => {
                const friendShipRequest = Object.assign(snapshot.val(), { [fromUserID]: 'pending' })
                toUserFriendsRef.set(friendShipRequest);
                Toast.showWithGravity('Petición enviada', Toast.LONG, Toast.BOTTOM);
             })
        }
        else {
            Toast.showWithGravity('Ya soys amigos / Pendiente  de aceptar por parte del usuario', Toast.LONG, Toast.BOTTOM);
        }
    }

    render() {
        const { profileImage, description, Age, musicGenre, town, username } = this.state.user;
        const { canEdit } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/salchicha.jpg')}>
                <Card
                    title={username}
                    image={{ uri: profileImage }}>
                    <Text style={{ marginBottom: 15, marginTop: 15 }}>
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
                        {canEdit ? (
                            <EditUser
                                saveChanges={this.saveChanges.bind(this)}
                                user={this.state.user}
                            />
                        ) : (
                                <AppButton
                                    bgColor='rgba(255, 38, 74, 0.9)'
                                    title='Enviar petición de amistad'
                                    action={this.addFriend.bind(this)}
                                    iconName='plus'
                                    iconSize={30}
                                    iconColor='#fff'
                                />
                            )
                        }
                    </View>
                </Card>
            </BackgroundImage>
        );
    }


    async fetch() {
        try {
            let profile = await AsyncStorage.getItem('userID');
            if (profile) {
                let parsed = JSON.parse(profile);
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