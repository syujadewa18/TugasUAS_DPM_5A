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
    Alert
} from 'react-native';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { SliderBox } from "react-native-image-slider-box";
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import BtnBackProductDetail from '../views/btn/btnProductDetail';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';

import * as mCart from "../models/action/mCart";
import * as mProducts from '../models/action/mProducts';

const InformasiDetail = props => {
    // Setup
    const dispatch = useDispatch();
    var product = '';
    const productId = props.navigation.getParam('productId');
    const type = props.navigation.getParam('type');
    const [isLoading, setIsLoading] = useState(false);

    // Get productById
    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    const singleProduct = useSelector(state => state.products.singleProduct);
    useEffect(() => {
        const loadProduct = async () => {
            setIsLoading(true);
            await dispatch(mProducts.fetchInformasiDetail(type, idSekolah, productId));
            setIsLoading(false);
        };
        loadProduct();
    }, []);
    
    if (singleProduct) {
        product = singleProduct[0];
    }

    if (!product) {
        if (isLoading === true) {
            return (
                <View style={styles.container}>
                    {/* <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    /> */}
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    {/* <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    /> */}
    
                    <ScrollView>  
                        <View style={styles.cardProduct}>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                                <View style={{ width: 280 }}>
                                    <Text style={styles.title}>404 Not Found</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.limitedOffer}>Sorry the article is not available right now.</Text>
                        </View>
                    </ScrollView>
                </View>
            );
        }

    } else {
        if (isLoading === true) {
            return (
                <View style={styles.container}>
                    {/* <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    /> */}
                </View>
            );

        } else {
            const infoDetail = product.informasi.replace(/font-family:[^;]+/g, '');
            return (
                <View style={styles.container}>
                    {/* <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    /> */}
    
                    <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
                        <Image style={styles.image} source={{ uri: product.thumbnail }} />
                        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                            <HTML html={infoDetail} />
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

InformasiDetail.navigationOptions = navigationData => {
	return {
        headerTitle: navigationData.navigation.getParam('productTitle'),
        headerTintColor: core.primaryColor
	};
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // marginTop: 20
    },
    buttonBuyNow: {
        width: '100%',
        height: 50,
        backgroundColor: core.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: core.primaryColor,
        marginBottom: 5
        // marginVertical: 20
    },
    price: {
        fontSize: 15,
        color: '#888',
        // marginVertical: 20
    },
    limitedOffer: {
        fontSize: 15,
        color: 'red',
        textDecorationLine: 'underline',
        // marginVertical: 20
    },
    description: {
        fontSize: 14,
        marginHorizontal: 0
    },
    cardProduct: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        width: '100%'
    },
    footer: {
        position: 'absolute',
        flex:0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor:'green',
        flexDirection:'row',
        height:80,
        alignItems:'center',
    },
});

export default InformasiDetail;