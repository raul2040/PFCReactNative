import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import PreLoader from '../PreLoader';
import *  as firebase from 'firebase';

export default class AdDropDown extends Component {
    constructor() {
        super();
        this.state = {
            ads: [],
            loaded: false
        };
        this.refsAds = firebase.database().ref().child('ads');
    }

    componentDidMount() {
        this.refsAds.on('value', snapshot => {
            let ads = [];
            snapshot.forEach(row => {
                ads.push({
                    value: row.key,
                    label: row.val().name,
                })
            });
            this.setState({
                ads,
                loaded: true
            })
        });
    }

    render() {
        const {loaded, ads} = this.state;
        const {onChangeAd, adId} = this.props;
        if(!loaded) {
            return <PreLoader/>
        }
        return (
            <RNPickerSelect 
                onValueChange={(Id) => onChangeAd(Id)} 
                items={ads}    
                placeholder={{label: 'Selecciona un anuncio', value: null}}
                value={adId}
            />
        );
    }
}