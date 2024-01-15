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
    AsyncStorage
} from 'react-native';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { Ionicons } from '@expo/vector-icons';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';

const KegiatanBelajar = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const dispatch = useDispatch();
    // const productsData = useSelector(state => state.products.availableProducts);
    // useEffect(() => {
    //     dispatch(mProducts.fetchProducts());
    // }, [dispatch]);

    const listData = [
        {
            "menuName": "Data Administrasi Guru",
            "icon": "ios-list",
            "navigation": "AdministrasiGuru"
        },
        {
            "menuName": "Data Daftar Pertemuan",
            "icon": "ios-list",
            "navigation": "DaftarPertemuan"
        },
        {
            "menuName": "Data Laporan Kegiatan Mengajar",
            "icon": "ios-list",
            "navigation": "LaporanKegiatanBelajar"
        }
    ];

    let userLogin = useSelector(state => state.auth.user);
    if (isEmpty(userLogin)) {
        AsyncStorage.getItem("userData").then((user) => {
            if (user !== null) {
                const alreadyLoggedIn = JSON.parse(user);
                if (alreadyLoggedIn.email && alreadyLoggedIn.password) {
                    dispatch(mAuth.login(alreadyLoggedIn.email, alreadyLoggedIn.password));
                }
            }
        });
    }

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
	  
	return (
		<FlatList
			keyExtractor={ (data, index) => data.id}
			data={listData}
			renderItem={renderGridItem}
			numColumns={1}
            style={{ marginTop: 10 }}
		/>
  	);
}

KegiatanBelajar.navigationOptions = navigationData => {
	return {
        headerTitle: 'Data Kegiatan Belajar',
        headerTintColor: core.primaryColor,
	};
};

const styles = StyleSheet.create({
    
});

export default KegiatanBelajar;