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

import * as mAkademik from '../models/action/mAkademik';
import * as mAkademikV2 from '../models/action/mAkademikV2';
// import * as mAuth from '../models/action/mAuth';

const AkademikKbm = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const dispatch = useDispatch();
    
    let kbmData = [];
    const tmpkbmData = useSelector(state => state.akademikv2.kbmData);
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);

    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    useEffect(() => {
        dispatch(mAkademikV2.fetchKBM(idSekolah));
        dispatch(mAkademik.fetchSekolah(idSekolah));
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

    if (tmpkbmData.length > 0) {
        for (let i = 0; i < tmpkbmData.length; i++) {
            const noItem = parseInt(i) + 1;
            const item = tmpkbmData[i];
            kbmData.push(
                [
                    noItem,
                    item.kode_kbm,
                    item.nama_mapel,
                    ''
                ]
            );            
        }
    }

    const tableHead = ['No', 'Kode KBM', 'Mata Pelajaran', 'Lihat Detail'];
    let tableData = [];
    if (kbmData.length > 0) {
        tableData = kbmData;
    }
    
    const element = (data, index) => (
        <TouchableOpacity onPress={() => props.navigation.navigate('AkademikKbmDetail', {id: tmpkbmData[index]['id'], kodeKbm: tableData[index][1], namaMapel: tableData[index][2], guru: tmpkbmData[index]['nama_pengajar'], kelas: tmpkbmData[index]['nama_kelas'], kkm: tmpkbmData[index]['kkm'], status: tmpkbmData[index]['status']})}>
            <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
        </TouchableOpacity>
    );

    if (tableData.length > 0) {
        return (
            <View style={styles.container}>
                {/* <KeteranganHeader text1="Daftar Kegiatan Belajar Mengajar Pada Unit Sekolah" text2="Sesuai Dengan Jadwal Mengajar" /> */}

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
        );

    } else {
        return (
            <DefaultView />
        );
    }
	
}

AkademikKbm.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi KBM',
        headerTintColor: core.primaryColor
	};
};

const styles = StyleSheet.create({
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

export default AkademikKbm;