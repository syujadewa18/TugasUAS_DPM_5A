import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
    AsyncStorage,
    Alert
} from 'react-native';
import core from '../core/core';
import DefaultNotLogin from '../views/btn/defaultNotLogin';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { Ionicons } from '@expo/vector-icons';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';

const KritikSaran = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const [inputEmail, setEmail] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    
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
            Alert.alert('Notification', `Selamat datang!`, [{ text: 'Ok' }]);
            
            props.navigation.navigate('ProductsOverview');
        
        } catch (error) {
            Alert.alert('Error', error.message, [{ text: 'Ok' }]);
        }
        setIsLoading(false);
    };
    
    let userLogin = [];
    userLogin = useSelector(state => state.auth.user);
    userLogin = userLogin == null ? [] : userLogin;

    const listData = [
        {
            "menuName": "Daftar Kritik & Saran",
            "icon": "ios-list",
            "navigation": "KritikSaranList"
        },
        {
            "menuName": "Masukkan Kritik & Saran",
            "icon": "ios-send",
            "navigation": "KritikSaranMasukkan"
        },
    ];

    // let userLogin = useSelector(state => state.auth.user);
    // if (isEmpty(userLogin)) {
    //     AsyncStorage.getItem("userData").then((user) => {
    //         if (user !== null) {
    //             const alreadyLoggedIn = JSON.parse(user);
    //             if (alreadyLoggedIn.email && alreadyLoggedIn.password) {
    //                 dispatch(mAuth.login(alreadyLoggedIn.email, alreadyLoggedIn.password));
    //             }
    //         }
    //     });
    // }

	const renderGridItem = (data) => {
        const item = data.item;
        
		return (
            <TouchableOpacity
                onPress={
                    () => {
                        props.navigation.navigate(item.navigation);
                    }
                }
            >
                <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-around",
                            backgroundColor: core.primaryColor,
                            height: 50,
                            padding: 10,
                            borderRadius:10,
                            borderWidth: 1,
                            borderColor: core.primaryColor
                        }}
                    >
                        <View style={{width: '10%'}}>
                            <Ionicons name={item.icon} size={25} color="white" />
                        </View>
                        
                        <View style={{width: '90%', marginTop: 2}}>
                            <Text style={{ color: 'white' }}>{item.menuName}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
		);
	}
      
    if (userLogin.id != undefined) {
        return (
            <View>
                <FlatList
                    keyExtractor={ (data, index) => data.id}
                    data={listData}
                    renderItem={renderGridItem}
                    numColumns={1}
                    style={{ marginTop: 10 }}
                />
    
                {/* <Text style={{ textAlign: 'center', fontSize: 10, color: '#888', marginTop: 50 }}>Copyright disekolah.id - pengawas v1.0.0</Text> */}
            </View>
        );

    } else {
        return (
            <ImageBackground
                style={{width: '100%', height: '100%', flex: 1}}
                source={require('../assets/bgLogin3.png')}
            >
                <ScrollView>
                    <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    />

                    <View style={styles.gradient}>
                        <Card style={styles.authContainer}>
                            <Image style={{ height: 120, width: '100%', resizeMode: 'contain', marginBottom: 10 }}  source={require('../assets/iconLogin.png')} />
                            
                            <Text style={{ color: core.primaryColor, fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>Disekolah.id</Text>
                            <Text style={{ color: core.primaryColor, fontSize: 12, textAlign: 'center' }}>Grow with us</Text>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '1%', marginTop: '0%', padding: 20 }}>
                                <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
                            </View>

                            <Text style={{ color: core.primaryColor, fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginBottom: '5%' }}>APLIKASI PENGAWAS</Text>
                            
                            <View>
                                <View style={styles.formControl}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={emailHandler}
                                    />
                                </View>
                                <View style={styles.formControl}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry
                                        onChangeText={passwordHandler}
                                    />
                                </View>
                                
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={authHandler} style={{ backgroundColor: core.primaryColor, padding: 10, borderWidth: 2, borderColor: 'white', borderRadius: 10, width: '70%', alignSelf: 'center', opacity: .8 }}>
                                        <View>
                                            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>LOGIN</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

KritikSaran.navigationOptions = navigationData => {
	return {
        headerTitle: 'Kritik dan Saran',
        headerTintColor: core.primaryColor,
	};
};

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
        marginTop: '20%'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    formControl: {
        width: '100%'
    },
    label: {
        // fontFamily: 'open-sans-bold',
        marginVertical: 8,
        color: '#888'
    },
    input: {
        // paddingHorizontal: 2,
        // paddingVertical: 5,
        borderBottomColor: '#009c76',
        borderBottomWidth: 1,
        backgroundColor: '#ddd',
        opacity: .6,
        borderRadius: 10,
        padding: 10
    },
});

export default KritikSaran;