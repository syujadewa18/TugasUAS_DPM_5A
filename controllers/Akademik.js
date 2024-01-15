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

const Akademik = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    // const dispatch = useDispatch();
    // const productsData = useSelector(state => state.products.availableProducts);
    // useEffect(() => {
    //     dispatch(mProducts.fetchProducts());
    // }, [dispatch]);

    const listData = [
        {
            "navigation": "AkademikYayasan",
            "icon": require("../assets/akademik/aka-yayasan-teks.png"),
        },
        {
            "navigation": "AkademikSekolah",
            "icon": require("../assets/akademik/aka-sekolah-teks.png"),
        },
        {
            "navigation": "AkademikTahunAjaran",
            "icon": require("../assets/akademik/aka-tahunajaran-teks.png"),
        },
        {
            "navigation": "AkademikAngkatan",
            "icon": require("../assets/akademik/aka-angkatan-teks.png"),
        },
        {
            "navigation": "AkademikSemester",
            "icon": require("../assets/akademik/aka-semster-teks.png"),
        },
        {
            "navigation": "AkademikTingkat",
            "icon": require("../assets/akademik/aka-tingkat-teks.png"),
        },
        {
            "navigation": "AkademikKejuruan",
            "icon": require("../assets/akademik/aka-kejuruan-teks.png"),
        },
        {
            "navigation": "AkademikKelas",
            "icon": require("../assets/akademik/aka-kelas-teks.png"),
        },
        {
            "navigation": "AkademikMataPelajaran",
            "icon": require("../assets/akademik/aka-mapel-teks.png"),
        },
        {
            "navigation": "AkademikKbm",
            "icon": require("../assets/akademik/aka-kbm-teks.png"),
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
                style={{ width: '20%', marginHorizontal: '6.5%', marginVertical: 5 }}
                onPress={
                    () => {
                        props.navigation.navigate(item.navigation);
                    }
                }
            >
                <View>
                    <Image 
                        style={{ height: 175, width: '100%', resizeMode: 'contain', marginVertical: 0}}  
                        source={item.icon} 
                    />
                </View>
            </TouchableOpacity>
		);
	}
	  
	return (
		<FlatList
			keyExtractor={ (data, index) => data.id}
			data={listData}
			renderItem={renderGridItem}
			numColumns={3}
            style={{padding: 0}}
		/>
  	);
}

Akademik.navigationOptions = navigationData => {
	return {
        headerTitle: 'Data Akademik',
        headerTintColor: core.primaryColor
	};
};

const styles = StyleSheet.create({
    
});

export default Akademik;