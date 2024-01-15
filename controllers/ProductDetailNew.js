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
} from 'react-native';
// import { SearchBar } from 'react-native-elements';
import core from '../core/core';
import DefaultNotLogin from '../views/btn/defaultNotLogin';
import BackgroundImage from '../views/btn/backgroundImage';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { Ionicons } from '@expo/vector-icons';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import CartNav from '../views/form/CartNav';
import Spinner from 'react-native-loading-spinner-overlay';
import { Modalize } from 'react-native-modalize';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';
import * as mCart from '../models/action/mCart';
import * as mKepegawaian from '../models/action/mKepegawaian';
import * as mPesertaDidik from '../models/action/mPesertaDidik';
import * as Linking from 'expo-linking';

// YellowBox.ignoreWarnings(['Animated:']);

const ProductsOverview = props => {
    let widthdevice = Dimensions.get('window').width;
    let productId = props.navigation.getParam('productId')
    
    const showHideGratisOngkir = true
    // const productArr = productData.filter((r) => r.id == productId)
    // const product = productArr[0]
    
    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const modalizeRef2 = useRef(null);
    const onOpen2 = () => {
        modalizeRef2.current?.open();
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

    const handleLayout = ({ layout }) => {
        setHeight(layout.height);
    };

    const [inputEmail, setEmail] = useState('');
    const [inputPassword, setPassword] = useState('');
    // const [isLoggedIn, setLoggedIn] = useState(false);
    // const [_userData, _setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReRender, setReRender] = useState(false);
    const [search, setSearch] = useState('');
    // if (!isReRender) {
    //     setReRender(true);
    // }

    // AsyncStorage.getItem("userLogin").then((user) => {
    //     if (user) {
    //         setLoggedIn(true);
    //         _setUserData(JSON.parse(user));
    //     }
    // });
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(mPesertaDidik.fetchPesertaDidikDefault());
    //     console.log('Tracing');
    // }, [isReRender]);

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

    let product = {
        "cara_penyimpanan": "Tidak ada data",
        "description": "Tidak ada data",
        "id": "0",
        "imageUrl": "",
        "imagesList": [],
        "kategori": "",
        "kategoriProduct": [
          "semua_produk",
          "promo_spesial",
          "paket_hemat",
          "fruits",
        ],
        "nutrisi_manfaat": "Tidak ada data",
        "priceAfter": 0,
        "priceBefore": 0,
        "title": "",
        "typeweight": "1 pcs",
    }
    
    useEffect(() => {
        async function fetchData() {
            await setIsLoading(true);
            await dispatch(mAuth.fetchProductDetail(0, productId));
            await setIsLoading(false);
        }
        fetchData()
    }, [dispatch]);
    let _product = useSelector(state => state.auth.productdetail);
    if (_product) {
        // console.log(_product)
        product = _product;
    }

    const openWa2 = () => {
        const title = product.title.split(' ').join('+');
        // console.log(title)
        Linking.openURL('https://api.whatsapp.com/send/?phone=%2B6287777575231&text=Halo+saya+ingin+menanyakan+ketersediaan+untuk+'+title);
    }
    
    let userLogin = [];
    userLogin = useSelector(state => state.auth.user);
    userLogin = userLogin == null ? [] : userLogin;

    if (userLogin.length == 0) {
        AsyncStorage.getItem("userLogin").then((user) => {
            if (user != '[]') {
                const tmpUserData = JSON.parse(user);
                dispatch(mAuth.login_v2(tmpUserData));
            }
        });
    }

    if (isLoading == true) {
        return (
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />
        );
    }

    return (
        <>
            <View style={styles.container}>
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <ScrollView style={{  }}>
                    {/* <SliderBox 
                        images={product.imagesList} 
                        sliderBoxHeight={500} 
                        dotColor="#008BCA"
                        inactiveDotColor="#90A4AE"
                    /> */}

                    <Image style={styles.image} source={{ uri: product.imageUrl }} resizeMode="cover" />
                    {/* <View style={styles.actions}>
                        <Button color={core.primaryColor} title="Buy Now" onPress={() => {}} />
                    </View> */}
                    
                    <View style={{ padding: 20, backgroundColor: '#FFFFFF' }}>
                        <View>
                            <View style={{ width: 280 }}>
                                <Text style={styles.title}>{product.title}</Text>
                                <Text style={styles.subtitle}>{product.title}</Text>
                            </View>

                            <View>
                            {product.priceBefore != product.priceAfter ? (
                                <View style={{ height: Platform.OS === 'ios' ? 50 : 60 }}>
                                    <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                                        <View style={{marginTop: 5, marginBottom: 5, width: '30%', height: 100}}>
                                            <Text style={styles.price}>Rp {rupiah(parseInt(product.priceBefore))}</Text>
                                        </View>

                                        <View style={{marginTop: 5, marginBottom: 5, width: '30%', height: 100, }}>
                                            <View style={{ width: '80%', padding: 1, backgroundColor:'#F99D1C', borderRadius: 20 }}>
                                                <Text style={{ alignSelf: 'center', fontFamily: 'poppins-semi-bold', color: '#FFF', fontSize: 11 }}>Save {((product.priceBefore - product.priceAfter) / product.priceBefore * 100).toFixed(0)}%</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={styles.priceAfter}>Rp {rupiah(parseInt(product.priceAfter))} / {product.typeweight}</Text>
                                </View>)
                                : (<View><Text style={styles.priceAfter}>Rp {rupiah(parseInt(product.priceAfter))} / {product.typeweight}</Text></View>) 
                            }
                            </View>

                            <View style={{ width: 100 }}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    // onPress={() => { checkedWishlist === true ? dispatch(mCart.removeFromWishlist(product)) : dispatch(mCart.addToWishlist(product)); } }
                                >
                                    {/* <Text style={{ marginRight: 25, textAlign: 'right' }}><Ionicons name='ios-heart' size={25} color={checkedWishlist === true ? 'red' : '#888'} /></Text> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{ padding: 20, marginTop: 10, backgroundColor: '#FFFFFF' }}>
                        <Text style={{ fontFamily: 'poppins-semi-bold', fontSize: 18, marginBottom: 10 }}>{product.kategori}</Text>
                        <Text style={styles.description}>{product.description.replace(/\\n/g,'\n')}</Text>
                    </View>
                    
                    {/* Clearfix */}
                    <View style={{marginBottom: 0}}><Text></Text></View>
                </ScrollView>

                <View
                    style={styles.buttonBuyNow}
                    // activeOpacity={0.9}
                    // onPress={
                    //     () => { 
                    //         // Call model function
                    //         dispatch(mCart.addToCart(product)); 
                            
                    //         // Alert handler
                    //         Alert.alert(
                    //             "Notification",
                    //             "Your product has been successfully added to cart!",
                    //             [
                    //                 { 
                    //                     text: "OK", 
                    //                     // onPress: () => console.log('OK') 
                    //                 }
                    //             ],
                    //             { cancelable: false }
                    //         ); 
                    //     }
                    // }
                >
                    <View style={{ padding: 10 }}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '15%', height: 100}}>
                                <TouchableOpacity
                                    onPress={openWa2}
                                >
                                    <Image style={{ width: '100%', height: Dimensions.get('window').width <= 370 ? 43 : 50 }} resizeMode="contain" source={require('../assets/creekgarden/produkdetil/chat.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '15%', height: 100}}>
                                <TouchableOpacity
                                    onPress={onOpen2}
                                >
                                    <Image style={{ width: '100%', height: Dimensions.get('window').width <= 370 ? 43 : 50 }} resizeMode="contain" source={require('../assets/creekgarden/produkdetil/nutrisi-manfaat.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '15%', height: 100}}>
                                <TouchableOpacity
                                    onPress={onOpen}
                                >
                                    <Image style={{ width: '100%', height: Dimensions.get('window').width <= 370 ? 43 : 50 }} resizeMode="contain" source={require('../assets/creekgarden/produkdetil/cara-penyimpanan.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={{marginLeft: 5, width: '50%', height: Dimensions.get('window').width <= 370 ? 43 : 50, backgroundColor: parseInt(product.quantity) > 0 ? '#6BB745' : '#FAFAFA', borderRadius: 10, zIndex: 9999}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    {
                                        parseInt(product.quantity) > 0 ?
                                        (
                                            <>
                                                <TouchableOpacity
                                                    style={{width: '40%', height: 100}}
                                                    onPress={
                                                        () => { 
                                                            // console.log('clicked');
                                                            // Call model function
                                                            dispatch(mCart.addToCart(product)); 
                                                            
                                                            // Alert handler
                                                            Alert.alert(
                                                                "Notifikasi",
                                                                "Produk berhasil ditambahkan kedalam keranjang.",
                                                                [
                                                                    { 
                                                                        text: "Ok", 
                                                                        // onPress: () => console.log('OK') 
                                                                    }
                                                                ],
                                                                { cancelable: false }
                                                            ); 
                                                        }
                                                    }
                                                >
                                                    <View>
                                                        <Image style={{ width: 20, alignSelf: 'center', marginLeft: 20, marginTop: 0 }} resizeMode="contain" source={require('../assets/creekgarden/produkdetil/icon-plus.png')} />
                                                    </View>
                                                </TouchableOpacity>
                                                
                                                <TouchableOpacity
                                                    style={{width: '60%', height: 100}}
                                                    onPress={
                                                        () => { 
                                                            // console.log('clicked');
                                                            // Call model function
                                                            dispatch(mCart.addToCart(product)); 
                                                            
                                                            // Alert handler
                                                            Alert.alert(
                                                                "Notifikasi",
                                                                "Produk berhasil ditambahkan kedalam keranjang.",
                                                                [
                                                                    { 
                                                                        text: "Ok", 
                                                                        // onPress: () => console.log('OK') 
                                                                    }
                                                                ],
                                                                { cancelable: false }
                                                            ); 
                                                        }
                                                    }
                                                >
                                                    <View>
                                                        <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: '10%', }}>Keranjang</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                {/* <TouchableOpacity
                                                    style={{width: '40%', height: 100}}
                                                >
                                                    <View>
                                                        <Image style={{ width: 20, alignSelf: 'center', marginLeft: 20 }} resizeMode="contain" source={require('../assets/creekgarden/produkdetil/icon-plus.png')} />
                                                    </View>
                                                </TouchableOpacity> */}
                                                
                                                <TouchableOpacity
                                                    style={{width: '100%', height: 100}}
                                                >
                                                    <View>
                                                        <Text style={{ color: '#9A9A9A', fontFamily:'poppins-regular', marginTop: 10, textAlign: 'center' }}>Tidak Tersedia</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                        {/* <Text style={{color: "#000", fontWeight: "bold"}}>BUY NOW</Text> */}
                    </View>
                </View>
            </View>

            <Modalize ref={modalizeRef} adjustToContentHeight={true}>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontFamily: 'poppins-semi-bold', color: '#000', fontSize: 20, marginBottom: 10 }}>Cara Penyimpanan</Text>
                    <View>
                        <Text style={{ fontFamily: 'poppins-regular' }}>{product.cara_penyimpanan.replace(/\\n/g,'\n')}</Text>
                        <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text>
                        {/* <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text> */}
                    </View>
                </View>
            </Modalize>

            <Modalize ref={modalizeRef2} adjustToContentHeight={true}>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontFamily: 'poppins-semi-bold', color: '#000', fontSize: 20, marginBottom: 10 }}>Nutrisi Manfaat</Text>
                    <View>
                        <Text style={{ fontFamily: 'poppins-regular' }}>{product.nutrisi_manfaat.replace(/\\n/g,'\n')}</Text>
                        <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text>
                        {/* <Text style={{ fontFamily: 'poppins-semi-bold', color: '#fff', fontSize: 20, marginBottom: 10 }}>...</Text> */}
                    </View>
                </View>
            </Modalize>
        </>
    );

}

