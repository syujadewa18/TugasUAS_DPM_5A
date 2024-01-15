import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
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
import core from '../core/core';
import { Ionicons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import Spinner from 'react-native-loading-spinner-overlay';
import CountDown from 'react-native-countdown-component';
import { NavigationActions } from 'react-navigation';

import * as mAuth from "../models/action/mAuth";
import * as mCart from "../models/action/mCart";

const Checkout = props => {
    const [selectedShippingId, setSelectedShippingId] = useState(0)
    const [useCreekPoin, setUseCreekPoin] = useState(true)
    // const [voucherDisc, setVoucherDisc] = useState(0)

    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const onClose = () => {
        modalizeRef.current?.close();
    };

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

    // Set variable or state here 
    const dispatch = useDispatch();

    // Hook
    let userLogin = useSelector(state => state.auth.user);
    var cartTotalAmount = useSelector(state => state.cart.totalAmount);
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

    const selectedAddress = useSelector(state => state.cart.selectedAddress);
    let selectedShipping = useSelector(state => state.cart.selectedShipping);

    let selectedVoucher = []
    let _SelectedVoucher = useSelector(state => state.auth.selectedvoucher);
    
    let addressData = []
    let _addressDataSelector = useSelector(state => state.auth.address);
    if (_addressDataSelector) {
        addressData = _addressDataSelector
    }

    // const selectedAddress = []
    let shippingsList = []
    let _shippingsList = useSelector(state => state.auth.shippinglist);
    if (_shippingsList) {
        shippingsList = _shippingsList
    }
    if (selectedAddress.length == 0) {
        const automatedSelectedAddress = async () => {
            const arrSelectedAddressV2 = addressData.filter((r) => r.isPrimary == 1)
            if (arrSelectedAddressV2.length > 0) {
                await dispatch(mCart.selectAddress(arrSelectedAddressV2[0]));
                await dispatch(mAuth.fetchShippingsV2([], arrSelectedAddressV2[0]));
            }
        }
        automatedSelectedAddress()
    }

    // console.log(shippingsList)

    if (selectedAddress.length != 0 && shippingsList.length == 0) {
        // dispatch(mAuth.fetchShippingsV2(selectedAddress));
    }
    // console.log(shippingsList)

    // Additional Condition
    // Re-calculate total checkout
    if (_SelectedVoucher) {
        try {
            selectedVoucher = _SelectedVoucher[0] 
        } catch (error) {
            // console.log(error)
        }
    }
    
    let subTotalAmount = 0
    subTotalAmount = cartTotalAmount
    try {
        if (selectedShipping.length != 0) {
            cartTotalAmount = cartTotalAmount + parseInt(selectedShipping.shippingCost);
            
            if (selectedVoucher.length != 0) {
                if (selectedVoucher.category == 'gratis_ongkir') {
                    selectedVoucher.rupiah = selectedShipping.shippingCost ? parseInt(selectedShipping.shippingCost) : 0
                }
                cartTotalAmount = cartTotalAmount - selectedVoucher.rupiah
            }
        }   
    } catch (error) {
        selectedShipping = []
    }

    const [isRender, setIsRender] = useState(false)
    if (userLogin.point <= 0) {
        if (isRender == false) {
            setUseCreekPoin(false)
            setIsRender(true)
        }
    }

    if (useCreekPoin == true) {
        // console.log(cartTotalAmount)
        cartTotalAmount = cartTotalAmount - (userLogin.point * 100)
    }
    // const [waktuPengiriman, setWaktuPengiriman] = useState('')
    const waktuPengiriman = props.navigation.getParam('waktuPengiriman')
    // console.log(waktuPengiriman)
    const [selectedPayment, setSelectedPayment] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // if (isLoading == true) {
    //     return (
    //         <Spinner
    //             visible={isLoading}
    //             textStyle={{ color: '#FFFFFF' }}
    //         />
    //     )
    // }

    if (!isLoading) {
        dispatch(mAuth.fetchPayment(cartTotalAmount));
        setIsLoading(true)
    }

    let paymentList = []
    let _paymentList = useSelector(state => state.auth.PaymentList);
    if (_paymentList) {
        paymentList = _paymentList
    }

    const poinHandler = () => {
        if (userLogin.point <= 0) {
            Alert.alert('Gagal', 'Anda tidak memiliki creekpoin yang dapat digunakan', [{ text: 'Ok' }]);
            return;
        }

        if (!useCreekPoin) {
            setUseCreekPoin(true)
        } else {
            setUseCreekPoin(false)
        }
    }

    // if (isLoading == true) {
    //     return (
    //         <Spinner
    //             visible={isLoading}
    //             textStyle={{ color: '#FFFFFF' }}
    //         />
    //     );
    // }

    const [error, setError] = useState();
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    let urlPayment = []
    let _urlPayment = useSelector(state => state.auth.landingpayment);
    if (_urlPayment) {
        urlPayment = _urlPayment
    }
    const checkoutHandler = async () => {
        setIsLoading(true);
        try {
            let point = 0
            if (useCreekPoin) {
                point = await userLogin.point
            }

            await dispatch(mAuth.createPurchase(cartTotalAmount, cartData, selectedAddress, selectedShipping, selectedPayment, userLogin, point, waktuPengiriman));
            props.navigation.navigate('Payment', {url: urlPayment})
            return;
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    const lihatOrderSayaHandler = async () => {
        await props.navigation.reset([NavigationActions.navigate({ routeName: 'Cart' })], 0);
        return props.navigation.navigate('Transaksi')
    }
    const selesaiHandler = async () => {
        await props.navigation.reset([NavigationActions.navigate({ routeName: 'Cart' })], 0);
        return props.navigation.navigate('Cart')
    }
    
    return (
        <>
        <View style={styles.cartInformationScreen}>
            <ScrollView style={{ marginBottom: 10 }}>
                {/* Ringkasan Pembayaran */}
                <Image style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 10, marginBottom: 10 }} resizeMode="contain" source={require('../assets/creekgarden/keranjang/cart.png')} />
                <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Hore orderan sukses, tunggu ya{'\n'}Creek Garden akan mengkonfirmasi{'\n'}pembayaran kamu apabila sudah dibayar.</Text></View>
                
                <View style={{ backgroundColor: '#F3F3F3' }}>
                    <Text style={{color: '#F3F3F3'}}>.</Text>
                </View>

                {/* Ringkasan Pesanan */}
                <View style={styles.deliveryAddressContainer}>
                    <View style={styles.deliveryAddressContent}>
                        <View style={{ marginTop: 10 }}>                            
                            <View style={{ marginBottom: 0 }}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 10 }}>Total Tagihan</Text>
                                        <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 26, marginBottom: 0 }}>
                                            Rp {rupiah(props.navigation.getParam('total'))}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ borderBottomColor: '#E1F1DA', borderBottomWidth: 1, marginTop: -20, marginBottom: 20, width: '98%' }}>
                                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#FFF', fontSize: 15, marginBottom: 0, }}>.</Text>
                            </View>

                            <View style={{ marginBottom: 0 }}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 10 }}>Order ID</Text>
                                        <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 26, marginBottom: 0 }}>
                                            #{props.navigation.getParam('orderId')}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginBottom: 0, marginTop: 20 }}>
                                <View style={{marginLeft: 15, flex: 1, flexDirection: 'row'}}>
                                    <View style={{ width: '50%' }}>
                                        <TouchableOpacity onPress={lihatOrderSayaHandler}>
                                            <View style={{ marginTop: 0, marginBottom: 20, width: '90%', height: 50, padding: 10, backgroundColor: '#FFF', borderRadius: 10, borderColor: '#6BB745', borderWidth: 1 }}>
                                                <Text style={{ color: '#6BB745', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Lihat Order Saya</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <TouchableOpacity 
                                                onPress={selesaiHandler}
                                            >
                                            <View style={{ marginTop: 0, marginBottom: 20, width: '90%', height: 50, padding: 10, backgroundColor: '#6BB745', borderRadius: 10, borderColor: '#6BB745', borderWidth: 1 }}>
                                                <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Selesai</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>

        <Modalize ref={modalizeRef} adjustToContentHeight={true}>
            <View style={{ padding: 20 }}>
                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', fontSize: 20, marginBottom: 10 }}>Pilih Pengiriman</Text>
                <View>
                    {shippingsList.map(r =>
                        <TouchableOpacity
                            onPress={
                                async () => {
                                    // await setSelectedShippingId(r.shippingId)
                                    const selectedShippingData = await shippingsList.find(item => item.shippingId === r.shippingId);
                                    await parseInt(selectedVoucher.rupiah) == 0 && selectedVoucher.category == 'gratis_ongkir' && selectedShippingData.shippingCost ? selectedVoucher.rupiah = parseInt(selectedShippingData.shippingCost) : selectedVoucher.rupiah = 0
                                    await selectedShippingData.shippingId != selectedShipping.shippingId ? await dispatch(mCart.selectShipping(selectedShippingData)) : [];
                                    await onClose()
                                    props.navigation.navigate('Checkout')
                                }
                            }
                        >
                            <View style={{ borderBottomColor: '#6BB745', borderBottomWidth: 1, marginVertical: 10 }}>
                                <Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 15, marginBottom: 10 }}>{r.shippingName} ({r.shippingCostText})</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text>
                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text>
                {/* <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text> */}
                {/* <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text>
                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text> */}
            </View>
        </Modalize>
        </>
    );
}

