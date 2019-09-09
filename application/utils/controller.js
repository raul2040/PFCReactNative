import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export default {
    registerUser: (modeOfRegister, usr, accessData = null) => {
        const user = {}
        const data = {}
        let isNewUser = false;
        switch (modeOfRegister) {
            case 'facebook': {
                user['username'] = usr.additionalUserInfo.profile.name;
                user['id'] = usr.user.uid;
                isNewUser = usr.additionalUserInfo.isNewUser;
                break;
            }
            case 'email': {
                user['username'] = usr.username;
                user['id'] = accessData.user.uid;
                isNewUser = accessData.additionalUserInfo.isNewUser;
                break;
            }
            case 'google': {
                user['username'] = usr.additionalUserInfo.profile
                break;
            }
        }
        setData('userID', user.id)
        if (isNewUser) {
            user['profileImage'] = 'https://firebasestorage.googleapis.com/v0/b/expofirebaseapp-96795.appspot.com/o/avatr%20por%20defecto.png?alt=media&token=a433081a-9da5-4ec6-8055-69962d99faf7';
            user['description'] = 'Personaliza tu perfil y añade una descripción personalizada.';
            user['town'] = ""
            user['musicGenre'] = ""
            user['Age'] = 0
            user['friends'] = ""
            user['events'] = ""
            data[`users/${user.id}`] = user;
            firebase.database().ref().update(data)
        }
    },
    registerCompany: (companySessionData, companyData) => {
        const company = {};
        const data = {};
        company['id'] = companySessionData.user.uid;
        company['cif'] = companyData.cif;
        company['name'] = companyData.name;
        company['email'] = companyData.email;
        company['description'] = '';
        company['direction'] = '';
        company['town'] = '';
        company['profileImage'] = 'https://firebasestorage.googleapis.com/v0/b/expofirebaseapp-96795.appspot.com/o/avatr%20por%20defecto.png?alt=media&token=a433081a-9da5-4ec6-8055-69962d99faf7';
        setData('companyID', company.id)
        data[`companies/${company.id}`] = company;
        firebase.database().ref().update(data)
    },
    initSession: (isCompany, id) => {
        let key = isCompany ? 'companyID' : 'userID';
        AsyncStorage.setItem(key, JSON.stringify(id))
    },
    closeSession: () => {
        AsyncStorage.removeItem('userID');
        AsyncStorage.removeItem('companyID');
    }

}

async function setData(key, id) {
    await AsyncStorage.setItem(key, JSON.stringify(id));
    let isCompany = key === 'companyID' ? true : false;
    await AsyncStorage.setItem('isCompany', JSON.stringify(isCompany))
}