ProductsOverview.navigationOptions = navigationData => {
    const openWa = () => {
        Linking.openURL('https://wa.me/+6287777575231?text=Halo%20saya%20ingin%20membeli%20buah-buahan%20dan%20sayur-sayuran%20di%20Creek%20Garden.');
    }
    const openCart = () => {
        navigationData.navigation.navigate('Cart')
    }

    return {
        tabBarVisible: false,
        headerTitle: <Text numberOfLines={1} style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>{navigationData.navigation.getParam('productTitle')}</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
        headerRight: <CartNav navigationData={navigationData} />
        ,
        // headerLeft: 
        // <>
        //     <View style={{}}>
        //         <Search
        //             id="namaAlamat"
        //             label="Nama Alamat"
        //             keyboardType="default"
        //             required
        //             email
        //             autoCapitalize="none"
        //             errorMessage=""
        //             // onInputChange={inputChangeHandler}
        //             initialValue=""
        //             editableForm={true}
        //             placeholder='Cari "Kebutuhan anda disini"'
        //         />
        //     </View>
        // </>
        // ,
    };
};

// const styles = StyleSheet.create({
//     product: {
//         shadowColor: 'black',
//         shadowOpacity: 0.26,
//         shadowOffset: { width: 0, height: 2 },
//         // shadowRadius: 5,
//         elevation: 5,
//         borderRadius: 10,
//         backgroundColor: 'white',
//         height: 335,
//         width: 180,
//         // margin: 12,
//         // marginRight: 12,
//         // marginTop: 12,
//         // marginBottom: 12,
//         paddingBottom: 10,
//         margin: 8,
//     },
//     touchable: {
//         borderRadius: 10,
//         overflow: 'hidden'
//     },
//     imageContainer: {
//         width: '100%',
//         // height: '60%',
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         overflow: 'hidden'
//     },
//     image: {
//         // width: '100%',
//         // height: '100%'
//         width: '100%',
//         height: undefined,
//         aspectRatio: 180 / 173,
//     },
//     imageCategory: {
//         // width: '100%',
//         // height: '100%'
//         // width: '100%',
//         height: undefined,
//         width: 40,
//         height: 40,
//     },
//     imageSort: {
//         // width: '100%',
//         // height: '100%'
//         // width: '100%',
//         height: undefined,
//         width: 35,
//         height: 35,
//         alignSelf: 'center'
//     },
//     details: {
//         // alignItems: 'center',
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingBottom: 10,
//         height: 150,
//     },
//     title: {
//         fontSize: 15,
//         marginVertical: 4,
//         fontFamily: 'poppins-semi-bold',
//     },
//     subtitle: {
//         fontSize: 9,
//         marginVertical: 1,
//         fontFamily: 'poppins-regular'
//     },
//     price: {
//         fontSize: 10,
//         color: '#888',
//         fontFamily: 'poppins-regular',
//         textDecorationLine: 'line-through',
//         marginTop: 2
//     },
//     priceAfter: {
//         fontSize: 12,
//         color: '#6BB745',
//         fontFamily: 'poppins-bold'
//     },
//     actions: {
//         textAlign: 'center',
//         // height: '25%',
//         paddingHorizontal: 20,
//         // paddingTop: 30
//         marginTop: '-22.5%'
//     },
//     carouselContainer: {
//         flex: 1,
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//         marginBottom: 10
//     },

