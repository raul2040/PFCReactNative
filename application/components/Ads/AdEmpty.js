import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class AdEmpty extends Component {
    render() {
        const {text} = this.props;
        return(
            <View style={style.adEmptyView}>
                <Text style={style.adEmptyText}>
                    {text}
                </Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    adEmptyView: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    adEmptyText: {
        backgroundColor: 'rgba(10,255,10,0.8)',
        color:'white',
        textAlign:'center',
        padding:20
    }
});