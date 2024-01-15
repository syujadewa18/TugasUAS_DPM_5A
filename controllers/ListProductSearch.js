import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useReducer, useRef, useCallback } from 'react';
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
    Component,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import Search from '../views/form/Search';
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
// import { Image } from 'react-native-elements';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
// import {
//     // LazyloadScrollView,
//     // LazyloadView,
//     // LazyloadImage
// } from 'react-native-lazyload';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';
import * as mKepegawaian from '../models/action/mKepegawaian';
import * as mPesertaDidik from '../models/action/mPesertaDidik';
import ContentLoader, { Rect, Circle, Facebook, Instagram, List, BulletList, Code } from 'react-content-loader/native'

// YellowBox.ignoreWarnings(['Animated:']);

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
};

const ProductsOverview = props => {
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            search: '',
        },
        inputValidities: {},
        formIsValid: false
    });
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

    const openCart = () => {
        props.navigation.navigate('Cart')
    }

    // Hardcoded values
    const rows = 3
    const columns = 4
    const coverHeight = 180
    const coverWidth = 100
    const padding = 15
    const speed = 1

    const coverHeightWithPadding = coverHeight + padding
    const coverWidthWithPadding = coverWidth + padding
    const initial = 180
    const covers = Array(columns * rows).fill(1)

    const modalizeRef = useRef(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const onClose = () => {
        modalizeRef.current?.close();
    };
    let _search = props.navigation.getParam('search')
    let categoryName = props.navigation.getParam('categoryName')

    // const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
    // const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
    // const [selectedSort, setSelectedSort] = useState('produk_terkait');
    const selectedCategoryId = props.navigation.getParam('categoryId') ? props.navigation.getParam('categoryId') : 'semua_produk';
    const selectedSubCategoryId = props.navigation.getParam('selectedSubCategoryId') ? props.navigation.getParam('selectedSubCategoryId') : 'All';
    const selectedSort = props.navigation.getParam('selectedSort') ? props.navigation.getParam('selectedSort') : 'produk_terkait';

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

    const [search, setEmail] = useState('');
    const [__search, __setEmail] = useState('');
    const [inputPassword, setPassword] = useState('');
    // const [isLoggedIn, setLoggedIn] = useState(false);
    // const [_userData, _setUserData] = useState([]);
    const [isRender, setIsRender] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isReRender, setReRender] = useState(false);
    // const [search, setSearch] = useState('');
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
    let sortData = [
        {
            "id": "produk_terkait",
            "name": "Produk Terkait"
        },
        {
            "id": "produk_termurah",
            "name": "Harga Termurah"
        },
        {
            "id": "produk_termahal",
            "name": "Harga Termahal"
        },
        {
            "id": "potongan_diskon",
            "name": "Potongan Diskon"
        },
    ]
    let categoryData = [
        {
            "id": "semua_produk",
            "name": "Semua Produk",
            "imageUrl": require('../assets/creekgarden/listcategory/semua_produk.png'),
            "imageUrlSelected": require('../assets/creekgarden/listcategory/semua_produk-selected.png'),
            "width": 170,
        },
        {
            "id": "promo_spesial",
            "name": "Promo Spesial",
            "imageUrl": require('../assets/creekgarden/listcategory/promo_spesial.png'),
            "imageUrlSelected": require('../assets/creekgarden/listcategory/promo_spesial-selected.png'),
            "width": 170,
        },
        {
            "id": "paket_hemat",
            "name": "Paket Hemat",
            "imageUrl": require('../assets/creekgarden/listcategory/paket_hemat.png'),
            "imageUrlSelected": require('../assets/creekgarden/listcategory/paket_hemat-selected.png'),
            "width": 160,
        },
        {
            "id": "fruits",
            "name": "Buah",
            "imageUrl": require('../assets/creekgarden/listcategory/fruits.png'),
            "imageUrlSelected": require('../assets/creekgarden/listcategory/fruits-selected.png'),
            "width": 130,
        },
        {
            "id": "vegetables",
            "name": "Sayur",
            "imageUrl": require('../assets/creekgarden/listcategory/vegetables.png'),
            "imageUrlSelected": require('../assets/creekgarden/listcategory/vegetables-selected.png'),
            "width": 130,
        },
        {
            "id": "foods",
            "name": "Makanan",
            "imageUrl": require('../assets/creekgarden/listcategory/foods.png'),
            "imageUrlSelected": require('../assets/creekgarden/listcategory/foods-selected.png'),
            "width": 130,
        },
        {
            "id": "drinks",
            "name": "Minuman",
            "imageUrl": require('../assets/creekgarden/listcategory/drinks.png'),
            "imageUrlSelected": require('../assets/creekgarden/listcategory/drinks-selected.png'),
            "width": 130,
        },
    ]
    let subCategoryData = [
        {
            "id": "All",
            "name": "All",
        },
    ]
    
    let productData = []
    // if (search) {
    //     useEffect(() => {
    //         async function fetchData() {
    //             await setIsLoading(true);
    //             await dispatch(mAuth.fetchProductBySearchDefault());
    //             await dispatch(mAuth.fetchProductBySearch(0, _search));
    //             await setIsLoading(false);
    //         }
    //         fetchData()
    //     }, [dispatch]);
    // }
    // if (isRender == true) {
    //     useEffect(() => {
    //         async function fetchData() {
    //             await setIsLoading(true);
    //             await dispatch(mAuth.fetchProductDefault());
    //             await dispatch(mAuth.fetchProduct(0, selectedCategoryId));
    //             await setIsLoading(false);
    //             setIsRender(false);
    //         }
    //         fetchData()
    //     }, [dispatch]);
    // }

    const [data, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const _handleLoadMore = async () => {
        await setLoading(true)
        await setPage(page + 1)
        setLoading(false)
    };
    const keyExtractor = useCallback((item) => item.id.toString(), [])

    let _productData = useSelector(state => state.auth.products_search);
    let _subCategoryData = useSelector(state => state.auth.subcategory);
    if (_productData) {
        // for (let p = 0; p < _productData.length; p++) {
        //     const item = _productData[p];
        //     if (p <= (4 * page)) {
        //         productData.push(item)
        //     } else {
        //         break;
        //     }
            
        // }
        productData = _productData
    }

    // console.log(_subCategoryData)

    if (_subCategoryData) {
        for (let i = 0; i < _subCategoryData.length; i++) {
            const subCategory = _subCategoryData[i];
            const mapping = {
                "id": subCategory,
                "name": subCategory,
            }
            subCategoryData.push(mapping)
        }
    }

    let originalProductData = productData
    if (selectedSort == 'produk_terkait') {
        productData = originalProductData
    } else if (selectedSort == 'produk_termurah') { // ascending
        productData.sort((a, b) => parseFloat(a.priceAfter) - parseFloat(b.priceAfter));
    } else if (selectedSort == 'produk_termahal') { // descending
        productData.sort((a, b) => parseFloat(b.priceAfter) - parseFloat(a.priceAfter));
    } else if (selectedSort == 'potongan_diskon') { // descending
        productData.sort((a, b) => parseFloat((b.priceBefore - b.priceAfter) / b.priceBefore * 100) - parseFloat((a.priceBefore - a.priceAfter) / a.priceBefore * 100));
    }

    const heightDevice = Dimensions.get('window').height + 300;
    
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
      
	const renderGridItem = (data) => {
        const itemProduct = data.item;
        
		return (
            // <LazyloadView host="lazyload-list">
                <View style={styles.product}>
                    <View style={styles.touchable}>
                        <View>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        props.navigation.navigate('ProductDetailNew', {
                                            productId: itemProduct.id,
                                            productTitle: itemProduct.title,
                                        });
                                    }
                                }
                            >
                                <View style={styles.imageContainer}>
                                    <View style={{ backgroundColor: '#6BB745', borderTopRightRadius: 20, borderBottomRightRadius: 20, width: '50%', padding: 8, position: 'absolute', zIndex: 3, elevation: 3, top: 20 }}>
                                        <Text numberOfLines={1} style={{ color: '#FFF', fontFamily: 'poppins-regular', fontSize: 14 }}>{itemProduct.kategori}</Text>
                                    </View>
                                    <Image style={styles.image} source={{ uri: itemProduct.imageUrl }} resizeMode="contain" PlaceholderContent={<ActivityIndicator />} />
                                </View>
                                
                                <View style={styles.details}>
                                    <View>
                                        <Text style={styles.title} numberOfLines={1}>{itemProduct.title}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.subtitle} numberOfLines={1} >{itemProduct.title}</Text>
                                    </View>
                                    <View>
                                        {itemProduct.priceBefore != itemProduct.priceAfter ? (
                                            <View style={{ height: 50 }}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{width: 75, height: 100}}>
                                                        <Text style={styles.price}>Rp {rupiah(parseInt(itemProduct.priceBefore))}</Text>
                                                    </View>

                                                    <View style={{width: 65, height: 100, }}>
                                                        <View style={{ padding: 1, backgroundColor:'#F99D1C', borderRadius: 20 }}>
                                                            <Text style={{ alignSelf: 'center', fontFamily: 'poppins-semi-bold', color: '#FFF', fontSize: 10 }}>Save {((itemProduct.priceBefore - itemProduct.priceAfter) / itemProduct.priceBefore * 100).toFixed(0)}%</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <Text style={styles.priceAfter}>Rp {rupiah(parseInt(itemProduct.priceAfter))} / {itemProduct.typeweight}</Text>
                                            </View>)
                                            : (<View><Text style={styles.priceAfter}>Rp {rupiah(parseInt(itemProduct.priceAfter))} / {itemProduct.typeweight}</Text></View>) 
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                            
                            {parseInt(itemProduct.quantity) > 0 ?
                            (
                                <View style={styles.actions}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#6BB745', alignItems: 'center', paddingVertical: 5, borderRadius: 10 }}
                                        onPress={
                                            () => {
                                                props.navigation.navigate('ProductDetailNew', {
                                                    productId: itemProduct.id,
                                                    productTitle: itemProduct.title,
                                                });
                                            }
                                        }
                                    >
                                        <Text style={{ color: '#FFF', fontFamily: 'poppins-regular' }}>Beli</Text>   
                                    </TouchableOpacity>
                                </View>
                            )
                            :
                            (
                                <View style={styles.actions2}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#FFF', alignItems: 'center', paddingVertical: 5, borderRadius: 10 }}
                                        onPress={
                                            () => {
                                                props.navigation.navigate('ProductDetailNew', {
                                                    productId: itemProduct.id,
                                                    productTitle: itemProduct.title,
                                                });
                                            }
                                        }
                                    >
                                        <Text style={{ color: '#000', fontFamily: 'poppins-regular', textAlign: 'center', fontSize: 12 }}>Produk Tidak Tersedia</Text>   
                                    </TouchableOpacity>
                                </View>
                            )
                            }
                        </View>
                    </View>
                </View>
            // </LazyloadView>
        );
	}

    const marginTop = Platform.OS == 'ios' ? heightDevice / 8 : heightDevice / 12
    const marginTop2 = Platform.OS == 'ios' ? heightDevice / 2.75 : heightDevice / 5.5

    if (isLoading == true) {
        return(
            <>
                <View style={{ padding: 0, marginTop: 0 }}>
                    <ContentLoader viewBox="0 0 400 500" width="425" height="600">
                        <Rect x= "0" y="0" rx= "2" ry="2" width="400" height="10" />
                        <Rect x= "0" y="20" rx= "2" ry="2" width="400" height="10" />
                        <Rect x= "0" y="40" rx= "2" ry="2" width="400" height="10" />
                        <Circle cx="60" cy="115" r="30" />
                        <Circle cx="150" cy="115" r="30" />
                        <Circle cx="240" cy="115" r="30" />
                        <Circle cx="330" cy="115" r="30" />
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

    const searchSubmit = async () => {
        await __setEmail(search)
        await setIsLoading(true);
        await dispatch(mAuth.fetchProductBySearchDefault());
        await dispatch(mAuth.fetchProductBySearch(0, search));
        await setIsLoading(false);
    }

    if (__search) {
        return (
            <>
                <ScrollView style={{ marginTop: Platform.OS == 'android' ? 40 : 20, margin: 0, height: 300 }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '10%', height: 50, marginTop: 0, marginLeft: 5}}>
                            <TouchableOpacity
                                onPress={() => props.navigation.goBack()}
                            >
                                <Image source={require('../assets/creekgarden/icon/back.png')} resizeMode="contain" style={{ width: 25, height: 25, marginTop: 5 }} />
                            </TouchableOpacity>                
                        </View>
    
                        <View style={{width: '70%', height: 50}}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: '#6BB745',
                                borderRadius: 10,
                                padding: 5,
                            }}>
                                <TextInput
                                    onChangeText={emailHandler}
                                    placeholder={'Cari "kebutuhan anda disini"'}
                                    style={styles.input}
                                    onSubmitEditing={searchSubmit}
                                    value={search}
                                />
                            </View>
                        </View>
    
                        <View style={{marginLeft: 20, width: '10%', height: 50}}>
                            <CartNav navigationData={props} />
                        </View>
                    </View>
                    {
                        productData.length ?
                        (
                            <FlatList
                                keyExtractor={keyExtractor}
                                data={productData}
                                renderItem={renderGridItem}
                                numColumns={2}
                                maxToRenderPerBatch={20}
                                windowSize={10}
                                onEndReached={0}
                                onEndReachedThreshold={0.5}
                                height={heightDevice - 400}
                                style={{ paddingHorizontal: 5 }}
                            />
                        )
                        : 
                        (
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '25%' }}>
                                <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={require('../assets/creekgarden/listcategory/notfound.png')} />
                                <Text style={{ fontFamily: 'poppins-regular' }}>Yah produk tidak ditemukan</Text>
                            </View>
                        )
                    }
                </ScrollView>
            </>
        );

    } else {
        return (
            <>
                <ScrollView style={{ marginTop: Platform.OS == 'android' ? 40 : 20, margin: 0, height: 300 }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: '10%', height: 50, marginTop: 0, marginLeft: 5}}>
                            <TouchableOpacity
                                onPress={() => props.navigation.goBack()}
                            >
                                <Image source={require('../assets/creekgarden/icon/back.png')} resizeMode="contain" style={{ width: 25, height: 25, marginTop: 5 }} />
                            </TouchableOpacity>                
                        </View>
    
                        <View style={{width: '70%', height: 50}}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: '#6BB745',
                                borderRadius: 10,
                                padding: 5,
                            }}>
                                <TextInput
                                    onChangeText={emailHandler}
                                    placeholder={'Cari "kebutuhan anda disini"'}
                                    style={styles.input}
                                    onSubmitEditing={searchSubmit}
                                    value={search}
                                />
                            </View>
                        </View>
    
                        <View style={{marginLeft: 20, width: '10%', height: 50}}>
                            <CartNav navigationData={props} />
                        </View>
                    </View>
                </ScrollView>
            </>
        );
    }

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
        headerTitle: '',
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        // headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
        // headerRight: 
        //     <>
        //         <View style={{flex: 1, flexDirection: 'row', marginTop: Platform.OS == 'android' ? -10 : -7}}>
        //             <TouchableOpacity onPress={openCart}>
        //                 <View style={{width: '100%', height: 80}}>
        //                     <Image source={require('../assets/creekgarden/icon/cart.png')} resizeMode="contain" style={{ marginTop: Platform.OS == 'android' ? 10 : 0, width: 20, height: 40, marginRight: 30 }} />
        //                 </View>
        //             </TouchableOpacity>
        //         </View>
        //     </>
        // ,
        // headerLeft: 
        // <>
        //     <View style={{flex: 1, flexDirection: 'row'}}>
        //         <View style={{width: '10%', height: 100}}>
        //             <TouchableOpacity
        //                 onPress={() => navigationData.navigation.goBack()}
        //             >
        //                 <Image source={require('../assets/creekgarden/icon/back.png')} resizeMode="contain" style={{ width: 25, height: 25 }} />
        //             </TouchableOpacity>                
        //         </View>

        //         <View style={{width: '65%', height: 100}}>
        //             <Search
        //                 id="namaAlamat"
        //                 label="Nama Alamat"
        //                 keyboardType="default"
        //                 required
        //                 email
        //                 autoCapitalize="none"
        //                 errorMessage=""
        //                 // onInputChange={inputChangeHandler}
        //                 onInputChange={navigationData}
        //                 initialValue={navigationData.navigation.getParam('search')}
        //                 editableForm={true}
        //                 placeholder='Cari "Kebutuhan anda disini"'
        //             />
        //         </View>
        //     </View>
        // </>
        // ,
        headerShown: false
    };
};

