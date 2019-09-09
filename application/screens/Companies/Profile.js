import React, { Component } from 'react';
import { AsyncStorage, Text, View, Image } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import { Card, Input } from 'react-native-elements';
import AppButton from '../../components/AppButton';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';
import EditUser from '../../components/User/EditUser';
import { EditCompany } from '../../components/Company/EditCompany';

export default class CompanyProfile extends Component {
    constructor() {
        super();
        this.state = {
            company: {},
            canEdit: false
        }
        this.companyRef = null;
    }

    componentDidMount() {
        if (!this.props.companyID) {
            this.fetch().then((companyID) => {
                this.setCompany(companyID, true)
            })
        }
        else {
            this.setCompany(this.props.companyID, false)
        }
    }

    setCompany(companyID, canEdit) {
        this.companyRef = firebase.database().ref().child(`companies/${companyID}`);
        this.companyRef.on('value', snapshot => {
            const company = snapshot.val();
            this.setState({
                company,
                canEdit
            })
        });
    };

    saveChanges(company) {
        const updatedCompany = Object.assign(this.state.company, company);
        this.companyRef.update(updatedCompany)
    };

    render() {
        const { cif, email, name, profileImage, direction, description, town } = this.state.company;
        const {canEdit} = this.state;
        return (
            <BackgroundImage source={require('../../../assets/images/bg-auth.jpg')}>
                <Card
                    title={name}
                    image={{ uri: profileImage }}
                    >
                    <Text style={{ marginBottom: 15, marginTop: 15 }}>
                        Email: {email}
                    </Text>
                    <Text style={{ marginBottom: 15, marginTop: 15 }}>
                        Dirección: {direction}
                    </Text>
                    <Text style={{ marginBottom: 15, marginTop: 15 }}>
                        Población: {town}
                    </Text>
                    <Text style={{ marginBottom: 15, marginTop: 15 }}>
                        Descripción: {description}
                    </Text>
                    {canEdit && <View style={{ marginTop: 12 }}>
                        <EditCompany
                            saveChanges={this.saveChanges.bind(this)}
                            company={this.state.company}
                        />
                    </View>}
                </Card>
            </BackgroundImage>
        );
    }


    async fetch() {
        try {
            let profile = await AsyncStorage.getItem('companyID');
            let companyID = JSON.parse(profile);
            return companyID
        } catch (error) {
            Toast.showWithGravity('Error obteniendo', Toast.LONG, Toast.BOTTOM);
        }
    }
}