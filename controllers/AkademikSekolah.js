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
import DefaultView from '../views/btn/defaultView';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import KeteranganHeader from '../views/btn/keteranganHeader';
import KeteranganFooter from '../views/btn/keteranganFooter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';

import * as mAkademik from '../models/action/mAkademik';
// import * as mAuth from '../models/action/mAuth';

const AkademikSekolah = props => {
    // function isEmpty(obj) {
    //     for (var key in obj) {
    //         if (obj.hasOwnProperty(key))
    //             return false;
    //     }
        
    //     return true;
    // }

    const dispatch = useDispatch();
    
    let sekolahData = null;
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);
    
    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    useEffect(() => {
        dispatch(mAkademik.fetchSekolah(idSekolah));
    }, [dispatch]);

    if (tmpSekolahData != null) {
        sekolahData = tmpSekolahData
    }

    if (sekolahData == null) {
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
                            source={sekolahData.logo ? {uri: sekolahData.logo } : require('../assets/noLogoGray3.png')} 
                        />
                    </Card> */}

                    <Image 
                        style={{ height: 150, width: 150, borderRadius: 100, marginTop: '5%', marginBottom: '0%' }}
                        source={sekolahData.logo ? {uri: sekolahData.logo } : require('../assets/noLogoGray3.png')} 
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
                                initialValue={sekolahData.nama_sekolah}
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
                                initialValue={sekolahData.alamat}
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
                                initialValue={sekolahData.kelurahan}
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
                                initialValue={sekolahData.kecamatan}
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
                                initialValue={sekolahData.kota}
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
                                initialValue={sekolahData.kodepos}
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
                                initialValue={sekolahData.no_statistik_sekolah}
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
                                initialValue={sekolahData.status_kepemilikan}
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
                                initialValue={sekolahData.luas_lahan}
                                editableForm={false}
                            />
                            <Input
                                id=""
                                label="Nama Kepala Sekolah"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={sekolahData.nama_kepala_sekolah}
                                editableForm={false}
                            />
                            {/* <Input
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
                            /> */}
                            <Input
                                id=""
                                label="Masa Kerja"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorMessage=""
                                onInputChange=""
                                initialValue={sekolahData.masa_kerja}
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
        //                         <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{sekolahData.nama_sekolah}</Text>
    
        //                         <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
        //                             <View style={{ flex: 1, height: 2, marginHorizontal: 0, maxWidth: '50%', backgroundColor: 'black' }} />
        //                         </View>
    
        //                         <Text style={{ marginTop: 10, fontStyle: 'italic', marginBottom: 20 }}>
        //                             {sekolahData.alamat ? sekolahData.alamat+', ': ''}
        //                             {sekolahData.kelurahan ? sekolahData.kelurahan+', ' : ''}
        //                             {sekolahData.kecamatan ? sekolahData.kecamatan+', ' : ''}
        //                             {sekolahData.kota ? sekolahData.kota+', ' : ''}
        //                             {sekolahData.kodepos ? sekolahData.kodepos : ''}
        //                         </Text>
        //                         {sekolahData.telepon ?
        //                             <Text style={styles.content}>Telp: {sekolahData.telepon}</Text>
        //                             : <View></View>
        //                         }
        //                         {sekolahData.website ?
        //                             <Text style={styles.content}>Website: {sekolahData.website}</Text>
        //                             : <View></View>
        //                         }
        //                         {sekolahData.email ?
        //                             <Text style={styles.content}>Email: {sekolahData.email}</Text>
        //                             : <View></View>
        //                         }
    
        //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginTop: '10%', marginBottom: '10%' }}>Informasi Detail Sekolah</Text>
        //                         {sekolahData.no_statistik_sekolah ?
        //                             <Text style={styles.content}>No Statistik: {sekolahData.no_statistik_sekolah}</Text>
        //                             : <View></View>
        //                         }
        //                         {sekolahData.status_kepemilikan ?
        //                             <Text style={styles.content}>Status: {sekolahData.status_kepemilikan}</Text>
        //                             : <View></View>
        //                         }
        //                         {sekolahData.luas_lahan ?
        //                             <Text style={styles.content}>Luas Tanah: {sekolahData.luas_lahan}m2</Text>
        //                             : <View></View>
        //                         }
        //                     </View>
        //                 </View>
                        
        //                 <View style={{ width: '50%' }}>
        //                     {/* <Image 
        //                         source={require('../assets/akademik/sekolah.png')}
        //                         style={{ width: '100%', height: 200, marginTop: '15%' }}
        //                     /> */}
        //                     {!sekolahData.logo
        //                     ?
        //                         <Image 
        //                             source={require('../assets/noLogoGray.png')}
        //                             style={{ width: '100%', height: 190, marginTop: '25%', marginBottom: 20 }}
        //                         />
        //                     :
        //                         <Image 
        //                             source={{uri: sekolahData.logo}}
        //                             style={{ width: '100%', height: 190, marginTop: '25%', marginBottom: 20 }}
        //                         />
        //                     }

        //                     <View style={{ padding: 10 }}>
        //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>{sekolahData.status == 1 ? 'Aktif' : 'Tidak Aktif'}</Text>
        //                         {sekolahData.akreditasi ? 
        //                             <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>Terakreditasi {sekolahData.akreditasi}</Text> 
        //                             : <View></View>
        //                         }
        //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '15%' }}>Informasi Kepala Sekolah</Text>
        //                         {sekolahData.nama_kepala_sekolah ?
        //                             <Text style={styles.content}>Nama: {sekolahData.nama_kepala_sekolah}</Text>
        //                             : <View></View>
        //                         }
        //                         {sekolahData.nip_kepala_sekolah ?
        //                             <Text style={styles.content}>NIP: {sekolahData.nip_kepala_sekolah}</Text>
        //                             : <View></View>
        //                         }
        //                         {sekolahData.masa_kerja ?
        //                             <Text style={styles.content}>Masa Kerja: {sekolahData.masa_kerja}</Text>
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

AkademikSekolah.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Sekolah',
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

export default AkademikSekolah;