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

const ServiceControllerDropOff = props => {
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
    const [selectedService, setSelectedService] = useState(0);
    const [selectedServiceAdditional, setSelectedServiceAdditional] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

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

    let services = [
        {
            "name": "Dry Wash",
            "imageActive": require("../assets/new/nonsel1.png"),
            "image": require("../assets/new/sel1.png")
        },
        {
            "name": "Ironing",
            "imageActive": require("../assets/new/nonsel2.png"),
            "image": require("../assets/new/sel2.png")
        },
        {
            "name": "Wash & Iron",
            "imageActive": require("../assets/new/nonsel3.png"),
            "image": require("../assets/new/sel3.png")
        },
    ]
    const renderServiceButton = (offset) => {
        const isSelected = selectedService == offset

        return (
            <TouchableOpacity onPress={() => setSelectedService(offset)} key={offset} style={{ marginLeft: 10, marginTop: 20 }}>
                <View style={{ width: '30%' }}>
                    <Image
                        style={{ width: 90, height: 150, resizeMode: 'contain' }}
                        source={isSelected ? services[offset].image : services[offset].imageActive}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    let servicesAdditional = [
        {
            "name": "Regular",
            "imageActive": require("../assets/new/nonsel4.png"),
            "image": require("../assets/new/sel4.png")
        },
        {
            "name": "One-Day",
            "imageActive": require("../assets/new/nonsel5.png"),
            "image": require("../assets/new/sel5.png")
        },
        {
            "name": "Express",
            "imageActive": require("../assets/new/nonsel6.png"),
            "image": require("../assets/new/sel6.png")
        }
    ]
    const renderServiceButtonAdditional = (offset) => {
        const isSelected = selectedServiceAdditional == offset

        return (
            <TouchableOpacity onPress={() => setSelectedServiceAdditional(offset)} key={offset} style={{ marginLeft: 10, marginTop: 0 }}>
                <View style={{ width: '30%' }}>
                    <Image
                        style={{ width: 90, height: 150, resizeMode: 'contain' }}
                        source={isSelected ? servicesAdditional[offset].image : servicesAdditional[offset].imageActive}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10, margin: 3 }}>
                <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: '100%' }}>
                            <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10, fontFamily: 'poppins-bold', fontSize: 20, marginBottom: 0 }}>Services</Text>
                        </View>
                    </View>

                    <ScrollView style={{ flex: 1, marginBottom: 0 }} horizontal={true}>
                        <View style={{ flexDirection: 'row' }}>
                            {renderServiceButton(0)}
                            {renderServiceButton(1)}
                            {renderServiceButton(2)}
                        </View>
                    </ScrollView>

                    <ScrollView style={{ flex: 1, marginBottom: 0 }} horizontal={true}>
                        <View style={{ flexDirection: 'row' }}>
                            {renderServiceButtonAdditional(0)}
                            {renderServiceButtonAdditional(1)}
                            {renderServiceButtonAdditional(2)}
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('DropOffConfirmController', { selectedService: selectedService, selectedServiceAdditional: selectedServiceAdditional })} style={{ marginTop: 20, backgroundColor: '#7F7F7F', padding: 10, borderWidth: 2, borderColor: 'white', borderRadius: 10, width: '60%', alignSelf: 'center' }}>
                        <View>
                            <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'poppins-regular' }}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* <BottomNavigation /> */}
        </>
    );
}

ServiceControllerDropOff.navigationOptions = {
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

export default ServiceControllerDropOff;