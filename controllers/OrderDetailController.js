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
    Dimensions,
    YellowBox,
    BackHandler,
    DatePickerIOS,
    Picker,
    Modal,
} from 'react-native';
import core from '../core/core';
import DefaultNotLogin from '../views/btn/defaultNotLogin';
import BackgroundImage from '../views/btn/backgroundImage';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { Ionicons } from '@expo/vector-icons';
import Input from '../views/form/Input';
import Search from '../views/form/Search';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';
import Carousel from 'react-native-banner-carousel';
import { Modalize } from 'react-native-modalize';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';
import * as mKepegawaian from '../models/action/mKepegawaian';
import * as mPesertaDidik from '../models/action/mPesertaDidik';
import ContentLoader, { Rect, Circle, Facebook, Instagram, List, BulletList, Code } from 'react-content-loader/native'
import * as Linking from 'expo-linking';
import { Banner } from 'react-native-paper';
import BottomNavigation from '../views/nav/BottomNavigation'
// import { Ionicons } from '@expo/vector-icons';

YellowBox.ignoreWarnings(['Animated:']);

const OrderDetailController = props => {
    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current?.open();
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
            var reverse = number.toString().split('').reverse().join(''),
                ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');

            return ribuan;
        } catch (error) {
            return 0;
        }
    }

    const [inputEmail, setEmail] = useState('');
    const [inputPassword, setPassword] = useState('');
    // const [isLoggedIn, setLoggedIn] = useState(false);
    // const [_userData, _setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReRender, setReRender] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedAddressPinPoint, setSelectedAddressPinPoint] = useState('');
    const [selectedDate, setSelectedDate] = useState(1);
    const [selectedHours, setSelectedHours] = useState('00');
    const [selectedMinutes, setSelectedMinutes] = useState('00');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAalamat, setSelectedAalamat] = useState('0');

    const handleHoursChange = (itemValue) => {
        setSelectedHours(itemValue);
    };

    const handleMinutesChange = (itemValue) => {
        setSelectedMinutes(itemValue);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const showSelectedTime = () => {
        const formattedTime = `${selectedHours}:${selectedMinutes}`;
        console.log('Selected Time:', formattedTime);
    };

    const dispatch = useDispatch();
    const emailHandler = text => {
        setEmail(text);
    };
    const passwordHandler = text => {
        setPassword(text);
    };
    const authHandler = async () => {
        const email = inputEmail;
        const password = inputPassword;

        setIsLoading(true);
        try {
            await dispatch(mAuth.login(email, password));
            await setEmail('');
            await setPassword('');
            Alert.alert('Notification', `Selamat datang!`, [{ text: 'Ok' }]);

            props.navigation.navigate('ProductsOverview');

        } catch (error) {
            Alert.alert('Error', error.message, [{ text: 'Ok' }]);
        }
        setIsLoading(false);
    };
    const logoutHandler = () => {
        Alert.alert(
            "Notification",
            "Apakah anda yakin ingin keluar?",
            [
                {
                    text: "OK",
                    onPress: async () => {
                        await dispatch(mAuth.logout());
                        Alert.alert('Notification', 'Anda berhasil keluar', [{ text: 'Ok' }]);
                        props.navigation.navigate('ProductsOverview');
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ],
        );
    };

    let BannerWidth = Dimensions.get('window').width - 100;

    let userLogin = [];
    userLogin = useSelector(state => state.auth.user);
    userLogin = userLogin == null ? [] : userLogin;

    let productData = []
    useEffect(() => {
        const loadHomeContent = async () => {
            setIsLoading(true);
            await dispatch(mAuth.fetchHomeContent(userLogin.id ? userLogin.id : 0));
            setIsLoading(false);
            // setTimeout(function() {
            //     setIsLoading(false);
            // }, 2000);
        };
        const loadAddressList = async () => {
            setIsLoading(true);
            await dispatch(mAuth.fetchAddress(userLogin.id ? userLogin.id : 0));
            setIsLoading(false);
        };

        loadHomeContent();
        loadAddressList();

        if (userLogin.length == 0) {
            AsyncStorage.getItem("userLogin").then(async (_user) => {
                const user = await _user;
                if (user !== null) {
                    const alreadyLoggedIn = JSON.parse(user);
                    if (alreadyLoggedIn.email && alreadyLoggedIn.password) {
                        setIsLoading(true);
                        dispatch(mAuth.loginSocmed(alreadyLoggedIn.email));
                        setTimeout(function () {
                            setIsLoading(false);
                        }, 1000);
                    }
                }
            });
        }
    }, []);

    let sHomeContent = useSelector(state => state.auth.homecontent);
    // console.log(sHomeContent)
    if (sHomeContent) {
        productData = sHomeContent
    }

    let userId = 0
    try {
        userId = userLogin.id
    } catch (error) {

    }

    // Hardcoded values
    const rows = 3
    const columns = 4
    const coverHeight = 400
    const coverWidth = 100
    const padding = 10
    const speed = 1

    const coverHeightWithPadding = coverHeight + padding
    const coverWidthWithPadding = coverWidth + padding
    const initial = 400
    const covers = Array(columns * rows).fill(1)

    let addressData = [];
    let _addressDataSelector = useSelector(state => state.auth.address);
    if (_addressDataSelector) {
        addressData = _addressDataSelector
    }

    if (isLoading == true) {
        return (
            <>
                <View style={{ padding: 0, marginTop: 0 }}>
                    <ContentLoader viewBox="0 0 400 500" width="425" height="600">
                        <Rect x="0" y="0" rx="2" ry="2" width="400" height="10" />
                        <Rect x="0" y="20" rx="2" ry="2" width="400" height="10" />
                        <Rect x="0" y="40" rx="2" ry="2" width="400" height="10" />
                        <Circle cx="60" cy="115" r="30" />
                        <Circle cx="150" cy="115" r="30" />
                        <Circle cx="240" cy="115" r="30" />
                        <Circle cx="330" cy="115" r="30" />
                        <Rect x="0" y="180" rx="2" ry="2" width="400" height="200" />

                        {covers.map((g, i) => {
                            let vy = Math.floor(i / columns) * coverHeightWithPadding + initial
                            let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
                            return (
                                <Rect
                                    key={i}
                                    x={vx}
                                    y={vy}
                                    rx="0"
                                    ry="0"
                                    width={coverWidth}
                                    height={coverHeight}
                                />
                            )
                        })}
                    </ContentLoader>
                </View>
            </>
        )
    }

    const handlerSelectedAlamat = async (addressId) => {
        // const _selectedAddress = await addressData.filter((r) => r.id == addressId)
        // try {
        //     await setSelectedAddressPinPoint(_selectedAddress[0].lat)    
        // } catch (error) {
        //     await setSelectedAddressPinPoint("")
        // }
        setSelectedAddress(addressId)
    };
    const renderGridItemAlamat = (data) => {
        const itemData = data.item;
        return (
            <TouchableOpacity onPress={() => handlerSelectedAlamat(itemData.id)}>
                <View style={(itemData.id == selectedAddress) ? styles._productSelected : (itemData.isPrimary == 1 && !selectedAddress) ? styles._productSelected : styles._product}>
                    <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    />
                    <View style={{}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: '3%', height: Platform.OS == 'ios' ? 210 : 240 }}>
                                {itemData.isPrimary == 1 ? (<View style={{ backgroundColor: '#6BB745', width: 7.5, height: 30, borderTopRightRadius: 20, borderBottomRightRadius: 20, marginTop: 20 }}><Text style={{ color: '#6BB745' }}>.</Text></View>) : (<View></View>)}
                            </View>
                            <View style={{ width: '97%', height: Platform.OS == 'ios' ? 210 : 240 }}>
                                <View>
                                    <View style={styles._details}>
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={styles._title}>{itemData.namaAlamat}</Text>
                                            <Text style={styles._title}>{itemData.namaPenerima}</Text>
                                        </View>
                                        <Text style={styles._price}>{itemData.noHandphone}</Text>
                                        <Text style={styles._price} numberOfLines={4}>{itemData.alamat}</Text>
                                        {/* <Text style={styles.price}>{itemData.zipcode}, {itemData.country}</Text> */}
                                    </View>

                                    {/* <View style={styles.actions}>
                                        <Button
                                            color={core.primaryColor}
                                            title="Select Address"
                                            onPress={() => selectProfileHandler(itemData)}
                                        />
                                    </View> */}

                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ width: '10%', height: 50 }}>
                                            <Image source={require('../assets/creekgarden/alamatsaya/pinpoin.png')} resizeMode="contain" style={{ width: 20, height: 30, marginLeft: 10 }} />
                                        </View>
                                        <View style={{ width: '90%', height: 50 }}>
                                            <Text style={{ marginTop: 5, marginLeft: 7, fontFamily: 'poppins-semi-bold', color: '#397A18', fontSize: 15 }}>{itemData.lat && itemData.lon ? (<Text>Sudah Pinpoint</Text>) : (<Text>Belum Pinpoint</Text>)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    const redirectAlamat = async (selectedId) => {
        const _selectedAddress = addressData.filter((r) => r.id == selectedId)
        try {
            if (_selectedAddress[0].lat == "" && _selectedAddress[0].lon == "") {
                if (Platform.OS == 'android') {
                    props.navigation.navigate('AddressMap', { source: 'Home', selectedAddress: _selectedAddress, address: _selectedAddress, lat: _selectedAddress[0].lat, lon: _selectedAddress[0].lon })
                } else {
                    props.navigation.navigate('AddressAdd', { address: _selectedAddress, source: 'Home' })
                }

            } else {
                props.navigation.navigate('AddressAdd', { address: _selectedAddress, source: 'Home' })
            }
        } catch (error) {
            props.navigation.navigate('AddressAdd', { address: _selectedAddress, source: 'Home' })
        }
    }
    const redirectAlamatAlert = async () => {
        Alert.alert('Gagal', 'Silahkan pilih alamat terlebih dahulu', [{ text: 'Ok' }]);
    }

    let __selectedAddress = {
        id: 0,
        alamat: 'Jakarta Barat',
        button: 'Ubah Alamat'
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
                __selectedAddress.id = selSelectedAddress.id
                __selectedAddress.alamat = selectedArr[0] + ' ' + selectedArr[1]
                __selectedAddress.button = selSelectedAddress.lat != "" ? "Ubah Alamat" : "Kamu Belum Pinpoint"
            } catch (error) {
                __selectedAddress.id = selSelectedAddress.id
                __selectedAddress.alamat = selectedArr[0]
                __selectedAddress.button = "Ubah Alamat"
            }

        } else {
            let arrSelectedAddress = addressData.filter((r) => r.isPrimary == 1)
            let selSelectedAddress = {}
            let selectedArr = []
            if (arrSelectedAddress.length > 0) {
                selSelectedAddress = arrSelectedAddress[0]
                selectedArr = selSelectedAddress.alamat.split(' ')

                try {
                    __selectedAddress.id = selSelectedAddress.id
                    __selectedAddress.alamat = selectedArr[0] + ' ' + selectedArr[1]
                    __selectedAddress.button = selSelectedAddress.lat != "" ? "Ubah Alamat" : "Kamu Belum Pinpoint"
                } catch (error) {
                    __selectedAddress.id = selSelectedAddress.id
                    __selectedAddress.alamat = selectedArr[0]
                    __selectedAddress.button = "Ubah Alamat"
                }
            }
        }
    } catch (error) {

    }

    const currentDate = new Date();
    const renderDateButton = (offset) => {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + offset);
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = daysOfWeek[date.getDay()];
        const isSelected = selectedDate == offset

        return (
            <TouchableOpacity onPress={() => setSelectedDate(offset)} key={offset} style={{ marginLeft: 10, marginTop: 20, height: 100, width: 80, backgroundColor: '#F4F0E5', padding: 5, borderWidth: 2, borderColor: isSelected ? '#668983' : '#F4F0E5', borderRadius: 20 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#668983', textAlign: 'center', fontFamily: 'poppins-semi-bold', fontSize: 15 }}>
                        {date.getDate()}
                    </Text>
                    <Text style={{ color: '#668983', textAlign: 'center', fontFamily: 'poppins-semi-bold', fontSize: 15 }}>
                        {dayName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    let alamat = [
        {
            "name": "Jaemin",
            "phoneNumber": "(+62) 831-3192-2013",
            "address": "Jalan Surya Baru III, RT.3/RW.2, Tanah Merah, Bukit Raya",
            "state": "BUKIT RAYA, KOTA PEKANBARU, RIAU, ID 28284"
        },
        {
            "name": "Jaehyun",
            "phoneNumber": "(+62)821-9429-3139",
            "address": "Jalan Komp. Green Garden Blok i3, RT.11/RW.4, Kebon Jeruk",
            "state": "KEBON JERUK, KOTA JAKARTA BARAT, DKI JAKARTA, ID 11520"
        }
    ]
    const renderAlamatList = (offset) => {
        const selectedAlamat = alamat[offset]
        const isSelected = selectedAalamat == offset

        return (
            <TouchableOpacity onPress={() => setSelectedAalamat(offset)} style={{ marginLeft: 10, marginTop: 15, width: '95%', backgroundColor: '#F4F0E5', padding: 5, borderWidth: 1, borderColor: isSelected ? '#000000' : '#F4F0E5', borderRadius: 20 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: '40%' }}>
                        <Text style={{ color: '#000000', textAlign: 'left', fontFamily: 'poppins-semi-bold', fontSize: 13, marginLeft: 10, marginTop: 0 }}>
                            {selectedAlamat['name']}
                        </Text>
                    </View>
                    <View style={{ width: '60%' }}>
                        <Text style={{ color: '#000000', textAlign: 'left', fontFamily: 'poppins-regular', fontSize: 11, marginLeft: 10, marginTop: 3 }}>
                            {selectedAlamat['phoneNumber']}
                        </Text>
                    </View>
                </View>
                <View style={{ width: '100%' }}>
                    <Text style={{ color: '#000000', textAlign: 'left', fontFamily: 'poppins-regular', fontSize: 11, marginLeft: 10, marginTop: 5 }}>
                        {selectedAlamat['address']} {selectedAlamat['state']}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10, margin: 3 }}>
                <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-regular', fontSize: 12, marginBottom: 0 }}>ID Order</Text>
                            <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 12, marginBottom: 0 }}>#GLA28I3A0C</Text>
                            <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 12, marginBottom: 0 }}>25 May 2022</Text>
                            <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-regular', fontSize: 12, marginBottom: 0 }}>12:30</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-regular', fontSize: 12, marginBottom: 0 }}>Status Order</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ReviewController')} style={{ marginTop: 20, backgroundColor: '#7F7F7F', padding: 5, borderWidth: 2, borderColor: 'white', borderRadius: 10, width: '100%', alignSelf: 'center' }}>
                                    <View>
                                        <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'poppins-regular' }}>Done</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginLeft: 10, marginTop: 20, width: '95%', backgroundColor: '#668983', padding: 5, borderWidth: 2, borderColor: '#668983', borderRadius: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: '100%' }}>
                                <Text style={{ color: '#FFFFFF', textAlign: 'left', fontFamily: 'poppins-semi-bold', fontSize: 15, marginLeft: 10, marginTop: 5 }}>
                                    Package Reguler - Ashafa Laundry
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ borderWidth: 2, borderColor: '#000000', borderRadius: 20, borderTopWidth: 0, marginTop: -5, marginHorizontal: 10, paddingBottom: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 30 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Service Dry Wash</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>X 1</Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Rp 10.500</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Package One Day</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>X 3</Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Rp 15.000</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Delivery Fee</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>X 1</Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Rp 5.000</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-bold', fontSize: 13, marginBottom: 0 }}>Sub Total</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}></Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-bold', fontSize: 13, marginBottom: 0 }}>Rp 10.500</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-bold', fontSize: 13, marginBottom: 0 }}>Total Payment</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}></Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-bold', fontSize: 13, marginBottom: 0 }}>Rp 30.500</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20 }}>
                            <View style={{ paddingTop: 30, borderTopWidth: 1, borderColor: '#000000', width: '100%' }}>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 0 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Bank</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>:</Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>BCA</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Account Number</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>:</Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>0123456789</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>ID Transaction</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>:</Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>#ABCDE01234</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10 }}>
                            <View style={{ width: '50%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Nominal Transfer</Text>
                            </View>
                            <View style={{ width: '15%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>:</Text>
                            </View>
                            <View style={{ width: '35%' }}>
                                <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-semi-bold', fontSize: 13, marginBottom: 0 }}>Rp 30.500</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20 }}>
                            <View style={{ paddingTop: 30, borderTopWidth: 1, borderColor: '#000000', width: '100%' }}>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingTop: 0 }}>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ReviewController')}>
                                    <Image source={require('../assets/new/driver2.png')} resizeMode="contain" style={{ width: '100%', height: 50 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* <BottomNavigation /> */}
        </>
    );
}

OrderDetailController.navigationOptions = {
    headerStyle: {
        backgroundColor: '#FFFFFF'
    },
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold' }}></Text>,
    headerTitleAlign: 'center',
    headerTintColor: '#000',
    headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white' }}>.</Text>,
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 350,
        width: 175,
        margin: 6,
        // marginRight: 12,
        // marginTop: 12,
        // marginBottom: 12,
        paddingBottom: 10
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        // height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        // width: '100%',
        // height: '100%'
        width: '100%',
        height: undefined,
        aspectRatio: 180 / 173,
    },
    imageCategory: {
        // width: '100%',
        // height: '100%'
        // width: '100%',
        height: undefined,
        width: 70,
        height: 70,
    },
    details: {
        // alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        height: 150,
    },
    title: {
        fontSize: 15,
        marginVertical: 4,
        fontFamily: 'poppins-semi-bold',
    },
    subtitle: {
        fontSize: 9,
        marginVertical: 1,
        fontFamily: 'poppins-regular'
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
    actions: {
        textAlign: 'center',
        // height: '25%',
        paddingHorizontal: 20,
        // paddingTop: 30
        marginTop: '-17%'
    },
    // actions2: {
    //     textAlign: 'center',
    //     // height: '25%',
    //     paddingHorizontal: 10,
    //     // paddingTop: 30
    //     marginTop: '-14%'
    // },
    carouselContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginBottom: 10
    },
    _product: {
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
        borderRadius: 10,
        borderColor: '#6BB745',
        borderWidth: 1,
        margin: 10,
        marginBottom: 5,
        paddingBottom: 0,
        width: 300,
    },
    _productSelected: {
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
        borderRadius: 10,
        borderColor: '#6BB745',
        backgroundColor: '#E1F1DA',
        borderWidth: 1,
        margin: 10,
        marginBottom: 5,
        paddingBottom: 0,
        width: 300,
    },
    _details: {
        // alignItems: 'center',
        // height: '15%',
        padding: 15
    },
    _title: {
        fontSize: 16,
        fontFamily: 'poppins-semi-bold',
        // marginVertical: 4
    },
    _price: {
        fontSize: 13,
        color: '#000',
        fontFamily: 'poppins-regular'
    },

    view: {
        marginTop: 100,
        backgroundColor: 'blue',
        width: Dimensions.get('window').width - 80,
        margin: 10,
        height: 200,
        borderRadius: 10,
        //paddingHorizontal : 30
    },
    view2: {
        marginTop: 100,
        backgroundColor: 'red',
        width: Dimensions.get('window').width - 80,
        margin: 10,
        height: 200,
        borderRadius: 10,
        //paddingHorizontal : 30
    },

});

export default OrderDetailController;