import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
    Image
} from 'react-native';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';

const WishList = props => {
    const wishlistProductsData = useSelector(state => {        
        const wishlistProduct = [];
        
        for (const key in state.wishlist.items) {
            const _item = state.wishlist.items[key];

            wishlistProduct.push({
                productId: key,
                productTitle: _item.productTitle,
                image: _item.image,
            });
        }
       
        return wishlistProduct;
    });

	const renderGridItem = (data) => {
        const itemProduct = data.item;
        
		return (
            <View style={styles.product}>
                <View style={styles.touchable}>
                    <TouchableNativeFeedback 
                        onPress={
                            () => {
                                props.navigation.navigate('ProductDetail', {
                                    productId: itemProduct.productId,
                                    productTitle: itemProduct.productTitle
                                });
                            }
                        } 
                        useForeground
                    >
                        <View>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: itemProduct.image }} />
                            </View>
                            
                            <View style={styles.details}>
                                <Text style={styles.title}>{itemProduct.productTitle}</Text>
                            </View>
                            
                            <View style={styles.actions}>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
          </View>
		);
	}
	  
	return (
		<FlatList
			keyExtractor={ (data, index) => data.id}
			data={wishlistProductsData}
			renderItem={renderGridItem}
			numColumns={1}
		/>
  	);
}

WishList.navigationOptions = navigationData => {
	return {
        headerTitle: 'My Wishlist',
        headerTintColor: core.primaryColor,
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
        height: 150,
        margin: 20,
        // paddingBottom: 10
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

export default WishList;