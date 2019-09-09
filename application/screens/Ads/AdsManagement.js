import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import AdAddButton from '../../components/Ads/AdAddButton';
import AdsEmpty from '../../components/Ads/AdEmpty';
import { NavigationActions } from 'react-navigation';
import Ad from '../../components/Ads/Ad';
import { AsyncStorage, ScrollView } from 'react-native';
import * as firebase from 'firebase';

export default class AdsManagement extends Component {
    constructor() {
        super();
        this.state = {
            ads: [],
            company: {}
        }
    }

    componentDidMount() {
        this.getCompanyID().then(async (companyID) => {
            let company = null;
            let adsOfCompany = null;
            const ads = [];
            this.companyRef = firebase.database().ref().child(`companies/${companyID}`);
            await this.companyRef.on('value', snapshot => {
                company = snapshot.val();
                adsOfCompany = Object.keys(snapshot.val().ads);
                adsOfCompany.forEach((adId) => {
                    firebase.database().ref().child(`ads/${adId}`).on('value', snapshot => {
                        const ad = Object.assign(snapshot.val(), {
                            id: snapshot.key
                        })
                        ads.push(ad)
                    });
                });
                this.setState({
                    company,
                    ads
                })
            });
        })
    }

    async getCompanyID() {
        const companyID = await AsyncStorage.getItem('companyID');
        return JSON.parse(companyID);
    };

    addAd() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddAds'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    editAd(ad) {
        const navigateActions = NavigationActions.navigate({
            routeName: 'EditAd',
            params: { ad: ad, AdsManagement: true}
        });
        this.props.navigation.dispatch(navigateActions);
    };

    goHome() {
        const navigateActions = NavigationActions.navigate({
            routeName: 'ListAds',
        });
        this.props.navigation.dispatch(navigateActions);
    };

    adDetail() {
        const navigateActions = NavigationActions.navigate({
            routeName: 'DetailAdCompany',
        });
        this.props.navigation.dispatch(navigateActions);
    }


    render() {
        const { ads } = this.state;
        if (!ads.length) {
            return (
                <BackgroundImage source={require('../../../assets/images/salchicha.jpg')}>
                    <AdsEmpty text={'No hay anuncios disponibles'} />
                    <AdAddButton addAd={this.addAd.bind(this)} />
                </BackgroundImage>
            )
        }
        else {
            return (
                <BackgroundImage source={require('../../../assets/images/salchicha.jpg')}>
                    <ScrollView>
                        {ads.map((ad, ind) => {
                            debugger
                            return (
                                <Ad
                                    key={ind}
                                    editable={true}
                                    ad={ad}
                                    goHome={this.goHome.bind(this)}
                                    editAd={this.editAd.bind(this)}
                                    adDetail={this.adDetail.bind(this)}
                                />
                            )
                        })}
                    </ScrollView>
                </BackgroundImage>
            )
        }
    }
}