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
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import * as mAkademik from '../models/action/mAkademik';
import * as mAkademikV2 from '../models/action/mAkademikV2';
import * as mKepegawaian from '../models/action/mKepegawaian';
import * as mKegiatanBelajar from '../models/action/mKegiatanBelajar';
import * as mAuth from '../models/action/mAuth';

const LaporanKegiatanBelajar = props => {
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(false);
    const [pencarianGuru, setPencarianGuru] = useState('pilihGuru');
    const [guru, setGuru] = useState({});

    let optListGuru = [
        {
            label: 'Pilih Guru', 
            value: 'pilihGuru'
        }
    ];

    const guruData = useSelector(state => state.pegawai.guru);
    const kbmData = useSelector(state => state.kegiatan_belajar.laporan_mengajar);
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);

    let userLogin = useSelector(state => state.auth.user);
    let idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    useEffect(() => {
        dispatch(mKepegawaian.fetchKepegawaian(idSekolah));
        dispatch(mKegiatanBelajar.fetchLaporanMengajarDefault());
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

    const presensiHandler = async () => {
        if (pencarianGuru != 'pilihGuru') {
            await setIsLoading(true);
            const selIdGuru = pencarianGuru;

            try {
                await dispatch(mKegiatanBelajar.fetchLaporanMengajar(selIdGuru));
                const selectedGuru = await guruData.filter(item => item.id == selIdGuru);
                await setGuru(selectedGuru[0]);

            } catch (error) {
                Alert.alert('Error', error.message, [{ text: 'Ok' }]);
            }
            setIsLoading(false);
        
        } else {
            Alert.alert('Error', 'Harap lengkapi data terlebih dahulu.', [{ text: 'Ok' }]);
            setIsLoading(false);
        }
    };

    for (let i = 0; i < guruData.length; i++) {
        const item = guruData[i];
        optListGuru.push(
            {
                label: item.nama_pengajar,
                value: item.id,
            }
        );
    }

    const tableHead = ['No', 'Data Mata Pelajaran KBM', 'Tingkat/Kelas', 'Data Pertemuan Pembelajaran', 'Data Video Pembelajaran', 'Data Modul Pembelajaran'];
    let tableData = [];
    if (kbmData.length > 0) {
        for (let y = 0; y < kbmData.length; y++) {
            const noItem = parseInt(y) + 1;
            const item = kbmData[y];

            tableData.push(
                [
                    noItem,
                    item.nama_mapel,
                    item.nama_kelas,
                    item.total_pertemuan,
                    item.total_video,
                    item.total_modul,
                ]
            )
        }
    }
    const widthArr = [40, 160, 140, 140, 140, 140];
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }} >
                    <View style={{ width: '75%' }}>
                        <DropDownPicker
                            items={optListGuru}
                            defaultValue={pencarianGuru}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setPencarianGuru(item.value)}
                        />
                    </View>
                    
                    <View style={{ width: '25%' }}>
                        <TouchableOpacity onPress={presensiHandler} style={{ backgroundColor: 'white', padding: 10, borderWidth: 1, borderColor: core.primaryColor, borderRadius: 10, width: '70%', alignSelf: 'center', opacity: .8, marginBottom: 20 }}>
                            <View>
                                <Text style={{ color: core.primaryColor, textAlign: 'center' }}><Ionicons name='ios-search' size={18} color={core.primaryColor} /></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {kbmData.length > 0 ?
                    <View style={{ marginTop: '0%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%', marginBottom: '5%' }}>
                            <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: '#888' }} />
                        </View>
                        
                        <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                            <View style={{ width: '40%', marginLeft: 10 }}>
                                {guru.foto == '-' || !guru.foto
                                ?
                                    <Image 
                                        source={require('../assets/noFotoProfile.png')}
                                        style={{ width: 120, height: 120, marginTop: '0%', marginBottom: '0%', borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                                    />
                                :
                                    <Image 
                                        source={{ uri: guru.foto }}
                                        style={{ width: 120, height: 120, marginTop: '0%', marginBottom: '0%', borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                                    />
                                }
                            </View>
                            
                            <View style={{ width: '60%', alignSelf: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>{guru.nama_pengajar}</Text>
                                <Text style={{ fontSize: 11 }}>NIP: {guru.nip}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '6%', marginBottom: '5%' }}>
                            <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: '#888' }} />
                        </View>
                    </View>
                :
                    <View></View>
                }

                {kbmData.length > 0 ?
                    <View style={{ marginBottom: '0%' }}></View>
                :
                    <View style={{ marginBottom: '0%' }}></View>
                }

                {kbmData.length > 0 ?
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{namaSekolah}</Text>
                        <Text style={{ fontSize: 10 }}>{alamatSekolah}</Text>
                        <Text style={{ fontSize: 10 }}>Telp: {telp}</Text>
                        <Text style={{ fontSize: 10 }}>Website: {website}</Text>
                    </View>
                :
                    <View></View>
                }

                {kbmData.length > 0 ?
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
                            <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text}/>
                        </Table>
                        
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
                                {
                                    tableData.map((rowData, index) => (
                                        <TableWrapper key={index} style={{ flexDirection: 'row' }}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell style={{ width: widthArr[cellIndex] }} key={cellIndex} data={cellData}  textStyle={styles.text}/>
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
                
                :

                <DefaultView />
                
                }

                <KeteranganFooter text1="*jika terdapat ketidaksesuaian data, mohon untuk" text2="menghubungi operator" />
            </View>
        </ScrollView>
    );
}

LaporanKegiatanBelajar.navigationOptions = navigationData => {
	return {
        headerTitle: 'Data Laporan Kegiatan Mengajar',
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
    formControl: {
        // width: '20%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
        fontSize: 11
    },
    input: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        // borderColor: core.primaryColor,
        borderColor: '#c8e1ff',
        borderWidth: 1,
        width: '60%',
        marginBottom: 20
    },
    row: { 
        flexDirection: 'row' 
    },
});

export default LaporanKegiatanBelajar;