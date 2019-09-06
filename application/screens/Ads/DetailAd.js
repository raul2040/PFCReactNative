import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView , AsyncStorage} from 'react-native';
import * as firebase from 'firebase';
import BackgroundImage from '../../components/BackgroundImage';
import Ad from '../../components/Ads/Ad';
import CommentForm from '../../components/Comment/CommentForm';
import CommentList from '../../components/Comment/CommentList';


export default class DetailAd extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            ad: params.ad,
            userIsSub: false
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

    componentDidMount() {
        this.fetch().then((usrID) => {
            this.refsUser = firebase.database().ref().child(`users/${usrID}`);
            this.refsUser.on('value', snapshot => {
                const user = snapshot.val();
                this.setState({user},() => {
                    const eventsKeys = Object.keys(this.state.user.events);
                    eventsKeys.forEach((key) => {
                        this.state.user.events[key] == this.state.ad.id ? this.setState({
                            userIsSub: true
                        }) : null;
                    });
                });
            });
        });
    }

    subscribeUser() {
        const updatedUser = {...this.state.user};
        updatedUser.events[this.state.ad.name] = this.state.ad.id;
        this.refsUser.update(updatedUser)
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
                        editable={true}
                        userIsSub={this.state.userIsSub}
                        subscribeUser={this.subscribeUser.bind(this)}
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

    async fetch() {
        try {
            let user = await AsyncStorage.getItem('userID');
            if (user) {
                let parsed = JSON.parse(user);
                this.setState({
                    user: parsed
                })
                return parsed;
            }
        } catch (error) {
            Toast.showWithGravity('Error obteniendo', Toast.LONG, Toast.BOTTOM);
        }
    }
}

