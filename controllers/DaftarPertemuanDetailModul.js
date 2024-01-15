import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback, Component } from 'react';
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
import YoutubePlayer from "react-native-youtube-iframe";
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import * as mAkademik from '../models/action/mAkademik';
import * as mKegiatanBelajar from '../models/action/mKegiatanBelajar';
// import * as mAuth from '../models/action/mAuth';

const DaftarPertemuanDetailModul = props => {
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
    function arrayColumn(array, columnName) {
        return array.map(function(value,index) {
            return value[columnName];
        })
    }

    const dispatch = useDispatch();
    
    const [playing, setPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pencarianMode, setPencarianMode] = useState('pilihMode');
    const [pencarianKelas, setPencarianKelas] = useState('pilihKelas');

    let optListKelas = [
        {
            label: 'Pilih Kelas', 
            value: 'pilihKelas'
        }
    ];
    let optPilihMode = [
        {
            label: 'Kategori Nilai', 
            value: 'pilihMode'
        },
        {
            label: 'Tugas', 
            value: 'tugas'
        },
        {
            label: 'Latihan', 
            value: 'latihan'
        },
        {
            label: 'Ujian', 
            value: 'ujian'
        },
    ];

    // #region cheatsheet params
    // idMateri: item.idMateri,
    // idSubMateri: item.idSubMateri,
    // kodeKBM: _getParam('kodeKBM'), 
    // idSekolah: _getParam('idSekolah'), 
    // namaPertemuan: namaPertemuan
    // foto: _getParam('foto'),
    // namaPengajar: _getParam('namaPengajar'),
    // nip: _getParam('nip'),
    // kelas: _getParam('kelas'),
    // namaMapel: _getParam('namaMapel'),
    // #endregion

    // #region cheatsheet state
    // const detailPertemuan = {
    //     "fotoProfileGuru": resData.materi.cover ? resData.materi.cover : "",
    //     "linkPertemuan": resData.link_pertemuan,
    //     "kkmPertemuan": parseInt(resData.information.kkm_pertemuan) > 0 ? parseInt(resData.information.kkm_pertemuan) : 0,
    //     "videoYoutube": resData.video.url_youtube ? resData.video.url_youtube : "",
    //     "modul": resData.modul.file ? resData.modul.file : "",
    //     "sudahDicek": resData.modul.checked == 1 ? 'Sudah' : 'Belum'
    // };
    // #endregion
    
    const pertemuanData = useSelector(state => state.kegiatan_belajar.detail_pertemuan);
    /* useEffect(() => {
        dispatch(mKegiatanBelajar.fetchDetailPertemuan(_getParam('idMateri'), _getParam('idSubMateri')));
    }, [dispatch]); */
    useEffect(() => {
        const loadPertemuan = async () => {
            setIsLoading(true);
            await dispatch(mKegiatanBelajar.fetchDetailPertemuan(_getParam('idMateri'), _getParam('idSubMateri')));
            setIsLoading(false);
        };
        loadPertemuan();
    }, []);

    if (pertemuanData.kelasData.length > 0) {
        for (let x = 0; x < pertemuanData.kelasData.length; x++) {
            const item = pertemuanData.kelasData[x];
            optListKelas.push(
                {
                    label: item.kelas,
                    value: item.id,
                }
            )
            
        }
    }

    const urlVideoYoutube = pertemuanData.videoYoutube ? pertemuanData.videoYoutube.replace('https://www.youtube.com/watch?v=', '') : 'vvsVkpu0-j4';
    const handlerClick = async (file) => {
        if (!file) {
            Alert.alert('Notification', 'Mohon maaf, data modul untuk pertemuan ini belum tersedia.', [{ text: 'Ok' }]);
        } else {
            Linking.openURL(file);
        }
    }; 
    const handlerClickV2 = async () => {
        const selIdKelas = pencarianKelas;
        const selMode = pencarianMode;

        if (selIdKelas != 'pilihKelas' && selMode != 'pilihMode') {
            let openedUrl = '';
            openedUrl+= 'https://app.disekolah.id/app/belajar_siswa/print_detail_nilai?selected_id_kelas=';
            openedUrl+= selIdKelas;
            openedUrl+= '&action=show_nilai&mode=';
            openedUrl+= selMode;
            openedUrl+= '&id_pertemuan=';
            openedUrl+= _getParam('idSubMateri');
            openedUrl+= '&id_materi=';
            openedUrl+= _getParam('idMateri');
            
            Linking.openURL(openedUrl);
        } else {
            Alert.alert('Error', 'Harap lengkapi data terlebih dahulu.', [{ text: 'Ok' }]);
        }
    };
    const handlerClickV3 = async () => {
        let kelasIds = arrayColumn(pertemuanData.kelasData, 'id');
        kelasIds = kelasIds.join();
        
        let openedUrl = '';
        openedUrl+= 'https://app.disekolah.id/app/belajar_siswa/absen_excel?id_pertemuan=';
        openedUrl+= _getParam('idSubMateri');
        openedUrl+= '&id_materi=';
        openedUrl+= _getParam('idMateri');
        openedUrl+= '&kelas_list=';
        openedUrl+= kelasIds;
        openedUrl+= '&id_sekolah=';
        openedUrl+= _getParam('idSekolah');
        
        Linking.openURL(openedUrl);
    };

    const renderGridItem = (data) => {
        const item = data.item;
        
		return (
            <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                <View style={{ paddingHorizontal: 0, paddingVertical: 6 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-around",
                            backgroundColor: 'white',
                            height: 50,
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: core.primaryColor
                        }}
                    >
                        <View style={{width: '100%', marginTop: 2}}>
                            <Text style={{ color: core.primaryColor, textAlign: 'center', fontSize: 12 }}>{textTruncate(item.deskripsi.toUpperCase(), 35)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
		);
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />

            {/* <View style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-around",
                paddingBottom: '12%',
                backgroundColor: core.primaryColor,
                padding: 20,
                marginBottom: '5%',
                borderRadius: 10
            }}>
                <View style={{width: '45%', height: 100, paddingHorizontal: 10}}>
                    {
                        pertemuanData.fotoProfileGuru ?
                            <Image style={styles.image} source={{ uri: pertemuanData.fotoProfileGuru }} />
                        :
                        _getParam('foto') ?
                            <Image style={styles.image} source={{ uri: _getParam('foto') }} />
                        :
                            <Image style={styles.image} source={require('../assets/noFotoProfile.png')} />
                    }
                    
                </View>

                <View style={{width: '65%', height: 100, marginLeft: 20}}>
                    <Text style={{ color: 'white', fontSize: 17, marginBottom: 0, fontWeight: 'bold' }}>{_getParam('namaPengajar')}</Text>
                    <Text style={{ color: 'white', fontSize: 17, marginBottom: 5, fontStyle: 'italic' }}>NIP: {_getParam('nip')}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '6%', marginTop: '2%' }}>
                        <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: 'white' }} />
                    </View>

                    <Text style={{ color: 'white', fontSize: 12}}>Mata Pelajaran: {_getParam('namaMapel')}</Text>
                    <Text style={{ color: 'white', fontSize: 12}}>Tingkat/Kelas: {_getParam('kelas')}</Text>
                </View>
            </View> */}

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
                    {
                        pertemuanData.fotoProfileGuru ?
                            <Image style={styles.image} source={{ uri: pertemuanData.fotoProfileGuru }} />
                        :
                        _getParam('foto') ?
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

            {/* Video Pembelajaran */}
            <Text style={{ fontWeight: 'bold' }}>Video Pembelajaran</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%', marginTop: '3%' }}>
                <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
            </View>
            <YoutubePlayer
                height={230}
                play={playing}
                videoId={urlVideoYoutube}
                onChangeState={onStateChange}
            />

            {/* Modul Pembelajaran */}
            <Text style={{ fontWeight: 'bold' }}>Modul Pembelajaran</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%', marginTop: '3%' }}>
                <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
            </View>
            <TouchableOpacity onPress={() => handlerClick(pertemuanData.modul)}>
                <View style={{ paddingHorizontal: 0, paddingVertical: 0, marginBottom: '6%' }}>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-around",
                            backgroundColor: 'white',
                            height: 60,
                            padding: 10,
                            borderRadius: 0,
                            borderWidth: 1,
                            borderColor: '#888'
                        }}
                    >
                        <View style={{width: '10%', alignSelf: 'center'}}>
                            <Ionicons name={'ios-paper'} size={25} color={core.primaryColor} />
                        </View>
                        
                        <View style={{width: '90%', alignSelf: 'center', marginTop: 2}}>
                            <Text style={{ color: 'black', fontSize: 12 }}>Modul: {_getParam('namaMapel')}</Text>
                            <Text style={{ color: '#888', fontStyle: 'italic', fontSize: 12 }}>{textTruncate('Kelas '+_getParam('kelas')+' - '+_getParam('namaPertemuan'), 45)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Link Pembelajaran */}
            <Text style={{ fontWeight: 'bold' }}>Link Pembelajaran</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%', marginTop: '3%' }}>
                <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
            </View>
            {pertemuanData.linkPertemuan.length > 0 ?
                <FlatList
                    keyExtractor={ (data, index) => data.id}
                    data={pertemuanData.linkPertemuan}
                    renderItem={renderGridItem}
                    numColumns={1}
                    style={{ marginTop: 0, marginBottom: '5%' }}
                />
            :
                <View><Text style={{ textAlign: 'center', fontSize: 11, marginBottom: '5%' }}>Mohon maaf link pembelajaran tidak tersedia</Text></View>
            }

            {/* Daftar Nilai */}
            <Text style={{ fontWeight: 'bold' }}>Daftar Nilai</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%', marginTop: '3%' }}>
                <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
            </View>
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", marginBottom: 5 }} >
                <View style={{ width: '45%' }}>
                    <DropDownPicker
                        items={optListKelas}
                        defaultValue={pencarianKelas}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => setPencarianKelas(item.value)}
                    />
                </View>
                
                <View style={{ width: '45%' }}>
                    <DropDownPicker
                        items={optPilihMode}
                        defaultValue={pencarianMode}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => setPencarianMode(item.value)}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={handlerClickV2}>
                <View style={{ paddingHorizontal: 0, paddingVertical: 6 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-around",
                            backgroundColor: 'white',
                            height: 50,
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: core.primaryColor,
                            marginBottom: '5%'
                        }}
                    >
                        <View style={{width: '100%', marginTop: 2}}>
                            <Text style={{ color: core.primaryColor, textAlign: 'center', fontSize: 12 }}>LIHAT DAFTAR NILAI</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Daftar Presensi */}
            <Text style={{ fontWeight: 'bold' }}>Daftar Presensi</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%', marginTop: '3%' }}>
                <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
            </View>
            
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", marginBottom: 5 }} >
                <View style={{ width: '45%' }}>
                    <Text>Hadir: {pertemuanData.hadir} Siswa/i</Text>
                </View>
                <View style={{ width: '45%' }}>
                    <Text style={{ textAlign: 'right' }}>{pertemuanData.hadirPercent}%</Text>
                </View>
            </View>
            <View style={{ width: pertemuanData.hadirPercent+'%', height: 20, backgroundColor: 'green', marginBottom: 10, borderRadius: 20 }}><Text style={{ color: 'transparent' }}>Test</Text></View>
            
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", marginBottom: 5 }} >
                <View style={{ width: '45%' }}>
                    <Text>Tidak Hadir: {pertemuanData.tidakHadir} Siswa/i</Text>
                </View>
                <View style={{ width: '45%' }}>
                    <Text style={{ textAlign: 'right' }}>{pertemuanData.tidakHadirPercent}%</Text>
                </View>
            </View>
            <View style={{ width: pertemuanData.tidakHadirPercent+'%', height: 20, backgroundColor: 'red', marginBottom: 10, borderRadius: 20 }}><Text style={{ color: 'transparent' }}>Test</Text></View>
            
            <TouchableOpacity onPress={handlerClickV3}>
                <View style={{ paddingHorizontal: 0, paddingVertical: 6 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-around",
                            backgroundColor: 'white',
                            height: 50,
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: core.primaryColor,
                            marginBottom: '5%'
                        }}
                    >
                        <View style={{width: '100%', marginTop: 2}}>
                            <Text style={{ color: core.primaryColor, textAlign: 'center', fontSize: 12 }}>LIHAT DAFTAR PRESENSI</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Clearfix */}
            <View style={{ marginBottom: '10%' }}></View>
        </ScrollView>
    );
}

DaftarPertemuanDetailModul.navigationOptions = navigationData => {
	return {
        headerTitle: '',
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

export default DaftarPertemuanDetailModul;