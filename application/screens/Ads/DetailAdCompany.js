import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView , AsyncStorage} from 'react-native';
import * as firebase from 'firebase';
import BackgroundImage from '../../components/BackgroundImage';
import Ad from '../../components/Ads/Ad';
import CommentForm from '../../components/Comment/CommentForm';
import CommentList from '../../components/Comment/CommentList';


export default class DetailAdCompany extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            ad: params.ad,
        };
    }

    goHome() {
        const navigateActions = NavigationActions.navigate({
            routeName: 'ListAds',
        });
        this.props.navigation.dispatch(navigateActions);
    };

    adDetail(ad) {
        const navigateActions = NavigationActions.navigate({
            routeName: 'DetailAdCompany', params:{ad}
        });
        this.props.navigation.dispatch(navigateActions);
    };

    render() {
        const { ad } = this.state;
        return (
            <BackgroundImage source={require('../../../assets/images/salchicha.jpg')} >
                <ScrollView>
                    <Ad
                        goHome={this.goHome.bind(this)}
                        ad={ad}
                        editable={false}
                        adDetail={this.adDetail.bind(this)}
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

