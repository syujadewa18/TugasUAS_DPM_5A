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
            "id": "promosi",
            "name": "Promosi",
            "imageUrl": require('../assets/creekgarden/inbox/promo-inactive.png'),
            "imageUrlSelected": require('../assets/creekgarden/inbox/promo.png'),
            "width": 170,
        },
        {
            "id": "transaksi",
            "name": "Transaksi",
            "imageUrl": require('../assets/creekgarden/inbox/transaksi-inactive.png'),
            "imageUrlSelected": require('../assets/creekgarden/inbox/transaksi.png'),
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

    const dispatch = useDispatch();
    const [selectedVoucher, setSelectedVoucher] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('promosi');
    let userLogin = useSelector(state => state.auth.user);
    let promotionData = []
    let orderData = []
    useEffect(() => {
        const loadPromotion = async () => {
            setIsLoading(true);
            await dispatch(mAuth.fetchPromotion(userLogin.id));
            setIsLoading(false);
        };
        const loadOrder = async () => {
            setIsLoading(true);
            await dispatch(mAuth.fetchOrders(userLogin.id));
            setIsLoading(false);
        };
        if (userLogin.id) {
            loadPromotion();
            loadOrder();
        }
    }, []);

    let _promotionData = useSelector(state => state.auth.promotion);
    if (_promotionData) {
        promotionData = _promotionData
    }
    let _orderData = useSelector(state => state.auth.orderinbox);
    if (_orderData) {
        orderData = _orderData.data
    }

    if (userLogin.id == undefined) {
        promotionData = []
        orderData = []
    }

    if (isLoading) {
        return (
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />
        );
    }

    const renderGridItemPromosi = (data) => {
        let item = data.item;
        
		return (
            <TouchableOpacity
                onPress={
                    () => {
                        props.navigation.navigate('Webview', {
                            url: item.url
                        });
                    }
                }
            >
                <View style={{ marginBottom: 15, backgroundColor: '#E1F1DA', borderRadius: 15, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, elevation: 5, borderBottomColor: '#EEE', borderBottomWidth: 2 }}>
                    <View style={{ padding: 20 }}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '35%', height: '100%'}}>
                                <Image source={{uri: item.imageUrl}} resizeMode="contain" style={{ width: 100, height: 100 }} />
                            </View>
                            
                            <View style={{width: '65%', height: '100%'}}>
                                <Text style={{ fontFamily: 'poppins-bold', color: '#397A18', fontSize: 17, marginTop: 5 }}>{item.nama}</Text>
                                <Text style={{ fontFamily: 'poppins-regular', color: '#397A18', fontSize: 12 }}>{item.deskripsi}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
		);
	}
    const renderGridItemOrder = (data) => {
        let item = data.item;
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
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '50%', height: '100%'}}>
                                <Text style={{ fontFamily: 'poppins-regular', color: '#000', fontSize: 13, marginTop: 0 }}>Order ID</Text>
                                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', fontSize: 13, marginTop: 0 }}>{item.order_id}</Text>
                            </View>
                            
                            <View style={{width: '50%', height: '100%'}}>
                                <Text style={{ fontFamily: 'poppins-regular', color: '#000', fontSize: 13, marginTop: 0 }}>Tanggal Pemesanan</Text>
                                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', fontSize: 13 }}>{item.order_date_string}</Text>
                            </View>
                        </View>

                        <View style={{borderBottomWidth: 1, borderColor: '#397A18', marginTop: 15, marginBottom: 15}}></View>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '50%', height: '100%'}}>
                                <Text style={{ fontFamily: 'poppins-regular', color: '#000', fontSize: 13, marginTop: 0 }}>Status Pemesanan</Text>
                                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', fontSize: 13, marginTop: 0 }}>{item.order_status}</Text>
                            </View>
                            
                            <View style={{width: '50%', height: '100%'}}>
                                <Text style={{ fontFamily: 'poppins-regular', color: '#000', fontSize: 13, marginTop: 0 }}>Total Belanja</Text>
                                <Text style={{ fontFamily: 'poppins-semi-bold', color: '#6BB745', fontSize: 13 }}>Rp {rupiah(item.subtotal)}</Text>
                            </View>
                        </View>

                        <View style={{borderBottomWidth: 1, borderColor: '#397A18', marginTop: 15, marginBottom: 15}}></View>

                        <View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{width: '20%', height: '100%'}}>
                                    <Image source={verifikasiPembayaranList2.includes(item.order_status_string) ? require('../assets/creekgarden/order/statuspes1.png') : require('../assets/creekgarden/order/statuspes1a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Verifikasi Pembayaran</Text>
                                </View>

                                <View style={{width: '7%', height: '100%'}}>
                                    <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                </View>
                                
                                <View style={{width: '20%', height: '100%'}}>
                                    <Image source={pesananDipackingList2.includes(item.order_status_string) ? require('../assets/creekgarden/order/statuspes2.png') : require('../assets/creekgarden/order/statuspes2a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan dipacking</Text>
                                </View>

                                <View style={{width: '7%', height: '100%'}}>
                                    <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                </View>

                                <View style={{width: '20%', height: '100%'}}>
                                    <Image source={pesananDikirimList2.includes(item.order_status_string) ? require('../assets/creekgarden/order/statuspes3.png') : require('../assets/creekgarden/order/statuspes3a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan dikirim</Text>
                                </View>

                                <View style={{width: '7%', height: '100%'}}>
                                    <View style={{width: '100%', borderBottomColor: '#9A9A9A', borderBottomWidth: 1, marginTop: 25}}></View>
                                </View>

                                <View style={{width: '20%', height: '100%'}}>
                                    <Image source={pesananSelesaiList2.includes(item.order_status_string) ? require('../assets/creekgarden/order/statuspes4.png') : require('../assets/creekgarden/order/statuspes4a.png')} resizeMode="contain" style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular', fontSize: 9, textAlign: 'center', alignSelf: 'center' }}>Pesanan Sampai</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ alignSelf: 'center', marginVertical: 20 }}>
                            <TouchableOpacity 
                                onPress={
                                    () => Linking.openURL('https://api.whatsapp.com/send/?phone=%2B6287777575231&text=Halo+saya+ingin+menanyakan+pesanan+saya+untuk+nomor+order+'+item.order_id)
                                }
                            >
                                <View style={{ marginTop: 0, width: 150, height: 50, padding: 10, backgroundColor: '#6BB745', borderRadius: 10 }}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{width: '20%'}}>
                                            <Image source={require('../assets/creekgarden/inbox/iconwa.png')} resizeMode="contain" style={{ width: 50, height: 25 }} />
                                        </View>

                                        <View style={{width: '80%'}}>
                                            <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>CHAT</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ borderBottomLeftRadius: 15, borderBottomLeftWidth: 1, borderBottomRightRadius: 15, backgroundColor: '#B5DBA2', marginTop: -20 }}>
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
                    </View>
                </View>
            </TouchableOpacity>
		);
	}
    
    return (
        <View>
            <ScrollView horizontal={true} style={{ marginTop: 10, paddingHorizontal: 10, borderBottomColor: '#EEE', borderBottomWidth: 2 }}>
                {categoryData.map(r =>
                    <TouchableOpacity 
                        style={[r.id == selectedCategoryId ? styles.categoryActive : styles.categoryDisabled]}
                        onPress={
                            () => {
                                setSelectedCategoryId(r.id)
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
            
            <View style={{ backgroundColor: '#fff', marginTop: 0, paddingVertical: 10, paddingHorizontal: 10 }}>
                {
                    selectedCategoryId == 'promosi' ?
                    (
                        promotionData.length > 0 ?
                        (
                            Platform.OS == 'ios' ? (
                                <FlatList
                                    keyExtractor={ (data, index) => data.id}
                                    data={promotionData}
                                    renderItem={renderGridItemPromosi}
                                    numColumns={1}
                                />
                            ) :
                            (
                                <FlatList
                                    keyExtractor={ (data, index) => data.id}
                                    data={promotionData}
                                    renderItem={renderGridItemPromosi}
                                    numColumns={1}
                                    height={heightDevice - 450}
                                />
                            )
                        ) :
                        (<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '25%' }}>
                            <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={userLogin.id == undefined ? require('../assets/creekgarden/inbox/belumlogin.png') : require('../assets/creekgarden/voucher/default.png')} />
                            <Text style={{ marginTop: 20, fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'center' }}>{userLogin.id == undefined ? 'Hai, Login Dulu Yuk' : 'Yah Belum ada promosi saat ini'}</Text>
                            <Text style={{ fontFamily: 'poppins-regular', fontSize: 14, textAlign: 'center' }}>{userLogin.id == undefined ? 'yuk login dulu agar dapat bisa mengakses fitur ini' : 'buka terus aplikasi Creek Garden temukan promosi dilain waktu'}</Text>
                        </View>)
                    )
                    :
                    (
                        orderData.length > 0 ?
                        (
                            Platform.OS == 'ios' ? (
                                <FlatList
                                    keyExtractor={ (data, index) => data.id}
                                    data={orderData}
                                    renderItem={renderGridItemOrder}
                                    numColumns={1}
                                />
                            ) :
                            (
                                <FlatList
                                    keyExtractor={ (data, index) => data.id}
                                    data={orderData}
                                    renderItem={renderGridItemOrder}
                                    numColumns={1}
                                    height={heightDevice - 450}
                                />
                            ) 
                        ) :
                        (<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '25%' }}>
                            <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={userLogin.id == undefined ? require('../assets/creekgarden/inbox/belumlogin.png') : require('../assets/creekgarden/inbox/empty.png')} />
                            <Text style={{ marginTop: 20, fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'center' }}>{userLogin.id == undefined ? 'Hai, Login Dulu Yuk' : `Belum ada buah dan sayur \n yang tiba di rumahmu`}</Text>
                            <Text style={{ fontFamily: 'poppins-regular', fontSize: 14, textAlign: 'center' }}>{userLogin.id == undefined ? 'yuk login dulu agar dapat bisa mengakses fitur ini' : 'cari buah dan sayur kesukaanmu sekarang!!!'}</Text>
                        </View>)
                    )
                }
            </View>
        </View>
    );

}
LandingPage.navigationOptions = {
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Inbox</Text>,
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