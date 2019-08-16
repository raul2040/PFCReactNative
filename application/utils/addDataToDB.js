import * as firebase from 'firebase';

export default {
    registerUser: (userData) => {
        //const key = firebase.database().ref().child('users').push().key; //De esta forma creamos un id único para nuestro registro.
        const { email,uid } = userData.user;
        const data = {}
        const user = {
            email, 
            uid
        }
        data[`users/${uid}`] = user;
        const prueba = firebase.database().ref().child(`users/${uid}`)
        
        console.log(prueba);
        firebase.database().ref().update(data)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log('ha ido maal')
            })
    }

}