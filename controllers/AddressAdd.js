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
    Picker
} from 'react-native';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';
// import IOSPicker from 'react-native-ios-picker';
// import {DropdownList, PickerItem} from 'react-native-ultimate-modal-picker';
// import ModalPicker from 'react-native-modal-picker'
// import RNPickerSelect from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector'

import * as mCart from '../models/action/mCart';
import * as mAuth from '../models/action/mAuth';

var cities = [
    {
        province_id: 1,
        city: require(`../city/city1.json`),
    },
    {
        province_id: 2,
        city: require(`../city/city2.json`),
    },
    {
        province_id: 3,
        city: require(`../city/city3.json`),
    },
    {
        province_id: 4,
        city: require(`../city/city4.json`),
    },
    {
        province_id: 5,
        city: require(`../city/city5.json`),
    },
    {
        province_id: 6,
        city: require(`../city/city6.json`),
    },
    {
        province_id: 7,
        city: require(`../city/city7.json`),
    },
    {
        province_id: 8,
        city: require(`../city/city8.json`),
    },
    {
        province_id: 9,
        city: require(`../city/city9.json`),
    },
    {
        province_id: 10,
        city: require(`../city/city10.json`),
    },
    {
        province_id: 11,
        city: require(`../city/city11.json`),
    },
    {
        province_id: 12,
        city: require(`../city/city12.json`),
    },
    {
        province_id: 13,
        city: require(`../city/city13.json`),
    },
    {
        province_id: 14,
        city: require(`../city/city14.json`),
    },
    {
        province_id: 15,
        city: require(`../city/city15.json`),
    },
    {
        province_id: 16,
        city: require(`../city/city16.json`),
    },
    {
        province_id: 17,
        city: require(`../city/city17.json`),
    },
    {
        province_id: 18,
        city: require(`../city/city18.json`),
    },
    {
        province_id: 19,
        city: require(`../city/city19.json`),
    },
    {
        province_id: 20,
        city: require(`../city/city20.json`),
    },
    {
        province_id: 21,
        city: require(`../city/city21.json`),
    },
    {
        province_id: 22,
        city: require(`../city/city22.json`),
    },
    {
        province_id: 23,
        city: require(`../city/city23.json`),
    },
    {
        province_id: 24,
        city: require(`../city/city24.json`),
    },
    {
        province_id: 25,
        city: require(`../city/city25.json`),
    },
    {
        province_id: 26,
        city: require(`../city/city26.json`),
    },
    {
        province_id: 27,
        city: require(`../city/city27.json`),
    },
    {
        province_id: 28,
        city: require(`../city/city28.json`),
    },
    {
        province_id: 29,
        city: require(`../city/city29.json`),
    },
    {
        province_id: 30,
        city: require(`../city/city30.json`),
    },
    {
        province_id: 31,
        city: require(`../city/city31.json`),
    },
    {
        province_id: 32,
        city: require(`../city/city32.json`),
    },
    {
        province_id: 33,
        city: require(`../city/city33.json`),
    },
    {
        province_id: 34,
        city: require(`../city/city34.json`),
    },
]
// var cities = []

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

