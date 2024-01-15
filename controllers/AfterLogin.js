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
    AsyncStorage
} from 'react-native';
import { Footer, FooterTab } from 'native-base';
import { createBottomTabNavigator } from "react-navigation-tabs";
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';

import Cart from './Cart';

import * as mAuth from '../models/action/mAuth';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

import * as Expo from 'expo';
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'

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

const Login = props => { 
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {},
        formIsValid: false
    });
    const [inputEmail, setEmail] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // useEffect(() => {
    //     if (error) {
    //         Alert.alert('Error', error, [{ text: 'Ok' }]);
    //     }
    // }, [error]);

    let userLogin = useSelector(state => state.auth.user);

    if (isEmpty(userLogin)) {
        AsyncStorage.getItem("userData").then((user) => {
            if (user !== null) {
                const alreadyLoggedIn = JSON.parse(user);
                if (alreadyLoggedIn.email) {
                    setIsLoading(true);
                    dispatch(mAuth.loginSocmed(alreadyLoggedIn.email));
                    setTimeout(function(){
                        setIsLoading(false); 
                    }, 1000);
                }
            }
        });
    }
    if (isEmpty(userLogin)) {
        // console.log(userLogin)
        return props.navigation.navigate('Login')
    }

    // dispatch(mAuth.logout())

    const forgotPassword = async () => {
        props.navigation.navigate('ForgotPassword')
    }
    const register = async () => {
        props.navigation.navigate('Register')
    }

    const signInGoogle = async () => {
        setIsLoading(true);
        try {
            const result = await Google.logInAsync({
                scopes: ['profile', 'email'],
                iosClientId: "494202122692-og45isamm7i2a76rjtcbi4a3i12dhgc1.apps.googleusercontent.com",
                androidClientId: "494202122692-kgt5hugdlga06oclhf4ahcdgddh9lujr.apps.googleusercontent.com",
            })

            if (result.type == 'success' && result.user.email) {
                await dispatch(mAuth.loginSocmed(result.user.email));
                props.navigation.navigate('Login');
            } else {
                // setTimeout(() => {
                //     Alert.alert('Error', `Mohon maaf terjadi kesalahan, silahkan coba kembali nanti.`, [{ text: 'Ok' }]);
                // }, 100);
            }
        } catch (error) {
            setTimeout(() => {
                Alert.alert('Error', `Mohon maaf terjadi kesalahan, silahkan coba kembali nanti. Error: ${error.message}`, [{ text: 'Ok' }]);
            }, 100);
        }
        setIsLoading(false);
    };
    const signInFacebook = async () => {
        setIsLoading(true);
        try {
            await Facebook.initializeAsync({
                appId: '817475785591648',
            });
            const resultLogin = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });

            if (resultLogin.type === 'success') {
                let fetchFacebook = (token) => { 
                    return new Promise((resolve, reject) => {
                        fetch(`https://graph.facebook.com/me?fields=id,email,name&access_token=${token}`)
                        .then(response => response.json())
                        .then(data => resolve(data))
                        .catch(error => resolve(error));
                    })
                }
                let resultFacebook = []
                try {
                    const facebookPromise = fetchFacebook(resultLogin.token)
                    facebookPromise.then(async response => {
                        await dispatch(mAuth.loginSocmed(response.email, response.name));
                        props.navigation.navigate('Login');
                      }, reason => {
                        setTimeout(() => {
                            Alert.alert('Error', `Mohon maaf terjadi kesalahan, silahkan coba kembali nanti. Error: ${reason}`, [{ text: 'Ok' }]);
                        }, 100);
                    });

                } catch (error) {
                    setTimeout(() => {
                        Alert.alert('Error', `Mohon maaf terjadi kesalahan, silahkan coba kembali nanti. Error: ${error.message}`, [{ text: 'Ok' }]);
                    }, 100);
                }
            } else {
                // setTimeout(() => {
                //     Alert.alert('Error', `Mohon maaf terjadi kesalahan, silahkan coba kembali nanti.`, [{ text: 'Ok' }]);
                // }, 100);
            }
        } catch ({ message }) {
            setTimeout(() => {
                Alert.alert('Error', `Mohon maaf terjadi kesalahan, silahkan coba kembali nanti.`, [{ text: 'Ok' }]);
            }, 100);
        }
        setIsLoading(false);
    }
    
    const emailHandler = text => {
        setEmail(text);
    };
    const passwordHandler = text => {
        setPassword(text);
    };
    const authHandler = async () => {
        const email = inputEmail;
        const password = inputPassword;
        
        setIsLoading(true);
        try {
            await dispatch(mAuth.login(email, password));
            await setEmail('');
            await setPassword('');
            
            props.navigation.navigate('Login');
        
        } catch (error) {
            setTimeout(() => {
                Alert.alert('Error', error.message, [{ text: 'Ok' }]);
            }, 100);
        }
        setIsLoading(false);
        return;
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

    const logoutHandler = () => {
        Alert.alert(
            "Notification",
            "Are you sure, you want to logout?",
            [
                { 
                    text: "OK", 
                    onPress: async () => { 
                        await dispatch(mAuth.logout()); 
                        Alert.alert('Notification', 'Your account is successfully logout', [{ text: 'Ok' }]); 
                        props.navigation.navigate('Login'); 
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ],
        );
    };

    return (
        <ScrollView>
            <View style={styles.gradientAfterLogin}>
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                {/* <Card style={styles.alreadyLoginContainer}>
                    <LinearGradient colors={['#6BB745', '#6BB745']} style={{ padding: 10, height: 150, zIndex: 0, overflow: 'hidden', borderBottomLeftRadius: 20, position: "absolute" }}></LinearGradient>
                    <Image 
                        style={{ height: 150, width: '100%', resizeMode: 'contain', borderRadius: 100, marginTop: '15%', position: 'absolute', zIndex: 1 }}  
                        source={userLogin.foto ? {uri: userLogin.foto} : require('../assets/noFotoProfile.png')} 
                    />
                </Card> */}
                <View style={{ backgroundColor: '#6BB745', height: 100, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
                    <Image 
                        style={{ height: 150, width: '100%', resizeMode: 'contain', borderRadius: 100, marginTop: '5%', position: 'absolute', zIndex: 1 }}  
                        source={userLogin.foto ? {uri: userLogin.foto} : require('../assets/noFotoProfile.png')} 
                    />
                </View>

                <Card style={styles.authContainerAfterLogin}>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                            <Text style={{ textAlign: 'right', color: core.primaryColor }}>Edit</Text>
                        </TouchableOpacity>
                        <Input
                            id="nip"
                            label="NIP"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.nip}
                            editableForm={false}
                        />
                        
                        <Input
                            id="fullName"
                            label="Full Name"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.nama}
                            editableForm={false}
                        />
                        
                        <Input
                            id="_email"
                            label="Email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.email}
                            editableForm={false}
                        />
                        
                        <Input
                            id="_password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue="      "
                            editableForm={false}
                        />

                        <Input
                            id="handphone"
                            label="Handphone"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.handphone}
                            editableForm={false}
                        />

                        {/* <Input
                            id="ktp"
                            label="NIK"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={userLogin.nik}
                            editableForm={false}
                        /> */}

                        {/* <TouchableOpacity onPress={logoutHandler} style={{ marginTop: '20%' }}>
                            <Text style={{ textAlign: 'center', color: '#888' }}>Logout</Text>
                        </TouchableOpacity>

                        <Text style={{ textAlign: 'center', color: '#888', marginTop: '5%', fontSize: 10 }}>v1.0.0</Text> */}

                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};

Login.navigationOptions = {
    // headerShown: false,
    // tabBarVisible: false
    headerStyle: {
        backgroundColor: '#6BB745'
    },
    headerTitle: <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'poppins-regular', color: '#fff'}}>Akun</Text>,
    headerTintColor: '#fff',
};
  
