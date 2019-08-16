import React from 'react';
import AdScreen from '../screens/Ads/Ads';
import AddAdScreen from '../screens/Ads/AddAd';
import LogoutScreen from '../screens/Logout';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetailAd from '../screens/Ads/DetailAd';
import EditAdScreen from '../screens/Ads/EditAd';
import ProfileScreen from '../screens/Profile';
import ReviewAds from '../screens/Ads/ReviewAd';

const navigationOptions = {
    navigationOptions: {
        headerStyle: {
            backgroundcolor: 'rgba(128, 35, 60, 1)',
        },
        headerTitleStyle: {
            textAlign:'center',
            alignSelf: 'center',
            fontSize: 20,
            color:'black',
            fontWeight: 'bold'
        }
    }
};

const leftIcon = (navigation, icon) => <Icon
    name={icon}
    style={{marginLeft:20}}
    size={20}
    color='black'
    onPress={() => {navigation.navigate('DrawerOpen')}} 
/>;


const rightIcon = (navigation, icon) => <Icon
    name={icon}
    style={{marginLeft:20}}
    size={30}
    color='black'
    onPress={() => {navigation.navigate('ListAds')}} 
/>;

const adsScreenStack = StackNavigator(
    {
        ListAds: {
            screen: AdScreen,
            navigationOptions: ({navigation}) => ({
                title:'Anuncios',
                drawerIcon: ({tintColor}) => (<Icon name="home" size={24} style={{color: tintColor}}/>),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        ReviewAds: {
            screen: ReviewAds,
            navigationOptions: ({navigation}) => ({
                title:'Valoraciones',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        AddAds: {
            screen: AddAdScreen,
            navigationOptions:({navigation}) => ({
                title:'Añadir Anuncio',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        DetailAd: {
            screen: DetailAd,
            navigationOptions: ({navigation}) => ({
                title: 'Detalle del Anuncio',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        EditAdScreen: {
            screen: EditAdScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Editar Anuncio',
                headerRight: rightIcon(navigation, 'home')
            })
        }
    },
    navigationOptions 
);

const profileScreenStack = StackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: ({ navigation }) => ({
                title: "Perfil",
                drawerIcon: ({ tintColor }) => (<Icon name="user" size={24} style={{color :tintColor}}/>),
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
            })
        }
    },
    navigationOptions
);

const logoutScreenStaack = StackNavigator(
    {
        logoutScreen: {
            screen: LogoutScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Cerrar sesión',
                drawerIcon: ({tintColor}) => (<Icon name="sign-out" size={24} style={{color: tintColor}}/>),
            })
            
        }
    }
);


const reviewsAdScreenStack = StackNavigator(
    {
        ReviewAds: {
            screen: ReviewAds,
            navigationOptions: ({navigation}) => ({
                title: 'Valoraciones',
                drawerIcon: ({tintColor}) => (<Icon name="comments" size={24} style={{color: tintColor}}/>),
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
            })
        }
    },
    navigationOptions
);


export default DrawerNavigator(
    {
        AdScreen:{
            screen:adsScreenStack
        },
        ReviewsAdScreen: {
            screen: reviewsAdScreenStack
        },
        ProfileScreen: {
            screen: profileScreenStack
        },
        LogoutScreen: {
            screen: logoutScreenStaack
        }
    },
    {
        drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor:'white',
            itemsContaainerStyle: {
                marginVertical:0,
            }
        }

    }

)