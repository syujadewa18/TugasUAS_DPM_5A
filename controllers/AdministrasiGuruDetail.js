import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
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
    AsyncStorage,
    Alert
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import core from '../core/core';
import DefaultView from '../views/btn/defaultView';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import KeteranganHeader from '../views/btn/keteranganHeader';
import KeteranganFooter from '../views/btn/keteranganFooter';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import * as mAkademik from '../models/action/mAkademik';
import * as mKegiatanBelajar from '../models/action/mKegiatanBelajar';
// import * as mAuth from '../models/action/mAuth';

const AdministrasiGuruDetail = props => {
    function _getParam(param) {
        return props.navigation.getParam(param);
    }
    function textTruncate(str, length, ending) {
        if (length == null) {
            length = 100;
        }
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        
        } else {
            return str;
        }
    }

    const dispatch = useDispatch();

    // #region cheatsheet params
    // kodeKBM: kbmData[index]['kode_kbm'], 
    // idSekolah: kbmData[index]['id_sekolah'], 
    // foto: guru.foto ? guru.goto : '',
    // namaPengajar: guru.nama_pengajar,
    // nip: guru.nip ? guru.nip: '-',
    // kelas: kbmData[index]['nama_kelas'],
    // namaMapel: kbmData[index]['nama_mapel'],
    // #endregion
    
    let tableData = [];
    const administrasiGuruData = useSelector(state => state.kegiatan_belajar.administrasi_guru);
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);
    useEffect(() => {
        dispatch(mKegiatanBelajar.fetchAdministrasiGuru(_getParam('idSekolah'), _getParam('kodeKBM')));
        dispatch(mAkademik.fetchSekolah(_getParam('idSekolah')));
    }, [dispatch]);

    let namaSekolah = '';
    let alamatSekolah = '';
    let telp = '';
    let website = '';
    if (tmpSekolahData != null) {
        namaSekolah = tmpSekolahData.nama_sekolah;
        alamatSekolah += tmpSekolahData.alamat ? tmpSekolahData.alamat+', ': ''
        alamatSekolah += tmpSekolahData.kelurahan ? tmpSekolahData.kelurahan+', ' : ''
        alamatSekolah += tmpSekolahData.kecamatan ? tmpSekolahData.kecamatan+', ' : ''
        alamatSekolah += tmpSekolahData.kota ? tmpSekolahData.kota+', ' : ''
        alamatSekolah += tmpSekolahData.kodepos ? tmpSekolahData.kodepos : ''
        telp = tmpSekolahData.telepon;
        website = tmpSekolahData.url_sekolah;
    }

    if (administrasiGuruData.length > 0) {
        for (let i = 0; i < administrasiGuruData.length; i++) {
            const noItem = parseInt(i) + 1;
            const item = administrasiGuruData[i];
            tableData.push(
                [
                    noItem,
                    item.nama,
                    item.status,
                    ''
                ]
            );            
        }
    }
    const tableHead = ['No', 'Administrasi Guru', 'Status', 'Lihat Detail'];
    const element = (data, index) => (
        <TouchableOpacity onPress={() => handlerClick(administrasiGuruData[index]['file'])}>
            <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
        </TouchableOpacity>
    );
    const handlerClick = async (file) => {
        if (!file) {
            Alert.alert('Notification', 'Mohon maaf, data administrasi guru belum tersedia.', [{ text: 'Ok' }]);
        } else {
            Linking.openURL(file);
        }
    };

    if (tableData.length > 0) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-around",
                        paddingBottom: '8%',
                        backgroundColor: core.primaryColor,
                        padding: 20,
                        marginBottom: '5%',
                        borderRadius: 10
                    }}>
                        <View style={{width: '35%', height: 80}}>
                            {_getParam('foto') ?
                                <Image style={styles.image} source={{ uri: _getParam('foto') }} />
                            :
                                <Image style={styles.image} source={require('../assets/noFotoProfile.png')} />
                            }
                            
                        </View>
        
                        <View style={{width: '65%', height: 100, marginLeft: 20}}>
                            <Text style={{ color: 'white', fontSize: 17, marginBottom: 0, fontWeight: 'bold' }}>{textTruncate(_getParam('namaPengajar'), 20)}</Text>
                            <Text style={{ color: 'white', fontSize: 14, marginBottom: 5, fontStyle: 'italic' }}>NIP: {_getParam('nip')}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '6%', marginTop: '2%' }}>
                                <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: 'white' }} />
                            </View>

                            <Text style={{ color: 'white', fontSize: 12}}>{_getParam('namaMapel')}</Text>
                            <Text style={{ color: 'white', fontSize: 12}}>{_getParam('kelas')}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '6%', marginTop: '2%' }}>
                        <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{namaSekolah}</Text>
                        <Text style={{ fontSize: 10 }}>{alamatSekolah}</Text>
                        <Text style={{ fontSize: 10 }}>Telp: {telp}</Text>
                        <Text style={{ fontSize: 10 }}>Website: {website}</Text>
                    </View>
                
                    <ScrollView style={{ maxHeight: 400 }}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                            {/* <Rows data={tableData} textStyle={styles.text}/> */}
                            {
                                tableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                        </Table>
                    </ScrollView>
        
                    <KeteranganFooter text1="Apabila terdapat ketidaksesuaian data," text2="mohon untuk menghubungi operator" />
                </View>
            </ScrollView>
        );
    
    } else {
        return (
            <DefaultView />
        );
    }
}

AdministrasiGuruDetail.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Administrasi Guru',
        headerTintColor: core.primaryColor
	};
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        borderWidth: 1
    },
    container: { 
        flex: 1, 
        padding: 16, 
        paddingTop: 30, 
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
    row: { 
        flexDirection: 'row' 
    },
});

export default AdministrasiGuruDetail;