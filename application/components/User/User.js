import React, { Component } from 'react';
import firebase from 'firebase';
import {ListItem} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default class User extends Component {
    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        this.refs = firebase.database().ref(`users/${this.props.userID}`);
        await this.refs.on('value', snapshot => {
            this.setState({
                user: snapshot.val()
            })
        });
    };

    render() {
        const { user } = this.state;
        return (
            <ListItem
                leftAvatar={{ source: { uri: user.profileImage } }}
                title={user.username}
                subtitle={`Edad: ${user.Age}`}
                bottomDivider
                onPress={() => {
                    this.props.detailUser(user)
                }}
            />
        )
    }
}