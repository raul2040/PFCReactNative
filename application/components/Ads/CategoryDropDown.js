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
    }

    componentDidMount() {
        const categories = [];
        firebase.database().ref().child('Categories').on('value', snapshot => {
            snapshot.forEach(row => {
                categories.push({
                    value: row.key,
                    label: row.val(),
                });
            });
            this.setState({categories,loaded: true})     
        })   
    }

    render() {
        const {loaded, categories} = this.state;
        const {onChangeCategory, categoryId} = this.props;
        if(!loaded) {
            return <PreLoader/>
        }
        return (
            <RNPickerSelect 
                onValueChange={(Id) => onChangeCategory(Id)} 
                items={categories}    
                placeholder={{label: 'Selecciona una categoria', value: null}}
                value={categoryId}
            />
        );
    }
}