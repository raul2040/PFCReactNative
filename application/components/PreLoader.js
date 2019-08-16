import React, {Component} from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native';


const {height} = Dimensions.get('window'); //Obtenemos acceso  a la altura del dispositivo que está ejecutando

export default class PreLoader  extends Component {
    render() {
        return(
            <View style={[styles.preLoader]}>
                <ActivityIndicator style={{height: 80}} size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    preLoader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: '#242935'
    }
})