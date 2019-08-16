import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView } from 'react-native';

import BackgroundImage from '../../components/BackgroundImage';
import Ad from '../../components/Ads/Ad';
import CommentForm from '../../components/Comment/CommentForm';
import CommentList from '../../components/Comment/CommentList';


export default class DetailAd extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            ad: params.ad
        };
    }

    editAd() {
        const navigateActions = NavigationActions.navigate({
            routeName: 'EditAd',
            params: {ad: this.state.ad}
        });
        this.props.navigation.dispatch(navigateActions);
    };
    
    goHome() {
        const navigateActions = NavigationActions.navigate({
            routeName: 'ListAds',
        });
        this.props.navigation.dispatch(navigateActions);
    };

    render() {
        const { ad } = this.state;
        return (
            <BackgroundImage source={require('../../../assets/images/bg-auth.jpg')} >
                <ScrollView>


                    <Ad
                        goHome={this.goHome.bind(this)}
                        editAd={this.editAd.bind(this)}
                        ad={ad}
                    />

                    <CommentForm
                        adId={ad.id}
                    />
                    
                    <CommentList 
                        adId={ad.id}
                    />

                </ScrollView>
            </BackgroundImage>
        )
    }
}