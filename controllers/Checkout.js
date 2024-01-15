import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
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
    Dimensions
} from 'react-native';
import core from '../core/core';
import { Ionicons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import Spinner from 'react-native-loading-spinner-overlay';

import Input from '../views/form/Input';
import * as mAuth from "../models/action/mAuth";
import * as mCart from "../models/action/mCart";

const Checkout = props => {
    const selectedPromoCoupon = useSelector(state => {
        const result = {
            kodePromo: state.auth.selectedKodePromo,
            nominalPromo: state.auth.selectedNominalPromo
        };
        return result;
    });
    const [selectedShippingId, setSelectedShippingId] = useState(0)
    // const [voucherDisc, setVoucherDisc] = useState(0)

    const modalizeRef = useRef(null);
    const onClose = () => {
        modalizeRef.current?.close();
    };
    const onAlert = () => {
        Alert.alert('Notifikasi', 'Harap untuk memilih alamat pengiriman terlebih dahulu', [{ text: 'Ok' }])
    }
    const onAlertTitikKordinat = () => {
        Alert.alert('Notifikasi', 'Alamat belum ter pin point, harap untuk melakukan pin point alamat terlebih dahulu sebelum memilih pengiriman', [{ text: 'Ok' }])
    }

    const formReducer = (state, action) => {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
    
        return {
            formIsValid: true,
            inputValidities: true,
            inputValues: updatedValues
        };
    }
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: 'formInputUpdate',
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState]
    );
    let checkoutNotes = {}
    try {
        checkoutNotes = checkoutNotes.length > 0 ? checkoutNotes[0] : {
            notes: "",
        }   
    } catch (error) {
        checkoutNotes = {
            notes: "",
        }
    }
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            notes: checkoutNotes.notes,
        },
        inputValidities: {},
        formIsValid: false
    });

    const [inputNotes, setInputNotes] = useState('');
    const inputNotesHandler = text => {
        setInputNotes(text);
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

    console.log(shippingsList)

    useEffect(() => {
        if (selectedAddress.length == 0) {
            const automatedSelectedAddress = async () => {
                const arrSelectedAddressV2 = addressData.filter((r) => r.isPrimary == 1)
                if (arrSelectedAddressV2.length > 0) {
                    await dispatch(mCart.selectAddress(arrSelectedAddressV2[0]));
                    await dispatch(mAuth.fetchShippingsV2(cartData, arrSelectedAddressV2[0]));
                }
            }
            automatedSelectedAddress()
        } else {
            dispatch(mAuth.fetchShippingsV2(cartData, selectedAddress));
        }
    }, []); 

    const onOpen = async () => {
        if (selectedAddress.length == 0) {
            const automatedSelectedAddress = async () => {
                const arrSelectedAddressV2 = addressData.filter((r) => r.isPrimary == 1)
                if (arrSelectedAddressV2.length > 0) {
                    // console.log('=======')
                    // console.log(cartData)
                    await dispatch(mCart.selectAddress(arrSelectedAddressV2[0]));

                    if (arrSelectedAddressV2[0].lat == '' && arrSelectedAddressV2[0].lon == '') {
                        Alert.alert('Notifikasi', 'Alamat belum ter pin point, harap untuk melakukan pin point alamat terlebih dahulu sebelum memilih pengiriman', [{ text: 'Ok' }]) 
                    } else {
                        await dispatch(mAuth.fetchShippingsV2(cartData, arrSelectedAddressV2[0]));   
                        await automatedSelectedAddress()
                        modalizeRef.current?.open();
                    }
                }
            }
        } else {
            // console.log('=======')
            // console.log(cartData)
            if (selectedAddress.lat == '' && selectedAddress.lon == '') {
                Alert.alert('Notifikasi', 'Alamat belum ter pin point, harap untuk melakukan pin point alamat terlebih dahulu sebelum memilih pengiriman', [{ text: 'Ok' }]) 
            } else {
                await dispatch(mAuth.fetchShippingsV2(cartData, selectedAddress));
                modalizeRef.current?.open();
            }
        }
    };
    const bayarSekarang = async () => {
        if (selectedShipping.shippingWaktuPengiriman.length > 0) {
            if (!waktuPengiriman) {
                Alert.alert('Notifikasi', 'Mohon untuk memilih waktu pengiriman terlebih dahulu sebelum melanjutkan', [{ text: 'Ok' }]) 
                return;
            }
        }
        return props.navigation.navigate('Pembayaran', {waktuPengiriman: waktuPengiriman, catatanPemesanan: inputNotes ? inputNotes : ""})
    };

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
            
            try {
                if (selectedVoucher.length != 0) {
                    if (selectedVoucher.category == 'gratis_ongkir') {
                        selectedVoucher.rupiah = selectedShipping.shippingCost ? parseInt(selectedShipping.shippingCost) : 0
                    }
                    cartTotalAmount = cartTotalAmount - selectedVoucher.rupiah
                }   
            } catch (error) {
                selectedVoucher = []
            }
        }   
    } catch (error) {
        // selectedShipping = []
    }

    try {
        if (selectedVoucher.length > 0) {
            // nothing
        }
    } catch (error) {
        selectedVoucher = []
    }

    let _cartTotalAmount = cartTotalAmount
    if (selectedPromoCoupon.nominalPromo > 0) {
        cartTotalAmount = cartTotalAmount - selectedPromoCoupon.nominalPromo <= 0 ? 0 : cartTotalAmount - selectedPromoCoupon.nominalPromo
    }

    // Render
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
                                props.navigation.navigate('ProductDetail', {
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
                                props.navigation.navigate('ProductDetail', {
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

                    <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end', marginTop: -28}}>
                        <View style={{width: '20%', height: 100}}>
                            {/* <TouchableOpacity 
                                activeOpacity={0.7}
                                onPress={
                                    () => { 
                                        Alert.alert(
                                            "Konfirmasi",
                                            "Apakah anda yakin ingin menghapus produk ini dari keranjang?",
                                            [
                                                { 
                                                    text: "Ok", 
                                                    onPress: () => dispatch(mCart.removeFromCart(product)) // Call model function if ok
                                                },
                                                {
                                                    text: "Batal",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                            ],
                                        ); 
                                    }
                                }
                            >
                                <Image source={require('../assets/creekgarden/keranjang/remove.png')} style={{ width: 23, marginTop: -7, marginLeft: 5 }} resizeMode="contain" />
                            </TouchableOpacity> */}
                        </View>

                        <View style={{width: '12%', height: 100}}>
                            {/* <TouchableOpacity 
                                activeOpacity={0.7}
                                onPress={
                                    () => dispatch(mCart.decreaseCart(product))
                                }
                            >
                                <Image source={require('../assets/creekgarden/keranjang/minus.png')} style={{ width: 19 }} resizeMode="contain" />
                            </TouchableOpacity> */}
                        </View>

                        <View style={{width: '11%', height: 100}}>
                            <Text style={{ fontFamily: 'poppins-semi-bold', marginTop: Platform.OS == 'ios' ? 7 : 5, marginLeft: 6, marginRight: 0 }}>{product.quantity}x</Text>
                        </View>

                        <View style={{width: '12%', height: 100}}>
                            {/* <TouchableOpacity 
                                activeOpacity={0.7}
                                onPress={
                                    () => dispatch(mCart.increaseCart(product))
                                }
                            >
                                <Image source={require('../assets/creekgarden/keranjang/plus.png')} style={{ width: 20, marginTop:1 }} resizeMode="contain" />
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>

                {/* <View style={styles.cartItem_3}>

                </View> */}
            </View>
        );
    };

    const [waktuPengiriman, setWaktuPengiriman] = useState('')

    // if (isLoading == true) {
    //     return (
    //         <Spinner
    //             visible={isLoading}
    //             textStyle={{ color: '#FFFFFF' }}
    //         />
    //     )
    // }
    
    return (
        <>
            {cartData.length > 0
            ?
            (
                <>
                    <View style={styles.cartInformationScreen}>
                                <ScrollView style={{ marginBottom: 100 }}>
                                    {/* Delivery Address */}
                                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Alamat Pengiriman</Text></View>
                                    <View style={styles.deliveryAddressContainer}>
                                        <View style={styles.deliveryAddressContent}>
                                            {selectedAddress.length != 0 ? 
                                                <View>
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={{ color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0 }}>{selectedAddress.namaAlamat}</Text>
                                                        <Text style={{ color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0 }}>{selectedAddress.namaPenerima}</Text>
                                                        <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>{selectedAddress.noHandphone}</Text>
                                                        <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>{selectedAddress.alamat}</Text>
                                                        <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>{selectedAddress.provinsi}, {selectedAddress.kota}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('ListAddress', {source: 'Checkout'})}>
                                                        <View style={{ borderRadius: 10, borderColor: core.primaryColor, borderWidth: 1, padding: 10, backgroundColor: core.primaryColor }}>
                                                            <Text style={{ color: '#FFF', textAlign: 'center', fontFamily: 'poppins-regular' }}>Ubah Alamat</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            :
                                                <TouchableOpacity onPress={() => props.navigation.navigate('ListAddress', {source: 'Checkout'})}>
                                                    <View style={{ borderRadius: 10, borderColor: core.primaryColor, borderWidth: 1, padding: 15, backgroundColor: core.primaryColor }}>
                                                        <Text style={{ color: '#FFF', textAlign: 'center', fontFamily: 'poppins-regular' }}>Pilih Alamat</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>

                                    <View style={{ backgroundColor: '#F3F3F3' }}>
                                        <Text style={{color: '#F3F3F3'}}>.</Text>
                                    </View>

                                    {/* Order Summary */}
                                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Detail Pesanan</Text></View>
                                    <FlatList
                                        keyExtractor={(data, index) => data.productId}
                                        data={cartData}
                                        renderItem={CartItem}
                                        style={styles.cartItemContainerV2}
                                    />
                                    <View style={{ borderBottomColor: '#E1F1DA', borderBottomWidth: 1, marginTop: -45, marginBottom: 20 }}>
                                        <Text style={{ fontFamily: 'poppins-semi-bold', color: '#FFF', fontSize: 15, marginBottom: 0 }}>.</Text>
                                    </View>
                                    <View style={{ padding: 10, marginTop: -15, paddingBottom: 20 }}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{ width: '50%' }}><Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'left' }}>Subtotal</Text></View>
                                            <View style={{ width: '50%' }}><Text style={{ color: '#397A18', fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'right' }}>Rp {rupiah(subTotalAmount)}</Text></View>
                                        </View>
                                    </View>

                                    <View style={{ backgroundColor: '#F3F3F3' }}>
                                        <Text style={{color: '#F3F3F3'}}>.</Text>
                                    </View>

                                    {/* Shipping Method */}
                                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Metode Pengiriman</Text></View>
                                    <View style={styles.deliveryAddressContainer}>
                                        <View style={styles.deliveryAddressContent}>
                                            {selectedShipping.length != 0 ? 
                                                <View>
                                                    <TouchableOpacity onPress={selectedAddress.length == 0 ? onAlert : onOpen}>
                                                        <View style={{borderRadius: 10, borderColor: core.primaryColor, borderWidth: 1, padding: 15, color: core.primaryColor, flex: 1, flexDirection: 'row'}}>
                                                            <View style={{width: '80%'}}>
                                                                <Text>
                                                                    <Text style={{ fontFamily: 'poppins-semi-bold', color: '#397A18' }}>{selectedShipping.shippingName} {"\n"} ({selectedShipping.shippingCostText})</Text>
                                                                </Text>
                                                                <Text style={{ fontFamily: 'poppins-regular', color: '#6BB745' }}>{selectedShipping.shippingEstimated}</Text>
                                                            </View>
                                                            <View style={{width: '20%'}}>
                                                                <Image source={require('../assets/creekgarden/keranjang/arrow-right.png')} resizeMode="contain" style={{ alignSelf: 'flex-end', marginTop: Platform.OS == 'android' ? 25 : 20, width: 20, height: 20 }} />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            
                                            :
                                                <TouchableOpacity 
                                                    onPress={selectedAddress.length == 0 ? onAlert : onOpen}
                                                >
                                                    <View style={{borderRadius: 10, borderColor: core.primaryColor, borderWidth: 1, padding: 10, color: core.primaryColor, flex: 1, flexDirection: 'row'}}>
                                                        <View style={{width: '20%'}}>
                                                            <Image source={require('../assets/creekgarden/keranjang/truk.png')} resizeMode="contain" style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 0, width: 40, height: 40 }} />
                                                        </View>
                                                        <View style={{width: '60%'}}>
                                                            <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', marginTop: 8 }}>Pilih Pengiriman</Text>
                                                        </View>
                                                        <View style={{width: '20%'}}>
                                                            <Image source={require('../assets/creekgarden/keranjang/arrow-right.png')} resizeMode="contain" style={{ alignSelf: 'flex-end', marginTop: 10, width: 20, height: 20 }} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                    <View style={{ borderBottomColor: '#E1F1DA', borderBottomWidth: 1, marginTop: -20, marginBottom: 20 }}>
                                        <Text style={{ fontFamily: 'poppins-semi-bold', color: '#FFF', fontSize: 15, marginBottom: 0 }}>.</Text>
                                    </View>
                                    {selectedShipping.length != 0 ?
                                    (
                                        <View style={{ padding: 10, marginTop: -20, paddingBottom: 20 }}>
                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{ width: '50%' }}><Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'left' }}>Subtotal</Text></View>
                                                <View style={{ width: '50%' }}><Text style={{ color: '#397A18', fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'right' }}>Rp {rupiah(subTotalAmount + parseInt(selectedShipping.shippingCost))}</Text></View>
                                            </View>
                                        </View>
                                    )
                                    :
                                    (<View></View>)
                                    }

                                    {/* Waktu Pengiriman */}
                                    {
                                        selectedShipping.length != 0 && selectedShipping.shippingWaktuPengiriman.length > 0 ?
                                        (
                                            <>
                                                <View style={{ backgroundColor: '#F3F3F3' }}>
                                                    <Text style={{color: '#F3F3F3'}}>.</Text>
                                                </View>
                                                <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Waktu Pengiriman</Text></View>
                                            </>
                                        )
                                        :
                                        (<View></View>)
                                    }
                                    {
                                        selectedShipping.length != 0 && selectedShipping.shippingWaktuPengiriman.length > 0 ?
                                        (
                                            (
                                                <>
                                                    <View style={{marginTop: -15, flex: 1, flexDirection: 'row', alignItems: 'center', height: 120}}>
                                                        <View style={{marginLeft: 10, marginRight: 10, borderRadius: 10, borderColor: waktuPengiriman == selectedShipping.shippingWaktuPengiriman[0] ? '#6BB745' : '#B8B8B8', borderWidth: 1, padding: 15, color: core.primaryColor, width: '30%'}}>
                                                            <TouchableOpacity onPress={() => setWaktuPengiriman(selectedShipping.shippingWaktuPengiriman[0])}>
                                                                <Text>
                                                                    <Text style={{ fontFamily: 'poppins-semi-bold', color: waktuPengiriman == selectedShipping.shippingWaktuPengiriman[0] ? '#6BB745' : '#B8B8B8' }}>{selectedShipping.shippingWaktuPengiriman[0].replace(/\\n/g, "\n")}</Text>
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={{marginRight: 10, borderRadius: 10, borderColor: waktuPengiriman == selectedShipping.shippingWaktuPengiriman[1] ? '#6BB745' : '#B8B8B8', borderWidth: 1, padding: 15, color: core.primaryColor, width: '30%'}}>
                                                            <TouchableOpacity onPress={() => setWaktuPengiriman(selectedShipping.shippingWaktuPengiriman[1])}>
                                                                <Text>
                                                                    <Text style={{ fontFamily: 'poppins-semi-bold', color: waktuPengiriman == selectedShipping.shippingWaktuPengiriman[1] ? '#6BB745' : '#B8B8B8' }}>{selectedShipping.shippingWaktuPengiriman[1].replace(/\\n/g, "\n")}</Text>
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={{borderRadius: 10, borderColor: waktuPengiriman == selectedShipping.shippingWaktuPengiriman[2] ? '#6BB745' : '#B8B8B8', borderWidth: 1, padding: 15, color: core.primaryColor, width: '30%'}}>
                                                            <TouchableOpacity onPress={() => setWaktuPengiriman(selectedShipping.shippingWaktuPengiriman[2])}>
                                                                <Text>
                                                                    <Text style={{ fontFamily: 'poppins-semi-bold', color: waktuPengiriman == selectedShipping.shippingWaktuPengiriman[2] ? '#6BB745' : '#B8B8B8' }}>{selectedShipping.shippingWaktuPengiriman[2].replace(/\\n/g, "\n")}</Text>
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </>
                                            )
                                        )
                                        :
                                        (
                                            <View></View>
                                        )
                                    }

                                    <View style={{ backgroundColor: '#F3F3F3' }}>
                                        <Text style={{color: '#F3F3F3'}}>.</Text>
                                    </View>

                                    {/* Diskon */}
                                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Diskon Promo</Text></View>
                                        <View style={styles.deliveryAddressContainer}>
                                            <View style={styles.deliveryAddressContent}>
                                            {selectedPromoCoupon.kodePromo != "" || selectedVoucher.length != 0 ? 
                                                <View>
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('Voucher', {isCheckout: 'true', metodePengiriman: selectedShipping.length != 0 ? selectedShipping.shippingName : '', totalBelanja: _cartTotalAmount})}>
                                                        <View style={{borderRadius: 10, borderColor: core.primaryColor, borderWidth: 1, padding: 15, color: core.primaryColor, flex: 1, flexDirection: 'row'}}>
                                                            <View style={{width: '80%'}}>
                                                                <Text>
                                                                    <Text numberOfLines={1} style={{ fontFamily: 'poppins-semi-bold', color: '#397A18' }}>{selectedVoucher.length != 0 && selectedPromoCoupon.kodePromo != "" ? selectedVoucher.title+' \nKode Kupon: '+selectedPromoCoupon.kodePromo : selectedVoucher.length != 0 ? selectedVoucher.title : 'Kode Kupon: '+selectedPromoCoupon.kodePromo}</Text>
                                                                </Text>
                                                                <Text style={{ fontFamily: 'poppins-regular', color: '#6BB745' }}>- Rp {rupiah(selectedVoucher.length != 0 && selectedPromoCoupon.kodePromo != "" ? (parseInt(selectedVoucher.rupiah) + parseInt(selectedPromoCoupon.nominalPromo)) : selectedVoucher.length != 0 ? selectedVoucher.rupiah : selectedPromoCoupon.nominalPromo)}</Text>
                                                            </View>
                                                            <View style={{width: '20%'}}>
                                                                <Image source={require('../assets/creekgarden/keranjang/arrow-right.png')} resizeMode="contain" style={{ alignSelf: 'flex-end', marginTop: Platform.OS == 'android' ? 25 : 20, width: 20, height: 20 }} />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            
                                            :
                                                <TouchableOpacity 
                                                    onPress={() => props.navigation.navigate('Voucher', {isCheckout: 'true', isCheckout: 'true', metodePengiriman: selectedShipping.length != 0 ? selectedShipping.shippingName : '', totalBelanja: _cartTotalAmount})}
                                                >
                                                    <View style={{borderRadius: 10, borderColor: core.primaryColor, borderWidth: 1, padding: 10, color: core.primaryColor, flex: 1, flexDirection: 'row'}}>
                                                        <View style={{width: '20%'}}>
                                                            <Image source={require('../assets/creekgarden/keranjang/discount.png')} resizeMode="contain" style={{ marginLeft: 10, alignSelf: 'flex-start', marginTop: 0, width: 35, height: 35 }} />
                                                        </View>
                                                        <View style={{width: '60%'}}>
                                                            <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', marginTop: 8 }}>Pilih Promo</Text>
                                                        </View>
                                                        <View style={{width: '20%'}}>
                                                            <Image source={require('../assets/creekgarden/keranjang/arrow-right.png')} resizeMode="contain" style={{ alignSelf: 'flex-end', marginTop: 10, width: 20, height: 20 }} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                    {selectedVoucher.length != 0 ? (
                                        <>
                                            <View style={{ borderBottomColor: '#E1F1DA', borderBottomWidth: 1, marginTop: -20, marginBottom: 20 }}>
                                                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#FFF', fontSize: 15, marginBottom: 0 }}>.</Text>
                                            </View>
                                            <View style={{ padding: 10, marginTop: -15, paddingBottom: 20 }}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{ width: '50%' }}><Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'left' }}>Subtotal</Text></View>
                                                    <View style={{ width: '50%' }}><Text style={{ color: '#397A18', fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'right' }}>Rp {rupiah(cartTotalAmount)}</Text></View>
                                                </View>
                                            </View>
                                        </>
                                    )
                                    :
                                    (<View></View>)
                                    }

                                    <View style={{ backgroundColor: '#F3F3F3' }}>
                                        <Text style={{color: '#F3F3F3'}}>.</Text>
                                    </View>

                                    {/* Catatan Pemesanan */}
                                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Catatan Pemesanan</Text></View>
                                        <View style={styles.deliveryAddressContainer}>
                                            <View style={styles.deliveryAddressContent}>
                                                <View style={{ marginTop: Platform.OS == 'ios' ? -10 : -20, marginBottom: Platform.OS == 'ios' ? 150 : 50 }}>
                                                    <View style={{
                                                        flex: 1, 
                                                        flexDirection: 'row', 
                                                        borderWidth: 1,
                                                        borderColor: '#6BB745',
                                                        opacity: .6,
                                                        borderRadius: 10,
                                                        padding: 10,
                                                        height: 150
                                                    }}>
                                                        <View style={{width: '100%'}}>
                                                            <TextInput
                                                                onChangeText={inputNotesHandler}
                                                                placeholder={"Tolong kirim sayur & buah yang segar ya."}
                                                                multiline={true}
                                                            />
                                                        </View>
                                                    </View>
                                                    {/* <Input
                                                        id="notes"
                                                        label=""
                                                        keyboardType="default"
                                                        required
                                                        email
                                                        autoCapitalize="none"
                                                        errorMessage=""
                                                        // onInputChange={text => setAlamat(text)}
                                                        onInputChange={inputNotesHandler}
                                                        initialValue=""
                                                        editableForm={true}
                                                        placeholder="Tolong kirim sayur & buah yang segar ya."
                                                        textarea={true}
                                                        initialValue={checkoutNotes.notes}
                                                    /> */}
                                                </View>
                                        </View>
                                    </View>
                                </ScrollView>

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
                                    {
                                        selectedShipping.length != 0 && selectedAddress.length != 0 && selectedShipping.shippingId == 1 && !waktuPengiriman ?
                                        (
                                            <TouchableOpacity 
                                                onPress={
                                                    () => Alert.alert('Gagal', `Harap untuk memilih waktu pengiriman terlebih dahulu`, [{ text: 'Ok' }]) 
                                                }
                                            >
                                                <View style={{ width: 150, backgroundColor: '#EAEAEA', borderColor: '#EAEAEA', padding: 10, borderWidth: 1, borderRadius: 10 }}>
                                                    <Text style={{ textAlign: 'center', color: '#9A9A9A', fontFamily: 'poppins-regular' }}>Bayar Sekarang</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                        :
                                            selectedShipping.length != 0 && selectedAddress.length != 0 ?
                                            (
                                                <TouchableOpacity 
                                                    onPress={bayarSekarang}
                                                >
                                                    <View style={{ width: 150, backgroundColor: '#6BB745', borderColor: '#6BB745', padding: 10, borderWidth: 1, borderRadius: 10 }}>
                                                        <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'poppins-regular' }}>Bayar Sekarang</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                            :
                                            (
                                                <TouchableOpacity 
                                                    onPress={
                                                        () => selectedShipping.length == 0 ? Alert.alert('Gagal', `Harap untuk memilih metode pengiriman terlebih dahulu`, [{ text: 'Ok' }]) : Alert.alert('Gagal', `Harap untuk memilih alamat terlebih dahulu`, [{ text: 'Ok' }])
                                                    }
                                                >
                                                    <View style={{ width: 150, backgroundColor: '#EAEAEA', borderColor: '#EAEAEA', padding: 10, borderWidth: 1, borderRadius: 10 }}>
                                                        <Text style={{ textAlign: 'center', color: '#9A9A9A', fontFamily: 'poppins-regular' }}>Bayar Sekarang</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                    }
                                </View>
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
                                                if (r.shippingId == 999) {
                                                    Alert.alert('Notifikasi', r.shippingName, [{ text: 'Ok' }])
                                                    return
                                                } else {
                                                    const selectedShippingData = await shippingsList.find(item => item.shippingId === r.shippingId);
                                                    await parseInt(selectedVoucher.rupiah) == 0 && selectedVoucher.category == 'gratis_ongkir' && selectedShippingData.shippingCost ? selectedVoucher.rupiah = parseInt(selectedShippingData.shippingCost) : selectedVoucher.rupiah = 0
                                                    await selectedShippingData.shippingId != selectedShipping.shippingId ? await dispatch(mCart.selectShipping(selectedShippingData)) : [];
                                                    await onClose()
                                                    props.navigation.navigate('Checkout')
                                                }
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
            )
            :
            (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '35%' }}>
                    <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={require('../assets/creekgarden/keranjang/cart.png')} />
                    <Text style={{ marginTop: 10, textAlign: 'center', fontFamily: 'poppins-semi-bold', fontSize: 16 }}>Keranjangmu sepi belum ada {"\n"}buah dan sayur neh</Text>
                    <Text style={{ fontFamily: 'poppins-regular' }}>cari buah dan sayur kesukaanmu sekarang!!!</Text>
                </View>
            )
            }
        </>
    );
}

Checkout.navigationOptions = navigationData => {
	return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Checkout</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
	};
};

let _widthDevice = Dimensions.get('window').width;
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
        // width: 150,
        width: (_widthDevice / 3),
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
        fontSize: 17, 
        fontFamily: 'poppins-semi-bold'
    },
    deliveryAddressContainer: {
        width: '95%',
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 15,
        // elevation: 2,
        marginLeft: '2.5%',
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
        // width: 150,
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