//     categoryDisabled: { 
//         backgroundColor: '#EAEAEA', 
//         borderRadius: 20, 
//         marginBottom: 10, 
//         marginRight: 10,
//         padding: 10 
//     },
//     categoryActive: { 
//         backgroundColor: '#E1F1DA', 
//         borderRadius: 20, 
//         marginBottom: 10, 
//         marginRight: 10,
//         padding: 10 
//     },
//     subCategory: { 
//         backgroundColor: '#FFF', 
//         borderRadius: 0, 
//         marginBottom: 10, 
//         marginRight: 10,
//         margin: 5,
//         padding: 10,
//         shadowColor: 'black',
//         shadowOpacity: 0.15,
//         shadowOffset: { width: 0, height: 2 },
//         elevation: 5,
//     },
//     subCategorySelected: {
//         backgroundColor: '#6BB745', 
//         borderRadius: 0, 
//         marginBottom: 10, 
//         marginRight: 10,
//         margin: 5,
//         padding: 10,
//         shadowColor: 'black',
//         shadowOpacity: 0.15,
//         shadowOffset: { width: 0, height: 2 },
//         elevation: 5,
//     },
//     subCategoryText: {
//         color: '#000',
//         alignSelf: "center", 
//         fontFamily: 'poppins-regular'
        
