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
    Dimensions
} from 'react-native';
import core from '../core/core';
import { Ionicons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import Spinner from 'react-native-loading-spinner-overlay';

import * as mAuth from "../models/action/mAuth";
import * as mCart from "../models/action/mCart";
import CountDown from 'react-native-countdown-component';

const Checkout = props => {
    const navOrderId = props.navigation.getParam('nav_order_id')

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

    // const [selectedShippingId, setSelectedShippingId] = useState(0)
    // const [voucherDisc, setVoucherDisc] = useState(0)

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
    const [isLoading, setIsLoading] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    let userLogin = useSelector(state => state.auth.user);
    let orderDetail = {
        "id": "162",
        "id_user": "",
        "status": "0",
        "subtotal": "0",
        "address": "",
        "phone": "0",
        "createdAt": "",
        "updatedAt": "",
        "province": "9",
        "city": "78",
        "receiver_name": "",
        "courier_name": "",
        "courier_price": "",
        "courier_duration": "",
        "type_service": "",
        "orderWeight": "",
        "payment_status": "0",
        "payment_pending": "0",
        "payment_failure": "0",
        "order_id": "",
        "random_string": "",
        "rtrw": "",
        "no_rumah": "",
        "kecamatan": "",
        "kelurahan": "",
        "nama_jalan": "",
        "kode_resi": "",
        "lat": "",
        "lng": "",
        "lalamoveRef": null,
        "tglPengiriman": "",
        "slot": "",
        "kode_pos": "",
        "delivery_status": "",
        "point": "100",
        "selected_payment": "Midtrans",
        "is_complete": "",
        "is_review": "",
        "url_payment": "",
        "quantity": "",
        "price": "49800",
        "product_id": "34",
        "product_description": " Apel Envy buah apel yang populer yang berasal dari New Zeland, Malus Domestica",
        "imageUrl": "https://creekgarden.co.id/images/0077F0E4C4.jpg",
        "discount": "0",
        "product_title": "Apel Chery Envy",
        "weight": "1000",
        "weight_unit_pack": "kilogram",
        "product_condition": "import",
        "order_timestamp": 1632936627,
        "order_expired": 1632940227,
        "order_now": 1632943318,
        "order_date_string": "30 September 2021",
        "alert_konfirmasi_pesanan_selesai": "Apakah anda yakin ingin menyelesaikan pesanan? pastikan anda sudah menerima pesanan anda dari kurir & kondisi buah / sayur sedang dalam kondisi segar",
        "alert_konfirmasi_pesanan_dibatalkan": "Apakah anda yakin ingin membatalkan pesanan?",
        "order_status": "Pesanan Sudah sampai",
        "order_status_string": "selesai",
        "items": [
            {
                "id": "162",
                "id_user": "13",
                "status": "0",
                "subtotal": "89800",
                "address": "",
                "phone": "822467182028",
                "createdAt": "2021-09-30 00:30:27",
                "updatedAt": "2021-09-29 16:24:27",
                "province": "9",
                "city": "78",
                "receiver_name": "yudha tlm",
                "courier_name": "CG Kurir Instant Courier",
                "courier_price": "50000",
                "courier_duration": "Estimasi 1 - 2 hari kerja",
                "type_service": "CG Kurir Instant Courier",
                "orderWeight": "5000",
                "payment_status": "1",
                "payment_pending": "0",
                "payment_failure": "0",
                "order_id": "creek-app-9AhzdrowGo",
                "random_string": "9AhzdrowGo",
                "rtrw": "",
                "no_rumah": "",
                "kecamatan": "",
                "kelurahan": "",
                "nama_jalan": "jalan mendawai 1 no 39",
                "kode_resi": "",
                "lat": "",
                "lng": "",
                "lalamoveRef": null,
                "tglPengiriman": "1\\nOktober",
                "slot": "",
                "kode_pos": "",
                "delivery_status": "selesai",
                "point": "100",
                "selected_payment": "null",
                "is_complete": "1",
                "is_review": "",
                "url_payment": "",
                "quantity": "1",
                "price": "0",
                "product_id": "34",
                "product_description": "",
                "imageUrl": "",
                "discount": "0",
                "product_title": "",
                "weight": "1000",
                "weight_unit_pack": "kilogram",
                "product_condition": "import",
                "order_timestamp": 1632936627,
                "order_expired": 1632940227,
                "order_now": 1632943318,
                "order_date_string": "30 September 2021",
                "alert_konfirmasi_pesanan_selesai": "Apakah anda yakin ingin menyelesaikan pesanan? pastikan anda sudah menerima pesanan anda dari kurir & kondisi buah / sayur sedang dalam kondisi segar",
                "alert_konfirmasi_pesanan_dibatalkan": "Apakah anda yakin ingin membatalkan pesanan?",
                "order_status": "Pesanan Sudah sampai",
                "order_status_string": "selesai"
            }
        ]
    };
    useEffect(() => {
        const loadOrderDetail = async () => {
            setIsLoading(true);
            dispatch(mAuth.orderDetail(navOrderId));
            setIsLoading(false);
        };
        loadOrderDetail();
    }, []);
    let _orderDetail = useSelector(state => state.auth.orderdetail);
    if (_orderDetail) {
        orderDetail = _orderDetail
    }

    let cartData = []
    for (const key in orderDetail.items) {
        cartData.push({
            productId: parseInt(orderDetail.items[key].product_id),
            productTitle: orderDetail.items[key].product_title,
            productPrice: parseInt(orderDetail.items[key].price),
            productPriceBefore: parseInt(orderDetail.items[key].price),
            weightInfo: orderDetail.items[key].weight_unit_pack,
            quantity: orderDetail.items[key].quantity,
            sum: orderDetail.items[key].price * orderDetail.items[key].quantity,
            image: orderDetail.items[key].imageUrl,
        });
    }

    let subTotalProduct = 0
    for (let i = 0; i < cartData.length; i++) {
        const item = cartData[i];
        subTotalProduct += item.sum
    }

    let mendapatkanCreekPoin = 0
    let diskon = (subTotalProduct + parseInt(orderDetail.courier_price)) != parseInt(orderDetail.subtotal) ? (subTotalProduct + parseInt(orderDetail.courier_price)) - parseInt(orderDetail.subtotal) : 0
    if (diskon > 0) {
        const _subTotalProduct = subTotalProduct - diskon
        mendapatkanCreekPoin = parseInt((_subTotalProduct - orderDetail.courier_price) / 10000)
    } else {
        if (subTotalProduct > 0) {
            mendapatkanCreekPoin = parseInt((subTotalProduct - orderDetail.courier_price) / 10000)
        }
    }

    const [waktuPengiriman, setWaktuPengiriman] = useState('')

    // if (isLoading == true) {
    //     return (
    //         <Spinner
    //             visible={isLoading}
    //             textStyle={{ color: '#FFFFFF' }}
    //         />
    //     )
    // }

    const selesaikanPesananSubmit = async (order_id) => {
        setIsLoading(true);
        await dispatch(mAuth.selesaikanPesanan(order_id));
        await dispatch(mAuth.loginSocmed(userLogin.email));
        await dispatch(mAuth.fetchPoint(userLogin.id));
        await dispatch(mAuth.fetchOrdersV2(userLogin.id));
        await dispatch(mAuth.orderDetail(order_id));
        setIsLoading(false);
    }
    const selesaikanPesananHandler = (order_status, alert, order_id) => {
        Alert.alert('Konfirmasi', alert, [{ text: 'Batal' }, { text: 'Ok', onPress: () => selesaikanPesananSubmit(order_id) }]);  
    }
    const selesaikanPesananHandlerAlert = (order_status) => {
        Alert.alert('Gagal', 'Anda tidak dapat menyelesaikan pesanan karena '+order_status, [{ text: 'Ok' }]);  
    }
    
    const batalkanPesananSubmit = async (order_id) => {
        setIsLoading(true);
        await dispatch(mAuth.batalkanPesanan(order_id));
        await dispatch(mAuth.loginSocmed(userLogin.email));
        await dispatch(mAuth.fetchPoint(userLogin.id));
        await dispatch(mAuth.fetchOrdersV2(userLogin.id));
        await dispatch(mAuth.orderDetail(order_id));
        setIsLoading(false);
    }
    const batalkanPesananHandler = (order_status, alert, order_id) => {
        Alert.alert('Konfirmasi', alert, [{ text: 'Batal' }, { text: 'Ok', onPress: () => batalkanPesananSubmit(order_id) }]);  
    }
    const batalkanPesananHandlerAlert = (order_status) => {
        Alert.alert('Gagal', 'Anda tidak dapat membatalkan pesanan karena '+order_status, [{ text: 'Ok' }]);  
    }
    
    const tulisReviewHandler = (order_id) => {
        props.navigation.navigate('Review', {order_id: order_id, source: 'orderdetail'})
    }
    const tulisReviewHandlerAlert = (order_status) => {
        Alert.alert('Gagal', 'Anda tidak dapat mengirimkan review karena '+order_status, [{ text: 'Ok' }]);  
    }

    let diffInMs = orderDetail.order_expired - orderDetail.order_now

    // const [error, setError] = useState();
    // useEffect(() => {
    //     if (error) {
    //         Alert.alert('Error', error, [{ text: 'Ok' }]);
    //     }
    // }, [error]);

    // Render
    if (isLoading) {
        return (
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />
        );
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
    
    // if (orderDetail.length != 0) {
        return (
            <>
            <View style={styles.cartInformationScreen}>
                <ScrollView style={{ marginBottom: 100 }}>
                    {/* Delivery Address */}
                    {/* <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Alamat Pengiriman</Text></View> */}
                    <View style={styles.deliveryAddressContainer}>
                        <View style={styles.deliveryAddressContent}>
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 10 }}>Total Belanja</Text>
                                    <Text style={{ color: '#6BB745', fontFamily: 'poppins-semi-bold', fontSize: 20, marginBottom: 0 }}>Rp {rupiah(parseInt(orderDetail.subtotal))}</Text>
                                </View>
                                {
                                    orderDetail.order_status_string == 'menunggu_pembayaran' ?
                                    (
                                        <View style={{ marginBottom: -5 }}>
                                            <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: -10, zIndex: 999, elevation: 999 }}>Batas Waktu Pembayaran</Text>
                                            {diffInMs > 0 ?
                                                (
                                                    <View style={{ alignSelf: 'flex-start' }}>
                                                        <CountDown
                                                            until={diffInMs}
                                                            size={25}
                                                            // onFinish={() => alert('Finished')}
                                                            digitStyle={{backgroundColor: '#FFF', margin: 0, textAlign: 'left'}}
                                                            digitTxtStyle={{textAlign: 'left', color: '#6BB745', fontFamily: 'poppins-semi-bold', fontSize: 23}}
                                                            // timeLabelStyle={{ padding: 0 }}
                                                            timeToShow={['H', 'M', 'S']}
                                                            timeLabels={{h: '', m: '', s: ''}}
                                                            style={{ padding: 0, backgroundColor: '#FFF', textAlign: 'left' }}
                                                            separatorStyle={{ textAlign: 'left', backgroundColor: '#FFF',  color: '#6BB745', fontFamily: 'poppins-semi-bold', fontSize: 13}}
                                                            showSeparator={true}
                                                        />
                                                    </View>
                                                )
                                                :
                                                (
                                                    <View>
                                                        <Text style={{ color: '#D43346', fontFamily: 'poppins-semi-bold', padding: 10, textAlign: 'left', fontSize: 18, marginBottom: 0, marginLeft: -10 }}>Telah Kadaluwarsa</Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    )
                                    :
                                    (
                                        <View style={{ marginBottom: -5 }}></View>   
                                    )
                                }
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Order ID</Text>
                                    <Text style={{ color: '#6BB745', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0 }}>#{orderDetail.order_id}</Text>
                                </View>
                                <View style={{ marginBottom: 0 }}>
                                    <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Metode Pembayaran</Text>
                                    <Text style={{ color: '#6BB745', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0 }}>{orderDetail.selected_payment}</Text>
                                </View>

                                {orderDetail.order_status_string == "menunggu_pembayaran" ?
                                (
                                    <View style={{ marginTop: 15, marginBottom: 0 }}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('PaymentV2', {url: orderDetail.url_payment, total: orderDetail.subtotal, orderId: orderDetail.order_id})}>
                                            <View style={{ backgroundColor: '#E1F1DA', borderRadius: 10, width: 150, padding: 10 }}>
                                                <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0, textAlign: 'center' }}>Bayar Ulang</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                                :
                                (<View></View>)
                                }
                            </View>
                        </View>
                    </View>
    
                    <View style={{ backgroundColor: '#F3F3F3' }}>
                        <Text style={{color: '#F3F3F3'}}>.</Text>
                    </View>
    
                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Status Pemesanan</Text></View>
                    <View style={styles.deliveryAddressContainer}>
                        <View style={{ paddingRight: 20, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '20%', height: '100%'}}>
                                    <Image source={verifikasiPembayaranList2.includes(orderDetail.order_status_string) ? require('../assets/creekgarden/order/statuspes1.png') : require('../assets/creekgarden/order/statuspes1a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Verifikasi Pembayaran</Text>
                                </View>
    
                                <View style={{width: '7%', height: '100%'}}>
                                    <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                </View>
                                
                                <View style={{width: '20%', height: '100%'}}>
                                    <Image source={pesananDipackingList2.includes(orderDetail.order_status_string) ? require('../assets/creekgarden/order/statuspes2.png') : require('../assets/creekgarden/order/statuspes2a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan dipacking</Text>
                                </View>
    
                                <View style={{width: '7%', height: '100%'}}>
                                    <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                </View>
    
                                <View style={{width: '20%', height: '100%'}}>
                                    <Image source={pesananDikirimList2.includes(orderDetail.order_status_string) ? require('../assets/creekgarden/order/statuspes3.png') : require('../assets/creekgarden/order/statuspes3a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan dikirim</Text>
                                </View>
    
                                <View style={{width: '7%', height: '100%'}}>
                                    <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                </View>
    
                                <View style={{width: '20%', height: '100%'}}>
                                    <Image source={pesananSelesaiList2.includes(orderDetail.order_status_string) ? require('../assets/creekgarden/order/statuspes4.png') : require('../assets/creekgarden/order/statuspes4a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan Sampai</Text>
                                </View>
                            </View>
                        </View>
                                    
                        <View style={{ alignSelf: 'center', marginVertical: 20 }}>
                            <Text style={{ 
                                fontFamily: 'poppins-semi-bold', 
                                color: pesananSelesaiList2.includes(orderDetail.order_status_string) ? '#6BB745' : pesananSelesaiList1.includes(orderDetail.order_status_string) ? '#F99D1C' : '#D43346', 
                                fontSize: 15, 
                                marginTop: 0 }}
                            >
                                {orderDetail.order_status}
                            </Text>
                        </View>
                    </View>
    
                    <View style={{ backgroundColor: '#F3F3F3' }}>
                        <Text style={{color: '#F3F3F3'}}>.</Text>
                    </View>
    
                    {/* Order Summary */}
                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Ringkasan Belanja</Text></View>
                    <FlatList
                        keyExtractor={(data, index) => data.productId}
                        data={cartData}
                        renderItem={CartItem}
                        style={styles.cartItemContainerV2}
                    />
    
                    <View style={{ backgroundColor: '#F3F3F3' }}>
                        <Text style={{color: '#F3F3F3'}}>.</Text>
                    </View>

                    <View style={styles.deliveryAddressContainer}>
                        <View style={styles.deliveryAddressContent}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 16 }}>Subtotal</Text>
                                    <Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 16 }}>Biaya Pengiriman</Text>
                                    {
                                        (subTotalProduct + parseInt(orderDetail.courier_price)) != parseInt(orderDetail.subtotal) ?
                                        (
                                            <Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 16 }}>Diskon</Text>
                                        )
                                        :
                                        (<Text></Text>)
                                    }
                                    {
                                        orderDetail.code_coupon ?
                                        (
                                            <Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 16 }}>Kode Promo{"\n"}{orderDetail.code_coupon}</Text>
                                        )
                                        :
                                        (<Text></Text>)
                                    }
                                </View>

                                <View style={{ width: '50%' }}>
                                    <Text style={{ textAlign: 'right', fontFamily: 'poppins-semi-bold', fontSize: 16 }}>Rp {rupiah(subTotalProduct)}</Text>
                                    <Text style={{ textAlign: 'right', fontFamily: 'poppins-semi-bold', fontSize: 16 }}>Rp {rupiah(orderDetail.courier_price)}</Text>
                                    {
                                        (subTotalProduct + parseInt(orderDetail.courier_price)) != parseInt(orderDetail.subtotal) ?
                                        (
                                            <Text style={{ textAlign: 'right', fontFamily: 'poppins-semi-bold', fontSize: 16 }}>- Rp {rupiah((subTotalProduct + parseInt(orderDetail.courier_price)) - parseInt(orderDetail.subtotal) - parseInt(orderDetail.code_coupon_nominal))}</Text>
                                        )
                                        :
                                        (<Text></Text>)
                                    }
                                    {
                                        orderDetail.code_coupon ?
                                        (
                                            <Text style={{ textAlign: 'right', fontFamily: 'poppins-semi-bold', fontSize: 16 }}>- Rp {rupiah(parseInt(orderDetail.code_coupon_nominal))}</Text>
                                        )
                                        :
                                        (<Text></Text>)
                                    }
                                </View>
                            </View>
                        </View>
                    </View>

                    {mendapatkanCreekPoin > 0 ? 
                    (
                        <>
                            <View style={{ backgroundColor: '#F3F3F3' }}>
                                <Text style={{color: '#F3F3F3'}}>.</Text>
                            </View>
                            <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>
                                    <Text style={{opacity: orderDetail.order_status_string == 'selesai' || orderDetail.order_status_string == 'sudah_sampai' ? 1 : 0.2}}>Creek Poin</Text>
                            </Text></View>
                                <View style={styles.deliveryAddressContainer}>
                                <View style={styles.deliveryAddressContent}>
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{ width: '70%' }}>
                                                    <Text style={{ opacity: orderDetail.order_status_string == 'selesai' || orderDetail.order_status_string == 'sudah_sampai' ? 1 : 0.2, color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>
                                                        {orderDetail.order_status_string == 'selesai' || orderDetail.order_status_string == 'sudah_sampai' ? 'Creek Poin sudah berhasil ditambah silakan gunakan Creek Poin untuk berbelanja kebutuhan kamu atau dapat digunakan untuk diskon belanjaan kamu' : 'Kamu akan mendapatkan Creek Poin setelah pesenan selesai. Yuk Konfimasi pesanan kamu jika sudah sampai agar poinnnya dapat digunakan'}
                                                    </Text>
                                                    
                                                    <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                                                        <View style={{ width: '60%' }}>
                                                            <Text style={{ opacity: orderDetail.order_status_string == 'selesai' || orderDetail.order_status_string == 'sudah_sampai' ? 1 : 0.2, color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Poin</Text>
                                                            <Text style={{ opacity: orderDetail.order_status_string == 'selesai' || orderDetail.order_status_string == 'sudah_sampai' ? 1 : 0.2, color: '#6BB745', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0 }}>{parseInt(mendapatkanCreekPoin)} Poin</Text>
                                                        </View>
                                                        <View style={{ width: '40%' }}>
                                                            <Text style={{ opacity: orderDetail.order_status_string == 'selesai' || orderDetail.order_status_string == 'sudah_sampai' ? 1 : 0.2, color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>Status</Text>
                                                            <Text style={{ opacity: orderDetail.order_status_string == 'selesai' || orderDetail.order_status_string == 'sudah_sampai' ? 1 : 0.2, color: '#6BB745', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0 }}>Sukses</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ width: '30%' }}>
                                                    <Image source={require('../assets/creekgarden/order/poinkecil.png')} resizeMode="contain" style={{ width: 120, height: 200, position: 'absolute', marginLeft: 20, marginTop: 14 }} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
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
                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Alamat Pengiriman</Text></View>
                        <View style={styles.deliveryAddressContainer}>
                        <View style={styles.deliveryAddressContent}>
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={{ color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 14, marginBottom: 0 }}>{orderDetail.receiver_name}</Text>
                                    <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>{orderDetail.phone}</Text>
                                    <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>{orderDetail.nama_jalan}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#F3F3F3' }}>
                        <Text style={{color: '#F3F3F3'}}>.</Text>
                    </View>
                    <View style={styles.headerTitleContainer}><Text style={styles.headerTitleStyle}>Tanggal Pengiriman</Text></View>
                        <View style={styles.deliveryAddressContainer}>
                        <View style={styles.deliveryAddressContent}>
                            <View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 14, marginBottom: 0 }}>{orderDetail.tglPengiriman.replace(/\\n/g, " ")}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
    
                <View style={styles.cartInformationSummary}>
                    <View>
                        <View style={{flex: 1, flexDirection: 'row', marginLeft: -5, marginBottom: 10}}>
                            {
                                orderDetail.order_status_string == 'selesai' || orderDetail.order_status_string == 'sudah_sampai'
                                ?
                                    (
                                        <>
                                            <View style={{ width: '100%' }}>
                                                <View style={{ alignSelf: 'center', marginVertical: 0 }}>
                                                    {orderDetail.is_review == 0 ?
                                                    (
                                                    <TouchableOpacity 
                                                        onPress={() => tulisReviewAvailable.includes(orderDetail.order_status_string) ? tulisReviewHandler(orderDetail.id) : tulisReviewHandlerAlert(orderDetail.order_status)}
                                                    >
                                                        <View style={{ marginTop: 0, width: '100%', height: 50, padding: 10, backgroundColor: tulisReviewAvailable.includes(orderDetail.order_status_string) ? '#FFF' : '#EAEAEA', borderRadius: 10, borderWidth: 1, borderColor: tulisReviewAvailable.includes(orderDetail.order_status_string) ? '#6BB745' : '#EAEAEA' }}>
                                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                                <View style={{width: '100%'}}>
                                                                    <Text style={{ fontSize: 12, color: tulisReviewAvailable.includes(orderDetail.order_status_string) ? '#6BB745' : '#9A9A9A', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Tulis Review</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    )
                                                    :
                                                    (
                                                        <TouchableOpacity 
                                                            onPress={() => props.navigation.navigate('Home')}
                                                        >
                                                            <View style={{ marginTop: 0, width: '100%', height: 50, padding: 10, backgroundColor: '#FFF', borderRadius: 10, borderWidth: 1, borderColor: '#6BB745' }}>
                                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                                    <View style={{width: '100%'}}>
                                                                        <Text style={{ fontSize: 12, color: '#6BB745', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Belanja Lagi</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                    }
                                                </View>
                                            </View>
                                        </>
                                    )
                                :
                                    (
                                        <>
                                        <View style={{ width: '50%' }}>
                                        <View style={{ alignSelf: 'center', marginVertical: 0 }}>
                                            <TouchableOpacity 
                                                onPress={() => tulisReviewAvailable.includes(orderDetail.order_status_string) ? tulisReviewHandler(orderDetail.order_status) : tulisReviewHandlerAlert(orderDetail.order_status)}
                                            >
                                                <View style={{ marginTop: 0, width: '97%', height: 50, padding: 10, backgroundColor: tulisReviewAvailable.includes(orderDetail.order_status_string) ? '#FFF' : '#EAEAEA', borderRadius: 10, borderWidth: 1, borderColor: tulisReviewAvailable.includes(orderDetail.order_status_string) ? '#6BB745' : '#EAEAEA' }}>
                                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                                        <View style={{width: '100%'}}>
                                                            <Text style={{ fontSize: 12, color: tulisReviewAvailable.includes(orderDetail.order_status_string) ? '#6BB745' : '#9A9A9A', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Tulis Review</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <View style={{ alignSelf: 'center', marginVertical: 0 }}>
                                            {selesaikanPesananAvailable.includes(orderDetail.order_status_string)
                                                ?
                                                    (                                   
                                                        <TouchableOpacity 
                                                            onPress={() => selesaikanPesananAvailable.includes(orderDetail.order_status_string) ? selesaikanPesananHandler(orderDetail.order_status, orderDetail.alert_konfirmasi_pesanan_selesai, orderDetail.id) : selesaikanPesananHandlerAlert(orderDetail.order_status)}
                                                        >
                                                        <View style={{ marginTop: 0, width: '97%', height: 50, padding: 10, backgroundColor: selesaikanPesananAvailable.includes(orderDetail.order_status_string) ? '#6BB745' : '#EAEAEA', borderRadius: 10 }}>
                                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                                <View style={{width: '100%'}}>
                                                                    <Text style={{ fontSize: 12, color: selesaikanPesananAvailable.includes(orderDetail.order_status_string) ? '#FFF' : '#9A9A9A', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Selesaikan Pesanan</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    )
                                                :
                                                
                                                    (
                                                        <TouchableOpacity 
                                                            onPress={() => batalkanPesananAvailable.includes(orderDetail.order_status_string) ? batalkanPesananHandler(orderDetail.order_status, orderDetail.alert_konfirmasi_pesanan_dibatalkan, orderDetail.id) : batalkanPesananHandlerAlert(orderDetail.order_status)}
                                                        >
                                                            <View style={{ marginTop: 0, width: '97%', height: 50, padding: 10, backgroundColor: batalkanPesananAvailable.includes(orderDetail.order_status_string) ? '#F99D1C' : '#EAEAEA', borderRadius: 10 }}>
                                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                                    <View style={{width: '100%'}}>
                                                                        <Text style={{ fontSize: 12, color: batalkanPesananAvailable.includes(orderDetail.order_status_string) ? '#FFF' : '#9A9A9A', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Batalkan Pesanan</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                            }
                                            </View>
                                        </View>
                                        </>
                                    )
                            }
                        </View>
                    </View>
                    {/* </Text> */}
                    
                    {/* <Button
                        onPress={checkoutHandler}
                        color={core.primaryColor}
                        title="Checkout"
                        disabled={cartData.length === 0}
                    /> */}
                </View>
            </View>
            </>
        );
    // }
}

Checkout.navigationOptions = navigationData => {
	return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Detail Order</Text>,
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
        color: '#000',
        marginVertical: 4
    },
    quantity: {
        fontFamily: 'open-sans',
        color: core.primaryColor,
        fontSize: 12
    },
    // #endregion
});

export default Checkout;