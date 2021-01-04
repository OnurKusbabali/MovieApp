import React,{useEffect} from 'react'
import { Text, View, Image, TouchableOpacity, PermissionsAndroid,Alert } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

import Colors from "../config/Colors"

const Favorities = (props) => {

    getPermissionAndroid = async () => {
        console.log("selamlar")
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Image Download Permission',
                    message: 'Your permission is required to save images to your device',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
            Alert.alert(
                'Save remote Image',
                'Grant Me Permission to save Image',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } catch (err) {
            Alert.alert(
                'Save remote Image',
                'Failed to save Image: ' + err.message,
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        }
    };

    handleDownload = async () => {
        // if device is android you have to ensure you have permission
        if (Platform.OS === 'android') {
            const granted = await this.getPermissionAndroid();
            if (!granted) {
                return;
            }
        }
        this.setState({ saving: true });
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
        })
            .fetch('GET', props.imageURL)
            .then(res => {
                CameraRoll.saveToCameraRoll(res.data, 'photo')
                    .then(() => {
                        Alert.alert(
                            'Save remote Image',
                            'Image Saved Successfully',
                            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                            { cancelable: false },
                        );
                    })
                    .catch(err => {
                        Alert.alert(
                            'Save remote Image',
                            'Failed to save Image: ' + err.message,
                            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                            { cancelable: false },
                        );
                    })
                    .finally(() => this.setState({ saving: false }));
            })
            .catch(error => {
                this.setState({ saving: false });
                Alert.alert(
                    'Save remote Image',
                    'Failed to save Image: ' + error.message,
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false },
                );
            });
    };

    return (
        <View style={styles.mainContainer}>
            <Image source={{ uri: props.imageURL }} style={{ height: 200, width: 150 }} />
            <TouchableOpacity onPress={() => handleDownload()} style={{backgroundColor:Colors.red,padding:5}}>
                <Text style={{color:"white"}}>Download Poster</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        justifyContent: "center",
        alignItems:"center"
    }
}
export default Favorities;