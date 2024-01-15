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
    Alert,
    AsyncStorage,
    Dimensions
} from 'react-native';
import core from '../core/core';
import { Ionicons } from '@expo/vector-icons';

import * as mCart from "../models/action/mCart";
import * as mAuth from "../models/action/mAuth";

const Cart = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }
    function rupiah(number) {
        try {
            var	reverse = number.toString().split('').reverse().join(''),
            ribuan 	= reverse.match(/\d{1,3}/g);
            ribuan	= ribuan.join('.').split('').reverse().join('');
            
            return ribuan;   
        } catch (error) {
            return 0;
        }
    }

    // const [isLocalStorage, setLocalStorage] = useState(false)
    // const [isLocalStorage2, setLocalStorage2] = useState(false)
    // const [isLocalStorage3, setLocalStorage3] = useState(false)
    let userLogin = useSelector(state => state.auth.user);
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartData = useSelector(state => {
        const transformedCartItems = [];
        
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                productPriceBefore: state.cart.items[key].productPriceBefore,
                weightInfo: state.cart.items[key].weightInfo,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                image: state.cart.items[key].image,
            });
        }
       
        return transformedCartItems;
    });

    useEffect(() => {
        if (cartData.length == 0) {
            AsyncStorage.getItem("cartData").then(async (_cart) => {
                // await setLocalStorage2(true)
                const cart = await _cart; 
                // console.log(cart)
                if (cart !== null) {
                    const cartData = JSON.parse(cart);
                    // console.log(cartData.items)
                    // cartData.items.forEach(function (item) {
                    //     console.log(item)
                    // })
                    for (let key in cartData.items) {
                        if (cartData.items.hasOwnProperty(key)) {
                            const cartItem = cartData.items[key];
                            const product = {
                                cara_penyimpanan: "Tidak ada data",
                                description: "Tidak ada data",
                                id: cartItem.productId,
                                imageUrl: cartItem.image,
                                kategori: "",
                                kategroiProduct: [
                                    "semua_produk",
                                    "promo_spesial",
                                    "paket_hemat",
                                    "fruits",
                                ],
                                nutrisi_manfaat: "",
                                priceAfter: cartItem.productPrice,
                                priceBefore: cartItem.productPriceBefore,
                                title: cartItem.productTitle,
                                typeweight: cartItem.weightInfo,
                                quantity: cartItem.quantity
                            }
                            dispatch(mCart.addToCartLocalStorage(product))
                        }
                    }
                }
            });
        }
    }, []);

    const dispatch = useDispatch();
    
    const checkoutHandler = () => {
        if (isEmpty(userLogin)) {
            Alert.alert(
                "Notifikasi",
                "Silahkan masuk terlebih dahulu",
                [
                    { 
                        text: "Ok", 
                        onPress: () => props.navigation.navigate('Login')
                    }
                ],
            ); 
            
        } else {
            props.navigation.navigate('Checkout');
        }
    };

    let userId = 0
    try {
        userId = userLogin.id
    } catch (error) {
        
    }
    let __selectedAddress = {
        alamat: 'Jakarta Barat'
    }
    try {
        if (selectedAddress) {
            let arrSelectedAddress = addressData.filter((r) => r.id == selectedAddress)
            let arrSelectedAddressV2 = addressData.filter((r) => r.isPrimary == 1)
            let selSelectedAddress = {}
            let selectedArr = []
    
            if (arrSelectedAddress.length > 0) {
                selSelectedAddress = arrSelectedAddress[0]
            } else if (arrSelectedAddressV2.length > 0) {
                selSelectedAddress = arrSelectedAddressV2[0]
            }
    
            selectedArr = selSelectedAddress.alamat.split(' ')
    
            try {
                __selectedAddress.alamat = selectedArr[0]+' '+selectedArr[1]   
            } catch (error) {
                __selectedAddress.alamat = selectedArr[0]
            }
        
        } else {
            let arrSelectedAddress = addressData.filter((r) => r.isPrimary == 1)
            let selSelectedAddress = {}
            let selectedArr = []
            if (arrSelectedAddress.length > 0) {
                selSelectedAddress = arrSelectedAddress[0]
                selectedArr = selSelectedAddress.alamat.split(' ')
    
                try {
                    __selectedAddress.alamat = selectedArr[0]+' '+selectedArr[1]   
                } catch (error) {
                    __selectedAddress.alamat = selectedArr[0]
                }
            }
        }   
    } catch (error) {
        
    }

    const CartItem = (_product) => {
        const product = _product.item;
        // console.log(product)
        product.id = product.productId
        return (
            <View style={styles.cartItemContainer}>
                <View style={styles.cartItem_1}>
                    <TouchableOpacity 
                        activeOpacity={0.6}
                        onPress={
                            () => {
                                props.navigation.navigate('ProductDetailNew', {
                                    productId: product.productId,
                                    productTitle: product.productTitle
                                });
                            }
                        }
                    >
                        <Image source={{ uri: product.image }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
        
                <View style={product.productPriceBefore != product.productPrice ? styles.cartItem_2_Discount: styles.cartItem_2}>
                    <TouchableOpacity 
                        activeOpacity={0.6}
                        onPress={
                            () => {
                                props.navigation.navigate('ProductDetailNew', {
                                    productId: product.productId,
                                    productTitle: product.productTitle
                                });
                            }
                        }
                    >
                        <Text numberOfLines={1} style={styles.productTitle}>{product.productTitle}</Text>
                        <Text numberOfLines={2} style={styles.subProductTitle}>{product.productTitle}</Text>
                        <View>
                            {product.productPriceBefore != product.productPrice ? (
                                <View style={{ height: Platform.OS == 'android' ?  50 : 40, marginVertical: 5 }}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{width: 75, height: 100}}>
                                            <Text style={styles.price}>Rp {rupiah(parseInt(product.productPriceBefore))}</Text>
                                        </View>

                                        <View style={{width: 65, height: 100, }}>
                                            <View style={{ padding: 1, backgroundColor:'#F99D1C', borderRadius: 20 }}>
                                                <Text style={{ alignSelf: 'center', fontFamily: 'poppins-semi-bold', color: '#FFF', fontSize: 10 }}>Save {((product.productPriceBefore - product.productPrice) / product.productPriceBefore * 100).toFixed(0)}%</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={styles.priceAfter}>Rp {rupiah(parseInt(product.productPrice))} / {product.weightInfo}</Text>
                                </View>)
                                : (<View><Text style={styles.priceAfter}>Rp {rupiah(parseInt(product.productPrice))} / {product.weightInfo}</Text></View>) 
                            }
                        </View>
                        {/* <Text style={styles.quantity}>{product.quantity} (pcs) - ${rupiah(product.productPrice)}</Text> */}
                        {/* <Text style={styles.summaryText}>${rupiah(product.sum)}</Text> */}
                    </TouchableOpacity>

                    <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end'}}>
                        <View style={{width: '20%', height: 100}}>
                            <TouchableOpacity 
                                activeOpacity={0.7}
                                onPress={
                                    () => { 
                                        // Alert handler
                                        Alert.alert(
                                            "Konfirmasi",
                                            "Apakah anda yakin ingin menghapus produk ini dari keranjang?",
                                            [
                                                {
                                                    text: "Batal",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { 
                                                    text: "Ok", 
                                                    onPress: async () => {
                                                        await dispatch(mAuth.batalKodePromo());
                                                        await dispatch(mAuth.batalVoucher());
                                                        await dispatch(mCart.selectShipping([]));
                                                        dispatch(mCart.removeFromCart(product))
                                                    } // Call model function if ok
                                                },
                                            ],
                                            // { cancelable: true }
                                        ); 
                                    }
                                }
                            >
                                <Image source={require('../assets/creekgarden/keranjang/remove.png')} style={{ width: 23, marginTop: -7, marginLeft: 5 }} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>

                        <View style={{width: '12%', height: 100}}>
                            <TouchableOpacity 
                                activeOpacity={0.7}
                                onPress={
                                    async () => {
                                        await dispatch(mAuth.batalKodePromo());
                                        await dispatch(mAuth.batalVoucher());
                                        await dispatch(mCart.selectShipping([]));
                                        dispatch(mCart.decreaseCart(product))
                                    }
                                }
                            >
                                <Image source={require('../assets/creekgarden/keranjang/minus.png')} style={{ width: 19 }} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>

                        <View style={{width: '11%', height: 100}}>
                            <Text style={{ fontSize: 11, fontFamily: 'poppins-regular', marginTop: Platform.OS == 'ios' ? 8 : 6, marginLeft: 3, marginRight: 0 }}>{product.quantity}</Text>
                        </View>

                        <View style={{width: '12%', height: 100}}>
                            <TouchableOpacity 
                                activeOpacity={0.7}
                                onPress={
                                    async () => {
                                        await dispatch(mAuth.batalKodePromo());
                                        await dispatch(mAuth.batalVoucher());
                                        await dispatch(mCart.selectShipping([]));
                                        dispatch(mCart.increaseCart(product))
                                    }
                                }
                            >
                                <Image source={require('../assets/creekgarden/keranjang/plus.png')} style={{ width: 20, marginTop:1 }} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* <View style={styles.cartItem_3}>

                </View> */}
            </View>
        );
    };
	  
	return (
		<View style={styles.cartInformationScreen}>    
            {cartData.length > 0 ?
                (
                    <>
                        {/* <View>
                            <TouchableOpacity onPress={() => {userId ? onOpen() : Alert.alert('Notifikasi', 'Silahkan masuk terlebih dahulu', [{ text: 'Ok', onPress: () => props.navigation.navigate('Login') }])}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '10%', marginRight: '-2%', marginLeft: '-2%'}}>
                                        <Image source={require('../assets/creekgarden/icon/pinpoin.png')} resizeMode="contain" style={{ height: 20 }} />
                                    </View>
                                    <View style={{width: '40%'}}>
                                        <Text numberOfLines={1} style={{ textAlign: 'left', fontFamily: 'poppins-regular' }}>Dikirim ke {__selectedAddress.alamat}</Text>
                                    </View>
                                    <View style={{width: '10%', marginLeft: '-4%', marginTop: 5}}>
                                        <Image source={require('../assets/creekgarden/homecategory/chevron.png')} resizeMode="contain" style={{ height: 7 }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View> */}

                        <FlatList
                            keyExtractor={(data, index) => data.productId}
                            data={cartData}
                            renderItem={CartItem}
                        />
                        <View style={styles.cartInformationSummary}>
                            {/* <View><Text style={styles.cartInformationLimitedOffer}>Limited Offer</Text></View> */}
                            {/* <Text> */}
                            <View>
                                <Text style={{ fontFamily: 'poppins-semi-bold' }}>Total Pembayaran{'\n'}</Text>
                                <Text style={styles.cartInformationAmount}>Rp {rupiah(cartTotalAmount)}</Text>
                            </View>
                            {/* </Text> */}
                            
                            {/* <Button
                                onPress={checkoutHandler}
                                color={core.primaryColor}
                                title="Checkout"
                                disabled={cartData.length === 0}
                            /> */}
                            <TouchableOpacity onPress={checkoutHandler}>
                                <View style={{ width: 100, backgroundColor: '#6BB745', borderColor: '#6BB745', padding: 10, borderWidth: 1, borderRadius: 10 }}>
                                    <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'poppins-regular' }}>Checkout</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                )
                :
                (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '25%' }}>
                        <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={require('../assets/creekgarden/keranjang/cart.png')} />
                        <Text style={{ marginTop: 10, textAlign: 'center', fontFamily: 'poppins-semi-bold', fontSize: 16 }}>Keranjangmu sepi belum ada {"\n"}buah dan sayur neh</Text>
                        <Text style={{ fontFamily: 'poppins-regular' }}>cari buah dan sayur kesukaanmu sekarang!!!</Text>
                    </View>
                )
            }
        </View>
  	);
}