let _widthDevice = Dimensions.get('window').width;
const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 335,
        // width: 180,
        width: (_widthDevice / 2) - 25,
        // margin: 12,
        // marginRight: 12,
        // marginTop: 12,
        // marginBottom: 12,
        paddingBottom: 10,
        margin: 8,
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
        width: 40,
        height: 40,
    },
    imageSort: {
        // width: '100%',
        // height: '100%'
        // width: '100%',
        height: undefined,
        width: 35,
        height: 35,
        alignSelf: 'center'
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
        marginTop: '-22.5%'
    },
    actions2: {
        textAlign: 'center',
        // height: '25%',
        paddingHorizontal: 10,
        // paddingTop: 30
        marginTop: '-25.5%'
    },
    carouselContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginBottom: 10
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
    subCategory: { 
        backgroundColor: '#FFF', 
        borderRadius: 0, 
        marginBottom: 10, 
        marginRight: 10,
        margin: 5,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    subCategorySelected: {
        backgroundColor: '#6BB745', 
        borderRadius: 0, 
        marginBottom: 10, 
        marginRight: 10,
        margin: 5,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    subCategoryText: {
        color: '#000',
        alignSelf: "center", 
        fontFamily: 'poppins-regular'
        
    },
    subCategorySelectedText: {
        color: '#FFF',
        alignSelf: "center", 
        fontFamily: 'poppins-regular'
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
        width: 320,
    },
    formControl: {
        width: '100%',
        borderRadius: 10,
        borderColor: '#6BB745',
        borderWidth: 1,
        padding: 5,
    },
    inputTextarea: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        // borderBottomColor: '#008bca',
        // borderBottomWidth: 1
        // borderRadius: 10,
        // borderColor: '#6BB745',
        // borderWidth: 1,
        marginTop: 0,
        marginBottom: 15,
        fontFamily: "poppins-regular",
        marginLeft: 2,
        height: 100
    },
});

export default ProductsOverview;