//     },
//     subCategorySelectedText: {
//         color: '#FFF',
//         alignSelf: "center", 
//         fontFamily: 'poppins-regular'
//     }
// });
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // marginTop: 20
        backgroundColor: '#FAFAFA',
        // paddingVertical: 20
    },
    buttonBuyNow: {
        width: '100%',
        height: 75,
        backgroundColor: '#FFF',
        // justifyContent: 'center',
        // alignItems: 'center',
        // position: 'absolute',
        // bottom: -25,
        shadowColor: 'black',
        shadowOpacity: 0.16,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5
    },
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: 'poppins-semi-bold',
        // marginVertical: 20
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'poppins-regular',
        // marginVertical: 20
    },
    price: {
        fontSize: 15,
        fontFamily: 'poppins-regular',
        textDecorationLine: 'line-through',
    },
    priceAfter: {
        fontSize: 15,
        color: '#6BB745',
        fontFamily: 'poppins-bold'
    },
    limitedOffer: {
        fontSize: 15,
        color: 'red',
        textDecorationLine: 'underline',
        // marginVertical: 20
    },
    description: {
        fontSize: 14,
        marginHorizontal: 0,
        fontFamily: 'poppins-regular'
    },
    // cardProduct: {
    //     padding: 20,
    //     backgroundColor: '#FFFFFF'
    // },
    footer: {
        position: 'absolute',
        flex:0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor:'green',
        flexDirection:'row',
        height:80,
        alignItems:'center',
    },
});

export default ProductsOverview;