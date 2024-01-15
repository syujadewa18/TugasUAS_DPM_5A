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
import * as mAuth from '../models/action/mAuth';

const AkademikTahunAjaran = props => {
    // function isEmpty(obj) {
    //     for (var key in obj) {
    //         if (obj.hasOwnProperty(key))
    //             return false;
    //     }
        
    //     return true;
    // }

    const dispatch = useDispatch();
    
    let tahunAjaranData = [];
    const tmptahunAjaranData = useSelector(state => state.akademik.tahunAjaranData);
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);

    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    useEffect(() => {
        dispatch(mAkademik.fetchTahunAjaran(idSekolah));
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

    if (tmptahunAjaranData.length > 0) {
        for (let i = 0; i < tmptahunAjaranData.length; i++) {
            const noItem = parseInt(i) + 1;
            const item = tmptahunAjaranData[i];
            tahunAjaranData.push(
                [
                    noItem,
                    item.tahun_ajaran,
                    item.tgl_mulai,
                    item.tgl_akhir,
                    item.status,
                ]
            );            
        }
    }

    const tableHead = ['No', 'Tahun Ajaran', 'Tanggal Mulai', 'Tanggal Akhir', 'Status'];
    let tableData = [];
    if (tahunAjaranData.length > 0) {
        tableData = tahunAjaranData;
    }

    if (tableData.length > 0) {
        return (
            <View style={styles.container}>
                {/* <KeteranganHeader text1="Tahun Ajaran adalah data 1 tahun" text2="terhitung dari awal hingga akhir tahun ajaran" /> */}
                
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{namaSekolah}</Text>
                    <Text style={{ fontSize: 10 }}>{alamatSekolah}</Text>
                    <Text style={{ fontSize: 10 }}>Telp: {telp}</Text>
                    <Text style={{ fontSize: 10 }}>Website: {website}</Text>
                </View>

                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={tableData} textStyle={styles.text}/>
                </Table>
    
                <KeteranganFooter text1="Data Tahun Ajaran yang sudah tidak aktif" text2="masih tersimpan pada Database" />
            </View>
          );

    } else {
        return (
            <DefaultView />
        )
    }
}

AkademikTahunAjaran.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Tahun Ajaran',
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
    }
});

export default AkademikTahunAjaran;