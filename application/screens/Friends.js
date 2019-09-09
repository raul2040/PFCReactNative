import React, { Component } from 'react';
import { AsyncStorage, Text, View, FlatList } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import { Card, Input, ListItem } from 'react-native-elements';
import AppButton from '../components/AppButton';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';

export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            friends: []
        }
        this.profileRef = null;
    }

    async componentDidMount() {
        this.fetch().then(async (userID) => {
            const friends = [];
            let user = {};
            this.profileRef = firebase.database().ref().child(`users/${userID}`);
            await this.profileRef.on('value', snapshot => {
                user = snapshot.val();
                const friendsIds = Object.keys(user.friends);
                friendsIds.forEach((friendId) => {
                    firebase.database().ref().child(`users/${friendId}`).on('value', snapshot => {
                        friends.push(snapshot.val())
                    })
                })
                setTimeout(() => {
                    this.setState({
                        user, friends
                    })
                }, 1000)
            });
        });
    }

    handlerRequest(accepted, friendID) {
        const user = { ...this.state.user }
        const currentFriends = { ...this.state.user.friends };
        const status = accepted ? 'accepted' : 'declined';
        let refreshFriends = Object.assign(currentFriends, {
            [friendID]: status
        });
        user.friends = refreshFriends;
        this.profileRef.update(user);
        if(accepted) {
            this.acceptRequest(friendID);
        }
        this.setState({
            user
        })
    }

    acceptRequest(friendID) {
        let currentFriend = this.state.friends.filter((friend) => { return friend.id == friendID });
        debugger
        let refreshFriends = Object.assign(currentFriend.friends, {
            [this.state.user.id]: 'accepted'
        });
        firebase.database().ref().child(`users/${friendId}`).update(refreshFriends)
    }


    friends(friend) {
        const { username, profileImage, description, musicGenre, id, Age, town } = friend
        const status = this.state.user.friends[id];
        const buttons = status === 'pending' ? (
            <View style={{ marginTop: 12 }}>
                <AppButton
                    bgColor='rgba(255, 38, 74, 0.9)'
                    title='Aceptar Petición'
                    action={this.handlerRequest.bind(this, true, id)}
                    iconName='comments'
                    iconSize={30}
                    iconColor='#fff'
                />
                <AppButton
                    bgColor='rgba(255, 38, 74, 0.9)'
                    title='Rechazar petición'
                    action={this.handlerRequest.bind(this, false, id)}
                    iconName='comments'
                    iconSize={30}
                    iconColor='#fff'
                />
            </View>
        ) : null;
        if (status !== 'declined') {
            return (
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
                        {buttons}
                    </View>
                </Card>
            )
        }
    }

    render() {
        const friends = this.state.friends;
        return (
            <BackgroundImage source={require('../../assets/images/salchicha.jpg')} >
                <FlatList
                    data={friends}
                    renderItem={(data) => this.friends(data.item)}
                    keyExtractor={(data) => data.id}
                />
            </BackgroundImage>
        )
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