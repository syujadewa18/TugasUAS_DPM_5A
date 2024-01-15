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
    Alert
} from 'react-native';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';

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

const Register = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const [inputFullName, setFullName] = useState('');
    const [inputEmail, setEmail] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [inputConfirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            updateProfileFullName: '',
            updateProfileAge: '',
            updateProfileEmail: '',
            updateProfilePassword: '',
            updateProfileIdCard: '',
        },
        inputValidities: {},
        formIsValid: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                Alert.alert('Error', error, [{ text: 'Ok' }]);
            }, 100);
        }
    }, [error]);

    const updateProfileHandler = async () => {
        const fullName = inputFullName;
        const email = inputEmail;
        const password = inputPassword;
        const confirmPassword = inputConfirmPassword;
        if (password != confirmPassword) {
            return Alert.alert('Error', 'Password & Confirm Password should be same', [{ text: 'Ok' }]);
        }

        // const age = formState.inputValues.updateProfileAge;
        // const idCard = formState.inputValues.updateProfileIdCard;
        
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(
                mAuth.registerProfile(
                    fullName,
                    email,
                    password,
                )
            );
        } catch (error) {
            try {
                const result = JSON.parse(error.message)
                if (result.status == true) {
                    setTimeout(async () => {
                        await Alert.alert('Success', result.message, [{ text: 'Ok' }]);
                        props.navigation.navigate('LandingPage');
                    }, 100);
                } else {
                    setError(result.message);
                }
            } catch (e) {
                setError(error.message);
            }
        }
        setIsLoading(false);
    };

    const fullNameHandler = text => {
        setFullName(text);
    };
    const emailHandler = text => {
        setEmail(text);
    };
    const passwordHandler = text => {
        setPassword(text);
    };
    const confirmPasswordHandler = text => {
        setConfirmPassword(text);
    };
    const login = async () => {
        props.navigation.navigate('LandingPage')
    }

    return (
        <ScrollView style={{ backgroundColor: '#F6F0E4' }}>
            <View style={styles.gradientAfterLogin}>
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <Card style={styles.authContainer}>
                    <Image style={{ height: 160, width: '100%', resizeMode: 'contain', marginBottom: -5 }}  source={require('../assets/new/register.png')} />
                    {/* <Image style={{ height: 240, width: '100%', resizeMode: 'contain', marginBottom: -5 }}  source={require('../assets/creekgarden/login/logo.png')} />               */}
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
                                        onChangeText={fullNameHandler}
                                        placeholder={"Username"}
                                    />
                                </View>
                            </View>
                        </View>
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
                                        placeholder={"Email"}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.formControl2}>
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
                                        onChangeText={passwordHandler}
                                        secureTextEntry
                                        placeholder={"Password"}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.formControl2}>
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
                                        onChangeText={confirmPasswordHandler}
                                        secureTextEntry
                                        placeholder={"Confirm Password"}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={updateProfileHandler} style={{ backgroundColor: '#7F7F7F', padding: 10, borderWidth: 2, borderColor: 'white', borderRadius: 10, width: '100%', alignSelf: 'center' }}>
                                <View>
                                    <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'poppins-regular' }}>Sign Up</Text>
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
                                    Already have an account?
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
  
Register.navigationOptions = {
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
//         backgroundColor: 'white'
//     },
//     authContainer: {
//         width: '80%',
//         maxWidth: 400,
//         maxHeight: 600,
//         padding: 20
//     },
//     buttonContainer: {
//         marginTop: 30
//     },

//     gradientAfterLogin: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: 'white'
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
        width: '100%',
        marginTop: 15
    },
    formControl2: {
        width: '100%',
        marginTop: 15
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
  
export default Register;