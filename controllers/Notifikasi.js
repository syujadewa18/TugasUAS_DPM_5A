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
import DefaultView from '../views/btn/defaultView';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { Ionicons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';

const Notifikasi = props => {
    function textTruncate(str, length, ending) {
        if (length == null) {
            length = 100;
        }
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        
        } else {
            return str;
        }
    }
    function stripHTML(html) {
        const res  = html.replace(/<\/?[^>]+(>|$)/g, "");
        const res2 = res.replace(/&nbsp;/g, ' ');
        return res2;
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

    let notifikasiData = [];
    const tmpNotifikasiData = useSelector(state => state.products.notifikasi);

    let userLogin = useSelector(state => state.auth.user);
    let idSekolah;
    if (userLogin) {
        idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    } else {
        idSekolah = 'abc123';
    }
    useEffect(() => {
        dispatch(mProducts.fetchNotifikasi(idSekolah));
    }, [idSekolah]);

    if (tmpNotifikasiData) {
        notifikasiData = tmpNotifikasiData;
    }

	const renderGridItem = (data) => {
        const item = data.item;
        
		return (
            <View style={{ paddingVertical: 0 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.judul}</Text>
                <Text>{item.create_date}</Text>
                <Text>{textTruncate(stripHTML(item.informasi, 200))}</Text>
                {/* <HTML html={textTruncate(infoDetail, 200)} /> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '5%', marginTop: '3%' }}>
                    <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
                </View>
            </View>
		);
	}
      
    if (notifikasiData.length > 0) {
        return (
            <ScrollView>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10, marginTop: 0, }}>
                    <Text style={{ fontSize: 12, color: '#777' }}>Dapatkan informasi terupdate tentang sekolahmu</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, marginTop: '3%' }}>
                        <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: '#888' }} />
                    </View>
                </View>

                <FlatList
                    keyExtractor={ (data, index) => data.id}
                    data={notifikasiData}
                    renderItem={renderGridItem}
                    numColumns={1}
                    style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'white', padding: 20 }}
                />
            </ScrollView>
        );

    } else {
        if (idSekolah === 'abc123') {
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
        } else {
            return (
                <DefaultView />
            );
        }
    }
}

Notifikasi.navigationOptions = navigationData => {
	return {
        headerTitle: 'Notifikasi',
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

export default Notifikasi;