const AddressDetail = props => {
    // Custom function isEmpty
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const addressId = props.navigation.getParam('addressId');

    let selectedLat = props.navigation.getParam('lat')
    let selectedLon = props.navigation.getParam('lon')

    let userLogin = useSelector(state => state.auth.user);
    let addressData = [];
    let userId = userLogin.id;
    let selectedAddress = props.navigation.getParam('address');
    console.log(selectedAddress)
    let source = props.navigation.getParam('source');
    let _selectedAddress = {}
    try {
        _selectedAddress = selectedAddress.length > 0 ? selectedAddress[0] : {
            user_id: userId,
            id: 0,
            namaAlamat: "",
            namaPenerima: "",
            noHandphone: "",
            alamat: "",
            kota: "",
            lat: "",
            lon: "",
            isPrimary: "",
            provinsiId: 0,
            kotaId: 0,
        }   
    } catch (error) {
        _selectedAddress = {
            user_id: userId,
            id: 0,
            namaAlamat: "",
            namaPenerima: "",
            noHandphone: "",
            alamat: "",
            kota: "",
            lat: "",
            lon: "",
            isPrimary: "",
            provinsiId: 0,
            kotaId: 0,
        }
    }

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            user_id: userId,
            id: _selectedAddress.id,
            namaAlamat: _selectedAddress.namaAlamat,
            namaPenerima: _selectedAddress.namaPenerima,
            noHandphone: _selectedAddress.noHandphone,
            alamat: _selectedAddress.alamat,
            kota: _selectedAddress.kota,
            provinsi: _selectedAddress.provinsi,
            lat: _selectedAddress.lat,
            lon: _selectedAddress.lon,
            isPrimary: _selectedAddress.isPrimary,
            provinsiId: _selectedAddress.provinsiId,
            kotaId: _selectedAddress.kotaId,
        },
        inputValidities: {},
        formIsValid: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [selectedValue, setSelectedValue] = useState('java');
    const [selectedValue2, setSelectedValue2] = useState(0);
    const [selectedProvinsi, setSelectedProvinsi] = useState(_selectedAddress.provinsi);
    const [selectedProvinsiKey, setSelectedProvinsiKey] = useState(_selectedAddress.provinsiId);
    const [selectedKota, setSelectedKota] = useState(_selectedAddress.kota);
    const [selectedKotaKey, setSelectedKotaKey] = useState(_selectedAddress.kotaId);
    const [alamat, setAlamat] = useState('');
    // if (_selectedAddress.provinsiId > 0) {
    //     setSelectedProvinsiKey(_selectedAddress.provinsiId)
    // }

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, [error]);
    // useEffect(() => {
    //     const loadProvinsi = async () => {
    //         setIsLoading(true);
    //         await dispatch(mAuth.getProvinsi());
    //         setIsLoading(false);
    //     };
    //     loadProvinsi();

    //     // console.log('render provinsi')
    // }, []);
    let provinsiData = [
        { key: 0, section: true, label: 'Pilih Provinsi', component: <View><Text style={{color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'center'}}>Pilih Provinsi</Text></View> },
    ];
    let kotaData = [
        { key: 0, section: true, label: 'Pilih Kota / Kabupaten', component: <View><Text style={{color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'center'}}>Pilih Kota / Kabupaten</Text></View> },
    ];

    // let _provinsiData = [
    //     {
    //         "province_id": "1",
    //         "province": "Bali"
    //     },
    //     {
    //         "province_id": "2",
    //         "province": "Bangka Belitung"
    //     },
    //     {
    //         "province_id": "3",
    //         "province": "Banten"
    //     },
    //     {
    //         "province_id": "4",
    //         "province": "Bengkulu"
    //     },
    //     {
    //         "province_id": "5",
    //         "province": "DI Yogyakarta"
    //     },
    //     {
    //         "province_id": "6",
    //         "province": "DKI Jakarta"
    //     },
    //     {
    //         "province_id": "7",
    //         "province": "Gorontalo"
    //     },
    //     {
    //         "province_id": "8",
    //         "province": "Jambi"
    //     },
    //     {
    //         "province_id": "9",
    //         "province": "Jawa Barat"
    //     },
    //     {
    //         "province_id": "10",
    //         "province": "Jawa Tengah"
    //     },
    //     {
    //         "province_id": "11",
    //         "province": "Jawa Timur"
    //     },
    //     {
    //         "province_id": "12",
    //         "province": "Kalimantan Barat"
    //     },
    //     {
    //         "province_id": "13",
    //         "province": "Kalimantan Selatan"
    //     },
    //     {
    //         "province_id": "14",
    //         "province": "Kalimantan Tengah"
    //     },
    //     {
    //         "province_id": "15",
    //         "province": "Kalimantan Timur"
    //     },
    //     {
    //         "province_id": "16",
    //         "province": "Kalimantan Utara"
    //     },
    //     {
    //         "province_id": "17",
    //         "province": "Kepulauan Riau"
    //     },
    //     {
    //         "province_id": "18",
    //         "province": "Lampung"
    //     },
    //     {
    //         "province_id": "19",
    //         "province": "Maluku"
    //     },
    //     {
    //         "province_id": "20",
    //         "province": "Maluku Utara"
    //     },
    //     {
    //         "province_id": "21",
    //         "province": "Nanggroe Aceh Darussalam (NAD)"
    //     },
    //     {
    //         "province_id": "22",
    //         "province": "Nusa Tenggara Barat (NTB)"
    //     },
    //     {
    //         "province_id": "23",
    //         "province": "Nusa Tenggara Timur (NTT)"
    //     },
    //     {
    //         "province_id": "24",
    //         "province": "Papua"
    //     },
    //     {
    //         "province_id": "25",
    //         "province": "Papua Barat"
    //     },
    //     {
    //         "province_id": "26",
    //         "province": "Riau"
    //     },
    //     {
    //         "province_id": "27",
    //         "province": "Sulawesi Barat"
    //     },
    //     {
    //         "province_id": "28",
    //         "province": "Sulawesi Selatan"
    //     },
    //     {
    //         "province_id": "29",
    //         "province": "Sulawesi Tengah"
    //     },
    //     {
    //         "province_id": "30",
    //         "province": "Sulawesi Tenggara"
    //     },
    //     {
    //         "province_id": "31",
    //         "province": "Sulawesi Utara"
    //     },
    //     {
    //         "province_id": "32",
    //         "province": "Sumatera Barat"
    //     },
    //     {
    //         "province_id": "33",
    //         "province": "Sumatera Selatan"
    //     },
    //     {
    //         "province_id": "34",
    //         "province": "Sumatera Utara"
    //     }
    // ]
    let _provinsiData = [
        {
            "province_id": "3",
            "province": "Banten"
        },
        {
            "province_id": "6",
            "province": "DKI Jakarta"
        },
        {
            "province_id": "9",
            "province": "Jawa Barat"
        }
    ]
    if (_provinsiData.length > 0) {
        for (let p = 0; p < _provinsiData.length; p++) {
            const item = _provinsiData[p];
            const itemPush = {
                key: parseInt(item.province_id), 
                label: item.province,
                component: <View><Text style={{color: '#000', fontFamily: 'poppins-regular', fontSize: 14, textAlign: 'center'}}>{item.province}</Text></View>,
            }
            provinsiData.push(itemPush)
        }
    }

    let _kotaData = []
    let __kotaData = []
    for (let ci = 0; ci < cities.length; ci++) {
        const item = cities[ci];
        if (item.province_id == selectedProvinsiKey) {
            _kotaData = item.city
            break
        }
    }
    
    if (_kotaData.length > 0) {
        for (let k = 0; k < _kotaData.length; k++) {
            const item = _kotaData[k];
            const itemPush = {
                key: parseInt(item.city_id), 
                label: `${item.type} ${item.city_name}`,
                component: <View><Text style={{color: '#000', fontFamily: 'poppins-regular', fontSize: 14, textAlign: 'center'}}>{item.type} {item.city_name}</Text></View>,
            }
            __kotaData.push(itemPush)
        }
        
        __kotaData.sort(function(a, b) {
            return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
        });
        for (let _k = 0; _k < __kotaData.length; _k++) {
            const item = __kotaData[_k];
            kotaData.push(item)
        }
    }

    const updateProfileHandler = async () => {
        const _userId = userLogin.id;
        const inputValue = {
            "alamat": formState.inputValues.alamat,
            "id": formState.inputValues.id,
            "isPrimary": formState.inputValues.isPrimary,
            "kota": selectedKota,
            "kotaId": selectedKotaKey,
            "lat": selectedLat ? selectedLat : formState.inputValues.lat,
            "lon": selectedLon ? selectedLon : formState.inputValues.lon,
            "namaAlamat": formState.inputValues.namaAlamat,
            "namaPenerima": formState.inputValues.namaPenerima,
            "noHandphone": formState.inputValues.noHandphone,
            "provinsi": selectedProvinsi,
            "provinsiId": selectedProvinsiKey,
            "user_id": formState.inputValues.user_id,
        }

        if (formState.inputValues.lat && !selectedLat) {
            Alert.alert('Notifikasi', 'Mohon untuk melakukan pin poin lokasi ulang sebelum menyimpan perubahan alamat', [{ text: 'Ok' }]);
            return;
        }

        if (!selectedLat && !selectedLon) {
            Alert.alert('Notifikasi', 'Mohon untuk melakukan pin poin alamat terlebih dahulu sebelum menyimpan alamat', [{ text: 'Ok' }]);
            return;
        }

        setError(null);
        setIsLoading(true);
        try {
            await dispatch(mAuth.addUpdateAddress(inputValue));
            // await setIsLoading(false);
            if (source == 'Home') {
                Alert.alert('Notifikasi', 'Data alamat berhasil tersimpan!', [{ text: 'Ok', onPress: () => props.navigation.navigate('Home') }]);  
            } else {
                Alert.alert('Notifikasi', 'Data alamat berhasil tersimpan!', [{ text: 'Ok', onPress: () => props.navigation.navigate('ListAddress') }]);     
            }
            return;
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

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

    const changeProvince = async (provinceName, provinceId) => {
        setSelectedProvinsi(provinceName)
        setSelectedProvinsiKey(provinceId)
        setSelectedKota('')
        setSelectedKotaKey(0)
    };

    const hapusAlamat = () => {
        Alert.alert("Konfirmasi", "Apakah anda yakin ingin menghapus alamat ini?", [
            { text: "Batal", onPress: () => console.log("Cancel Pressed") },
            { text: "Ok", onPress: () => deleteProfileHandlerV2() },
        ]);
    }
    let deleteProfileHandlerV2 = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(mAuth.removeAddress(selectedAddress[0].id, selectedAddress[0].user_id));
            if (source == 'Home') {
                Alert.alert('Notifikasi', 'Data alamat berhasil terhapus', [{ text: 'Ok', onPress: () => props.navigation.navigate('Home') }]);
            } else {
                Alert.alert('Notifikasi', 'Data alamat berhasil terhapus', [{ text: 'Ok', onPress: () => props.navigation.navigate('ListAddress') }]);
            }
            return;
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    return (
        <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
            {/* <View style={styles.gradientAfterLogin}> */}
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <Text style={{ fontFamily: 'poppins-bold', paddingLeft: 30, marginTop: 25, fontSize: 16 }}>Mau dikirim kemana pesanan kamu?</Text>
                <Card style={styles.authContainerAfterLogin}>
                    <View>
                        <Input
                            id="namaAlamat"
                            label="Simpan Alamat Sebagai"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            editableForm={true}
                            placeholder="Masukkan Simpan Alamat Sebagai"
                            initialValue={_selectedAddress.namaAlamat}
                        />

                        <Input
                            id="namaPenerima"
                            label="Nama Penerima"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            editableForm={true}
                            placeholder="Masukkan Nama Penerima"
                            initialValue={_selectedAddress.namaPenerima}
                        />
                        
                        <Input
                            id="noHandphone"
                            label="No Handphone"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            editableForm={true}
                            phonenumber={true}
                            placeholder="Masukkan No Handphone"
                            initialValue={_selectedAddress.noHandphone}
                        />

                        <Input
                            id="alamat"
                            label="Detail Alamat"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            // onInputChange={text => setAlamat(text)}
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            editableForm={true}
                            placeholder="Masukkan Detail Alamat"
                            textarea={true}
                            initialValue={_selectedAddress.alamat}
                        />

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Provinsi</Text>
                            <View style={{  }}>
                                <ModalSelector
                                    data={provinsiData}
                                    initValue="Pilih Provinsi"
                                    overlayStyle={{ flex: 1, padding: '5%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,1)' }}
                                    onChange={(option)=>{ changeProvince(option.label, option.key);  }}
                                    cancelText={"Batal"} 
                                    cancelTextStyle={{ fontFamily: 'poppins-regular', color: '#000' }}
                                >
                                    <TextInput
                                        style={{borderRadius: 10, borderColor: '#6BB745', borderWidth: 1, padding: 10, fontFamily: 'poppins-regular', color: '#000'}}
                                        editable={false}
                                        placeholder="Pilih Provinsi"
                                        value={selectedProvinsi} 
                                    />
                                </ModalSelector>
                            </View>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Kota / Kabupaten</Text>
                            <View style={{  }}>
                                <ModalSelector
                                    data={kotaData}
                                    initValue="Pilih Kota / Kabupaten"
                                    overlayStyle={{ flex: 1, padding: '5%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,1)' }}
                                    onChange={(option)=>{ setSelectedKota(option.label); setSelectedKotaKey(option.key);  }}
                                    cancelText={"Batal"} 
                                    cancelTextStyle={{ fontFamily: 'poppins-regular', color: '#000' }}
                                >
                                    <TextInput
                                        style={{borderRadius: 10, borderColor: '#6BB745', borderWidth: 1, padding: 10, fontFamily: 'poppins-regular', color: '#000'}}
                                        editable={false}
                                        placeholder="Pilih Kota / Kabupaten"
                                        value={selectedKota} 
                                    />
                                </ModalSelector>
                            </View>
                        </View>

                        {Platform.OS == 'android' ?
                            <View>
                                <TouchableOpacity
                                onPress={() => props.navigation.navigate('AddressMap', {source: source, selectedAddress: selectedAddress, selectedLat: selectedLat ? selectedLat : _selectedAddress.lat, selectedLon: selectedLon ? selectedLon : _selectedAddress.lon })} 
                                >
                                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                                        <View style={{ width: '10%', height: '100%' }}>
                                            <Image source={require('../assets/creekgarden/alamatsaya/map.png')} resizeMode="contain" style={{width: 25, height: 25}} />
                                        </View>

                                        <View style={{ width: '90%', height: '100%' }}>
                                            <Text style={{ fontFamily:'poppins-semi-bold', fontSize: 15, color: '#397A18' }}>Gunakan lokasi saya saat ini</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        :
                            <></>
                        }

                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={updateProfileHandler}>
                                <View style={{ marginTop: 0, width: 200, height: 50, padding: 10, backgroundColor: '#6BB745', borderRadius: 10 }}>
                                    <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Simpan</Text>
                                </View>
                            </TouchableOpacity>

                            {_selectedAddress.id ? 
                                (<TouchableOpacity onPress={hapusAlamat}>
                                    <View style={{ marginTop: 0, width: 200, height: 50, padding: 10, borderRadius: 10 }}>
                                        <Text style={{ color: '#D43346', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Hapus Alamat</Text>
                                    </View>
                                </TouchableOpacity>)
                            : (<View></View>)
                            }
                        </View>

                        {/* <View style={styles.buttonContainer}>
                            <Button title="Save" color={core.primaryColor} onPress={updateProfileHandler} />
                        </View> */}
                    </View>
                </Card>
            {/* </View> */}
        </ScrollView>
    );
};
  
AddressDetail.navigationOptions = navigationData => {
    // const dispatch = useDispatch();
    // let selectedAddress = navigationData.navigation.getParam('address');

    return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Alamat Saya</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
        // headerRight: <TouchableOpacity onPress={hapusAlamat}><Text style={{ textAlign: 'center', fontSize: 12, color: '#D43346', marginRight: 12, fontFamily: 'poppins-semi-bold'}}>Hapus Alamat</Text></TouchableOpacity>,
    };
};
  
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 800,
        padding: 20
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 30
    },

    gradientAfterLogin: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    alreadyLoginContainer: {
        width: '100%',
        padding: 0,
    },
    authContainerAfterLogin: {
        width: '100%',
        maxWidth: 400,
        // maxHeight: 800,
        padding: 30,
        paddingTop: 0,
        marginTop: '5%',
        marginBottom: '0%'
    },
    label: {
        fontFamily: 'poppins-semi-bold',
        marginVertical: 8
    },
});
  
export default AddressDetail;