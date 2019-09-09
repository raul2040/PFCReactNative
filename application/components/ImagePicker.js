import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

export default class ImagePickers extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Añadir Imagen"
                    onPress={this._pickImage}
                />
                {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
            const key = firebase.database().ref().child('ads').push().key;
            const ref = firebase.storage().ref('fotos/').child(key);
            await this.uploadImage(ref,result.uri, key).then((result) => {
                ref.getDownloadURL().then((url) => {
                    console.log(url)
                    this.props.callback(url);
                }); 
            });
        }
    };

    async uploadImage(ref, uri, key) {
        const response = await fetch(uri);
        const blob = await response.blob(); 
        return ref.put(blob);
      }
}