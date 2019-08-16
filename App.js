import React, {Component} from 'react';
import PreLoader from './application/components/PreLoader';
import * as firebase from 'firebase'
import firebaseOptions from './application/utils/firebase';
firebase.initializeApp(firebaseOptions)

import GuestNavigation from './application/navigations/guest';
import LoggedNavigation from './application/navigations/logged';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      loaded: false
    }
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged((user)  => {
      if(user !== null) {
        this.setState({
          isLogged: true,
          loaded: true
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
    const {isLogged, loaded} = this.state;
    if(!loaded) {
      return (<PreLoader/>)
    }
    if(isLogged) {
      return (<LoggedNavigation/>)
    }else {
      return (
        <GuestNavigation/>
      );
    }
  }
}

