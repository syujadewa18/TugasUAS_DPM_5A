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
    AsyncStorage,
    Dimensions
} from 'react-native';
import Modal from "react-native-modal";
import { Footer, FooterTab } from 'native-base';
import { createBottomTabNavigator } from "react-navigation-tabs";
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Linking from 'expo-linking';

import Cart from './Cart';

import * as mAuth from '../models/action/mAuth';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import * as AppleAuthentication from 'expo-apple-authentication';

import * as Expo from 'expo';
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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
    let userLogin = useSelector(state => state.auth.user);
    // console.log(userLogin)

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
    const [modalVisible, setModalVisible] = useState(false);
    const [pickedImage, setPickedImage] = useState();
    const [pickedImageBase64, setPickedImageBase64] = useState();

    const inbox = () => {
        props.navigation.navigate('Inbox')
    };
    const creekPoint = () => {
        props.navigation.navigate('CreekPoin')
    };
    const Voucher = () => {
        props.navigation.navigate('Voucher')
    };
    const Bantuan = () => {
        props.navigation.navigate('Bantuan')
    };
    const KebijakanPrivasi = () => {
        props.navigation.navigate('KebijakanPrivasi')
    };
    const AlamatSaya = () => {
        props.navigation.navigate('ListAddress')
    };
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    const toggleModalBatal = () => {
        setModalVisible(false);
    };
    const openWa = () => {
        Linking.openURL('https://wa.me/+6287777575231?text=Halo%20saya%20ingin%20membeli%20buah-buahan%20dan%20sayur-sayuran%20di%20Creek%20Garden.');
    }
    const deviceWidth = Dimensions.get("window").width;
    // const deviceHeight =
    // Platform.OS === "ios"
    //     ? Dimensions.get("window").height
    //     : require("react-native-extra-dimensions-android").get(
    //     "REAL_WINDOW_HEIGHT"
    // );
    const deviceHeight = Dimensions.get("window").height
    
    const listMenu = [
        {
            "menuName": "Creek Poin",
            "link": creekPoint,
            "imageUrl": require('../assets/creekgarden/login/list-creekpoin.png'),
            "width": 35, 
            "height": 35
        },
        {
            "menuName": "Voucher Saya",
            "link": Voucher,
            "imageUrl": require('../assets/creekgarden/login/list-vouchersaya.png'),
            "width": 35, 
            "height": 35
        },
        {
            "menuName": "Alamat Saya",
            "link": AlamatSaya,
            "imageUrl": require('../assets/creekgarden/login/list-alamatsaya.png'),
            "width": 45, 
            "height": 45
        },
        {
            "menuName": "Privasi & Kebijakan",
            "link": KebijakanPrivasi,
            "imageUrl": require('../assets/creekgarden/login/list-kebijakan.png'),
            "width": 35, 
            "height": 35
        },
        {
            "menuName": "Bantuan",
            "link": Bantuan,
            "imageUrl": require('../assets/creekgarden/login/list-bantuan.png'),
            "width": 35, 
            "height": 35
        },
        {
            "menuName": "Chat",
            "link": openWa,
            "imageUrl": require('../assets/creekgarden/login/list-wa.png'),
            "width": 35, 
            "height": 35
        },
        {
            "menuName": "Inbox",
            "link": inbox,
            "imageUrl": require('../assets/creekgarden/login/list-inbox.png'),
            "width": 35, 
            "height": 35
        },
        {
            "menuName": "Logout",
            "link": toggleModal,
            "imageUrl": require('../assets/creekgarden/login/list-logout.png'),
            "width": 35, 
            "height": 35
        },
    ]

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

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
                // androidClientId: "494202122692-kgt5hugdlga06oclhf4ahcdgddh9lujr.apps.googleusercontent.com",
                androidClientId: "494202122692-7vuuvglt9r77go7pkajp5qhn2rcdu1a1.apps.googleusercontent.com",
                androidStandaloneAppClientId: "494202122692-7vuuvglt9r77go7pkajp5qhn2rcdu1a1.apps.googleusercontent.com",
            })

            if (result.type == 'success' && result.user.email) {
                await dispatch(mAuth.loginSocmed(result.user.email));
                // await setModalVisible(false);
                // await dispatch(mAuth.fetchAddress(userLogin.id));
                // await dispatch(mAuth.voucherGet(userLogin.id));
                // await dispatch(mAuth.fetchPoint(userLogin.id));
                props.navigation.navigate('Home');
            } else {
                // setTimeout(() => {
                //     Alert.alert('Error', `Mohon maaf terjadi kesalahan, silahkan coba kembali nanti.`, [{ text: 'Ok' }]);
                // }, 100);
            }

            // app.json (expo)
            // "reservedClientId":"com.googleusercontent.apps.494202122692-og45isamm7i2a76rjtcbi4a3i12dhgc1",
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
                        // await setModalVisible(false);
                        // await dispatch(mAuth.fetchAddress(userLogin.id));
                        // await dispatch(mAuth.voucherGet(userLogin.id));
                        // await dispatch(mAuth.fetchPoint(userLogin.id));
                        props.navigation.navigate('Home');
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
    const signInApple = async (email, name, iosId) => {
        setIsLoading(true);
        await dispatch(mAuth.loginSocmedApple(email, name, iosId));
        props.navigation.navigate('Home');
        setIsLoading(false);
    };
    
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
            // await dispatch(mAuth.fetchAddress(userLogin.id));
            // await dispatch(mAuth.voucherGet(userLogin.id));
            // await dispatch(mAuth.fetchPoint(userLogin.id));
            await setEmail('');
            await setPassword('');
            
            props.navigation.navigate('Home');
        
        } catch (error) {
            setTimeout(() => {
                Alert.alert('Error', error.message, [{ text: 'Ok' }]);
            }, 100);
        }
        setIsLoading(false);
        return;
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
                aspect: [100, 100],
                quality: 1,
                base64: true,
            });
            if (image.base64) {
                await setIsLoading(true)
                await dispatch(mAuth.uploadFoto(userLogin.id, image));
                await setPickedImageBase64(image);
                await setPickedImage(image.uri);
                setIsLoading(false)
            }
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

    const logoutHandler = async () => {
        await setModalVisible(false);
        await dispatch(mAuth.logout()); 
        props.navigation.navigate('Login'); 
    };

    useEffect(() => {
        let __userLogin
        try {
            __userLogin = userLogin.length != 0 ? userLogin : []
        } catch (error) {
            __userLogin = userLogin != null ? userLogin : []
        }
        if (__userLogin.length == 0) {
            AsyncStorage.getItem("userLogin").then(async (_user) => {
                const user = await _user;
                console.log(user)
                if (user !== null) {
                    const alreadyLoggedIn = JSON.parse(user);
                    if (alreadyLoggedIn.email && alreadyLoggedIn.password) {
                        setIsLoading(true);
                        dispatch(mAuth.loginSocmed(alreadyLoggedIn.email));
                        setTimeout(function(){
                            setIsLoading(false); 
                        }, 1000);
                    }
                }
            });
        }
    }, []); 
    
    if (!isEmpty(userLogin)) {
        const renderGridItem = (data) => {
            const item = data.item;
            return (
                <TouchableOpacity onPress={item.link}>
                    <View style={{ borderWidth: 1, borderColor: '#E1F1DA', marginBottom: 10 }}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '15%', height: 50}}>
                                <Image style={{ width: item.width, height: item.height, marginTop: item.menuName == 'Alamat Saya' ? 0 : 5, marginLeft: item.menuName == 'Alamat Saya' ? 10 : 15 }} source={item.imageUrl} resizeMode="contain" />
                            </View>
                            <View style={{width: '75%', height: 50}}>
                                <Text style={{ fontFamily:'poppins-regular', marginTop: 13, marginLeft: 5 }}>{item.menuName}</Text>
                            </View>
                            <View style={{width: '10%', height: 50}}>
                                <Image style={{ width: 10, marginTop: 10 }} source={require('../assets/creekgarden/login/right.png')} resizeMode="contain" />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <>
                <Modal isVisible={modalVisible} backdropOpacity={0.3}>
                    <View style={styles.modalView}>
                        <Image source={require('../assets/creekgarden/login/logout.png')} resizeMode="contain" style={{ width: 250 }} />
                        <View style={{ marginTop: '-15%', marginBottom: '0%' }}>
                            <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'poppins-bold' }}>Yah Kok Keluar!</Text>
                            <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular' }}>yakin kamu mau keluar dari aplikasi {"\n"}Creek Garden, gak pilih pilih dulu{"\n"} Buah dan sayurnya</Text>
                        </View>

                        <View style={{flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 0, marginTop: 25}}>
                            <View style={{width: '45%', height: 90}}>
                                <TouchableOpacity onPress={toggleModalBatal}>
                                    <View style={{ borderColor: '#F99D1C', borderWidth: 1, borderRadius: 10, padding: 18 }}>
                                        <Text style={{ alignSelf: 'center', fontFamily:'poppins-regular', color: '#F99D1C' }}>Batal</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: '5%', height: 90}}>
                                <Text style={{ color: '#fff' }}>.</Text>
                            </View>
                            <View style={{width: '45%', height: 90}}>
                                <TouchableOpacity onPress={logoutHandler}>
                                    <View style={{ borderColor: '#6BB745', backgroundColor: '#6BB745', borderWidth: 1, borderRadius: 10, padding: 18 }}>
                                        <Text style={{ alignSelf: 'center', fontFamily:'poppins-regular', color: '#FFF' }}>YA</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ScrollView>
                    <View style={styles.gradientAfterLogin}>
                        <Spinner
                            visible={isLoading}
                            textStyle={{ color: '#FFFFFF' }}
                        />
                        <View style={{ backgroundColor: '#6BB745', height: 150, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
                            <Text style={{ marginBottom: 0, color: '#fff', fontFamily: 'poppins-semi-bold', fontSize: 20, textAlign: 'center', marginTop: Platform.OS == 'ios' ? 30 : 40 }}>Akun</Text>
                        </View>
                        <View style={{ marginBottom: Platform.OS == 'android' ? -90 : -80, marginTop: Platform.OS == 'android' ? -75 : -85 }}>
                            <TouchableOpacity onPress={updateProfilePhotoHandler}>
                                <Image 
                                    style={{ height: 150, width: 150, alignSelf:'center', borderRadius: 150 / 2, borderWidth: 2, borderColor: "#397A18", marginTop: '5%', }}  
                                    source={userLogin.foto ? {uri: userLogin.foto} : pickedImage ? {uri: pickedImage} : require('../assets/noFotoProfile.png')} 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: Platform.OS == 'ios' ? '23%' : '27%' }}>
                        <View style={{ marginBottom: '7%' }}>
                            <Text style={{textAlign: 'center', fontFamily: 'poppins-bold'}}>{userLogin.name}</Text>
                            <Text style={{textAlign: 'center', fontFamily: 'poppins-regular'}}>{userLogin.email}</Text>
                        </View>
                        <FlatList
                            keyExtractor={ (data, index) => data.menuName}
                            data={listMenu}
                            renderItem={renderGridItem}
                            numColumns={1}
                        />
                        <View style={{ marginTop: 10, marginBottom: 50 }}>
                            <Text style={{textAlign: 'center', fontFamily: 'poppins-regular', fontSize: 12}}>ver 1.0.2</Text>                        
                        </View>
                    </View>
                </ScrollView>
            </>
        );

    } else {
        return (
            <ScrollView style={{ marginTop: Platform.OS == 'ios' ? 0 : 30 }}>
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <View style={styles.gradient}>
                    <Card style={styles.authContainer}>
                        <Image style={{ height: 240, width: '100%', resizeMode: 'contain', marginBottom: -5 }}  source={require('../assets/creekgarden/login/logo.png')} />              
                        <View>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Email</Text>
                                <View style={{
                                    flex: 1, 
                                    flexDirection: 'row', 
                                    borderWidth: 1,
                                    borderColor: '#6BB745',
                                    opacity: .6,
                                    borderRadius: 10,
                                    padding: 10
                                }}>
                                    <View style={{width: '13%'}}>
                                        <Image source={require('../assets/creekgarden/login/email.png')} style={{ width: 20, height: 15, marginTop: Platform.OS == 'ios' ? 0 : 5 }} resizeMode="contain" />
                                    </View>
                                    <View style={{width: '87%'}}>
                                        <TextInput
                                            onChangeText={emailHandler}
                                            placeholder={"Masukkan email anda"}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formControl2}>
                                <Text style={styles.label}>Password</Text>
                                <View style={{
                                    flex: 1, 
                                    flexDirection: 'row', 
                                    borderWidth: 1,
                                    borderColor: '#6BB745',
                                    opacity: .6,
                                    borderRadius: 10,
                                    padding: 10
                                }}>
                                    <View style={{width: '13%'}}>
                                        <Image source={require('../assets/creekgarden/login/password.png')} style={{ width: 20, height: 15, marginTop: Platform.OS == 'ios' ? 0 : 5 }} resizeMode="contain" />
                                    </View>
                                    <View style={{width: '87%'}}>
                                        <TextInput
                                            onChangeText={passwordHandler}
                                            secureTextEntry
                                            placeholder={"Masukkan password anda"}
                                        />
                                    </View>
                                </View>
                            </View>
                            
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={authHandler} style={{ backgroundColor: '#6BB745', padding: 10, borderWidth: 2, borderColor: 'white', borderRadius: 10, width: '100%', alignSelf: 'center' }}>
                                    <View>
                                        <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'poppins-regular' }}>Masuk</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>

                    <ScrollView>
                        <View style={{
                            flex: 1, 
                            flexDirection: 'row', 
                            opacity: .6,
                            borderRadius: 10,
                            paddingHorizontal: 40,
                            paddingVertical: 0,
                            marginTop: 10
                        }}>
                            <View style={{width: '23%'}}>
                                <View style={{ marginTop: 10, borderColor: '#F99D1C', borderWidth: 1 }}></View>
                            </View>
                            <View style={{width: '54%'}}>
                                <Text style={{ textAlign:'center', fontFamily: 'poppins-regular', color: '#F99D1C' }}>Atau masuk dengan</Text>
                            </View>
                            <View style={{width: '23%'}}>
                                <View style={{ marginTop: 10, borderColor: '#F99D1C', borderWidth: 1 }}></View>
                            </View>
                        </View>
                    </ScrollView>

                    <Card style={styles.authContainer2}>
                        <View>
                            {/* For apple this must be command */}
                            {/* For android this must be uncommand */}
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity onPress={signInGoogle} style={{ backgroundColor: '#FFF', padding: 10, borderWidth: 1, borderColor: '#6BB745', borderRadius: 10, width: '100%', alignSelf: 'center', opacity: .8 }}>
                                    <View style={{
                                        flex: 1, 
                                        flexDirection: 'row', 
                                    }}>
                                        <View style={{ width: '10%' }}>
                                            <Image source={require('../assets/creekgarden/login/google.png')} style={{ width: 30, height: 25 }} resizeMode="contain" />
                                        </View>
                                        <View style={{ width: '90%' }}>
                                            <Text style={{ fontFamily: 'poppins-regular', color: '#6BB745', textAlign: 'center' }}>Google</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={{ marginTop: 10 }}>
                                <AppleAuthentication.AppleAuthenticationButton
                                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                    cornerRadius={5}
                                    style={{ width: '100%', height: 44 }}
                                    onPress={async () => {
                                        try {
                                            const credential = await AppleAuthentication.signInAsync({
                                                requestedScopes: [
                                                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                                ],
                                            });
                                            signInApple(credential.email, credential.fullName.familyName, credential.user)
                                        
                                        } catch (e) {
                                            if (e.code === 'ERR_CANCELED') {
                                                
                                            } else {
                                                Alert.alert('Error', `Mohon maaf terjadi kesalahan, silahkan coba kembali nanti. Error: ${e.message}`, [{ text: 'Ok' }]);
                                            }
                                        }
                                    }}
                                />
                            </View> */}
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity onPress={signInFacebook} style={{ backgroundColor: '#FFF', padding: 10, borderWidth: 1, borderColor: '#6BB745', borderRadius: 10, width: '100%', alignSelf: 'center', opacity: .8 }}>
                                    <View style={{
                                        flex: 1, 
                                        flexDirection: 'row', 
                                    }}>
                                        <View style={{ width: '10%' }}>
                                            <Image source={require('../assets/creekgarden/login/facebook.png')} style={{ width: 30, height: 20 }} resizeMode="contain" />
                                        </View>
                                        <View style={{ width: '90%' }}>
                                            <Text style={{ fontFamily: 'poppins-regular', color: '#6BB745', textAlign: 'center' }}>Facebook</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity onPress={forgotPassword}>
                                <View style={{
                                    flex: 1, 
                                    flexDirection: 'row',
                                    alignItems: 'center' 
                                }}>
                                    <View style={{ width: '40%' }}>
                                        <Text style={{ fontSize: 13, marginBottom: 10, fontFamily: 'poppins-regular', textAlign: 'right' }}>Lupa</Text>
                                    </View>
                                    <View style={{ width: '60%' }}>
                                        <Text style={{ fontSize: 13, color: '#00A7E4' , marginLeft: 5, marginBottom: 10, fontFamily: 'poppins-semi-bold', textAlign: 'left' }}>Kata Sandi</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={register}>
                                <View style={{
                                    flex: 1, 
                                    flexDirection: 'row',
                                    alignItems: 'center' 
                                }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ fontSize: 13, marginBottom: 10, fontFamily: 'poppins-regular', textAlign: 'right', marginBottom: 30 }}>Belum punya akun</Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ fontSize: 13, color: '#F99D1C', marginLeft: 5, marginBottom: 10, fontFamily: 'poppins-semi-bold', textAlign: 'left', marginBottom: 30 }}>Daftar Sekarang</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        );
    }
};

// Login.navigationOptions = {
//     headerShown: false,
// };
Login.navigationOptions = navigationData => {
    return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Masuk</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitle: <TouchableOpacity onPress={() => navigationData.navigation.navigate('Home')}><Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text></TouchableOpacity>,
    }
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

    centeredView: {
        flex: 1,
        marginTop: 0,
        height: '100%',
        //backgroundColor: 'transparent',
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 0,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});

export default Login;