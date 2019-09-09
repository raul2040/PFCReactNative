import React, {Component} from 'react';
import PreLoader from './application/components/PreLoader';
import * as firebase from 'firebase'
import firebaseOptions from './application/utils/firebase';
firebase.initializeApp(firebaseOptions)

import GuestNavigation from './application/navigations/guest';
import {UserNavigation, CompanyNavigation} from './application/navigations/logged';
import {AsyncStorage} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      loaded: false,
      isCompany: false
    }
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (user)  => {
      if(user !== null) {
        const isCompany = await AsyncStorage.getItem('isCompany');
        this.setState({
          isLogged: true,
          loaded: true,
          isCompany: JSON.parse(isCompany)
        })
      } else {
          this.setState({
            isLogged: false,
            loaded: true
          })
      }
    })
  }

  render() {
    let {isLogged, loaded, isCompany} = this.state;
    let navigation = isCompany ?  (<CompanyNavigation/>) : (<UserNavigation/>);
    if(!loaded) {
      return (<PreLoader/>)
    }
    if(isLogged) {
      return navigation
    }
    else {
      return (
        <GuestNavigation/>
      );
    }
  }
}

