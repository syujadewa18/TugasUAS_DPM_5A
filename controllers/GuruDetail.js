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
import KeteranganHeader from '../views/btn/keteranganHeader';
import KeteranganFooter from '../views/btn/keteranganFooter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';

const GuruDetail = props => {
    const dispatch = useDispatch();
    
    let logoSekolah = null;
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);
    if (tmpSekolahData != null) {
        logoSekolah = tmpSekolahData.logo;
    }

    function _getParam(param) {
        return props.navigation.getParam(param);
    }

    // #region cheatsheet params
    // idSekolah: pegawaiData[index]['id_sekolah'] ? pegawaiData[index]['id_sekolah'] : '-', 
    // namaSekolah: pegawaiData[index]['nama_sekolah'] ? pegawaiData[index]['nama_sekolah'] : '-',
    // idUser: pegawaiData[index]['id_user'] ? pegawaiData[index]['id_user'] : '-',
    // kelas: pegawaiData[index]['kelas'] ? pegawaiData[index]['kelas'] : '-',
    // idKelas: pegawaiData[index]['id_kelas'] ? pegawaiData[index]['id_kelas'] : '-',
    // namaMapel: pegawaiData[index]['nama_mapel'] ? pegawaiData[index]['nama_mapel'] : '-',
    // idMapel: pegawaiData[index]['id_mapel'] ? pegawaiData[index]['id_mapel'] : '-',
    // nip: pegawaiData[index]['nip'] ? pegawaiData[index]['nip'] : '-',
    // namaPengajar: pegawaiData[index]['nama_pengajar'] ? pegawaiData[index]['nama_pengajar'] : '-',
    // kategoriPengajar: pegawaiData[index]['kategori_pengajar'] ? pegawaiData[index]['kategori_pengajar'] : '-',
    // keterangan: pegawaiData[index]['keterangan'] ? pegawaiData[index]['keterangan'] : '-',
    // status: pegawaiData[index]['status'] == 1 ? 'Aktif' : 'Tidak Aktif',
    // #endregion

	// return (
	// 	<View style={styles.container}>
    //         <ScrollView style={{ maxHeight: 700 }}>
    //             <View style={{ flexDirection: "row", flex: 1 }}>
    //                 <View style={{ width: '50%' }}>
    //                     <View style={{ padding: 10 }}>
    //                         <View style={{ backgroundColor: "#bbb", height: 100 }}></View>
    //                         <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{_getParam('namaPengajar')}</Text>

    //                         <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
    //                             <View style={{ flex: 1, height: 2, marginHorizontal: 0, maxWidth: '50%', backgroundColor: 'black' }} />
    //                         </View>

    //                         <Text style={{ marginTop: 0, fontStyle: 'italic', marginBottom: 20 }}>{_getParam('namaMapel')}</Text>
    //                         <Text style={styles.content}>NIP: {_getParam('nip')}</Text>
    //                         <Text style={styles.content}>Kategori Pengajar: {_getParam('kategoriPengajar')}</Text>
    //                         {/* <Text style={styles.content}>Email: {email}</Text>
    //                         <Text style={styles.content}>Telp: {handphone}</Text> */}

    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginTop: '10%', marginBottom: '0%' }}>Informasi Detail</Text>
    //                         {/* <Text style={styles.content}>Alamat: {alamat}</Text> */}
    //                         <Text style={{ fontSize: 11, marginTop: 10 }}>Mata Pelajaran: {_getParam('namaMapel')}</Text>
    //                         <Text style={styles.content}>Kelas: {_getParam('kelas')}</Text>
    //                         <Text style={styles.content}>Keterangan: {_getParam('keterangan')}</Text>
    //                     </View>
    //                 </View>
                    
    //                 <View style={{ width: '50%' }}>
    //                     {logoSekolah ?
    //                         <Image 
    //                             source={{uri: logoSekolah}}
    //                             style={{ width: '100%', height: 200, marginTop: '15%' }}
    //                         />
    //                     :
    //                         <Image 
    //                             source={require('../assets/noLogoGray.png')}
    //                             style={{ width: '100%', height: 200, marginTop: '15%' }}
    //                         />
    //                     }

    //                     <View style={{ padding: 10, marginTop: '15%' }}>
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>Pengajar</Text>
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>{_getParam('status')}</Text>

    //                         {_getParam('foto') == '-' ||  !_getParam('foto')
    //                         ?
    //                             <Image 
    //                                 source={require('../assets/noFotoProfile.png')}
    //                                 style={{ width: 140, height: 140, marginTop: '15%', marginBottom: '15%', alignSelf: 'center' }}
    //                             />
    //                         :
    //                             <Image 
    //                                 source={{ uri: foto }}
    //                                 style={{ width: 140, height: 140, marginTop: '15%', marginBottom: '15%', alignSelf: 'center' }}
    //                             />
    //                         }
    //                     </View>
    //                 </View>
    //             </View>
    //         </ScrollView>

    //         <KeteranganFooter text1="Apabila terdapat ketidaksesuaian data," text2="mohon untuk menghubungi operator" />
    //     </View>
    // );
    
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
                    source={_getParam('foto') == '-' ||  !_getParam('foto') ?  require('../assets/noFotoProfile.png') :  {uri: _getParam('foto') }} 
                />

                <Card style={styles.authContainerAfterLogin}>
                    <View>
                        <Input
                            id=""
                            label="Nama Lengkap"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={_getParam('namaPengajar')}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="NIP"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={_getParam('nip')}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Mata Pelajaran"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={_getParam('namaMapel')}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Kelas"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={_getParam('kelas')}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Keterangan"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={_getParam('keterangan')}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Status"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={_getParam('status')}
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
}

GuruDetail.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Guru',
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

export default GuruDetail;