// const styles = StyleSheet.create({
//     screen: {
//         flex: 1
//     },
//     gradient: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: 'white'
//     },
//     authContainer: {
//         width: '80%',
//         maxWidth: 400,
//         // maxHeight: 600,
//         padding: 20
//     },
//     buttonContainer: {
//         marginTop: 30
//     },

//     gradientAfterLogin: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: 'white',
//         marginBottom: 0
//     },
//     alreadyLoginContainer: {
//         width: '100%',
//         padding: 0,
//     },
//     authContainerAfterLogin: {
//         width: '80%',
//         maxWidth: 400,
//         maxHeight: 600,
//         padding: 20,
//         marginTop: '20%'
//     },
//     backgroundImage: {
//         flex: 1,
//         resizeMode: 'cover', // or 'stretch'
//     },
//     formControl: {
//         width: '100%'
//     },
//     label: {
//         // fontFamily: 'open-sans-bold',
//         marginVertical: 8,
//         color: 'white'
//     },
//     input: {
//         // paddingHorizontal: 2,
//         // paddingVertical: 5,
//         borderColor: 'transparent',
//         borderBottomWidth: 1,
//         backgroundColor: 'white',
//         opacity: .8,
//         borderRadius: 10,
//         padding: 10
//     },
// });
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderWidth: 1
    },
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        // maxHeight: 800,
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    authContainer2: {
        width: '80%',
        maxWidth: 400,
        // maxHeight: 800,
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    buttonContainer: {
        marginTop: 20
    },

    gradientAfterLogin: {
        // flex: 1,
        // alignItems: 'center',
        // backgroundColor: 'white'
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
        marginTop: '60%'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    formControl: {
        width: '100%'
    },
    formControl2: {
        width: '100%',
        marginTop: 10
    },
    label: {
        // fontFamily: 'open-sans-bold',
        marginVertical: 7,
        color: '#000',
        fontFamily: 'poppins-semi-bold',
        fontSize: 13
    },
    input: {
        // paddingHorizontal: 2,
        // paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#6BB745',
        // backgroundColor: '#ddd',
        opacity: .6,
        borderRadius: 10,
        padding: 10
    },
});

export default Login;