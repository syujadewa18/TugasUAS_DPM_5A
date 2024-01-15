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
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { Ionicons } from '@expo/vector-icons';
import Textarea from 'react-native-textarea';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';

const KritikSaranMasukkan = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const [kategori, setKategori] = useState('Aplikasi');
    const [keterangan, setKeterangan] = useState('');
    const dispatch = useDispatch();

    const selectedOption = kategori;
    const textChangeHandler = text => {
        setKeterangan(text);
    };

    let userLogin = useSelector(state => state.auth.user);
    const updateFormHandler = async () => {
        const userId = userLogin.id == undefined ? 0 : userLogin.id;
        const namaLengkap = userLogin.nama == undefined ? "" : userLogin.nama;
        const email = userLogin.email == undefined ? "" : userLogin.email;
        const kategoriFeedback = kategori;
        const keteranganFeedback = keterangan;
        const kategoriUser = "Pengawas";
        
        // setError(null);
        // setIsLoading(true);
        try {
            await dispatch(
                mProducts.sendKritikSaran(
                    userId, 
                    namaLengkap,
                    email,
                    kategoriFeedback,
                    keteranganFeedback,
                    kategoriUser
                )
            );  
            Alert.alert('Notification', 'Terima kasih banyak atas feedback dari anda!', [{ text: 'Ok' }]); 
            props.navigation.navigate('KritikSaran'); 
        
        } catch (error) {
            Alert.alert('Error', error.message, [{ text: 'Ok' }]);  
        }
        // setIsLoading(false);
    };

    // const kritikSaranData = useSelector(state => state.products.kritikDanSaran);
    // useEffect(() => {
    //     dispatch(mProducts.fetchKritikDanSaran(1244));
    // }, [dispatch]);

    const option = [
        {
            'value': 'Aplikasi'
        },
        {
            'value': 'Manajemen'
        },
        {
            'value': 'Pelajaran'
        },
        {
            'value': 'Personal'
        },
        {
            'value': 'Lainnya'
        },
    ];

    return (
        <View style={{ backgroundColor: 'white', padding: 20, marginTop: 10 }}>
            <Text>Kategori Feedback</Text>
            <ScrollView horizontal={true} style={{ paddingHorizontal: 0, marginTop: 10 }}>
                {option.map(
                    r => 
                        selectedOption == r.value ?
                            r.value == 'Aplikasi' ?
                            <TouchableOpacity onPress={() => {setKategori(r.value)}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 0, marginRight: 0, textAlign: 'center', backgroundColor: core.primaryColor, color: 'white' }}>{r.value}</Text></TouchableOpacity> 
                            : <TouchableOpacity onPress={() => {setKategori(r.value)}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, marginRight: 0, textAlign: 'center', backgroundColor: core.primaryColor, color: 'white' }}>{r.value}</Text></TouchableOpacity> 
                        : 
                            r.value == 'Aplikasi' ?
                            <TouchableOpacity onPress={() => {setKategori(r.value)}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 0, marginRight: 0, textAlign: 'center' }}>{r.value}</Text></TouchableOpacity>
                            : <TouchableOpacity onPress={() => {setKategori(r.value)}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, marginRight: 0, textAlign: 'center' }}>{r.value}</Text></TouchableOpacity>
                )} 
            </ScrollView>

            <Text style={{ marginTop: 20 }}>Keterangan Feedback</Text>
            <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={textChangeHandler}
                defaultValue={keterangan}
                maxLength={200}
                placeholder={""}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
            />

            <TouchableOpacity onPress={updateFormHandler}>
                <View style={{ width: '100%', backgroundColor: core.primaryColor, padding: 10, marginTop: 10, borderRadius: 10, borderWidth: 2, borderColor: core.primaryColor }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Kirim</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

KritikSaranMasukkan.navigationOptions = navigationData => {
	return {
        headerTitle: 'Masukkan Kritik dan Saran',
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
    textareaContainer: {
        height: 180,
        padding: 10,
        // backgroundColor: '#F5FCFF',
        borderWidth: 1,
        borderColor: core.primaryColor,
        marginTop: 10
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
});

export default KritikSaranMasukkan;