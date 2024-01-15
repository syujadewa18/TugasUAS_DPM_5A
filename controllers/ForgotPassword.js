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

const ForgotPassword = props => { 
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
        },
        inputValidities: {},
        formIsValid: false
    });
    const [inputEmail, setEmail] = useState('');
    // const [inputPassword, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (error) {
            Alert.alert('Notifikasi', JSON.stringify(error), [{ text: 'Ok' }]);
        }
    }, [error]);

    // let userLogin = useSelector(state => state.auth.user);

    // if (isEmpty(userLogin)) {
    //     AsyncStorage.getItem("userData").then((user) => {
    //         if (user !== null) {
    //             const alreadyLoggedIn = JSON.parse(user);
    //             if (alreadyLoggedIn.email && alreadyLoggedIn.password) {
    //                 setIsLoading(true);
    //                 dispatch(mAuth.login(alreadyLoggedIn.email, alreadyLoggedIn.password));
    //                 setTimeout(function(){
    //                     setIsLoading(false); 
    //                 }, 1000);
    //             }
    //         }
    //     });
    // }

    // dispatch(mAuth.logout())
    
    const emailHandler = text => {
        setEmail(text);
    };
    const forgotPasswordHandler = async () => {
        const email = inputEmail;
        if (!email) {
            return Alert.alert('Error', 'Email required', [{ text: 'Ok' }]);
        }
        
        setIsLoading(true);
        // try {
        //     await dispatch(mAuth.lupaPassword(email));
        
        // } catch (error) {
        //     console.log(error.message)
        //     setTimeout(() => {
        //         Alert.alert('Notifikasi', error.message, [{ text: 'Ok' }]);
        //     }, 100);
        // }
        props.navigation.navigate('SendOtp', { email: email })
        setIsLoading(false);
    };
    const login = async () => {
        props.navigation.navigate('LandingPage')
    }
    
    return (
        <ScrollView style={{ marginTop: Platform.OS == 'ios' ? 0 : 0, backgroundColor: '#F6F0E4' }}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />

            <View style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <Image style={{ height: 160, width: '100%', resizeMode: 'contain', marginBottom: -5 }}  source={require('../assets/new/forgot-password.png')} />              
                    <Text style={{ color: '#000000', fontSize: 13, marginBottom: 10, fontFamily: 'poppins-regular', textAlign: 'left', marginBottom: 30 }}>
                        Don't worry! It occurs. Please enter the email address linked with your account.
                    </Text>
                    <View>
                        <View style={styles.formControl}>
                            <View style={{
                                flex: 1, 
                                flexDirection: 'row', 
                                borderWidth: 1,
                                borderColor: '#8391A1',
                                opacity: .6,
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: 'white'
                            }}>
                                <View style={{width: '100%'}}>
                                    <TextInput
                                        onChangeText={emailHandler}
                                        placeholder={"Enter your email"}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={forgotPasswordHandler} style={{ backgroundColor: '#7F7F7F', padding: 10, borderWidth: 2, borderColor: 'white', borderRadius: 10, width: '100%', alignSelf: 'center' }}>
                                <View>
                                    <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'poppins-regular' }}>Send Code</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

                <Card style={styles.authContainer2}>
                    <View style={{ marginTop: 30 }}>                            
                        <TouchableOpacity onPress={login}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: '#000000', fontSize: 13, marginBottom: 10, fontFamily: 'poppins-regular', textAlign: 'center', marginBottom: 30 }}>
                                    Remember Password?
                                </Text>
                                <Text style={{ fontSize: 13, color: '#000000', marginLeft: 5, marginBottom: 10, fontFamily: 'poppins-semi-bold', textAlign: 'center', marginBottom: 30 }}>
                                    Login
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};
ForgotPassword.navigationOptions = {
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}></Text>,
    headerTitleAlign: 'center',
    headerTintColor: '#000',
    headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
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
        backgroundColor: '#F6F0E4',
        // backgroundColor: 'white'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        // maxHeight: 800,
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginTop: 20
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
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F0E4'
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
        marginTop: '20%'
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

export default ForgotPassword;