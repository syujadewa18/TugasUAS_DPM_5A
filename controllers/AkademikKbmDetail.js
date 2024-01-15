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

import * as mAkademik from '../models/action/mAkademik';
// import * as mAuth from '../models/action/mAuth';

const AkademikKbmDetail = props => {
    // function isEmpty(obj) {
    //     for (var key in obj) {
    //         if (obj.hasOwnProperty(key))
    //             return false;
    //     }
        
    //     return true;
    // }

    const dispatch = useDispatch();
    
    let logoSekolah = null;
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);

    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    useEffect(() => {
        dispatch(mAkademik.fetchSekolah(idSekolah));
    }, [dispatch]);

    if (tmpSekolahData != null) {
        logoSekolah = tmpSekolahData.logo;
    }

    const id = props.navigation.getParam('id');
    const kodeKbm = props.navigation.getParam('kodeKbm');
    const namaMapel = props.navigation.getParam('namaMapel');
    const kelas = props.navigation.getParam('kelas');
    const guru = props.navigation.getParam('guru');
    const kkm = props.navigation.getParam('kkm');
    const status = props.navigation.getParam('status');

	// return (
	// 	<View style={styles.container}>
    //         <ScrollView style={{ maxHeight: 700 }}>
    //             <View style={{ flexDirection: "row", flex: 1 }}>
    //                 <View style={{ width: '50%' }}>
    //                     <View style={{ padding: 10 }}>
    //                         <View style={{ backgroundColor: "#bbb", height: 100 }}></View>
    //                         <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{kodeKbm}</Text>

    //                         <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
    //                             <View style={{ flex: 1, height: 2, marginHorizontal: 0, maxWidth: '50%', backgroundColor: 'black' }} />
    //                         </View>

    //                         <Text style={{ marginTop: 0, fontStyle: 'italic', marginBottom: 20 }}>{namaMapel}</Text>

    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginTop: '10%', marginBottom: '10%' }}>Informasi Detail</Text>
    //                         <Text style={styles.content}>Mata Pelajaran: {namaMapel}</Text>
    //                         <Text style={styles.content}>Kode KBM: {kodeKbm}</Text>
    //                         <Text style={styles.content}>Guru: {guru}</Text>
    //                         <Text style={styles.content}>Kelas: {kelas}</Text>
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
                        
    //                     <View style={{ padding: 10 }}>
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>KKM {kkm}</Text>
    //                         <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>{status}</Text>
    //                         {/* <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '15%' }}>Informasi Kepala Sekolah</Text>
    //                         <Text style={styles.content}>Nama: Faqih S,pd.</Text>
    //                         <Text style={styles.content}>NIP: 0000 1111 2222 3333</Text>
    //                         <Text style={styles.content}>Masa Kerja: 3 tahun</Text> */}
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
                        source={yayasanData.detail_yayasan.logo ? {uri: yayasanData.detail_yayasan.logo } : require('../assets/noLogoGray3.png')} 
                    />
                </Card> */}
                <Image 
                    style={{ height: 150, width: '100%', resizeMode: 'contain', borderRadius: 100, marginTop: '5%', marginBottom: '0%' }}  
                    source={logoSekolah ? {uri: logoSekolah } : require('../assets/noLogoGray3.png')} 
                />

                <Card style={styles.authContainerAfterLogin}>
                    <View>
                        <Input
                            id=""
                            label="Kode KBM"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={kodeKbm}
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
                            initialValue={namaMapel}
                            editableForm={false}
                        />
                        <Input
                            id=""
                            label="Pengajar"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={guru}
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
                        <Input
                            id=""
                            label="KKM"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange=""
                            initialValue={kkm}
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

AkademikKbmDetail.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Detail KBM',
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

export default AkademikKbmDetail;