Checkout.navigationOptions = navigationData => {
	return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Sukses</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        // headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
        headerLeft: <></>
	};
};

const styles = StyleSheet.create({
    // #region cart item
    cartItemContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    },
    cartItemContainerV2: {
        width: '95%',
        backgroundColor: "white",
        // marginBottom: '20%',
        // borderRadius: 15,
        // elevation: 2,
        // marginLeft: '2.5%',
    },
    cartItem_1: {
        width: 150,
        paddingBottom: 10,
        paddingTop: 10,
    },
    cartItem_2: {
        width: 310,
        padding: 10
    },
    productTitle: {
        fontFamily: 'open-sans',
        fontSize: 14
    },
    quantity: {
        fontFamily: 'open-sans',
        color: core.primaryColor,
        fontSize: 12
    },
    summaryText: {
        color: core.primaryColor,
        fontSize: 15,
        marginTop: 10,
        fontFamily: 'open-sans-bold'
    },
    deleteButton: {
        marginLeft: 20
    },
    // #endregion

    // #region cart information
    cartInformationScreen: {
        flex: 1,
    },
    cartInformationSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
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
    // #endregion

    // #region shipping information
    headerTitleContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    headerTitleStyle: {
        fontSize: 15, 
        fontFamily: 'poppins-semi-bold',
        textAlign: 'center'
    },
    deliveryAddressContainer: {
        width: '95%',
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 15,
        // elevation: 2,
        marginLeft: '2.5%',
        alignSelf: 'center'
    },
    deliveryAddressContent: {
        padding: 10,
        // backgroundColor: "white",
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
    cartItem_1: {
        width: 150,
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
        height: 155, 
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
        color: '#000'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: core.primaryColor,
        fontSize: 12
    },
    // #endregion
});

export default Checkout;