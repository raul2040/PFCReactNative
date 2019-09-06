import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { Overlay } from 'react-native-elements';
import { View, ScrollView } from 'react-native';
import AppButton from '../../components/AppButton';
import sliderTemplate from '../../forms/templates/slider';
const Form = t.form.Form;

export const editUsr = t.struct({
    Age: t.Number,
    musicGenre: t.String,
    description: t.String,
    town: t.String
})

export const options = {
    fields: {
        Age: {
            label: 'Edad',
            help: 'indique su edad',
            config: {
                step: 1,
                min:0,
                max:99,
                value:1
            },
            template: sliderTemplate
        },
        musicGenre: {
            label: "Comparta con el mundo sus generos músicales",
        },
        description: {
            label: 'Introduzca una breve descripción.'
        },
        town: {
            label: 'Localidad/Población'
        }
    }
}

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isVisible: false,
            filters: {
                Age:0,
                musicGenre: '',
                description: '',
                town:''
            },
            isFiltered:false
        }
    }

    showOverlay = () => {
        const user = this.props.user;
        this.setState({
            isVisible: true,
            user
        })
    };

    onChange = (user) => {
        this.setState({
            user
        })
    };

    onChangeCategory = (categoryId) => {
        let addCategory = {...this.state.filters};
        addCategory['category'] = categoryId;
        this.setState({
            filters: addCategory
        });
    };

    save = () => {
        const user = {...this.state.user};
        this.props.saveChanges(user);
        this.setState({
            isVisible:false
        });
    };

    render() {
        const { user } = this.state;
        if (!this.state.isVisible && !this.state.isFiltered) {
            return (
                <View>
                    <AppButton
                        bgColor='rgba(255, 38, 74, 0.9)'
                        title='Editar Perfil'
                        action={this.showOverlay.bind(this)}
                        iconName='plus'
                        iconSize={30}
                        iconColor='#fff'
                    />
                </View>
            )
        }
        if (this.state.isVisible) {
            return (
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                >
                    <ScrollView>
                        <Form
                            ref="form"
                            type={editUsr}
                            options={options}
                            value={user}
                            onChange={(v) => this.onChange(v)}
                        />
                        <AppButton
                            bgColor='rgba(255, 38, 74, 0.9)'
                            title='Guardar Cambios'
                            action={this.save.bind(this)}
                            iconName='plus'
                            iconSize={30}
                            iconColor='#fff'
                        />
                    </ScrollView>
                </Overlay>
            )
        }
    }
}



