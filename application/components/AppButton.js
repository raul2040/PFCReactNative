import React,{Component} from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native'; // Dimensions nos permite sacar el width y el height  del dispositivo que está usando la APP.


export default class AppButton extends Component {
    render () {
        const {action, iconName, iconColor, title, bgColor} = this.props;
        const {width} = Dimensions.get('window');
        return (
            <Button
                onPress={action}
                buttonStyle={{
                    backgroundColor: bgColor,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5,
                    marginBottom: 5, 
                    width: '100%'
                }}
                title={title}
                icon={
                    <Icon 
                        name={iconName}
                        size={15}
                        color={iconColor}
                    />
                }
                text={title}
                iconRight={true}
            ></Button>
        )
    }
}

