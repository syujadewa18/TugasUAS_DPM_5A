import { StatusBar } from 'expo-status-bar';
import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
	StyleSheet, 
	Text, 
	ScrollView, 
	View, 
	TextInput, 
	Button, 
    TouchableOpacity, 
    TouchableNativeFeedback, 
	FlatList,
	Platform,
	ImageBackground,
    Image,
    KeyboardAvoidingView,
    Alert,
    NativeModules
} from 'react-native';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import * as mAuth from '../models/action/mAuth';

const formReducer = (state, action) => {
    const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
    };

    return {
        formIsValid: true,
        inputValidities: true,
        inputValues: updatedValues
    };
};

const Profile = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    let userLogin = useSelector(state => state.auth.user);

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            updateProfileNip: userLogin.nip,
            updateProfileFullName: userLogin.nama,
            updateProfileEmail: userLogin.email,
            updateProfilePassword: '      ',
            updateProfileHandphone: userLogin.handphone,
            updateProfileIdCard: userLogin.nik,
        },
        inputValidities: {},
        formIsValid: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [pickedImage, setPickedImage] = useState();
    const [pickedImageBase64, setPickedImageBase64] = useState();

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    const updateProfileHandler = async () => {
        const id_user = userLogin.id;
        const nip = formState.inputValues.updateProfileNip;
        const name = formState.inputValues.updateProfileFullName;
        const email = formState.inputValues.updateProfileEmail;
        const password = formState.inputValues.updateProfilePassword;
        const handphone = formState.inputValues.updateProfileHandphone;
        // const nik = formState.inputValues.updateProfileIdCard;
        const nik = '';
        const imageBase64 = pickedImageBase64 ? pickedImageBase64 : '';
        
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(
                mAuth.updateProfile(
                    id_user,
                    nip,
                    name, 
                    email,
                    password,
                    handphone,
                    nik,
                    imageBase64
                )
            );
            
            Alert.alert('Notification', 'Your profile has been successfully updated!', [{ text: 'Ok' }]);  
            props.navigation.navigate('Login');
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    const updateProfilePhotoHandler = () => {
        const verifyPermissions = async () => {
            const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (result.status !== 'granted') {
                Alert.alert(
                    'Error!',
                    'You need to grant camera permissions to use this app.',
                    [{ text: 'Ok' }]
                );
            
                return false;
            }
          
            return true;
        };
      
        const takeImageHandler = async () => {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                return;
            }
            
            const image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true,
            });
            setPickedImageBase64(image);
            setPickedImage(image.uri);
        };
        takeImageHandler();
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: 'formInputUpdate',
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState]
    );

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.gradientAfterLogin}>
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <Card style={styles.alreadyLoginContainer}>
                    <LinearGradient colors={[core.primaryColor, '#00d2ff']} style={{ padding: 10, height: 150, zIndex: 0 }}></LinearGradient>
                    <TouchableOpacity onPress={updateProfilePhotoHandler} activeOpacity={0.8}>
                        <View>
                            <Image 
                                style={{ height: 150, width: '100%', resizeMode: 'contain', borderRadius: 100, marginTop: '-20%'}}  
                                source={
                                    userLogin.foto ? 
                                        pickedImage ? {uri: pickedImage} : {uri: userLogin.foto}
                                    
                                    : 
                                        pickedImage ? {uri: pickedImage} : require('../assets/noFotoProfile.png')
                                }  
                            />
                        </View>
                    </TouchableOpacity>
                </Card>

                <Card style={styles.authContainerAfterLogin}>
                    <View>
                        <Input
                            id="updateProfileNip"
                            label="NIP"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.nip}
                            editableForm={true}
                        />
                        
                        <Input
                            id="updateProfileFullName"
                            label="Full Name"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.nama}
                            editableForm={true}
                        />
                        
                        <Input
                            id="updateProfileEmail"
                            label="Email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.email}
                            editableForm={true}
                        />
                        
                        <Input
                            id="updateProfilePassword"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue="      "
                            editableForm={true}
                        />

                        <Input
                            id="updateProfileHandphone"
                            label="No Handphone"
                            keyboardType="number"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.handphone}
                            editableForm={true}
                        />

                        {/* <Input
                            id="updateProfileIdCard"
                            label="NIK"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.nik}
                            editableForm={true}
                        /> */}

                        <View style={styles.buttonContainer}>
                            <Button title="Update Profile" color={core.primaryColor} onPress={updateProfileHandler} />
                        </View>

                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};
  
Profile.navigationOptions = {
    headerTitle: 'Edit Profil',
    headerTintColor: core.primaryColor,
};
  
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 600,
        padding: 20
    },
    buttonContainer: {
        marginTop: 30
    },

    gradientAfterLogin: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    alreadyLoginContainer: {
        width: '100%',
        padding: 0,
    },
    authContainerAfterLogin: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 600,
        padding: 20,
        marginTop: '0%'
    },
});
  
export default Profile;