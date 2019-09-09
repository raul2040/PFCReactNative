import React,{Component} from 'react';
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';
import Controller from '../utils/controller';
import controller from '../utils/controller';

export default class Logout extends Component{
    componentDidMount() {
        firebase.auth().signOut()
            .then(() => {
                controller.closeSession();
                Toast.showWithGravity('Has cerrado sessión de manera correcta', Toast.LONG, Toast.BOTTOM);
            })
            .catch((error) => {
                    Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
            })
    }

    render(){
        return null;
    }
}