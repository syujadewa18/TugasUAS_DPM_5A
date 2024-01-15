import { StatusBar } from 'expo-status-bar';
import React, { useState, useReducer, useCallback, useEffect } from 'react';
// import * as React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
import Spinner from 'react-native-loading-spinner-overlay';

import * as mCart from '../models/action/mCart';
import * as mAuth from '../models/action/mAuth';
import * as Location from 'expo-location';

const ListAddress = props => {
    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height

    let selectedLat = props.navigation.getParam('selectedLat')
    let selectedLon = props.navigation.getParam('selectedLon')
    let selectedAddress = props.navigation.getParam('selectedAddress')
    let source = props.navigation.getParam('source')
    
    let LATITUDE_DELTA = 0.00229
    let LONGITUDE_DELTA = LATITUDE_DELTA * (windowWidth / windowHeight)
    // let LONGITUDE_DELTA = 0.00229

    // const [errorMsg, setErrorMsg] = useState(null);
    const [mapRegion, setmapRegion] = useState({
        latitude: selectedLat ? parseFloat(selectedLat) : -6.206847,
        longitude: selectedLon ? parseFloat(selectedLon) : 106.73611,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

    // Set variable or state here
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const renderLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            // setErrorMsg('Permission to access location was denied');
            return;
        }

        await setSearchResult('')

        let location = await Location.getCurrentPositionAsync({});
        await setmapRegion(
            {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        )
        await getLocationNameBySearch(location.coords.latitude, location.coords.longitude)
    };
    const renderLocationByNav = async (lat, lon) => {
        const _windowWidth = Dimensions.get('window').width
        const _windowHeight = Dimensions.get('window').height
        const _LATITUDE_DELTA = 0.00229
        const _LONGITUDE_DELTA = _LATITUDE_DELTA * (_windowWidth / _windowHeight)
        await setmapRegion(
            {
                latitude: lat,
                longitude: lon,
                latitudeDelta: _LATITUDE_DELTA,
                longitudeDelta: _LONGITUDE_DELTA,
            }
        )
        await getLocationNameBySearch(lat, lon)
    };
    const renderLocationByDrag = async mapData => {
        await setmapRegion(
            {
                latitude: mapData.latitude,
                longitude: mapData.longitude,
                latitudeDelta: mapData.latitudeDelta,
                longitudeDelta: mapData.longitudeDelta,
            }
        )
        await getLocationNameBySearch(mapData.latitude, mapData.longitude)
    };
    // const renderLocationByDragRealTime = async mapData => {
    //     await setmapRegion(
    //         {
    //             latitude: mapData.latitude,
    //             longitude: mapData.longitude,
    //             latitudeDelta: LATITUDE_DELTA,
    //             longitudeDelta: LONGITUDE_DELTA,
    //         }
    //     )
    //     // await getLocationNameBySearch(mapData.latitude, mapData.longitude)
    //     // await setLocationText('Loading...')
    //     // await setLocationName('...')
    // };

    // console.log(selectedAddress)

    const [locationList, setLocationList] = useState([])
    const [searchResult, setSearchResult] = useState('')
    const [locationText, setLocationText] = useState('')
    const [locationName, setLocationName] = useState('')
    const searchLocation = async () => {
        if (searchResult) {
            let result = []
            const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+searchResult+'.json?limit=5&proximity=106.79507899999999,-6.241057999999995&language=en-US&access_token=pk.eyJ1IjoieXVkaGFlejAyMSIsImEiOiJja3Vqam8wNmoyeXJtMm9ubmdpYnJsNTZvIn0.Pos7JiXp9hYcAb7hHYieug&country=ID', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const resData = await response.json();
    
            if (resData.features.length > 0) {
                for (let i = 0; i < resData.features.length; i++) {
                    const item = resData.features[i];
                    const mappedItem = {
                        lat: item.center[1],
                        lon: item.center[0],
                        text: item.text,
                        placeName: item.place_name
                    }
                    result.push(mappedItem)
                }
            }
    
            setLocationList(result)
        } else {
            setLocationList([])
        }
        // return result
    }
    const getLocationNameBySearch = async (lat, lon) => {
        if (lat && lon) {
            const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+lon+','+lat+'.json?limit=1&proximity=106.79507899999999,-6.241057999999995&language=en-US&access_token=pk.eyJ1IjoieXVkaGFlejAyMSIsImEiOiJja3Vqam8wNmoyeXJtMm9ubmdpYnJsNTZvIn0.Pos7JiXp9hYcAb7hHYieug', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const resData = await response.json();
    
            if (resData.features.length > 0) {
                for (let i = 0; i < resData.features.length; i++) {
                    const item = resData.features[i];
                    setLocationText(item.text)
                    setLocationName(item.place_name)
                }
            }
        }
        // return result
    }
    
    const searchHandler = async text => {
        await setSearchResult(text);
        if (text) {
            searchLocation()
        } else {
            setLocationList([]) 
        }
    }
    const setLocationBySearch = async (lat, lon, text) => {
        await setmapRegion(
            {
                latitude: lat,
                longitude: lon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        )
        await setSearchResult('')
        await setLocationList([]) 
        await getLocationNameBySearch(lat, lon)
    };
    const finishSearchHandler = async () => {
        // await setSearchResult('')
        // await setLocationList([])
    }
    
	return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={mapRegion}
                // onRegionChange={renderLocationByDrag}
                onRegionChangeComplete={renderLocationByDrag}
                provider={PROVIDER_GOOGLE}
            />
            <View 
                style={{
                    left: '50%',
                    marginLeft: -24,
                    marginTop: -100,
                    position: 'absolute',
                    top: '50%'
                }}
            >
                <Image style={{height: 48, width: 48}} source={require('../assets/creekgarden/alamatsaya/pinpoin.png')} />
            </View>
            <View style={{ position: 'absolute', top: 10, width: '100%', zIndex: 999999 }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{ width: '88%' }}>
                        <TextInput
                            style={{
                                borderRadius: 10,
                                margin: 10,
                                color: '#000',
                                // borderColor: '#666',
                                backgroundColor: '#FFF',
                                // borderWidth: 1,
                                height: 45,
                                paddingHorizontal: 10,
                                fontSize: 14,
                                fontFamily: 'poppins-regular'
                            }}
                            placeholder={'Pilih alamat kamu....'}
                            placeholderTextColor={'#666'}
                            onSubmitEditing={finishSearchHandler}
                            onChangeText={searchHandler}
                            value={searchResult}
                        />
                        {locationList.length > 0 ?
                        (
                            <View
                                style={{
                                    borderRadius: 10,
                                    margin: 10,
                                    marginTop: -5,
                                    color: '#000',
                                    backgroundColor: '#FFF',
                                    // borderWidth: 1,
                                    // borderBottomWidth: 1,
                                    // borderColor: '#666',
                                    paddingHorizontal: 10,
                                    fontSize: 18,
                                    paddingVertical: 10
                                }}
                            >
                                {locationList.map(r =>
                                    <TouchableOpacity onPress={() => setLocationBySearch(r.lat, r.lon, r.text)}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{ width: '5%' }}>
                                                <Image source={require('../assets/creekgarden/alamatsaya/pinpoin.png')} resizeMode="contain" style={{ width: 20, height: '100%' }} />
                                            </View>
                                            
                                            <View style={{ width: '95%' }}>
                                                <View style={{ marginVertical: 0, padding: 10 }}>
                                                    <Text numberOfLines={1} style={{ fontFamily:'poppins-regular' }}>{r.text}</Text>
                                                    <Text numberOfLines={1} style={{ fontFamily:'poppins-regular', color: '#999', fontSize: 12  }}>{r.placeName}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )
                        :
                        (<View></View>)
                        }
                    </View>
                    
                    <View style={{ width: '12%' }}>
                        <TouchableOpacity onPress={renderLocation}>
                            <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                                <View style={{ width: 40, height: 40, padding: 0, borderRadius: 10, backgroundColor: '#FFF', alignSelf: 'flex-end' }}>
                                    <Image style={{ width: 25, height: 40, alignSelf: 'center' }} source={require('../assets/creekgarden/alamatsaya/map.png')} resizeMode="contain" />
                                </View>
                            </View>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>

            <View 
                style={{
                    flex: 1,
                    flexDirection:'row',
                    position:'absolute',
                    bottom:0,
                    alignSelf: "center",
                    justifyContent: "space-between",
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    padding: 20
                }}
            >
                <View style={{flex: 1}}>
                    <Text style={{ color: '#000', fontFamily: 'poppins-semi-bold', fontSize: 18 }}>Mau Dikirim Kemana?</Text>
                    <Text numberOfLines={1} style={{ color: '#000', fontFamily: 'poppins-regular', fontSize: 16 }}>{locationText}</Text>
                    <Text numberOfLines={2} style={{ color: '#999', fontFamily: 'poppins-regular', fontSize: 14 }}>{locationName}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AddressAdd', {source: source, address: selectedAddress, lat: mapRegion.latitude, lon: mapRegion.longitude})}>
                        <View style={{ alignSelf: 'center', marginTop: 15, marginBottom: 0, width: '100%', height: 50, padding: 10, backgroundColor: '#6BB745', borderRadius: 10, borderColor: '#6BB745', borderWidth: 1 }}>
                            <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 5, textAlign: 'center' }}>Konfirmasi</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
  
ListAddress.navigationOptions = navigationData => {
    return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Alamat Saya</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
        // headerRight: <TouchableOpacity onPress={() => navigationData.navigation.navigate('AddressAdd')}><Text style={{ textAlign: 'center', fontSize: 12, color: '#6BB745', marginRight: 12, fontFamily: 'poppins-semi-bold'}}>Tambah Alamat</Text></TouchableOpacity>,
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
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        // height: 400,
        height: Dimensions.get('window').height,
    },
});
  
export default ListAddress;