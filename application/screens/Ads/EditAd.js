import  React, {Component} from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import {View, StyleSheet} from 'react-native';
import AppButton from '../../components/AppButton';
import * as firebase from 'firebase';
import  {options, Ad} from '../../forms/ad';
import t from 'tcomb-form-native';
import {Card} from 'react-native-elements';
const Form = t.form.Form;
import {NavigationActions} from 'react-navigation';

export default class EditAd extends Component {
    constructor(props) {
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            ad: params.ad
        };
    }

    update() {
        const validate = this.refs.form.getValue();
        if(validate) {
            let data =  Object.assign({}, validate);
            const ref = firebase.database().ref().child(`ads/${this.state.ad.id}`) 
            ref.update(data)
                .then(() => {
                    const navigateActions = NavigationActions.navigate({
                        routeName: 'DetailAd',
                        params: { ad: this.state.ad }
                    });
                    this.props.navigation.dispatch(navigateActions);
                })
        }
    }

    onChange(ad) {
        this.setState({ad});
    }

    render() {
        const { ad } = this.state;
        return (
            <BackgroundImage source={require('../../../assets/images/bg-auth.jpg')}>
                <View style={styles.container}>
                    <Card
                        title={'Editar Anuncio'}
                    >
                        <View>
                            <Form 
                                ref="form"
                                type={Ad}
                                options={options}
                                value={ad}
                                onChange={(v) => this.onChange(v)}
                            />
                        </View>
                        <AppButton 
                            bgColor="rgba(255,38,74,0.9)"
                            title="Actualizar"
                            action={this.update.bind(this)}
                            iconName="pencil"
                            iconSize={30}
                            iconColor="#fff"
                        />
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        padding: 10
    }
})