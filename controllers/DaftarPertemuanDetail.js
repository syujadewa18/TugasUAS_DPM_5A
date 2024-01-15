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
import * as Linking from 'expo-linking';

import * as mAkademik from '../models/action/mAkademik';
import * as mKegiatanBelajar from '../models/action/mKegiatanBelajar';
// import * as mAuth from '../models/action/mAuth';

const DaftarPertemuanDetail = props => {
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
    
    let listData = [];
    const pertemuanData = useSelector(state => state.kegiatan_belajar.pertemuan_guru);
    useEffect(() => {
        dispatch(mKegiatanBelajar.fetchPertemuanGuru(_getParam('idSekolah'), _getParam('idMateri')));
    }, [dispatch]);

    console.log(_getParam('foto'));
    console.log('oke');

    if (pertemuanData.length > 0) {
        for (let i = 0; i < pertemuanData.length; i++) {
            const item = pertemuanData[i];
            console.log(item);
            listData.push(
                {
                    "menuName": item.judul_pertemuan,
                    "icon": "ios-list",
                    "navigation": "DaftarPertemuanDetailModul",
                    "idMateri": item.id_materi,
                    "idSubMateri": item.id
                }
            );            
        }
    }

    const renderGridItem = (data) => {
        const item = data.item;
        
		return (
            <TouchableOpacity
                onPress={
                    () => {
                        props.navigation.navigate(item.navigation, {
                            idMateri: item.idMateri,
                            idSubMateri: item.idSubMateri,
                            namaPertemuan: item.menuName,
                            kodeKBM: _getParam('kodeKBM'), 
                            idSekolah: _getParam('idSekolah'), 
                            foto: _getParam('foto'),
                            namaPengajar: _getParam('namaPengajar'),
                            nip: _getParam('nip'),
                            kelas: _getParam('kelas'),
                            namaMapel: _getParam('namaMapel'),
                        })}
                    }                
            >
                <View style={{ paddingHorizontal: 0, paddingVertical: 8 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-around",
                            backgroundColor: core.primaryColor,
                            height: 50,
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: core.primaryColor
                        }}
                    >
                        <View style={{width: '10%'}}>
                            <Ionicons name={item.icon} size={25} color="white" />
                        </View>
                        
                        <View style={{width: '90%', marginTop: 2}}>
                            <Text style={{ color: 'white' }}>{textTruncate(item.menuName, 35)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
		);
    }

    if (listData.length > 0) {
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
                
                    {/* <ScrollView style={{ maxHeight: 400 }}> */}
                    <View>
                        <FlatList
                            keyExtractor={ (data, index) => data.id}
                            data={listData}
                            renderItem={renderGridItem}
                            numColumns={1}
                            style={{ marginTop: 0 }}
                        />
                    </View>
        
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

DaftarPertemuanDetail.navigationOptions = navigationData => {
	return {
        headerTitle: 'Informasi Pertemuan',
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

export default DaftarPertemuanDetail;