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
    AsyncStorage
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import DefaultView from '../views/btn/defaultView';
import KeteranganHeader from '../views/btn/keteranganHeader';
import KeteranganFooter from '../views/btn/keteranganFooter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';

import * as mAkademik from '../models/action/mAkademik';
// import * as mAuth from '../models/action/mAuth';

const AkademikYayasan = props => {
    // function isEmpty(obj) {
    //     for (var key in obj) {
    //         if (obj.hasOwnProperty(key))
    //             return false;
    //     }
        
    //     return true;
    // }

    const dispatch = useDispatch();
    
    let yayasanData = null;
    const tmpYayasanData = useSelector(state => state.akademik.yayasanData);

    let userLogin = useSelector(state => state.auth.user);
    const idYayasan = userLogin.id_yayasan == undefined ? '3983364cb39246f391a6ae79320ecb3d' : userLogin.id_yayasan;
    useEffect(() => {
        dispatch(mAkademik.fetchYayasan(idYayasan));
    }, [dispatch]);

    if (tmpYayasanData.detail_yayasan != undefined) {
        yayasanData = tmpYayasanData
    }

    if (yayasanData == null) {
        return (
            <DefaultView />
        );

    } else {
        return (
            <ScrollView>
                <View style={styles.gradientAfterLogin}>
                    {/* <Spinner
                        visible={isLoading}
                        textStyle={{ color: '#FFFFFF' }}
                    /> */}

                    {/* <Card style={styles.alreadyLoginContainer}>
                        <LinearGradient colors={[core.primaryColor, '#00d2ff']} style={{ padding: 10, height: 150, zIndex: 0 }}></LinearGradient>
                        <Image 
                            style={{ height: 150, width: '100%', resizeMode: 'contain', borderRadius: 100, marginTop: '15%', position: 'absolute', zIndex: 1 }}  
                            source={yayasanData.detail_yayasan.logo ? {uri: yayasanData.detail_yayasan.logo } : require('../assets/noLogoGray3.png')} 
                        />
                    </Card> */}
                    <Image 
                        style={{ height: 150, width: 150, borderRadius: 100, marginTop: '5%', marginBottom: '0%' }}  
                        source={yayasanData.detail_yayasan.logo ? {uri: yayasanData.detail_yayasan.logo } : require('../assets/noLogoGray3.png')} 
                    />

                    <Card style={styles.authContainerAfterLogin}>
                        <View>
                            <Input
                                id=""
                                label="Nama"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.nama_yayasan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Alamat"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.alamat}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Kelurahan"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.kelurahan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Kecamatan"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.kecamatan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Kota"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.kota}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Kode Pos"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.kodepos}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="No. Statistik"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.no_statistik_yayasan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Status Milik"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.status_kepemilikan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Luas Tanah (Meter Persegi)"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.luas_lahan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Nama Pemilik Yayasan"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.nama_kepala_yayasan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Tingkat Pendidikan"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.tingkat_pendidikan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Masa Kerja"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={yayasanData.detail_yayasan.masa_kerja}
                                editableForm={false}
                            />

                            {/* <TouchableOpacity onPress={logoutHandler} style={{ marginTop: '20%' }}>
                                <Text style={{ textAlign: 'center', color: '#888' }}>Logout</Text>
                            </TouchableOpacity>

                            <Text style={{ textAlign: 'center', color: '#888', marginTop: '5%', fontSize: 10 }}>v1.0.0</Text> */}
                        </View>
                    </Card>
                </View>
            </ScrollView>
        );

        // return (
        //     <View style={styles.container}>
        //         <ScrollView style={{ maxHeight: 700 }}>
        //             <View style={{ flexDirection: "row", flex: 1 }}>
        //                 <View style={{ width: '50%' }}>
        //                     <View style={{ padding: 10 }}>
        //                         <View style={{ backgroundColor: "#bbb", height: 100 }}></View>
        //                         <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{yayasanData.detail_yayasan.nama_yayasan}</Text>
    
        //                         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '5%', marginTop: '5%' }}>
        //                             <View style={{ flex: 1, height: 2, marginHorizontal: 0, backgroundColor: 'black' }} />
        //                         </View>
    
        //                         <Text style={{ marginTop: 10, fontStyle: 'italic', marginBottom: 20 }}>
        //                             {yayasanData.detail_yayasan.alamat ? yayasanData.detail_yayasan.alamat+', ': ''}
        //                             {yayasanData.detail_yayasan.kelurahan ? yayasanData.detail_yayasan.kelurahan+', ' : ''}
        //                             {yayasanData.detail_yayasan.kecamatan ? yayasanData.detail_yayasan.kecamatan+', ' : ''}
        //                             {yayasanData.detail_yayasan.kota ? yayasanData.detail_yayasan.kota+', ' : ''}
        //                             {yayasanData.detail_yayasan.kodepos ? yayasanData.detail_yayasan.kodepos : ''}
        //                         </Text>
    
        //                         {yayasanData.detail_yayasan.telepon ?
        //                             <Text style={styles.content}>Telp: {yayasanData.detail_yayasan.telepon}</Text>
        //                             : <View></View>
        //                         }
        //                         {yayasanData.detail_yayasan.website ?
        //                             <Text style={styles.content}>Website: {yayasanData.detail_yayasan.website}</Text>
        //                             : <View></View>
        //                         }
        //                         {yayasanData.detail_yayasan.email ?
        //                             <Text style={styles.content}>Email: {yayasanData.detail_yayasan.email}</Text>
        //                             : <View></View>
        //                         }
    
        //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginTop: '10%', marginBottom: '10%' }}>Informasi Detail Yayasan</Text>
                                
        //                         {yayasanData.detail_yayasan.no_statistik_yayasan ?
        //                             <Text style={styles.content}>No Statistik: {yayasanData.detail_yayasan.no_statistik_yayasan}</Text>
        //                             : <View></View>
        //                         }
        //                         {yayasanData.detail_yayasan.status_kepemilikan ?
        //                             <Text style={styles.content}>Status: {yayasanData.detail_yayasan.status_kepemilikan}</Text>
        //                             : <View></View>
        //                         }
        //                         {yayasanData.detail_yayasan.luas_lahan ?
        //                             <Text style={styles.content}>Luas Tanah: {yayasanData.detail_yayasan.luas_lahan}m2</Text>
        //                             : <View></View>
        //                         }
    
        //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginTop: '10%', marginBottom: '10%' }}>Informasi Unit Sekolah</Text>
                                
        //                         {yayasanData.detail_yayasan.luas_lahan ?
        //                             <Text style={styles.content}>Luas Tanah: {yayasanData.detail_yayasan.luas_lahan}m2</Text>
        //                             : <View></View>
        //                         }
    
        //                         {yayasanData.daftar_sekolah.length > 0 ?
        //                             yayasanData.daftar_sekolah.map(
        //                                 r => <Text style={styles.content}>{r.jenjang_pendidikan}: {r.nama_sekolah}</Text>
        //                             ) : <View></View>
        //                         }
        //                     </View>
        //                 </View>
                        
        //                 <View style={{ width: '50%' }}>
        //                     <View style={{ padding: 10 }}>
        //                         {!yayasanData.detail_yayasan.logo 
        //                         ?
        //                             <Image 
        //                                 source={require('../assets/noLogoGray.png')}
        //                                 style={{ width: '100%', height: 170, marginTop: '25%' }}
        //                             />
        //                         :
        //                             <Image 
        //                                 source={{uri: yayasanData.detail_yayasan.logo}}
        //                                 style={{ width: '100%', height: 170, marginTop: '25%' }}
        //                             />
        //                         }
        //                     </View>
        //                     <View style={{ padding: 10 }}>
        //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '15%' }}>Informasi Kepala Yayasan</Text>
        //                         {yayasanData.detail_yayasan.nama_kepala_yayasan ?
        //                             <Text style={styles.content}>Nama: {yayasanData.detail_yayasan.nama_kepala_yayasan}</Text>
        //                             : <View></View>
        //                         }
        //                         {yayasanData.detail_yayasan.no_id_yayasan ?
        //                             <Text style={styles.content}>No ID: {yayasanData.detail_yayasan.no_id_yayasan}</Text>
        //                             : <View></View>
        //                         }
        //                         {yayasanData.detail_yayasan.tingkat_pendidikan ?
        //                             <Text style={styles.content}>Tingkat Pendidikan: {yayasanData.detail_yayasan.tingkat_pendidikan}</Text>
        //                             : <View></View>
        //                         }
        //                         {yayasanData.detail_yayasan.masa_kerja ?
        //                             <Text style={styles.content}>Masa Kerja: {yayasanData.detail_yayasan.masa_kerja}</Text>
        //                             : <View></View>
        //                         }
        //                     </View>
        //                 </View>
        //             </View>
        //         </ScrollView>
    
        //         <KeteranganFooter text1="Apabila terdapat ketidaksesuaian data," text2="mohon untuk menghubungi operator" />
        //     </View>
        // );  
    }
}

