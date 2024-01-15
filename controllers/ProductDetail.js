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

import * as mCart from "../models/action/mCart";
import * as mProducts from '../models/action/mProducts';

const ProductDetail = props => {
    // Setup
    const dispatch = useDispatch();
    var product = '';
    const productId = props.navigation.getParam('productId');
    const [isLoading, setIsLoading] = useState(false);

    // Get productById
    const singleProduct = useSelector(state => state.products.singleProduct);
    useEffect(() => {
        const loadProduct = async () => {
            setIsLoading(true);
            await dispatch(mProducts.fetchProductById(productId));
            setIsLoading(false);
        };
        loadProduct();
    }, []);
    
    if (singleProduct) {
        product = singleProduct[0];
    }

    // Wishlist
    let checkedWishlist = useSelector(state => {        
        for (const key in state.wishlist.items) {
            const productIdWishlist = key;
            if (productIdWishlist === productId) {
                return true;
            }
        }
    });
    if (!checkedWishlist) {
        checkedWishlist = false;
    }

    if (!product) {
        if (isLoading === true) {
            return (
                <View style={styles.container}>
                    <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    />
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    />
    
                    <ScrollView>  
                        <View style={styles.cardProduct}>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                                <View style={{ width: 280 }}>
                                    <Text style={styles.title}>404 Not Found</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.limitedOffer}>Sorry the product is not available right now.</Text>
                        </View>
                    </ScrollView>
                </View>
            );
        }

    } else {
        if (isLoading === true) {
            return (
                <View style={styles.container}>
                    <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    />
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    />
    
                    <ScrollView>
                        <SliderBox 
                            images={product.imagesList} 
                            sliderBoxHeight={500} 
                            dotColor="#008BCA"
                            inactiveDotColor="#90A4AE"
                        />
        
                        {/* <Image style={styles.image} source={{ uri: product.imageUrl }} /> */}
                        {/* <View style={styles.actions}>
                            <Button color={core.primaryColor} title="Buy Now" onPress={() => {}} />
                        </View> */}
                        
                        <View style={styles.cardProduct}>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                                <View style={{ width: 280 }}>
                                    <Text style={styles.title}>{product.title}</Text>
                                </View>
        
                                <View style={{ width: 100 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => { checkedWishlist === true ? dispatch(mCart.removeFromWishlist(product)) : dispatch(mCart.addToWishlist(product)); } }
                                    >
                                        <Text style={{ marginRight: 25, textAlign: 'right' }}><Ionicons name='ios-heart' size={25} color={checkedWishlist === true ? 'red' : '#888'} /></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <Text style={styles.price}>${parseInt(product.price).toFixed(2)}</Text>
                            <Text style={styles.limitedOffer}>Limited Offer Edition</Text>
                        </View>
                        
                        <View style={styles.cardProduct}>
                            <Text style={styles.description}>{product.description.replace(/\\n/g,'\n')}</Text>
                        </View>
                        
                        {/* Clearfix */}
                        <View style={{marginBottom: 50}}><Text></Text></View>
                    </ScrollView>
        
                    <TouchableOpacity
                        style={styles.buttonBuyNow}
                        activeOpacity={0.9}
                        onPress={
                            () => { 
                                // Call model function
                                dispatch(mCart.addToCart(product)); 
                                
                                // Alert handler
                                Alert.alert(
                                    "Notification",
                                    "Your product has been successfully added to cart!",
                                    [
                                        { 
                                            text: "OK", 
                                            // onPress: () => console.log('OK') 
                                        }
                                    ],
                                    { cancelable: false }
                                ); 
                            }
                        }
                    >
                        <View>
                            <Text style={{color: 'white', fontWeight: "bold"}}>BUY NOW</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

ProductDetail.navigationOptions = navigationData => {
	return {
        headerTitle: '',
        headerTintColor: core.primaryColor,
        headerRight: () => (
			<View style={{ flexDirection: "row" }}>
                {/* <BtnWishlist navigation={navigationData.navigation} /> */}
                <BtnCart navigation={navigationData.navigation} />
            </View>
        ),
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
        marginTop: 20,
        backgroundColor: '#FFFFFF'
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

export default ProductDetail;