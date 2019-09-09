import React, {Component} from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import {View, StyleSheet, ScrollView} from 'react-native';
import CommentList from '../../components/Comment/CommentList';
import {Text} from 'react-native-elements';
import AdDropDown from '../../components/Ads/AdDropDown';


export default class ReviewAd extends Component {
    constructor() {
        super();
        this.state = {
            adId: null
        };
    }

    updateAdId(adId) {
        this.setState({adId})
    }

    render() {
        const {adId} = this.state;
        return(
            <BackgroundImage source={require('../../../assets/images/salchicha.jpg')}>
                <View style={styles.container}>
                    <AdDropDown
                        onChangeAd={(id) => this.updateAdId(id)}
                        adId={adId}
                    />
                </View>
                {adId ? 
                    <ScrollView>
                        <CommentList adId={adId} />
                    </ScrollView> :
                    <Text style={styles.emptyComments}>
                        No tenemos comentarios
                    </Text>
                }
            </BackgroundImage>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgba(231,228,224,0.8)',
        padding:10
    },
    emptyComments: {
        backgroundColor: 'rgba(10,255,10,0.8)',
        color: 'white',
        textAlign: 'center',
        padding: 20
    }
});

