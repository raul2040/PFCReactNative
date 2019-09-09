import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { Overlay } from 'react-native-elements';
import { View, ScrollView } from 'react-native';
import AppButton from '../../components/AppButton';
import sliderTemplate from '../../forms/templates/slider';
const Form = t.form.Form;
import ImagePicker from '../../components/ImagePicker';

export const companyStruct = t.struct({
    direction: t.String,
    description: t.String,
    town: t.String
})

export const options = {
    fields: {
        direction: {
            label: "Dirección de su empresa",
        },
        description: {
            label: 'Introduzca una breve descripción.'
        },
        town: {
            label: 'Localidad/Población'
        }
    }
}

export class EditCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            isVisible: false,
            filters: {
                direction: '',
                description: '',
                town:''
            },
            isFiltered:false
        }
    }

    showOverlay = () => {
        const company = this.props.company;
        this.setState({
            isVisible: true,
            company
        })
    };

    onChange = (company) => {
        this.setState({
            company
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
        const company = {...this.state.company};
        this.props.saveChanges(company);
        this.setState({
            isVisible:false
        });
    };

    refreshProfileImage (img) {
        const company = {...this.state.company}
        company['profileImage'] = img
        this.setState({
            company
        })
    };

    render() {
        const { company } = this.state;
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
                            type={companyStruct}
                            options={options}
                            value={company}
                            onChange={(v) => this.onChange(v)}
                        />
                        <ImagePicker
                            callback={this.refreshProfileImage.bind(this)}
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



