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

const KritikSaranList = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const dispatch = useDispatch();
    const kritikSaranData = useSelector(state => state.products.kritikDanSaran);

    let userLogin = useSelector(state => state.auth.user);
    const idUser = userLogin.id == undefined ? 0 : userLogin.id;
    useEffect(() => {
        dispatch(mProducts.fetchKritikDanSaran(idUser, "Pengawas"));
    }, [dispatch]);

	const renderGridItem = (data) => {
        const item = data.item;
        
		return (
            <View style={{ paddingVertical: 0 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Feedback #{item.id}</Text>
                <Text>{item.created_date}</Text>
                <Text>{item.keterangan}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '5%', marginTop: '3%' }}>
                    <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
                </View>
            </View>
		);
	}
      
    if (kritikSaranData.length > 0) {
        return (
            <ScrollView>
                <FlatList
                    keyExtractor={ (data, index) => data.id}
                    data={kritikSaranData}
                    renderItem={renderGridItem}
                    numColumns={1}
                    style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'white', padding: 20 }}
                />
            </ScrollView>
        );

    } else {
        return (
            <View style={{ backgroundColor: 'white', padding: 20, marginTop: 10 }}>
                <Text style={{ textAlign: 'center', color: '#777' }}>Daftar feedback anda tidak ditemukan</Text>
            </View>
        );
    }
}

KritikSaranList.navigationOptions = navigationData => {
	return {
        headerTitle: 'Daftar Kritik dan Saran',
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

export default KritikSaranList;