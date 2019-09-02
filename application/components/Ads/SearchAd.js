import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { Overlay } from 'react-native-elements';
import { View, ScrollView } from 'react-native';
import AppButton from '../../components/AppButton';
import sliderTemplate from '../../forms/templates/slider';
const Form = t.form.Form;
import CategoryDropDown from '../../components/Ads/CategoryDropDown';

export const filter = t.struct({
    ratingCounter: t.Number,
    date: t.Date,
    locality: t.String
})

export const options = {
    fields: {
        ratingCounter: {
            label: 'Puntuación',
            help: 'indique la puntuación',
            config: {
                step: 1,
                min:0,
                max:10,
                value:1
            },
            template: sliderTemplate
        },
        date: {
            mode: 'date',
            label: "Seleccione una fecha",
        },
        locality: {
            label: 'Localidad en la que desea buscar'
        }
    }
}

export default class SearchAds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: this.props.ads,
            isVisible: false,
            filters: {
                ratingCounter:0,
            },
            isFiltered:false
        }
    }

    showOverlay = () => {
        this.setState({
            isVisible: true
        })
    };

    onChange = (filters) => {
        this.setState({
            filters
        })
    };

    onChangeCategory = (categoryId) => {
        let addCategory = {...this.state.filters};
        addCategory['category'] = categoryId;
        this.setState({
            filters: addCategory
        });
    };

    filter = () => {
        const filters = Object.keys(this.state.filters);
        if(this.state.filters.ratingCounter === 0) filters.splice(filters.indexOf('ratingCounter'), 1)
        const filteredAds = [...this.props.ads];
        this.props.ads.forEach((ad) => {
            for(let filter of filters) {
                if (ad[filter] != this.state.filters[filter]){
                    filteredAds.splice(filteredAds.indexOf(ad), 1)  
                    break;
                } 
            }
        });
        this.props.onAdsFiltered(filteredAds);
        this.setState({
            isVisible: false,
            isFiltered: true
        })
    };

    cleanFilters = () =>  {
        this.setState({
            filters: {
                ratingCounter:0,
            },
            isFiltered: false
        })
        this.props.reloadAds();
    };

    render() {
        const { filters } = this.state;
        if (!this.state.isVisible && !this.state.isFiltered) {
            return (
                <View>
                    <AppButton
                        bgColor='rgba(255, 38, 74, 0.9)'
                        title='Filtrar'
                        action={this.showOverlay.bind(this)}
                        iconName='plus'
                        iconSize={30}
                        iconColor='#fff'
                    />
                </View>
            )
        }

        if(!this.state.isVisible && this.state.isFiltered) {
            return (
                <View>
                    <AppButton
                        bgColor='rgba(255, 38, 74, 0.9)'
                        title='Limpiar Filtros'
                        action={this.cleanFilters.bind(this)}
                        iconName='trash'
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
                            type={filter}
                            options={options}
                            value={filters}
                            onChange={(v) => this.onChange(v)}
                        />
                        <CategoryDropDown 
                            onChangeCategory={this.onChangeCategory}
                        />
                        <AppButton
                            bgColor='rgba(255, 38, 74, 0.9)'
                            title='Filtrar'
                            action={this.filter.bind(this)}
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



