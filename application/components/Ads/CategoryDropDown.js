import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import PreLoader from '../PreLoader';
import *  as firebase from 'firebase';

export default class CategoryDropDown extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            loaded: false
        };
        this.refsAds = firebase.database().ref().child('Categories');
    }

    componentDidMount() {
        this.refsAds.on('value', snapshot => {
            debugger;
            let categories = [];
            snapshot.forEach(row => {
                categories.push({
                    value: row.key,
                    label: row.val().name,
                })
            });
            this.setState({
                categories,
                loaded: true
            })
        });
    }

    render() {
        const {loaded, categories} = this.state;
        const {onChangeAd, categoriesId} = this.props;
        if(!loaded) {
            return <PreLoader/>
        }
        return (
            <RNPickerSelect 
                onValueChange={(Id) => onChangeAd(Id)} 
                items={categories}    
                placeholder={{label: 'Selecciona un anuncio', value: null}}
                value={adId}
            />
        );
    }
}