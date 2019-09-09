import React from 'react';
import AdScreen from '../screens/Ads/Ads';
import AddAdScreen from '../screens/Ads/AddAd';
import LogoutScreen from '../screens/Logout';
import { DrawerNavigator, StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetailAd from '../screens/Ads/DetailAd';
import EditAdScreen from '../screens/Ads/EditAd';
import ProfileScreen from '../screens/Profile';
import ReviewAds from '../screens/Ads/ReviewAd';
import RelevantAds from '../screens/Ads/RelevantAds';
import Calendar from '../screens/Calendar';
import Profile from '../screens/Companies/Profile';
import AdsManagement from '../screens/Ads/AdsManagement';
import DetailAdCompany from '../screens/Ads/DetailAdCompany';
import Friends from '../screens/Friends';

const navigationOptions = {
    navigationOptions: {
        headerStyle: {
            backgroundcolor: 'rgba(128, 35, 60, 1)',
        },
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold'
        }
    }
};

const leftIcon = (navigation, icon) => <Icon
    name={icon}
    style={{ marginLeft: 20 }}
    size={20}
    color='black'
    onPress={() => { navigation.navigate('DrawerOpen') }}
/>;


const rightIcon = (navigation, icon) => <Icon
    name={icon}
    style={{ marginLeft: 20 }}
    size={30}
    color='black'
    onPress={() => { navigation.navigate('ListAds') }}
/>;

const adsScreenStack = StackNavigator(
    {
        ListAds: {
            screen: AdScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Anuncios',
                drawerIcon: ({ tintColor }) => (<Icon name="home" size={24} style={{ color: tintColor }} />),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        ReviewAds: {
            screen: ReviewAds,
            navigationOptions: ({ navigation }) => ({
                title: 'Valoraciones',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        AddAds: {
            screen: AddAdScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Añadir Anuncio',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        DetailAd: {
            screen: DetailAd,
            navigationOptions: ({ navigation }) => ({
                title: 'Detalle del Anuncio',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        DetailAdCompany: {
            screen: DetailAdCompany,
            navigationOptions: ({ navigation }) => ({
                title: 'Detalle del Anuncio',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        EditAd: {
            screen: EditAdScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Editar Anuncio',
                headerRight: rightIcon(navigation, 'home')
            })
        },
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: ({ navigation }) => ({
                title: "Perfil",
                headerLeft: leftIcon(navigation, 'bars'),
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
                drawerIcon: ({ tintColor }) => (<Icon name="user" size={24} style={{ color: tintColor }} />),
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
            })
        }
    },
    navigationOptions
);

const companyProfileScreenStack = StackNavigator(
    {
        ProfileScreen: {
            screen: Profile,
            navigationOptions: ({ navigation }) => ({
                title: "Perfil",
                drawerIcon: ({ tintColor }) => (<Icon name="user" size={24} style={{ color: tintColor }} />),
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
            navigationOptions: ({ navigation }) => ({
                title: 'Cerrar sesión',
                drawerIcon: ({ tintColor }) => (<Icon name="sign-out" size={24} style={{ color: tintColor }} />),
            })

        }
    }
);


const reviewsAdScreenStack = StackNavigator(
    {
        ReviewAds: {
            screen: ReviewAds,
            navigationOptions: ({ navigation }) => ({
                title: 'Valoraciones',
                drawerIcon: ({ tintColor }) => (<Icon name="comments" size={24} style={{ color: tintColor }} />),
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
            })
        }
    },
    navigationOptions
);

const mostRelevantsAdsStack = StackNavigator(
    {
        RelevantAds: {
            screen: RelevantAds,
            navigationOptions: ({ navigation }) => ({
                title: 'Anuncios más relevantes',
                drawerIcon: ({ tintColor }) => (<Icon name="exclamation" size={24} style={{ color: tintColor }} />),
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
            })
        }
    },
    navigationOptions
)


const AddAdsStack = StackNavigator(
    {
        addAd: {
            screen: AddAdScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Añadir Anuncio',
                drawerIcon: ({ tintColor }) => (<Icon name="exclamation" size={24} style={{ color: tintColor }} />),
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        }
    },
    navigationOptions
)

const AgendaStack = StackNavigator(
    {
        Agenda: {
            screen: Calendar,
            navigationOptions:({ navigation}) => ({
                title:'Calendario',
                drawerIcon: ({ tintColor }) => (<Icon name="calendar" size={24} style={{ color: tintColor }} />),
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        }
    }
)

const AdsManagementStack = StackNavigator(
    {
        AdsManagement: {
            screen: AdsManagement,
            navigationOptions:({ navigation}) => ({
                title:'Gestiona tus anuncios',
                drawerIcon: ({ tintColor }) => (<Icon name="edit" size={24} style={{ color: tintColor }} />),
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        }
    }
)

const FriendsStack = StackNavigator(
    {
        Friends: {
            screen: Friends,
            navigationOptions:({ navigation}) => ({
                title:'Amistades',
                drawerIcon: ({ tintColor }) => (<Icon name="users" size={24} style={{ color: tintColor }} />),
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        }
    }
)



 export const UserNavigation =  DrawerNavigator(
    {
        AdScreen: {
            screen: adsScreenStack
        },
        ReviewsAdScreen: {
            screen: reviewsAdScreenStack
        },
        mostRelevantsAds: {
            screen: mostRelevantsAdsStack
        },
        ProfileScreen: {
            screen: profileScreenStack
        },
        FriendsScreen: {
            screen: FriendsStack
        },
        calendarScreen: {
            screen: AgendaStack
        },
        LogoutScreen: {
            screen: logoutScreenStaack
        },
    },
    {
        drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContaainerStyle: {
                marginVertical: 0,
            }
        }

    }
)

export const CompanyNavigation =  DrawerNavigator(
    {
        AdScreen: {
            screen: adsScreenStack
        },
        adAdd: {
            screen: AddAdsStack
        },
        AdsManagementStack: {
            screen: AdsManagementStack
        },
        ProfileScreen: {
            screen: companyProfileScreenStack
        },
        LogoutScreen: {
            screen: logoutScreenStaack
        },
    },
    {
        drawerBackgroundColor: 'rgba(47, 138, 236, 0.7)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContaainerStyle: {
                marginVertical: 0,
            }
        }

    }
)
