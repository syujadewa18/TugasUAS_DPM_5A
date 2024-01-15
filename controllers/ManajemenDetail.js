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

import * as mProducts from '../models/action/mProducts';
import * as mAuth from '../models/action/mAuth';

const ManajemenDetail = props => {
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

	return (
		<View style={styles.container}>
            <ScrollView style={{ maxHeight: 700 }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ width: '50%' }}>
                        <View style={{ padding: 10 }}>
                            <View style={{ backgroundColor: "#bbb", height: 100 }}></View>
                            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{_getParam('namaPengajar')}</Text>

                            <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
                                <View style={{ flex: 1, height: 2, marginHorizontal: 0, maxWidth: '50%', backgroundColor: 'black' }} />
                            </View>

                            <Text style={{ marginTop: 0, fontStyle: 'italic', marginBottom: 20 }}>{_getParam('namaMapel')}</Text>
                            <Text style={styles.content}>NIP: {_getParam('nip')}</Text>
                            <Text style={styles.content}>Kategori Pengajar: {_getParam('kategoriPengajar')}</Text>
                            {/* <Text style={styles.content}>Email: {email}</Text>
                            <Text style={styles.content}>Telp: {handphone}</Text> */}

                            <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginTop: '10%', marginBottom: '0%' }}>Informasi Detail</Text>
                            {/* <Text style={styles.content}>Alamat: {alamat}</Text> */}
                            <Text style={{ fontSize: 11, marginTop: 10 }}>Mata Pelajaran: {_getParam('namaMapel')}</Text>
                            <Text style={styles.content}>Kelas: {_getParam('kelas')}</Text>
                            <Text style={styles.content}>Keterangan: {_getParam('keterangan')}</Text>
                        </View>
                    </View>
                    
                    <View style={{ width: '50%' }}>
                        {logoSekolah ?
                            <Image 
                                source={{uri: logoSekolah}}
                                style={{ width: '100%', height: 200, marginTop: '15%' }}
                            />
                        :
                            <Image 
                                source={require('../assets/noLogoGray.png')}
                                style={{ width: '100%', height: 200, marginTop: '15%' }}
                            />
                        }

                        <View style={{ padding: 10, marginTop: '15%' }}>
                            <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>Pengajar</Text>
                            <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, textAlign: 'center', marginBottom: '5%' }}>{_getParam('status')}</Text>

                            {_getParam('foto') == '-' ||  !_getParam('foto')
                            ?
                                <Image 
                                    source={require('../assets/noFotoProfile.png')}
                                    style={{ width: 140, height: 140, marginTop: '15%', marginBottom: '15%', alignSelf: 'center' }}
                                />
                            :
                                <Image 
                                    source={{ uri: 'https://app.disekolah.id/profile/'+foto }}
                                    style={{ width: 140, height: 140, marginTop: '15%', marginBottom: '15%', alignSelf: 'center' }}
                                />
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>

            <KeteranganFooter text1="Apabila terdapat ketidaksesuaian data," text2="mohon untuk menghubungi operator" />
        </View>
  	);
}

ManajemenDetail.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Manajemen',
        headerTintColor: core.primaryColor
	};
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        // paddingTop: 30, 
        marginTop: '-10%',
        backgroundColor: '#fff' 
    },
    head: { 
        height: 40, 
        backgroundColor: '#f1f8ff' 
    },
    text: { 
        margin: 6,
        fontSize: 10
    },
    content: {
        fontSize: 11
    }
});

export default ManajemenDetail;