AkademikYayasan.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Yayasan',
        headerTintColor: core.primaryColor
	};
};

// const styles = StyleSheet.create({
//     container: { 
//         flex: 1, 
//         padding: 16, 
//         // paddingTop: 30, 
//         marginTop: '-10%',
//         backgroundColor: '#fff' 
//     },
//     head: { 
//         height: 40, 
//         backgroundColor: '#f1f8ff' 
//     },
//     text: { 
//         margin: 6,
//         fontSize: 10
//     },
//     content: {
//         fontSize: 11
//     }
// });
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        // maxHeight: 600,
        padding: 20
    },
    buttonContainer: {
        marginTop: 30
    },

    gradientAfterLogin: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20
    },
    alreadyLoginContainer: {
        width: '100%',
        padding: 0,
    },
    authContainerAfterLogin: {
        width: '80%',
        maxWidth: 400,
        // maxHeight: 600,
        padding: 20,
        marginTop: '0%'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    formControl: {
        width: '100%'
    },
    label: {
        // fontFamily: 'open-sans-bold',
        marginVertical: 8,
        color: 'white'
    },
    input: {
        // paddingHorizontal: 2,
        // paddingVertical: 5,
        borderColor: 'transparent',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        opacity: .8,
        borderRadius: 10,
        padding: 10
    },
});


export default AkademikYayasan;