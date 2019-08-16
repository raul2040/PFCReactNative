import React, { Component } from 'react';
import AppButton from '../AppButton';
import { Card, Text} from 'react-native-elements';
import {View} from 'react-native';
import AdRating from './AdRating';

export default class Ad extends Component {
    render() {
        const { editAd, goHome, ad, editable,adDetail } = this.props;
        const buttons = editable ?
            (<AppButton
                bgColor='rgba(255, 38, 74, 0.8)'
                title='Editar Anuncio'
                action={editAd}
                iconName='pencil'
                iconSize={30}
                iconColor='#fff'

            />) :
            (
                <AppButton
                    bgColor='rgba(255, 38, 74, 0.8)'
                    title='Ver más'
                    action={() => adDetail(ad)}
                    iconName='info-circle'
                    iconSize={30}
                    iconColor='#fff'

                />
            )

        return (
            <Card
                title={ad.name}
                image={require('../../../assets/images/Logo.png')}
            >
                <AdRating adId={ad.id} />

                <Text style={{ marginBottom: 15, marginTop: 15 }}>
                    {ad.description}
                </Text>
                <View>
                    {buttons}
                    <AppButton
                        bgColor='rgba(28, 25, 21, 0.7)'
                        title='Volver'
                        action={goHome}
                        iconName='arrow-left'
                        iconSize={30}
                        iconColor='#fff'
                    />
                </View>
            </Card>
        )
    }
}