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

const KritikSaran = props => {
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
}

KritikSaran.navigationOptions = navigationData => {
	return {
        headerTitle: 'Kritik dan Saran Test',
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
});

export default KritikSaran;