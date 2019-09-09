import React, {Component} from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import {StyleSheet, FlatList,AsyncStorage} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import * as firebase from 'firebase';
import {NavigationActions} from 'react-navigation';
import AdsEmpty from '../../components/Ads/AdEmpty';
import SearchAds from '../../components/Ads/SearchAd';
//import { timingSafeEqual } from 'crypto';

export default class Ads extends Component {
    constructor() {
        super();
        this.state = {
            ads: [],
            loaded: false,
            ads_logo: require('../../../assets/images/Logo.png'),
            search:'',
            isCompany: false
        };

        this.refsAds = firebase.database().ref().child('ads'); // ads en terminos SQL vendría a ser la tabla de anuncios.
    }

    
    async componentDidMount() {
        const {search} = this.state;
        if( !search ) {
            this.refsAds = this.refsAds = firebase.database().ref().child('ads');
        }
        else {
            this._filterAds(search);
        }

        this._loadFirebaseAds();
        const isCompany = await this.isCompany();
        this.setState({
            isCompany
        })
    }


    _loadFirebaseAds() {
        this.refsAds.on('value', snapshot => {
            let ads = [];
            snapshot.forEach(row => {
                let ad = {... row.val()}
                ad['id'] = row.key
                ads.push(ad);
            });
            this.setState({
                ads,
                loaded:true
            })
        })
    }

    adDetail(ad) {
        navigation = this.state.isCompany ? {routeName: 'DetailAdCompany',params: {ad}} : {routeName: 'DetailAd',params: {ad}}
        const navigateAction = NavigationActions.navigate(navigation);
        this.props.navigation.dispatch(navigateAction);
    }

    renderAd(ad) {
        return (
            <ListItem 
                containerStyle={styles.item}
                titleStyle={styles.title}
                roundAvatar
                title={`${ad.name} (Capacidad: ${ad.capacity})`}
                leftAvatar={{source: { uri: ad.image}}}
                onPress={() => {this.adDetail(ad)}}
                rightIcon={{name: 'arrow-right', type:'font-awesome', style: styles.listIconStyle}}
            />
        )
    }

    searchAd(search) {
        this.setState({
            search: search.charAt(0).toUpperCase() + search.slice(1)
        });

        if(search.length >= 3) {
            this._filterAds(search);
            setTimeout(() => {
                this._loadFirebaseAds();
            }, 1000)
        }
        else {}

    }

    resetSearch() {
        this.setState({
            search:''
        });
        this.refsAds = firebase.database().ref().child('ads');
        setTimeout(() => {
            this._loadFirebaseAds();
        },1000);
    }

    _filterAds(search) {
        this.refsAds = firebase.database().ref().child('ads')
                .orderByChild('name')
                .startAt(search)
                .endAt(`${search}\uf8ff`)
    }

    onAdsFiltered(ads) {
        this.setState({ads})
    };

    async isCompany() {
        const isCompany =  await (AsyncStorage.getItem('isCompany'));
        return JSON.parse(isCompany);
    }

    render(){
        const {loaded, ads} = this.state
        const searchBar = (
            <SearchBar
                platform='android'
                showLoading
                cancelIcon={{type: 'font-awesome', name:'chevron-left'}}
                placeholder='Busca algún anuncio'
                onChangeText={(text) => this.searchAd(text)}
                onClear={this.resetSearch.bind(this)}
                value={this.state.search}
            />
        )
        if (!loaded) {
            return <PreLoader/>
        };
        if (!ads.length) {
            return(
                <BackgroundImage source={require('../../../assets/images/salchicha.jpg')}>
                    {searchBar}
                    <AdsEmpty text={'No hay anuncios disponibles'}/>
                </BackgroundImage>
            )
        }
        return(
            <BackgroundImage source={require('../../../assets/images/salchicha.jpg')}>
                {searchBar}
                <FlatList 
                    data={ads}
                    renderItem={(data) => this.renderAd(data.item)} //En data item encontramos los items que contiene la data en este caso anuncios
                    keyExtractor={(data) => data.id}
                />
                <SearchAds ads={ads}
                    onAdsFiltered={this.onAdsFiltered.bind(this)}
                    reloadAds={this._loadFirebaseAds.bind(this)}
                />
                
            </BackgroundImage>
        )

    }

}


const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize:15,
        color:'rgba(255,38,74,0.6)'
    },
    item: {
        padding:0,
        backgroundColor: 'rgba(206,206,206,0.6)'
    }
})