// Cart.navigationOptions = navigationData => {
// 	return {
//         headerTitle: 'Cart',
//         headerTintColor: core.primaryColor,
// 	};
// };
Cart.navigationOptions = {
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Keranjang Belanja</Text>,
    headerTitleAlign: 'center',
    headerTintColor: '#000',
    // headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
};

let _widthDevice = Dimensions.get('window').width;
const styles = StyleSheet.create({
    // #region cart item
    cartItemContainer: {
        flexDirection: "row",
        flex: 1,
        // justifyContent: "space-between",
        marginTop: "0%",
        backgroundColor: "white",
    },
    cartItem_1: {
        width: (_widthDevice / 3),
        height: 100,  
        paddingBottom: 10,
        paddingTop: 10,
        height: 120
    },
    cartItem_2: {
        width: 240, 
        height: 125, 
        padding: 10
    },
    cartItem_2_Discount: {
        width: 240, 
        height: 170, 
        padding: 10
    },
    cartItem_3: {
        width: 100, 
        height: 100, 
        padding: 10, 
        paddingTop: 30
    },
    productTitle: {
        fontFamily: 'poppins-semi-bold',
        fontSize: 14,
        color: '#000'
    },
    subProductTitle: {
        fontFamily: 'poppins-regular',
        fontSize: 12,
        color: '#000',
        marginBottom: 0
    },
    quantity: {
        fontFamily: 'open-sans',
        color: core.primaryColor,
        fontSize: 12
    },
    summaryText: {
        // color: core.primaryColor,
        // fontSize: 15,
        marginTop: 10,
        // fontFamily: 'open-sans-bold'
    },
    deleteButton: {
        marginLeft: 20
    },
    // #endregion

    // #region cart information
    cartInformationScreen: {
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
    },
    cartInformationSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom: 20,
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
    },
    cartInformationAmount: {
        color: '#397A18',
        fontFamily: 'poppins-semi-bold',
        fontSize: 16,
        marginTop: -20
    },
    cartInformationLimitedOffer: {
        fontSize: 15,
        color: 'red',
        textDecorationLine: 'underline',
        // marginVertical: 20
    },
    price: {
        fontSize: 10,
        color: '#888',
        fontFamily: 'poppins-regular',
        textDecorationLine: 'line-through',
        marginTop: 2
    },
    priceAfter: {
        fontSize: 12,
        color: '#6BB745',
        fontFamily: 'poppins-bold'
    },
    // #endregion
});

export default Cart;