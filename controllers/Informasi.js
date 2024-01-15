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
import DefaultView from '../views/btn/defaultView';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';

const Informasi = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    let productsData = [];
    const selectedMenuId = props.navigation.getParam('menuId') ? props.navigation.getParam('menuId') : 'all';

    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;

    const dispatch = useDispatch();
    const tmpProductsData = useSelector(state => state.products.availableProducts);
    useEffect(() => {
        dispatch(mProducts.fetchInformasi(selectedMenuId, idSekolah));
    }, [dispatch]);

    console.log(tmpProductsData);

    if (selectedMenuId === 'all') {
        for (let i = 0; i < tmpProductsData.length; i++) {
            const item = tmpProductsData[i];
            const finalItem = {
                'key': i,
                'id': item.id,
                'judul': item.judul,
                'thumbnail': item.thumbnail,
                'type': item.type,
                'create_date': item.create_date,
            }
            productsData.push(finalItem);
        }
    } else {
        productsData = tmpProductsData.filter(item => item.type == selectedMenuId);
    }
    
    const menuData = [
        {
            'id': 'all',
            'name': 'Informasi Seluruhnya'
        },
        {
            'id': '8',
            'name': 'Informasi Siswa'
        },
        {
            'id': '7',
            'name': 'Informasi Sekolah'
        },
        {
            'id': '3',
            'name': 'Informasi Kesiswaan'
        },
        {
            'id': '1',
            'name': 'Informasi Hubin'
        },
        {
            'id': '5',
            'name': 'Informasi Kurikulum'
        },
        {
            'id': '6',
            'name': 'Informasi Sarpras'
        },
        {
            'id': '2',
            'name': 'Informasi K3'
        },
        {
            'id': '4',
            'name': 'Informasi Keuangan'
        }
    ];

	const renderGridItem = (data) => {
        const itemProduct = data.item;
        
        let createDate = itemProduct.create_date;
        createDate = itemProduct.create_date.split(" ")[0];
        
		return (
            <View style={styles.product}>
                <View style={styles.touchable}>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: itemProduct.thumbnail }} />
                        </View>
                        
                        <View style={styles.details}>
                            <Text style={styles.title}>{itemProduct.judul}</Text>
                            <Text style={styles.price}>Diposting Pada: {createDate}</Text>
                        </View>
                        
                        <View style={styles.actions}>
                            <Button
                                color={core.primaryColor}
                                title="Lihat Selengkapnya"
                                onPress={
                                    () => {
                                        props.navigation.navigate('InformasiDetail', {
                                            productId: itemProduct.id,
                                            productTitle: itemProduct.judul,
                                            type: itemProduct.type,
                                        });
                                    }
                                }
                            />
                        </View>
                    </View>
                </View>
          </View>
		);
	}
	  
	return (
        <View style={{ marginBottom: '20%' }}>
            <ScrollView horizontal={true} style={{ paddingHorizontal: 15, marginTop: 10 }}>
                {menuData.map(
                    r => 
                        selectedMenuId == r.id ?
                            r.id == 4 ? 
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Informasi', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, marginRight: 30, textAlign: 'center', backgroundColor: core.primaryColor, color: 'white' }}>{r.name}</Text></TouchableOpacity> : 
                            r.id == 'all' ?
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Informasi', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 0, textAlign: 'center', backgroundColor: core.primaryColor, color: 'white' }}>{r.name}</Text></TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Informasi', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, textAlign: 'center', backgroundColor: core.primaryColor, color: 'white' }}>{r.name}</Text></TouchableOpacity>
                        :
                            r.id == 4 ? 
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Informasi', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, marginRight: 30, textAlign: 'center' }}>{r.name}</Text></TouchableOpacity> : 
                            r.id == 'all' ?
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Informasi', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 0, textAlign: 'center' }}>{r.name}</Text></TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => {props.navigation.navigate('Informasi', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, textAlign: 'center' }}>{r.name}</Text></TouchableOpacity>
                )} 
            </ScrollView>

            {productsData.length > 0 ?
                <FlatList
                    keyExtractor={ (data, index) => data.key}
                    data={productsData}
                    renderItem={renderGridItem}
                    numColumns={1}
                />
            :
                <View style={{ marginTop: '50%' }}>
                    <DefaultView />
                </View>
            }
        </View>
  	);
}

Informasi.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Sekolah',
        headerTintColor: core.primaryColor
	};
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        marginHorizontal: 20,
        marginVertical: 15,
        paddingBottom: 10
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        textAlign: 'center',
        height: '25%',
        paddingHorizontal: 20,
        paddingTop: 30
    }
});

export default Informasi;