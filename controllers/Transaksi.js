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
    AsyncStorage,
    Alert,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as mAuth from '../models/action/mAuth';
import Spinner from 'react-native-loading-spinner-overlay';
// import { RadioButton } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as Linking from 'expo-linking';
import CountDown from 'react-native-countdown-component';

const landingPageData = {
    image: require('../assets/creekgarden/creekpoin/background.png'),
    tips: require('../assets/creekgarden/creekpoin/tips.png'),
    text: 'YUK IKUT PARTISIPASI DALAM MENYAMBUT\nHARI KEMERDEKAAN INDONESIA YANG KE-76',
    btn1: 'PROMO BUAH CREEK GARDEN\nDiskon sampai 50 % Lho',
    btn2: 'SAYURAN SEGAR\nGratis Ongkos Kirim',
    btn1Href: '',
    btn2Href: '',
}

const LandingPage = props => {
    function arrayColumn(array, columnName) {
        return array.map(function(value,index) {
            return value[columnName];
        })
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

    const heightDevice = Dimensions.get('window').height + 300;

    let categoryData = [
        {
            "id": "diproses",
            "name": "Diproses",
            "imageUrl": require('../assets/creekgarden/transaksi/disprosesdis.png'),
            "imageUrlSelected": require('../assets/creekgarden/transaksi/diprosesak.png'),
            "width": 170,
        },
        {
            "id": "selesai",
            "name": "Selesai",
            "imageUrl": require('../assets/creekgarden/transaksi/selesaitrandis.png'),
            "imageUrlSelected": require('../assets/creekgarden/transaksi/selesaitranak.png'),
            "width": 170,
        },
        {
            "id": "dibatalkan",
            "name": "Dibatalkan",
            "imageUrl": require('../assets/creekgarden/transaksi/dibatalkan2.png'),
            "imageUrlSelected": require('../assets/creekgarden/transaksi/dibatalkan.png'),
            "width": 170,
        },
    ]
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

    const dispatch = useDispatch();
    const [selectedVoucher, setSelectedVoucher] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('diproses');
    let userLogin = useSelector(state => state.auth.user);
    userLogin = userLogin == null ? [] : userLogin;
    userLogin.id = userLogin.length == 0 ? 0 : userLogin.id
    let orderData = {
        diproses: [],
        selesai: [],
        dibatalkan: []
    }
    useEffect(() => {
        const loadOrder = async () => {
            setIsLoading(true);
            await dispatch(mAuth.fetchOrdersV2(userLogin.id));
            setIsLoading(false);
        };
        loadOrder();
    }, []); 
    let _orderData = useSelector(state => state.auth.orderlist);
    if (_orderData) {
        orderData = _orderData
    }
    let resultOrderData = []

    if (selectedCategoryId == 'diproses') {
        resultOrderData = orderData.diproses
    } else if (selectedCategoryId == 'selesai') {
        resultOrderData = orderData.selesai
    } else if (selectedCategoryId == 'dibatalkan') {
        resultOrderData = orderData.dibatalkan
    }

    const [error, setError] = useState();
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    const searchSubmit = async (categoryId) => {
        await setSelectedCategoryId(categoryId)
        await setIsLoading(true);
        await dispatch(mAuth.fetchOrdersV2(userLogin.id));
        await setIsLoading(false);
    }

    const selesaikanPesananSubmit = async (order_id) => {
        setIsLoading(true);
        await setSelectedCategoryId('selesai')
        await dispatch(mAuth.selesaikanPesanan(order_id));
        await dispatch(mAuth.loginSocmed(userLogin.email));
        await dispatch(mAuth.fetchPoint(userLogin.id));
        await dispatch(mAuth.fetchOrdersV2(userLogin.id));
        setIsLoading(false);
    }
    const selesaikanPesananHandler = (order_status, alert, order_id) => {
        Alert.alert('Konfirmasi', alert, [{ text: 'Batal' }, { text: 'Ok', onPress: () => selesaikanPesananSubmit(order_id) }]);  
    }
    const selesaikanPesananHandlerWebview = (order_status, alert, order_id) => {
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
        setIsLoading(false);
    }
    const batalkanPesananHandler = (order_status, alert, order_id) => {
        Alert.alert('Konfirmasi', alert, [{ text: 'Batal' }, { text: 'Ok', onPress: () => batalkanPesananSubmit(order_id) }]);  
    }
    const batalkanPesananHandlerAlert = (order_status) => {
        Alert.alert('Gagal', 'Anda tidak dapat membatalkan pesanan karena '+order_status, [{ text: 'Ok' }]);  
    }
    
    const tulisReviewHandler = (order_id) => {
        props.navigation.navigate('Review', {order_id: order_id, source: 'order'})
    }
    const tulisReviewHandlerAlert = (order_status) => {
        Alert.alert('Gagal', 'Anda tidak dapat mengirimkan review karena '+order_status, [{ text: 'Ok' }]);  
    }

    let _widthDevice = Dimensions.get('window').width;

    if (isLoading) {
        return (
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />
        );
    }

    const renderGridItemOrder = (data) => {
        let item = data.item;
        console.log(item)
        let diffInMs = item.order_expired - item.order_now
        // let diffInMs = 10
        
		return (
            <TouchableOpacity
                // onPress={
                //     () => {
                //         props.navigation.navigate('Webview', {
                //             url: item.url
                //         });
                //     }
                // }
            >
                <View style={{ marginBottom: 15, backgroundColor: '#FFF', borderColor: '#DDD', borderWidth: 1, borderRadius: 15, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, elevation: 5, borderBottomColor: '#EEE', borderBottomWidth: 0 }}>
                    <View style={{ padding: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '45%', height: '100%'}}>
                                    <Text style={{ fontFamily: 'poppins-regular', color: '#000', fontSize: 13, marginTop: 0 }}>Order ID</Text>
                                    <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', fontSize: 13, marginTop: 0 }}>{item.order_id}</Text>
                                </View>
                                
                                <View style={{marginLeft: 20, width: '50%', height: '100%'}}>
                                    <Text style={{ fontFamily: 'poppins-regular', color: '#000', fontSize: 13, marginTop: 0 }}>Tanggal Pemesanan</Text>
                                    <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', fontSize: 13 }}>{item.order_date_string}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{borderBottomWidth: 1, borderColor: '#397A18', marginTop: 15, marginBottom: 15}}></View>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '45%', height: '100%'}}>
                                    <Text style={{ fontFamily: 'poppins-regular', color: '#000', fontSize: 13, marginTop: 0 }}>Status Pemesanan</Text>
                                    <Text style={{ 
                                        fontFamily: 'poppins-semi-bold', 
                                        color: pesananSelesaiList2.includes(item.order_status_string) ? '#6BB745' : pesananSelesaiList1.includes(item.order_status_string) ? '#F99D1C' : '#D43346', 
                                        fontSize: 13, 
                                        marginTop: 0 }}
                                    >
                                        {item.order_status}
                                    </Text>
                                </View>
                                
                                <View style={{marginLeft: 20, width: '50%', height: '100%'}}>
                                    <Text style={{ fontFamily: 'poppins-regular', color: '#000', fontSize: 13, marginTop: 0 }}>Total Belanja</Text>
                                    <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', fontSize: 13 }}>Rp {rupiah(item.subtotal)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{borderBottomWidth: 1, borderColor: '#397A18', marginTop: 15, marginBottom: 15}}></View>

                        <View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                                        <Image source={verifikasiPembayaranList2.includes(item.order_status_string) ? require('../assets/creekgarden/order/statuspes1.png') : require('../assets/creekgarden/order/statuspes1a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                        <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Verifikasi Pembayaran</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: '7%', height: '100%'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                                        <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                                        <Image source={pesananDipackingList2.includes(item.order_status_string) ? require('../assets/creekgarden/order/statuspes2.png') : require('../assets/creekgarden/order/statuspes2a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                        <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan dipacking</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: '7%', height: '100%'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                                        <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                                        <Image source={pesananDikirimList2.includes(item.order_status_string) ? require('../assets/creekgarden/order/statuspes3.png') : require('../assets/creekgarden/order/statuspes3a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                        <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan dikirim</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: '7%', height: '100%'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                                        <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width: '20%', height: '100%'}}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Orderdetail', {nav_order_id: item.id})}>
                                        <Image source={pesananSelesaiList2.includes(item.order_status_string) ? require('../assets/creekgarden/order/statuspes4.png') : require('../assets/creekgarden/order/statuspes4a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                        <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan Sampai</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                <Text style={{ 
                                    color: pesananSelesaiList2.includes(item.order_status_string) ? '#6BB745' : pesananSelesaiList1.includes(item.order_status_string) ? '#F99D1C' : '#D43346', 
                                    fontFamily: 'poppins-semi-bold', 
                                    textAlign: 'center' 
                                }}>{item.order_status}</Text>
                            </View>
                        </View>

                        {initialBatalkanSelesaikanAvailable.includes(item.order_status_string) ? (
                            <View style={{flex: 1, flexDirection: 'row', marginLeft: -5}}>
                                    <View style={{ width: '50%' }}>
                                        <View style={{ alignSelf: 'center', marginVertical: 20 }}>
                                            <TouchableOpacity 
                                                onPress={() => batalkanPesananAvailable.includes(item.order_status_string) ? batalkanPesananHandler(item.order_status, item.alert_konfirmasi_pesanan_dibatalkan, item.id) : batalkanPesananHandlerAlert(item.order_status)}
                                            >
                                                <View style={{ marginTop: 0, width: '97%', height: 50, padding: 10, backgroundColor: batalkanPesananAvailable.includes(item.order_status_string) ? '#F99D1C' : '#EAEAEA', borderRadius: 10 }}>
                                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                                        <View style={{width: '100%'}}>
                                                            <Text style={{ fontSize: 12, color: batalkanPesananAvailable.includes(item.order_status_string) ? '#FFF' : '#9A9A9A', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Batalkan Pesanan</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                <View style={{ width: '50%', marginLeft: 5 }}>
                                    <View style={{ alignSelf: 'center', marginVertical: 20 }}>
                                        <TouchableOpacity 
                                            onPress={() => selesaikanPesananAvailable.includes(item.order_status_string) ? selesaikanPesananHandler(item.order_status, item.alert_konfirmasi_pesanan_selesai, item.id) : props.navigation.navigate('PaymentV2', {url: item.url_payment, total: item.subtotal, orderId: item.order_id})}
                                        >
                                            <View style={{ marginTop: 0, width: '97%', height: 50, padding: 10, backgroundColor: selesaikanPesananAvailable.includes(item.order_status_string) ? '#6BB745' : '#6BB745', borderRadius: 10 }}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{width: '100%'}}>
                                                        <Text style={{ fontSize: 12, color: selesaikanPesananAvailable.includes(item.order_status_string) ? '#FFF' : '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>{selesaikanPesananAvailable.includes(item.order_status_string) ? 'Selesaikan Pesanan' : 'Selesaikan Pembayaran'}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            ) : (<View style={{ marginVertical: 5 }}></View>)
                        }

                        <View style={{flex: 1, flexDirection: 'row', marginLeft: -5, marginBottom: 10}}>
                            <View style={{ width: '50%' }}>
                                <View style={{ alignSelf: 'center', marginVertical: 0 }}>
                                    <TouchableOpacity 
                                        onPress={() => item.is_review == 1 ? props.navigation.navigate('Home') : tulisReviewAvailable.includes(item.order_status_string) ? tulisReviewHandler(item.id) : tulisReviewHandlerAlert(item.order_status)}
                                    >
                                        <View style={{ marginTop: 0, width: '97%', height: 50, padding: 10, backgroundColor: tulisReviewAvailable.includes(item.order_status_string) ? '#FFF' : '#EAEAEA', borderRadius: 10, borderWidth: 1, borderColor: tulisReviewAvailable.includes(item.order_status_string) ? '#6BB745' : '#EAEAEA' }}>
                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{width: '100%'}}>
                                                    <Text style={{ fontSize: 12, color: tulisReviewAvailable.includes(item.order_status_string) ? '#6BB745' : '#9A9A9A', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>{item.is_review == 1 ? 'Belanja Lagi' : 'Tulis Review'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ width: '50%', marginLeft: 5 }}>
                                <View style={{ alignSelf: 'center', marginVertical: 0 }}>
                                    <TouchableOpacity 
                                        onPress={
                                            () => Linking.openURL('https://api.whatsapp.com/send/?phone=%2B6287777575231&text=Halo+saya+ingin+menanyakan+pesanan+saya+untuk+nomor+order+'+item.order_id)
                                        }
                                    >
                                        <View style={{ marginTop: 0, width: '97%', height: 50, padding: 10, backgroundColor: '#6BB745', borderRadius: 10 }}>
                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{width: '20%'}}>
                                                    <Image source={require('../assets/creekgarden/inbox/iconwa.png')} resizeMode="contain" style={{ width: 50, height: 25 }} />
                                                </View>

                                                <View style={{width: '80%'}}>
                                                    <Text style={{ fontSize: 12, color: '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>CHAT</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* <View style={{ borderBottomLeftRadius: 15, borderBottomLeftWidth: 1, borderBottomRightRadius: 15, backgroundColor: '#B5DBA2', marginTop: -20 }}>
                        <Text style={{ color: '#397A18', fontFamily: 'poppins-semi-bold', padding: 10, textAlign: 'center', fontSize: 13, marginBottom: -20, elevation: 999, zIndex: 999 }}>Batas waktu pembayaran</Text>
                        {diffInMs > 0 ?
                        (
                            <>
                                <CountDown
                                    until={diffInMs}
                                    size={15}
                                    // onFinish={() => alert('Finished')}
                                    digitStyle={{backgroundColor: '#B5DBA2', margin: 0, textAlign: 'left'}}
                                    digitTxtStyle={{textAlign: 'left', color: '#397A18', fontFamily: 'poppins-semi-bold', fontSize: 13}}
                                    // timeLabelStyle={{ padding: 0 }}
                                    timeToShow={['H', 'M', 'S']}
                                    timeLabels={{h: '', m: '', s: ''}}
                                    style={{ padding: 0, backgroundColor: '#B5DBA2', textAlign: 'left' }}
                                    separatorStyle={{ textAlign: 'left', backgroundColor: '#B5DBA2',  color: '#397A18', fontFamily: 'poppins-semi-bold', fontSize: 13}}
                                    showSeparator={true}
                                />
                            </>
                        )
                        :
                        (
                            <View>
                                <Text style={{ color: '#D43346', fontFamily: 'poppins-semi-bold', padding: 10, textAlign: 'center', fontSize: 13, marginBottom: 0 }}>Telah Kadaluwarsa</Text>
                            </View>
                        )
                        }
                    </View> */}
                </View>
            </TouchableOpacity>
		);
	}
    
    return (
        <>
            <View>
                <ScrollView horizontal={true} style={{ marginTop: 10, paddingHorizontal: 10, borderBottomColor: '#EEE', borderBottomWidth: 2, height: 60 }}>
                    {categoryData.map(r =>
                        <TouchableOpacity 
                            style={[r.id == selectedCategoryId ? styles.categoryActive : styles.categoryDisabled]}
                            onPress={
                                () => {
                                    searchSubmit(r.id)
                                }
                            }
                        >
                            <View style={{ width: r.width }}>
                                <View style={{flexDirection: 'row', textAlign: 'left', fontSize: 15}}>
                                    <Image style={styles.imageCategory} resizeMode="contain" source={r.id == selectedCategoryId ? r.imageUrlSelected : r.imageUrl} />
                                    <Text style={{ alignSelf: "center", fontFamily: 'poppins-regular' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{r.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )} 
                </ScrollView>
            </View>
            
            <View style={{ backgroundColor: '#fff', marginTop: 0, paddingVertical: 10, paddingHorizontal: 10 }}>
                {
                    (
                        resultOrderData.length > 0 ?
                        (
                            Platform.OS == 'ios' ? (
                                <FlatList
                                    keyExtractor={ (data, index) => data.id}
                                    data={resultOrderData}
                                    renderItem={renderGridItemOrder}
                                    numColumns={1}
                                    style={{ marginBottom: 100 }}
                                />
                            ) :
                            (
                                <FlatList
                                    keyExtractor={ (data, index) => data.id}
                                    data={resultOrderData}
                                    renderItem={renderGridItemOrder}
                                    numColumns={1}
                                    height={heightDevice - 525}
                                    style={{ marginBottom: 50 }}
                                />
                            ) 
                        ) :
                        (<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '25%' }}>
                            <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={selectedCategoryId == "diproses" ? require('../assets/creekgarden/inbox/diproses.png') : selectedCategoryId == "selesai" ? require('../assets/creekgarden/inbox/empty.png') : require('../assets/creekgarden/inbox/dibatalkan.png')} />
                            <Text style={{ marginTop: 20, fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'center' }}>
                                {selectedCategoryId == "diproses" ? "Yah!!! buah dan sayurmu belum\nada yang diproses" : selectedCategoryId == "selesai" ? "Belum ada buah dan sayur\nyang tiba di rumahmu" : "Selamat Belanjaan kamu\nbelum ada yang dibatalkan"}
                            </Text>
                            <Text style={{ fontFamily: 'poppins-regular', fontSize: 14, textAlign: 'center' }}>
                                cari buah dan sayur kesukaanmu sekarang!!!
                            </Text>
                        </View>)
                    )
                }
            </View>
        </>
    );

}
LandingPage.navigationOptions = {
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Transaksi</Text>,
    headerTitleAlign: 'center',
    headerTintColor: '#000',
    headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 0.84 / 1,
    },
    text: {
        fontFamily: 'poppins-semibold-landing',
        color: '#397A18',
        fontWeight: '300',
        textAlign: 'center',
        marginTop: '5%'
    },
    imageBg: {
        // flex: 1,
        justifyContent: "center",
        padding: '5%'
    },
    imageBg2: {
        // flex: 1,
        justifyContent: "center",
        marginTop: '4%',
        padding: '5%'
    },

    categoryDisabled: { 
        backgroundColor: '#EAEAEA', 
        borderRadius: 20, 
        marginBottom: 10, 
        marginRight: 10,
        padding: 10 
    },
    categoryActive: { 
        backgroundColor: '#E1F1DA', 
        borderRadius: 20, 
        marginBottom: 10, 
        marginRight: 10,
        padding: 10 
    },
    imageCategory: {
        // width: '100%',
        // height: '100%'
        // width: '100%',
        height: undefined,
        width: 30,
        height: 30,
    },
});

export default LandingPage;