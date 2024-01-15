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
import Textarea from 'react-native-textarea';

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';

const PengawasDetail = props => {
    const dispatch = useDispatch();
    
    let logoSekolah = null;
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);
    if (tmpSekolahData != null) {
        logoSekolah = tmpSekolahData.logo;
    }

    // const id = props.navigation.getParam('id');
    const namaLengkap = props.navigation.getParam('namaLengkap');
    const email = props.navigation.getParam('email');
    const handphone = props.navigation.getParam('handphone');
    const noIdentitas = props.navigation.getParam('noIdentitas');
    const gelarAwal = props.navigation.getParam('gelarAwal');
    const gelarAkhir = props.navigation.getParam('gelarAkhir');
    const tempatLahir = props.navigation.getParam('tempatLahir');
    const tanggalLahir = props.navigation.getParam('tanggalLahir');
    const agama = props.navigation.getParam('agama');
    const foto = props.navigation.getParam('foto');
    const status = props.navigation.getParam('status');
    const nik = props.navigation.getParam('nik');
    const nip = props.navigation.getParam('nip');
    const alamat = props.navigation.getParam('alamat');
    const idPegawai = props.navigation.getParam('idPegawai');

	// return (
	// 	<View style={styles.container}>
    //         <ScrollView style={{ maxHeight: 700 }}>
    //             <View style={{ flexDirection: "row", flex: 1 }}>
    //                 <View style={{ width: '50%' }}>
    //                     <View style={{ padding: 10 }}>
    //                         <View style={{ backgroundColor: "#bbb", height: 100 }}></View>
    //                         <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{namaLengkap} {gelarAkhir != '-' ? gelarAkhir : ''}</Text>

    //                         <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
    //                             <View style={{ flex: 1, height: 2, marginHorizontal: 0, maxWidth: '50%', backgroundColor: 'black' }} />
    //                         </View>

    //                         <Text style={{ marginTop: 0, fontStyle: 'italic', marginBottom: 20 }}>{alamat != '-' ? alamat : 'Alamat Tidak Tersedia'}</Text>
    //                         <Text style={styles.content}>NIP: {nip}</Text>
    //                         <Text style={styles.content}>Email: {email}</Text>
    //                         <Text style={styles.content}>Telp: {handphone}</Text>
    //                         {/* <Text style={{ marginTop: 0, fontStyle: 'italic', marginBottom: 20 }}>EMAIL: {email}</Text> */}

    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginTop: '10%', marginBottom: '0%' }}>Informasi Detail</Text>
    //                         {/* <Text style={styles.content}>Alamat: {alamat}</Text> */}
    //                         <Text style={{ fontSize: 11, marginTop: 10 }}>No Identitas: {noIdentitas}</Text>
    //                         <Text style={styles.content}>NIK: {nik}</Text>
    //                         <Text style={styles.content}>Lahir: {tanggalLahir != '-' && tempatLahir != '-' ? tempatLahir+', '+tanggalLahir : '-'}</Text>
    //                         <Text style={styles.content}>Agama: {agama}</Text>
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
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>Pengawas</Text>
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>{status}</Text>
    //                         {/* <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '15%' }}>Informasi Kepala Sekolah</Text>
    //                         <Text style={styles.content}>Nama: Faqih S,pd.</Text>
    //                         <Text style={styles.content}>NIP: 0000 1111 2222 3333</Text>
    //                         <Text style={styles.content}>Masa Kerja: 3 tahun</Text> */}

    //                         {foto == '-' 
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
    //                         {/* <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>Orang Tua / Wali Murid</Text>
    //                         <Text style={styles.content}>Nama: {namaOrangTua}</Text>
    //                         <Text style={styles.content}>Pekerjaan: {pekerjaanOrangTua}</Text>
    //                         <Text style={styles.content}>NIK: {nikOrangTua}</Text>
    //                         <Text style={styles.content}>Telp: {telpOrangTua}</Text> */}
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
                    source={foto == '-' ||  !foto ?  require('../assets/noFotoProfile.png') :  {uri: foto }} 
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
                            label="NIP"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={nip}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={email}
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
                            initialValue={handphone}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="No Identitas"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={noIdentitas}
                            editableForm={false}
                        />
                        {/* <Input
                            id=""
                            label="NIK"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={nik}
                            editableForm={false}
                        /> */}
                        <Input
                            id=""
                            label="Lahir"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={tanggalLahir != '-' && tempatLahir != '-' ? tempatLahir+', '+tanggalLahir : '-'}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Agama"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={agama}
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

PengawasDetail.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Pengawas',
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

export default PengawasDetail;