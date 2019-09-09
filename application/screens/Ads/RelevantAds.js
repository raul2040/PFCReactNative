import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {ScrollView} from 'react-native';
import * as firebase from 'firebase';
import Ad from '../../components/Ads/Ad';
import {NavigationActions} from 'react-navigation';


export default class RelevantAds extends Component{
    constructor(){
        super();
        this.state = {
            ads: []
        }
        this.refsAds = firebase.database().ref().child('ads').orderByChild('ratingCounter') // ads en terminos SQL vendría a ser la tabla de comentaarios.
    }

    componentDidMount() {
        const ads = [];
        this.refsAds.on('value', snapshot => {
            snapshot.forEach((row) => {
                let rating = row.val().ratingCounter/row.val().nComments;
                if(rating > 7) {
                    ads.push({
                        id: row.key,
                        name: row.val().name,
                        address: row.val().address,
                        capacity: row.val().capacity,
                        description: row.val().description,
                        image: row.val().image
                    })
                }
            })
            this.setState({
                ads
            })
        })
    }

    adDetail(ad) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailAd',
            params: {ad}
        });
        this.props.navigation.dispatch(navigateAction);
    }


    goHome() {
        const navigateActions = NavigationActions.navigate({
            routeName: 'ListAds',
        });
        this.props.navigation.dispatch(navigateActions);
    };

    render() {
        const ads = this.state.ads.map((ad,ind) => {
            return (
                <Ad
                    key={ind}
                    editable={false}
                    ad={ad}
                    adDetail={this.adDetail.bind(this)}
                    goHome={this.goHome.bind(this)}
                />
            )
        })
        return (
            <ScrollView>
               {ads}
            </ScrollView>
        )
    }
}