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
            selectedVoucher = []
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
        selectedShipping = []
    }

    if (selectedPromoCoupon.nominalPromo > 0) {
        cartTotalAmount = cartTotalAmount - selectedPromoCoupon.nominalPromo <= 0 ? 0 : cartTotalAmount - selectedPromoCoupon.nominalPromo
    }

    const [isRender, setIsRender] = useState(false)
    if (userLogin.point <= 0) {
        if (isRender == false) {
            setUseCreekPoin(false)
            setIsRender(true)
        }
    }

    const cartTotalAmountWithoutPoint = cartTotalAmount
    let totalPoint = userLogin.point * 100
    // console.log(totalPoint)

    if (useCreekPoin == true) {
        if (totalPoint > cartTotalAmount) {
            cartTotalAmount = cartTotalAmount - cartTotalAmount
        } else {
            cartTotalAmount = cartTotalAmount - (userLogin.point * 100)
        }
    }
    let usedPoint = totalPoint >= cartTotalAmountWithoutPoint ? cartTotalAmountWithoutPoint / 100 : userLogin.point
    // const [waktuPengiriman, setWaktuPengiriman] = useState('')
    const waktuPengiriman = props.navigation.getParam('waktuPengiriman')
    const catatanPemesanan = props.navigation.getParam('catatanPemesanan')
    console.log(catatanPemesanan)
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

    // if (!isLoading) {
    //     dispatch(mAuth.fetchPayment(cartTotalAmount));
    //     // setIsLoading(false)
    // } else {
    //     // setIsLoading(false)
    // }

    let paymentList = []
    let _paymentList = useSelector(state => state.auth.PaymentList);
    if (_paymentList) {
        paymentList = _paymentList
    }

    const [isRefetchPayment, setRefetchPayment] = useState(true);
    const poinHandler = async () => {
        console.log(cartTotalAmount)
        if (userLogin.point <= 0) {
            Alert.alert('Gagal', 'Anda tidak memiliki creekpoin yang dapat digunakan', [{ text: 'Ok' }]);
            return;
        }

        if (!useCreekPoin) {
            await setIsLoading(true)
            await setSelectedPayment('')
            await setUseCreekPoin(true)
            await setRefetchPayment(true)
            setTimeout(function(){
                setIsLoading(false); 
            }, 1000);
        } else {
            await setIsLoading(true)
            await setSelectedPayment('')
            await setUseCreekPoin(false)
            await setRefetchPayment(true)
            setTimeout(function(){
                setIsLoading(false); 
            }, 1000);
        }
    }

    if (isRefetchPayment == true) {
        dispatch(mAuth.fetchPayment(cartTotalAmount));
        setRefetchPayment(false);
    }

    const [error, setError] = useState();
    // const [url, setUrl] = useState();
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    let urlPayment = ''
    let _urlPayment = useSelector(state => state.auth.landingpayment);
    if (_urlPayment) {
        urlPayment = _urlPayment
    }
    const checkoutHandler = async () => {
        setIsLoading(true);
        try {
            let point = 0
            if (useCreekPoin) {
                point = await usedPoint
            }

            await dispatch(mAuth.createPurchase(cartTotalAmount, cartData, selectedAddress, selectedShipping, selectedPayment, userLogin, point, waktuPengiriman, selectedPromoCoupon.kodePromo, selectedPromoCoupon.nominalPromo, catatanPemesanan));
            return;
        } catch (error) {
            if (error.message.indexOf("midtrans")) {
                await dispatch(mAuth.loginSocmed(userLogin.email));
                await dispatch(mAuth.fetchPoint(userLogin.id));
                props.navigation.navigate('Payment', {url: error.message, totalTagihan: cartTotalAmount})
            } else {
                setError(error.message);
            }
        }
        setIsLoading(false);
    }

    // if (isLoading == true) {
    //     return (
    //         <Spinner
    //             visible={isLoading}
    //             textStyle={{ color: '#FFFFFF' }}
    //         />
    //     );
    // }

    return (
        <>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />
            {cartData.length > 0
            ?
            (
                <>
                    <View style={styles.cartInformationScreen}>
                        <ScrollView style={{ marginBottom: 100 }}>
                            {/* Ringkasan Pembayaran */}
                            <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Ringkasan Pembayaran</Text></View>
                            <View style={styles.deliveryAddressContainer}>
                                <View style={styles.deliveryAddressContent}>
                                    {selectedAddress.length != 0 ? 
                                        <View>
                                            <View style={{ marginBottom: 0 }}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Total Belanja</Text>
                                                    </View>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ textAlign: 'right', color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0, color: '#397A18' }}>Rp {rupiah(subTotalAmount)}</Text>
                                                    </View>
                                                </View>

                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Biaya Pengiriman</Text>
                                                    </View>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ textAlign: 'right', color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0, color: '#397A18' }}>{selectedShipping.shippingCostText}</Text>
                                                    </View>
                                                </View>

                                                {
                                                    selectedVoucher.length != 0 ?
                                                    (
                                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                                            <View style={{ width: '50%' }}>
                                                                <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Promo</Text>
                                                            </View>
                                                            <View style={{ width: '50%' }}>
                                                                <Text style={{ textAlign: 'right', color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0, color: '#FFC413' }}>- Rp {rupiah(selectedVoucher.rupiah)}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                    :
                                                    (
                                                        <View></View>
                                                    )
                                                }
                                                {
                                                    selectedPromoCoupon != "" ?
                                                    (
                                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                                            <View style={{ width: '50%' }}>
                                                                <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Kode Promo: {selectedPromoCoupon.kodePromo}</Text>
                                                            </View>
                                                            <View style={{ width: '50%' }}>
                                                                <Text style={{ textAlign: 'right', color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0, color: '#FFC413' }}>- Rp {rupiah(selectedPromoCoupon.nominalPromo)}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                    :
                                                    (
                                                        <View></View>
                                                    )
                                                }
                                                {
                                                    useCreekPoin == true ?
                                                    (
                                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                                            <View style={{ width: '50%' }}>
                                                                <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Creek Poin</Text>
                                                            </View>
                                                            <View style={{ width: '50%' }}>
                                                                <Text style={{ textAlign: 'right', color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0, color: '#FFC413' }}>- Rp {rupiah((userLogin.point * 100) >= cartTotalAmountWithoutPoint ? cartTotalAmountWithoutPoint : userLogin.point * 100)}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                    :
                                                    (
                                                        <View></View>
                                                    )
                                                }

                                                {/* Line */}
                                                <View style={{ borderBottomColor: '#E1F1DA', borderBottomWidth: 1, marginTop: 0, marginBottom: 20 }}>
                                                    <Text style={{ fontFamily: 'poppins-semi-bold', color: '#FFF', fontSize: 15, marginBottom: 0 }}>.</Text>
                                                </View>

                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-bold', fontSize: 15, marginBottom: 0 }}>Total</Text>
                                                    </View>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ textAlign: 'right', color: '#000', fontFamily: 'poppins-bold', fontSize: 15, marginBottom: 0, color: '#397A18' }}>Rp {rupiah(cartTotalAmount)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    :
                                        <View></View>
                                    }
                                </View>
                            </View>

                            <View style={{ backgroundColor: '#F3F3F3' }}>
                                <Text style={{color: '#F3F3F3'}}>.</Text>
                            </View>

                            {/* Ringkasan Pesanan */}
                            <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Ringkasan Pesanan</Text></View>
                            <View style={styles.deliveryAddressContainer}>
                                <View style={styles.deliveryAddressContent}>
                                    {cartData.map (r => 
                                        <View>
                                            <View style={{ marginBottom: 0 }}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>{r.quantity}x {r.productTitle}</Text>
                                                    </View>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ textAlign: 'right', color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0, color: '#397A18' }}>Rp {rupiah(r.productPrice)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>

                            <View style={{ backgroundColor: '#F3F3F3' }}>
                                <Text style={{color: '#F3F3F3'}}>.</Text>
                            </View>

                            {/* Creek Poin */}
                            <View style={styles.deliveryAddressContainer}>
                                <View style={styles.deliveryAddressContent}>
                                    <View>
                                        <View style={{ marginBottom: 0 }}>
                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={styles.headerTitleStyle}>Creek Poin</Text>
                                                    <Text style={{ textAlign: 'left', color: '#000', fontFamily: 'poppins-bold', fontSize: 14, marginBottom: 0 }}>{usedPoint} Poin</Text>
                                                </View>
                                                <View style={{ width: '50%' }}>
                                                    <TouchableOpacity onPress={poinHandler}>
                                                        <Image source={useCreekPoin == true ? require('../assets/creekgarden/keranjang/poinactive.png') : require('../assets/creekgarden/keranjang/poindisabled.png')} resizeMode="contain" style={{ alignSelf: 'flex-end', width: 40, height: 40 }} />
                                                        <Text style={{ textAlign: 'right', color: '#000', fontFamily: 'poppins-bold', fontSize: 15, marginBottom: 0, color: '#000' }}>Rp {rupiah((userLogin.point * 100) >= cartTotalAmountWithoutPoint ? cartTotalAmountWithoutPoint : userLogin.point * 100)}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ backgroundColor: '#F3F3F3' }}>
                                <Text style={{color: '#F3F3F3'}}>.</Text>
                            </View>

                            {/* Metode Pembayaran */}
                            <View style={styles.deliveryAddressContainer}>
                                <View style={styles.deliveryAddressContent}>
                                    {paymentList.map (r => 
                                        <View>
                                            <View style={{ paddingHorizontal: 4, paddingVertical: 15 }}><Text style={styles.headerTitleStyle}>{r.kategori}</Text></View>
                                            {r.items.map (x => 
                                                (
                                                    <TouchableOpacity 
                                                        onPress={() => setSelectedPayment(x.payment_code)}
                                                    >
                                                        <View style={{ marginBottom: 0, padding: 10, borderRadius: 10, borderColor: selectedPayment == x.payment_code ? '#6BB745' : '#B8B8B8', borderWidth: 1, marginBottom: 10 }}>
                                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                                <View style={{ width: '20%' }}>
                                                                    <Image source={{uri: x.image}} resizeMode="contain" style={{ width: 50, height: 50 }} />
                                                                </View>
                                                                <View style={{ width: '80%' }}>
                                                                    <Text style={{ textAlign: 'left', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0, color: selectedPayment == x.payment_code ? '#6BB745' : '#B8B8B8' }}>{x.payment_name}</Text>
                                                                    <Text style={{ textAlign: 'left', fontFamily: 'poppins-regular', fontSize: 12, marginBottom: 0, color: selectedPayment == x.payment_code ? '#6BB745' : '#B8B8B8' }}>{x.payment_description}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            )}
                                        </View>
                                    )}
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
                                !selectedPayment ?
                                (
                                    <TouchableOpacity 
                                    onPress={
                                        () => Alert.alert('Gagal', `Harap untuk memilih metode pembayaran terlebih dahulu`, [{ text: 'Ok' }])
                                    }
                                    >
                                        <View style={{ width: '100%', backgroundColor: '#EAEAEA', borderColor: '#EAEAEA', padding: 10, borderWidth: 1, borderRadius: 10 }}>
                                            <Text style={{ textAlign: 'center', color: '#9A9A9A', fontFamily: 'poppins-regular' }}>Buat Order</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <TouchableOpacity 
                                        onPress={checkoutHandler}
                                    >
                                        <View style={{ width: '100%', backgroundColor: '#6BB745', borderColor: '#6BB745', padding: 10, borderWidth: 1, borderRadius: 10 }}>
                                            <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'poppins-regular' }}>Buat Order</Text>
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
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Pembayaran</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
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