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
                action={() => editAd(ad)}
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

        const subscribeBtn = (ad.isEvent && !this.props.userIsSub)?
        (<AppButton
            bgColor='rgba(80, 38, 200, 0.8)'
            title='¡Subscribete a este evento!'
            action={this.props.subscribeUser}
            iconName='pencil'
            iconSize={30}
            iconColor='#fff'

        />): (<Text>{this.props.userIsSub ? "Ya estas subscrito a este evento": ''}</Text>)

        return (
            <Card
                title={ad.name}
                image={{uri: ad.image}}
            >
                <AdRating adId={ad.id} />

                <Text style={{ marginBottom: 15, marginTop: 15 }}>
                    {ad.description}
                </Text>
                <View>
                    {buttons}
                    {subscribeBtn}
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