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
// import CountDown from 'react-native-countdown-component';

const Checkout = props => {
    const [error, setError] = useState();
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    const navOrderId = props.navigation.getParam('nav_order_id')
    const source = props.navigation.getParam('source')
    const order_id = props.navigation.getParam('order_id')

    const verifikasiPembayaranList1 = [
        'menunggu_pembayaran',
    ]
    const verifikasiPembayaranList2 = [
        'verifikasi_pembayaran',
        'sedang_dipacking',
        'sedang_dikirim',
        'selesai',
    ]

    const pesananDipackingList1 = [
        'menunggu_pembayaran',
        'verifikasi_pembayaran',
    ]
    const pesananDipackingList2 = [
        'sedang_dipacking',
        'sedang_dikirim',
        'selesai',
    ]

    const pesananDikirimList1 = [
        'menunggu_pembayaran',
        'verifikasi_pembayaran',
        'sedang_dipacking',
    ]
    const pesananDikirimList2 = [
        'sedang_dikirim',
        'selesai',
    ]

    const pesananSelesaiList1 = [
        'menunggu_pembayaran',
        'verifikasi_pembayaran',
        'sedang_dipacking',
        'sedang_dikirim',
    ]
    const pesananSelesaiList2 = [
        'selesai',
    ]

    const initialBatalkanSelesaikanAvailable = [
        'menunggu_pembayaran',
        'verifikasi_pembayaran',
        'sedang_dipacking',
        'sedang_dikirim',
    ]
    const batalkanPesananAvailable = [
        'menunggu_pembayaran',
        'verifikasi_pembayaran',
    ]
    const selesaikanPesananAvailable = [
        'sedang_dikirim'
    ]
    const tulisReviewAvailable = [
        'selesai'
    ]

    const [selectedShippingId, setSelectedShippingId] = useState(0)
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
            return number;
        } 
    }

    // Set variable or state here 
    const dispatch = useDispatch();

    // Hook
    const [isLoading, setIsLoading] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    // const selectedAddress = []

    // console.log(shippingsList)

    // if (selectedAddress.length != 0 && shippingsList.length == 0) {
        // dispatch(mAuth.fetchShippingsV2(selectedAddress));
    // }
    // console.log(shippingsList)

    // Additional Condition
    // Re-calculate total checkout
    // if (_SelectedVoucher) {
    //     try {
    //         selectedVoucher = _SelectedVoucher[0] 
    //     } catch (error) {
    //         // console.log(error)
    //     }
    // }
    
    let subTotalAmount = 0


    const [waktuPengiriman, setWaktuPengiriman] = useState('')

    // if (isLoading == true) {
    //     return (
    //         <Spinner
    //             visible={isLoading}
    //             textStyle={{ color: '#FFFFFF' }}
    //         />
    //     )
    // }

    // if (isLoading) {
    //     return (
    //         <Spinner
    //             visible={isLoading}
    //             textStyle={{ color: '#FFFFFF' }}
    //         />
    //     );
    // }

    // let diffInMs = orderDetail.order_expired - orderDetail.order_now
    const [review, setReview] = useState(5)
    const [reviewFace, setReviewFace] = useState(3)
    let textreview;
    if (review == 1) {
        textreview = 'Sangat Buruk'
    } else if (review == 2) {
        textreview = 'Buruk'
    } else if (review == 3) {
        textreview = 'Cukup'
    } else if (review == 4) {
        textreview = 'Puas'
    } else if (review == 5) {
        textreview = 'Sangat Puas'
    }

    const [reviewMessage, setEmail] = useState('')
    const emailHandler = text => {
        setEmail(text);
    };

    const reviewHandler = async () => {
        setIsLoading(true);
        await dispatch(mAuth.setReview(reviewFace, review, reviewMessage, order_id));
        // await dispatch(mAuth.fetchOrdersV2(userLogin.id));
        // await dispatch(mAuth.orderDetail(order_id));
        if (source == 'order') {
            props.navigation.navigate('Transaksi')
        } else if (source == 'orderdetail') {
            props.navigation.navigate('Orderdetail', {nav_order_id: order_id})
        }
        setIsLoading(false);
    }
    
    // if (orderDetail.length != 0) {
        return (
            <>
            <ScrollView style={styles.cartInformationScreen}>
                <View style={{ marginBottom: 100 }}>
                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Bagaimana pengalaman belanja kamu?</Text></View>
                    <View style={styles.deliveryAddressContainer}>
                        <View style={{ paddingRight: 20, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity
                                        onPress={() => setReview(1)}
                                    >
                                        <Image source={review >= 1 ? require('../assets/creekgarden/review/bintang1.png') : require('../assets/creekgarden/review/bintang.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity
                                        onPress={() => setReview(2)}
                                    >
                                        <Image source={review >= 2 ? require('../assets/creekgarden/review/bintang1.png') : require('../assets/creekgarden/review/bintang.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity
                                        onPress={() => setReview(3)}
                                    >
                                        <Image source={review >= 3 ? require('../assets/creekgarden/review/bintang1.png') : require('../assets/creekgarden/review/bintang.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
    
                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity
                                        onPress={() => setReview(4)}
                                    >
                                        <Image source={review >= 4 ? require('../assets/creekgarden/review/bintang1.png') : require('../assets/creekgarden/review/bintang.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity
                                        onPress={() => setReview(5)}
                                    >
                                        <Image source={review >= 5 ? require('../assets/creekgarden/review/bintang1.png') : require('../assets/creekgarden/review/bintang.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {
                                review > 0 ?
                                (
                                    <Text style={{ marginVertical: 20, marginBottom: 50, alignSelf: 'center', color: '#397A18', fontFamily: 'poppins-semi-bold', fontSize: 16 }}>{textreview}</Text>
                                )
                                :
                                (
                                    <Text></Text>
                                )
                            }
                        </View>
                    </View>
     
                    {/* Order Summary */}
                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Berikan Komentar</Text></View>
                    <View style={
                        {
                            flexDirection: 'row', 
                            borderWidth: 1,
                            borderColor: '#F3F3F3',
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 0,
                            margin: 20,
                            height: 150
                        }
                    }>
                        <TextInput
                            onChangeText={emailHandler}
                            placeholder={"Ceritakan pengalamanmu belanja di creekgarden"}
                            style={styles.input}
                            multiline={true}
                            numberOfLines={99}
                        />
                    </View>
    
                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Pelayanan CS Creekgarden</Text></View>
                        <View style={styles.deliveryAddressContainer}>
                        <View style={styles.deliveryAddressContent}>
                            <View>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{width: '33%', height: '100%'}}>
                                        <TouchableOpacity
                                            onPress={() => setReviewFace(1)}
                                        >
                                            <Image source={reviewFace == 1 ? require('../assets/creekgarden/review/smilebad1.png') : require('../assets/creekgarden/review/smilebad.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{width: '33%', height: '100%'}}>
                                        <TouchableOpacity
                                            onPress={() => setReviewFace(2)}
                                        >
                                            <Image source={reviewFace == 2 ? require('../assets/creekgarden/review/smilenotbad1.png') : require('../assets/creekgarden/review/smilenotbad.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{width: '33%', height: '100%'}}>
                                        <TouchableOpacity
                                            onPress={() => setReviewFace(3)}
                                        >
                                            <Image source={reviewFace == 3 ? require('../assets/creekgarden/review/smileok.png') : require('../assets/creekgarden/review/smileok1.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                                    <TouchableOpacity onPress={reviewHandler}>
                                        <View style={{ marginTop: 0, width: 170, height: 50, padding: 10, backgroundColor: '#6BB745', borderRadius: 10 }}>
                                            <Text style={{ fontSize: 15, color: '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Kirim</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
    
            </ScrollView>
            </>
        );

    // } else {
    //     return (
    //         <>
    //         </>
    //     )
    // }
}

Checkout.navigationOptions = navigationData => {
	return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Review</Text>,
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
        marginBottom: -50,
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
        color: '#000',
        marginVertical: 4
    },
    quantity: {
        fontFamily: 'open-sans',
        color: core.primaryColor,
        fontSize: 12
    },
    input: {
        // paddingHorizontal: 12,
        paddingVertical: 0,
        // borderBottomColor: '#008bca',
        // borderBottomWidth: 1
        // borderRadius: 5,
        // borderColor: '#6BB745',
        // borderWidth: 1,
        marginTop: 0,
        // marginBottom: 15,
        fontFamily: "poppins-regular",
        // marginLeft: 12,
        width: '100%',
    },
    // #endregion
});

export default Checkout;