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
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Textarea from 'react-native-textarea';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';
import * as mAkademik from '../models/action/mAkademik';

const PersetaDidikDetail = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const dispatch = useDispatch();
    // const productsData = useSelector(state => state.products.availableProducts);
    // useEffect(() => {
    //     dispatch(mProducts.fetchProducts());
    // }, [dispatch]);
    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    useEffect(() => {
        dispatch(mAkademik.fetchSekolah(idSekolah));
    }, [dispatch]);

    const id = props.navigation.getParam('id');
    const namaLengkap = props.navigation.getParam('namaLengkap');
    const nis = props.navigation.getParam('nis');
    const kelas = props.navigation.getParam('kelas');
    const alamat = props.navigation.getParam('alamat');
    const nisn = props.navigation.getParam('nisn');
    const tempatLahir = props.navigation.getParam('tempatLahir');
    const tanggalLahir = props.navigation.getParam('tanggalLahir');
    const telp = props.navigation.getParam('telp');
    const kategoriUser = props.navigation.getParam('kategoriUser');
    const status = props.navigation.getParam('status');
    const namaOrangTua = props.navigation.getParam('namaOrangTua');
    const pekerjaanOrangTua = props.navigation.getParam('pekerjaanOrangTua');
    const nikOrangTua = props.navigation.getParam('nikOrangTua');
    const telpOrangTua = props.navigation.getParam('telpOrangTua');
    const foto = props.navigation.getParam('foto');

	// return (
	// 	<View style={styles.container}>
    //         <ScrollView style={{ maxHeight: 700 }}>
    //             <View style={{ flexDirection: "row", flex: 1 }}>
    //                 <View style={{ width: '50%' }}>
    //                     <View style={{ padding: 10 }}>
    //                         <View style={{ backgroundColor: "#bbb", height: 100 }}></View>
    //                         <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{namaLengkap}</Text>

    //                         <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
    //                             <View style={{ flex: 1, height: 2, marginHorizontal: 0, maxWidth: '50%', backgroundColor: 'black' }} />
    //                         </View>

    //                         <Text style={{ marginTop: 0, fontStyle: 'italic', marginBottom: 0 }}>NIS: {nis}</Text>
    //                         <Text style={{ marginTop: 0, fontStyle: 'italic', marginBottom: 20 }}>KELAS: {kelas}</Text>

    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginTop: '10%', marginBottom: '10%' }}>Informasi Detail</Text>
    //                         <Text style={styles.content}>Alamat: {alamat}</Text>
    //                         <Text style={{ fontSize: 11, marginTop: 30 }}>NISN: {nisn}</Text>
    //                         <Text style={styles.content}>Tempat Lahir: {tempatLahir}</Text>
    //                         <Text style={styles.content}>Tanggal Lahir: {tanggalLahir}</Text>
    //                         <Text style={styles.content}>Telp: {telp}</Text>
    //                     </View>
    //                 </View>
                    
    //                 <View style={{ width: '50%' }}>
    //                     <View style={{ padding: 10, marginTop: '15%' }}>
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>{kategoriUser} User</Text>
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>{status}</Text>
    //                         {/* <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '15%' }}>Informasi Kepala Sekolah</Text>
    //                         <Text style={styles.content}>Nama: Faqih S,pd.</Text>
    //                         <Text style={styles.content}>NIP: 0000 1111 2222 3333</Text>
    //                         <Text style={styles.content}>Masa Kerja: 3 tahun</Text> */}

    //                         {foto == '-' 
    //                         ?
    //                             <Image 
    //                                 source={require('../assets/siswa/sample.png')}
    //                                 style={{ width: 140, height: 140, marginTop: '15%', marginBottom: '15%', alignSelf: 'center' }}
    //                             />
    //                         :
    //                             <Image 
    //                                 source={{ uri: foto }}
    //                                 style={{ width: 140, height: 140, marginTop: '15%', marginBottom: '15%', alignSelf: 'center' }}
    //                             />
    //                         }
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>Orang Tua / Wali Murid</Text>
    //                         <Text style={styles.content}>Nama: {namaOrangTua}</Text>
    //                         <Text style={styles.content}>Pekerjaan: {pekerjaanOrangTua}</Text>
    //                         <Text style={styles.content}>NIK: {nikOrangTua}</Text>
    //                         <Text style={styles.content}>Telp: {telpOrangTua}</Text>
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
                    source={foto != '-'  ? { uri: foto } : require('../assets/noFotoProfile.png')} 
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
                            initialValue={namaLengkap}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="NIS"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={nis}
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
                            initialValue={kelas}
                            editableForm={false}
                        />
                        {/* <Input
                            id=""
                            label="Alamat"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={alamat}
                            editableForm={false}
                        /> */}
                        <Text style={{ fontFamily: 'open-sans-bold', marginVertical: 8 }}>Alamat</Text>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText=""
                            editable={false}
                            initialValue={alamat}
                            defaultValue={alamat}
                            maxLength=""
                            placeholder={""}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                        <Input
                            id=""
                            label="NISN"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={nisn}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Tempat Lahir"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={tempatLahir}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Tanggal Lahir"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={tanggalLahir}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Telp"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={telp}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Kategori User"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={kategoriUser}
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
                            initialValue={status}
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

PersetaDidikDetail.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Data Peserta Didik',
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
    textareaContainer: {
        height: 180,
        padding: 10,
        // backgroundColor: '#F5FCFF',
        borderWidth: 1,
        borderColor: "#008BCA",
        marginTop: 10
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
});


export default PersetaDidikDetail;