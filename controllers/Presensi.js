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
import DateTimePicker from '@react-native-community/datetimepicker';

import * as mAkademik from '../models/action/mAkademik';
import * as mAkademikV2 from '../models/action/mAkademikV2';
import * as mPresensi from '../models/action/mPresensi';
import * as mAuth from '../models/action/mAuth';

const Presensi = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }
    function toISOLocal(d) {
        var z  = n =>  ('0' + n).slice(-2);
        var zz = n => ('00' + n).slice(-3);
        var off = d.getTimezoneOffset();
        var sign = off < 0? '+' : '-';
        off = Math.abs(off);
      
        return d.getFullYear() + '-'
               + z(d.getMonth()+1) + '-' +
               z(d.getDate()) + 'T' +
               z(d.getHours()) + ':'  + 
               z(d.getMinutes()) + ':' +
               z(d.getSeconds()) + '.' +
               zz(d.getMilliseconds()) +
               sign + z(off/60|0) + ':' + z(off%60); 
    }

    const dispatch = useDispatch();
    
    // Datetime picker
    const [showDari, setShowDari] = useState(false);
    const [showSampai, setShowSampai] = useState(false);
    // const onChange = async (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     await setShow(false);
    //     await setDate(currentDate);
    // };
    // const showDatepicker = () => {
    //     setShow(true);
    // };

    const [isLoading, setIsLoading] = useState(false);
    const [pencarianTingkat, setPencarianTingkat] = useState('pilihTingkat');
    const [pencarianKelas, setPencarianKelas] = useState('pilihKelas');
    const [pencarianDariTanggal, setPencarianDariTanggal] = useState(new Date());
    const [pencarianSampaiTanggal, setPencarianSampaiTanggal] = useState(new Date());

    const onChangeDari = async (event, selectedDate) => {
        const currentDate = selectedDate || showDari;
        await setShowDari(false);
        if (currentDate != true) {
            await setPencarianDariTanggal(currentDate);   
        }
    };
    const onChangeSampai = async (event, selectedDate) => {
        const currentDate = selectedDate || showSampai;
        await setShowSampai(false);
        if (currentDate != true) {
            await setPencarianSampaiTanggal(currentDate);
        }
    };

    const showDatepickerDari = async () => {
        // if (showDari === true) {
        //     await setShowDari(false);
        // }
        await setShowDari(true);
    };
    const showDatepickerSampai = async () => {
        // if (showSampai === true) {
        //     await setShowSampai(false);
        // }
        await setShowSampai(true);
    };
    // const textChangeHandler = text => {
    //     setPencarian(text);
    // };

    let optListTingkat = [
        {
            label: 'Pilih Tingkat', 
            value: 'pilihTingkat'
        }
    ];
    let optListKelas = [
        {
            label: 'Pilih Kelas', 
            value: 'pilihKelas'
        }
    ];
    let optDariTanggal = [
        {
            label: 'Dari Tanggal', 
            value: 'dariTanggal'
        },
        {
            label: '1', 
            value: '1'
        },
        {
            label: '2', 
            value: '2'
        },
        {
            label: '3', 
            value: '3'
        },
        {
            label: '4', 
            value: '4'
        },
        {
            label: '5', 
            value: '5'
        },
        {
            label: '6', 
            value: '6'
        },
        {
            label: '7', 
            value: '7'
        },
        {
            label: '8', 
            value: '8'
        },
        {
            label: '9', 
            value: '9'
        },
        {
            label: '10', 
            value: '10'
        },
        {
            label: '11', 
            value: '11'
        },
        {
            label: '12', 
            value: '12'
        },
        {
            label: '13', 
            value: '13'
        },
        {
            label: '14', 
            value: '14'
        },
        {
            label: '15', 
            value: '15'
        },
        {
            label: '16', 
            value: '16'
        },
        {
            label: '17', 
            value: '17'
        },
        {
            label: '18', 
            value: '18'
        },
        {
            label: '19', 
            value: '19'
        },
        {
            label: '20', 
            value: '20'
        },
        {
            label: '21', 
            value: '21'
        },
        {
            label: '22', 
            value: '22'
        },
        {
            label: '23', 
            value: '23'
        },
        {
            label: '24', 
            value: '24'
        },
        {
            label: '25', 
            value: '25'
        },
        {
            label: '26', 
            value: '26'
        },
        {
            label: '27', 
            value: '27'
        },
        {
            label: '28', 
            value: '28'
        },
        {
            label: '29', 
            value: '29'
        },
        {
            label: '30', 
            value: '30'
        },
    ];
    let optSampaiTanggal = [
        {
            label: 'Sampai Tanggal', 
            value: 'sampaiTanggal'
        },
        {
            label: '1', 
            value: '1'
        },
        {
            label: '2', 
            value: '2'
        },
        {
            label: '3', 
            value: '3'
        },
        {
            label: '4', 
            value: '4'
        },
        {
            label: '5', 
            value: '5'
        },
        {
            label: '6', 
            value: '6'
        },
        {
            label: '7', 
            value: '7'
        },
        {
            label: '8', 
            value: '8'
        },
        {
            label: '9', 
            value: '9'
        },
        {
            label: '10', 
            value: '10'
        },
        {
            label: '11', 
            value: '11'
        },
        {
            label: '12', 
            value: '12'
        },
        {
            label: '13', 
            value: '13'
        },
        {
            label: '14', 
            value: '14'
        },
        {
            label: '15', 
            value: '15'
        },
        {
            label: '16', 
            value: '16'
        },
        {
            label: '17', 
            value: '17'
        },
        {
            label: '18', 
            value: '18'
        },
        {
            label: '19', 
            value: '19'
        },
        {
            label: '20', 
            value: '20'
        },
        {
            label: '21', 
            value: '21'
        },
        {
            label: '22', 
            value: '22'
        },
        {
            label: '23', 
            value: '23'
        },
        {
            label: '24', 
            value: '24'
        },
        {
            label: '25', 
            value: '25'
        },
        {
            label: '26', 
            value: '26'
        },
        {
            label: '27', 
            value: '27'
        },
        {
            label: '28', 
            value: '28'
        },
        {
            label: '29', 
            value: '29'
        },
        {
            label: '30', 
            value: '30'
        },
    ];

    const presensiData = useSelector(state => state.presensi.presensi);
    const tingkatData = useSelector(state => state.akademik.tingkatData);
    const kelasData = useSelector(state => state.akademikv2.kelasData);
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);

    let userLogin = useSelector(state => state.auth.user);
    let idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    useEffect(() => {
        dispatch(mAkademik.fetchTingkat(idSekolah));
        dispatch(mAkademikV2.fetchKelas(idSekolah));
        dispatch(mPresensi.fetchPresensiDefault());
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

    /* useEffect(() => {
        if (pencarianKelas != 'pilihKelas' && pencarianDariTanggal != 'dariTanggal' && pencarianSampaiTanggal != 'sampaiTanggal') {
            const selIdSekolah = idSekolah;
            const selIdKelas = pencarianKelas;
            const selDariTanggal = pencarianDariTanggal;
            const selSampaiTanggal = pencarianSampaiTanggal; 

            dispatch(mPresensi.fetchPresensi(selIdSekolah, selIdKelas, selDariTanggal, selSampaiTanggal));
        }
    }, [pencarianTingkat, pencarianKelas, pencarianDariTanggal, pencarianSampaiTanggal]); */
    const presensiHandler = async () => {
        if (pencarianKelas != 'pilihKelas' && pencarianDariTanggal != 'dariTanggal' && pencarianSampaiTanggal != 'sampaiTanggal') {
            await setIsLoading(true);
            const selIdSekolah = idSekolah;
            const selIdKelas = pencarianKelas;
            const selDariTanggal = toISOLocal(pencarianDariTanggal).slice(0,10);
            const selSampaiTanggal = toISOLocal(pencarianSampaiTanggal).slice(0,10); 

            try {
                await dispatch(mPresensi.fetchPresensi(selIdSekolah, selIdKelas, selDariTanggal, selSampaiTanggal));
            } catch (error) {
                Alert.alert('Error', error.message, [{ text: 'Ok' }]);
            }
            setIsLoading(false);
        
        } else {
            Alert.alert('Error', 'Harap lengkapi data terlebih dahulu.', [{ text: 'Ok' }]);
            setIsLoading(false);
        }
    };

    for (let i = 0; i < tingkatData.length; i++) {
        const item = tingkatData[i];
        optListTingkat.push(
            {
                label: item.tingkat,
                value: item.id,
            }
        );
    }

    if (pencarianTingkat != 'pilihTingkat') {
        for (let x = 0; x < kelasData.length; x++) {
            const item = kelasData[x];
            if (item.id_tingkat == pencarianTingkat) {
                optListKelas.push(
                    {
                        label: item.kelas,
                        value: item.id,
                    }
                );
            }
        }
    }

    const tableHead = ['No', 'NIS', 'Nama Siswa', 'Hadir', 'Telat', 'Sakit', 'Izin', 'Absen'];
    let tableData = [];
    if (presensiData.length > 0) {
        for (let y = 0; y < presensiData.length; y++) {
            const noItem = parseInt(y) + 1;
            const item = presensiData[y];

            tableData.push(
                [
                    noItem,
                    item.nis,
                    item.nama,
                    item.hadir,
                    item.telat,
                    item.sakit,
                    item.izin,
                    item.alpha,
                ]
            )
        }
    }
    const widthArr = [40, 60, 140, 80, 80, 80, 80, 80];
    // const ketText = 'Menampilkan '+tableData.length+' dari '+arrTableData.length+' data siswa';
    // const element = (data, index) => (
    //     <TouchableOpacity onPress={() => props.navigation.navigate('PesertaDidikDetail', {id: tableData[index][0], nis: tableData[index][1], namaLengkap: tableData[index][2], namaOrangTua: tableData[index][3], kelas: tableData[index][4]})}>
    //         <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
    //     </TouchableOpacity>
    // );
    
	return (
        <ScrollView>
            <View style={styles.container}>
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }} >
                    <View style={{ width: '45%' }}>
                        <DropDownPicker
                            items={optListTingkat}
                            defaultValue={pencarianTingkat}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setPencarianTingkat(item.value)}
                        />

                        <View style={{ marginBottom: '10%' }}></View>

                        {/* <DropDownPicker
                            items={optDariTanggal}
                            defaultValue={pencarianDariTanggal}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setPencarianDariTanggal(item.value)}
                        /> */}

                        <TouchableOpacity onPress={showDatepickerDari}>
                            <View style={{ backgroundColor: '#fafafa', borderColor: '#dedede', borderRadius: 5, borderWidth: 1, padding: 8 }}>
                                <Text>{toISOLocal(pencarianDariTanggal).slice(0,10)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
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

                        <View style={{ marginBottom: '10%' }}></View>

                        <TouchableOpacity onPress={showDatepickerSampai}>
                            <View style={{ backgroundColor: '#fafafa', borderColor: '#dedede', borderRadius: 5, borderWidth: 1, padding: 8 }}>
                                <Text>{toISOLocal(pencarianSampaiTanggal).slice(0,10)}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* <DropDownPicker
                            items={optSampaiTanggal}
                            defaultValue={pencarianSampaiTanggal}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setPencarianSampaiTanggal(item.value)}
                        /> */}
                    </View>
                </View>

                {showDari == true ?
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={pencarianDariTanggal}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDari}
                    />
                :
                    <View></View>
                }

                {showSampai == true ?
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={pencarianSampaiTanggal}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeSampai}
                    />
                :
                    <View></View>
                }

                <TouchableOpacity onPress={presensiHandler} style={{ backgroundColor: 'white', padding: 10, borderWidth: 1, borderColor: core.primaryColor, borderRadius: 10, width: '70%', alignSelf: 'center', opacity: .8, marginBottom: 20, marginTop: '10%' }}>
                    <View>
                        <Text style={{ color: core.primaryColor, textAlign: 'center' }}>Cari Data</Text>
                    </View>
                </TouchableOpacity>

                {presensiData.length > 0 ?
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{namaSekolah}</Text>
                        <Text style={{ fontSize: 10 }}>{alamatSekolah}</Text>
                        <Text style={{ fontSize: 10 }}>Telp: {telp}</Text>
                        <Text style={{ fontSize: 10 }}>Website: {website}</Text>
                    </View>
                :
                    <View></View>
                }

                {presensiData.length > 0 ?
                <ScrollView horizontal={true} style={{ height: '100%' }}>
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
                                                    <Cell style={{ width: widthArr[cellIndex] }} key={cellIndex} data={cellData} textStyle={styles.text}/>
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

                <KeteranganFooter text1="Jika terdapat ketidaksesuaian data, mohon untuk" text2="menghubungi operator*" />
            </View>
        </ScrollView>
    );
}

Presensi.navigationOptions = navigationData => {
	return {
        headerTitle: 'Data Presensi',
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

export default Presensi;