import { StatusBar } from 'expo-status-bar';
import React, { useState, useReducer, useCallback, useEffect } from 'react';
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
    KeyboardAvoidingView,
    Alert,
    Dimensions,
} from 'react-native';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import BtnAddNewAddress from '../views/btn/btnAddNewAddress';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';

import * as mCart from '../models/action/mCart';
import * as mAuth from '../models/action/mAuth';

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

const ListAddress = props => {
    let source = props.navigation.getParam('source');
    const heightDevice = Dimensions.get('window').height + 300;

    // Custom function
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    // Set variable or state here
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedAddressPinPoint, setSelectedAddressPinPoint] = useState('');
    let addressData = [];
    // let addressData = [
    //     {
    //         "id": 1,
    //         "namaAlamat": "Rumah",
    //         "namaPenerima": "Yudha",
    //         "noHandphone": "082246718208",
    //         "alamat": "Jalan Apel Raya Blok C.14 No.6, Perumahan Depok Jaya Agung, Kecamatan Pancoran Mas, Kelurahan Rangkapan Jaya",
    //         "kota": "Kota Depok",
    //         "provinsi": "Jawa Barat",
    //         "provinsiId": "9",
    //         "kotaId": "115",
    //         "lat": -6.389459428937577,
    //         "lon": 106.78574821249126,
    //         "isPrimary": 1,
    //         "user_id": 1,
    //     },
    //     {
    //         "id": 2,
    //         "namaAlamat": "Rumah Orang Tua",
    //         "namaPenerima": "Sri Hermiati",
    //         "noHandphone": "087777129090",
    //         "alamat": "Perumahan Al Barokah Residence Blok IX-3, Ragajaya, Citayam, Bogor, Jawa Barat 16920",
    //         "kota": "Kabupaten Bogor",
    //         "provinsi": "Jawa Barat",
    //         "provinsiId": "9",
    //         "kotaId": "78",
    //         "lat": -6.440784944357678,
    //         "lon": 106.78888548465922,
    //         // "lat": 0,
    //         // "lon": 0,
    //         "isPrimary": 0,
    //         "user_id": 1,
    //     },
    // ]

    // Hook
    const userId = useSelector(state => state.auth.user.id) ? useSelector(state => state.auth.user.id) : 0;

    let _addressDataSelector = useSelector(state => state.auth.address);
    if (_addressDataSelector) {
        addressData = _addressDataSelector
    }
    let selectedAddressRedux = useSelector(state => state.cart.selectedAddress);

    if (userId > 0) {
        useEffect(() => {
            const loadAddressList = async () => {
                setIsLoading(true);
                await dispatch(mAuth.fetchAddress(userId));
                setIsLoading(false);
            };
            
            loadAddressList();
        }, []);
    }

    // Handler
    const selectProfileHandler = async (addressData) => {
        setIsLoading(true);
        try {
            await dispatch(mCart.selectAddress(addressData));  
            props.navigation.navigate('Checkout');
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, []);

    const deleteProfileHandler = async (addressId, userId) => { 
        Alert.alert("Notification", "Are you sure, you want to delete this address?", [
            { text: "OK", onPress: () => deleteProfileHandlerV2(addressId, userId) },
            { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        ]);
        
        const deleteProfileHandlerV2 = async (addressId, userId) => {
            setError(null);
            setIsLoading(true);
            try {
                await dispatch(mCart.removeAddress(userId, addressId));
                
                Alert.alert('Notification', 'Your profile has been successfully deleted!', [{ text: 'Ok' }]);
                props.navigation.navigate('ListAddress');
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
    };

    if (!selectedAddress) {
        const automatedSelectedAlamat = async (selectedAddress) => {
            await setSelectedAddress(selectedAddress.id)
            // await setSelectedAddressPinPoint(selectedAddress.lat)
            await dispatch(mCart.selectAddress(selectedAddress));
        }

        let selectedAddressPrimary = addressData.length > 0 ? addressData.filter((r) => r.isPrimary == 1) : []
        
        if (selectedAddressRedux.length != 0) {
            automatedSelectedAlamat(selectedAddressRedux)
        } else if (selectedAddressPrimary.length > 0) {
            automatedSelectedAlamat(selectedAddressPrimary[0])
        }
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

    const redirectAlamat = async () => {
        const _selectedAddress = addressData.filter((r) => r.id == selectedAddress)
        try {
            if (_selectedAddress[0].lat == "" && _selectedAddress[0].lon == "") {
                if (Platform.OS == 'android') {
                    props.navigation.navigate('AddressMap', {selectedAddress: _selectedAddress, address: _selectedAddress, lat: _selectedAddress[0].lat, lon: _selectedAddress[0].lon})
                } else {
                    props.navigation.navigate('AddressAdd', {address: _selectedAddress})
                }
            } else {
                props.navigation.navigate('AddressAdd', {address: _selectedAddress})
            }
        } catch (error) {
            props.navigation.navigate('AddressAdd', {address: _selectedAddress})
        }
    }
    const redirectAlamatAlert = async () => {
        Alert.alert('Gagal', 'Silahkan pilih alamat terlebih dahulu', [{ text: 'Ok' }]);
    }
    let cartData = useSelector(state => {
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
    const redirectAlamatCheckout = async () => {
        const _selectedAddress = addressData.filter((r) => r.id == selectedAddress)
        await dispatch(mCart.selectAddress(_selectedAddress[0]));
        await dispatch(mCart.removeSelectShipping());
        await dispatch(mAuth.fetchShippingsV2(cartData, _selectedAddress[0]));
        props.navigation.navigate('Checkout')
    }
    const __selectedAddress__ = addressData.filter((r) => r.id == selectedAddress)
    let latSel = ""
    try {
        latSel = __selectedAddress__[0].lat
    } catch (error) {
        
    }

    // Render
	const renderGridItem = (data) => {
        const itemData = data.item;
        
		return (
            <TouchableOpacity onPress={() => handlerSelectedAlamat(itemData.id)}>
                <View style={(itemData.id == selectedAddress) ? styles.productSelected : (itemData.isPrimary == 1 && !selectedAddress) ? styles.productSelected : styles.product}>
                    <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    />
                    <View style={styles.touchable}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '3%', height: '100%'}}>
                                {itemData.isPrimary == 1 ? (<View style={{ backgroundColor: '#6BB745', width: 7.5, height: 30, borderTopRightRadius: 20, borderBottomRightRadius: 20, marginTop: 20 }}><Text style={{ color: '#6BB745' }}>.</Text></View>) : (<View></View>)}
                            </View>
                            <View style={{width: '97%', height: '100%'}}>
                                <View>
                                    <View style={styles.details}>
                                        <View style={{ marginBottom: 10 }}>
                                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                                                {/* <View style={{ width: '65%', height: '100%' }}>
                                                    <Text style={styles.title}>{itemData.namaAlamat}</Text>
                                                </View>
                        
                                                <View style={{ width: '35%', height: '100%' }}>
                                                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                                                        <View style={{ width: '50%', height: '100%' }}>
                                                            <TouchableOpacity onPress={() => props.navigation.navigate('AddressDetail', { addressId: itemData.id })}>
                                                                <Text style={{ textAlign: 'right', color: core.primaryColor }}>Edit</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={{ width: '50%', height: '100%' }}>
                                                            <TouchableOpacity onPress={() => deleteProfileHandler(itemData.id, itemData.user_id)}>
                                                                <Text style={{ textAlign: 'right', color: 'red' }}>Delete</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View> */}
                                                <View style={{ width: '100%', height: '100%' }}>
                                                    <Text style={styles.title}>{itemData.namaAlamat}</Text>
                                                </View>
                                            </View>

                                            <Text style={styles.title}>{itemData.namaPenerima}</Text>
                                        </View>
                                        <Text style={styles.price}>{itemData.noHandphone}</Text>
                                        <Text style={styles.price}>{itemData.alamat}</Text>
                                        <Text style={styles.price}>{itemData.provinsi}, <Text style={styles.price}>{itemData.kota}</Text></Text>
                                        {/* <Text style={styles.price}>{itemData.zipcode}, {itemData.country}</Text> */}
                                    </View>
                                    
                                    {/* <View style={styles.actions}>
                                        <Button
                                            color={core.primaryColor}
                                            title="Select Address"
                                            onPress={() => selectProfileHandler(itemData)}
                                        />
                                    </View> */}

                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{width: '10%', height: 50}}>
                                            <Image source={require('../assets/creekgarden/alamatsaya/pinpoin.png')} resizeMode="contain" style={{ width: 20, height: 30, marginLeft: 10 }} />
                                        </View>
                                        <View style={{width: '90%', height: 50}}>
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
	  
	return (
        <>
            <ScrollView style={{ marginBottom: 25 }}>
                {addressData.length > 0 ?
                    (
                        <>
                            <Text style={{ fontFamily: 'poppins-bold', paddingBottom: 0, paddingTop: 20, paddingHorizontal: 20, fontSize: 16 }}>Alamat Pengiriman</Text>
                            {
                                Platform.OS == 'ios' ? (
                                    <FlatList
                                        keyExtractor={ (data, index) => data.id}
                                        data={addressData}
                                        renderItem={renderGridItem}
                                        numColumns={1}
                                    />
                                )
                                :
                                (
                                    <FlatList
                                        keyExtractor={ (data, index) => data.id}
                                        data={addressData}
                                        renderItem={renderGridItem}
                                        numColumns={1}
                                        // height={heightDevice}
                                    />
                                )
                            }
                            <View style={{ alignSelf: 'center', marginTop: 30 }}>
                                {source == 'Checkout' ? 
                                (
                                    <TouchableOpacity onPress={redirectAlamatCheckout}>
                                        <View style={{ marginTop: 0, marginBottom: 20, width: 200, height: 50, padding: 10, backgroundColor: '#FFF', borderRadius: 10, borderColor: '#6BB745', borderWidth: 1 }}>
                                            <Text style={{ color: '#6BB745', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Pilih Alamat</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                                :
                                (<View></View>)
                                }

                                {!selectedAddress ? (
                                    <TouchableOpacity onPress={redirectAlamatAlert}>
                                        <View style={{ marginTop: 0, width: 200, height: 50, padding: 10, backgroundColor: '#6BB745', borderRadius: 10 }}>
                                            <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Ubah Alamat</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={redirectAlamat}>
                                        <View style={{ marginTop: 0, width: 200, height: 50, padding: 10, backgroundColor: '#6BB745', borderRadius: 10 }}>
                                            <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>{latSel ? "Ubah Alamat" : "Kamu Belum Pinpoint"}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                                }
                            </View>
                        </>
                    )
                    :
                    (
                        <View style={{ backgroundColor: '#fff', marginTop: 0, paddingVertical: 20, paddingHorizontal: 30 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '25%' }}>
                                <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={require('../assets/creekgarden/alamatsaya/empty.png')} />
                                <Text style={{ marginTop: 20, fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'center' }}>Yah alamatnya masih kosong</Text>
                                <Text style={{ fontFamily: 'poppins-regular', fontSize: 14, textAlign: 'center' }}>Isi alamat lengkap dulu biar nanti pesanan kamu nggak salah kirim</Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </>
  	);
}
  
ListAddress.navigationOptions = navigationData => {
    return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Alamat Saya</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
        headerRight: <TouchableOpacity onPress={() => navigationData.navigation.navigate('AddressAdd')}><Text style={{ textAlign: 'center', fontSize: 12, color: '#6BB745', marginRight: 12, fontFamily: 'poppins-semi-bold'}}>Tambah Alamat</Text></TouchableOpacity>,
    };
};
  
const styles = StyleSheet.create({
    product: {
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
        borderRadius: 10,
        borderColor: '#6BB745',
        borderWidth: 1,
        margin: 20,
        marginBottom: 5,
        paddingBottom: 0,
    },
    productSelected: {
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
        borderRadius: 10,
        borderColor: '#6BB745',
        backgroundColor: '#E1F1DA',
        borderWidth: 1,
        margin: 20,
        marginBottom: 5,
        paddingBottom: 0,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        // alignItems: 'center',
        // height: '15%',
        padding: 15
    },
    title: {
        fontSize: 16,
        fontFamily: 'poppins-semi-bold',
        // marginVertical: 4
    },
    price: {
        fontSize: 13,
        color: '#000',
        fontFamily: 'poppins-regular'
    },
    priceV2: {
        fontSize: 14,
        color: core.primaryColor
    },
    actions: {
        textAlign: 'center',
        height: '25%',
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 20
    }
});
  
export default ListAddress;