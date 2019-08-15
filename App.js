import React, { Component } from 'react';
import PreLoader from './application/components/PreLoader';
import * as firebase from 'firebase'
import firebaseOptions from './application/utils/firebase';
import { Text } from 'react-native-elements'
import RestaurantEmtpy from './application/components/Restaurant/RestaurantEmpty'
firebase.initializeApp(firebaseOptions)

import GuestNavigation from './application/navigations/guest';
import LoggedNavigation from './application/navigations/logged';

export default class App extends Component {
  constructor() {

  }
}

