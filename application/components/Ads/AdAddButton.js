import React,{Component} from 'react';
import AppButton from '../AppButton';
import {StyleSheet, View} from 'react-native';
import { Dimensions } from 'react-native'; 


export default class AdAddButton extends Component{
    render(){
        const {addAd} = this.props; 
        return (
            <View style={styles.buttonContainer}> 
                <AppButton 
                    bgColor='rgba(255,38,74, 0.6)'
                    title='Añadir un Anuncio'
                    action={addAd}
                    iconName='plus'
                    iconSize={30}
                    iconColor='#fff'
                    setWidth={true}
                />
            </View>
        )
    }
}


const {width} = Dimensions.get('window');


const styles = StyleSheet.create({
    buttonContainer:{
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
        width: width
    }
});

