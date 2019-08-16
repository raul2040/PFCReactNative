import React from 'react';
import {View, Slider, Text} from 'react-native';

export default sliderTemplate = (locals) => {
    const {help, value, label, config} = locals;
    const helpText  =  (
        <Text style={{marginBottom: 8}}>
            {help}
        </Text>
    );

    return (
        <View>
            <Text style={{fontWeight:'bold', fontSize:16}}> 
                {label} ({parseInt(value)})
            </Text>
            <Slider 
                ref='input'
                step={config.step}
                minimumValue={config.min}
                maximumValue={config.max}
                value={parseInt(value)}
                onValueChange={value => locals.onChange(value)}
            />
            {helpText}
        </View>
    )
}