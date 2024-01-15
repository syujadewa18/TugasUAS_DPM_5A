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
    AsyncStorage,
    Alert
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
// import { DataTable, DataTableCell, DataTableRow, DataTablePagination } from 'material-bread';
import core from '../core/core';
import DefaultView from '../views/btn/defaultView';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import KeteranganHeader from '../views/btn/keteranganHeader';
import KeteranganFooter from '../views/btn/keteranganFooter';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import * as mAkademik from '../models/action/mAkademik';
import * as mAkademikV2 from '../models/action/mAkademikV2';
import * as mPesertaDidik from '../models/action/mPesertaDidik';

const PesertaDidik = props => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [pencarianTingkat, setPencarianTingkat] = useState('pilihTingkat');
    const [pencarianKelas, setPencarianKelas] = useState('pilihKelas');
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(2);
    
    let siswaData = [];
    let totalSiswaData = 0;

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
    
    const tingkatData = useSelector(state => state.akademik.tingkatData);
    const kelasData = useSelector(state => state.akademikv2.kelasData);

    const tmpSiswaData = useSelector(state => state.siswa.siswa);
    totalSiswaData = useSelector(state => state.siswa.total);

    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);
    
    useEffect(() => {
        dispatch(mAkademik.fetchTingkat(idSekolah));
        dispatch(mAkademikV2.fetchKelas(idSekolah));
    }, []);
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

    useEffect(() => {
        // const loadPesertaDidik = async () => {
        //     setIsLoading(true);
        //     await dispatch(mPesertaDidik.fetchPesertaDidik(idSekolah, 1));
        //     await dispatch(mAkademik.fetchSekolah(idSekolah));
        //     setIsLoading(false);
        // };
        // loadPesertaDidik();
    }, []);

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

    if (tmpSiswaData.length > 0) {
        for (let i = 0; i < tmpSiswaData.length; i++) {
            const noItem = parseInt(i) + 1;
            const item = tmpSiswaData[i];
            let namaOrtu = item.nama_ayah ? item.nama_ayah : item.nama_ibu;
            if (!namaOrtu) {
                namaOrtu = '-';
            }
            siswaData.push(
                [
                    noItem,
                    item.nis,
                    item.nama,
                    namaOrtu,
                    item.nama_kelas,
                    '',
                ]
            );            
        }
    }

    const tableHead = ['No', 'NIS', 'Nama Siswa', 'Orang Tua / Wali Murid', 'Kelas', 'Lihat Detail'];
    let arrTableData = [];
    if (siswaData.length > 0) {
        arrTableData = siswaData;
    }
    
    const [pencarianVal, setPencarian] = useState('');
    const textChangeHandler = text => {
        setPencarian(text);
    };
    const pesertaDidikHandler = async () => {
        if (pencarianKelas != 'pilihKelas') {
            await setIsLoading(true);
            const selIdSekolah = idSekolah;
            const selIdKelas = pencarianKelas;

            try {
                await dispatch(mPesertaDidik.fetchPesertaDidik(selIdSekolah, selIdKelas, 1));
            } catch (error) {
                Alert.alert('Error', error.message, [{ text: 'Ok' }]);
            }
            setIsLoading(false);
        
        } else {
            Alert.alert('Error', 'Harap lengkapi data terlebih dahulu.', [{ text: 'Ok' }]);
            setIsLoading(false);
        }
    };

    // const data = [
    //     {
    //       name: 'Frozen Yogurt',
    //       calories: '159',
    //       fat: '6.0',
    //       carbs: '24',
    //       protein: '4',
    //     },
    //     {
    //       name: 'Ice Cream Sandwhich',
    //       calories: '237',
    //       fat: '9.0',
    //       carbs: '37',
    //       protein: '4.3',
    //     },
    //     {
    //       name: 'Blizzard',
    //       calories: '480',
    //       fat: '3.4',
    //       carbs: '80',
    //       protein: '1',
    //     },
    //     {
    //       name: 'Frosty',
    //       calories: '200',
    //       fat: '2.0',
    //       carbs: '12',
    //       protein: '8',
    //     },
    //     {
    //       name: 'DillyBar',
    //       calories: '120',
    //       fat: '15',
    //       carbs: '30',
    //       protein: '10',
    //     },
    //     {
    //       name: 'PushPop',
    //       calories: '50',
    //       fat: '1',
    //       carbs: '2',
    //       protein: '2',
    //     },
    // ];

    let tableData = [];
    if (pencarianVal) {
        tableData = arrTableData.filter(o => 
            o[1].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
            o[2].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
            o[3].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
            o[4].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1
        );
    } else {
        tableData = arrTableData;
    }
    const widthArr = [40, 60, 140, 120, 80, 80];
    const ketText = 'Menampilkan '+tableData.length+' dari '+totalSiswaData+' data siswa';
    // const ketText = '';
    const element = (data, index) => (
        <TouchableOpacity 
            onPress={() => 
                props.navigation.navigate('PesertaDidikDetail', 
                    {
                        id: tableData[index][0], 
                        namaLengkap: tmpSiswaData[index]['nama'] ? tmpSiswaData[index]['nama'] : '-', 
                        nis: tmpSiswaData[index]['nis'] ? tmpSiswaData[index]['nis'] : '-',
                        kelas: tmpSiswaData[index]['nama_kelas'] ? tmpSiswaData[index]['nama_kelas'] : '-',
                        alamat: tmpSiswaData[index]['alamat'] ? tmpSiswaData[index]['alamat'] : '-',
                        nisn: tmpSiswaData[index]['nisn'] ? tmpSiswaData[index]['nisn'] : '-',
                        tempatLahir: tmpSiswaData[index]['tempat_lahir'] ? tmpSiswaData[index]['tempat_lahir'] : '-',
                        tanggalLahir: tmpSiswaData[index]['tgl_lahir'] == '0000-00-00' || !tmpSiswaData[index]['tgl_lahir'] ? '-' : tmpSiswaData[index]['tgl_lahir'],
                        telp: tmpSiswaData[index]['handphone'] ? tmpSiswaData[index]['handphone'] : '-',
                        kategoriUser: tmpSiswaData[index]['kategori_user'] ? tmpSiswaData[index]['kategori_user'] : 'Reguler',
                        status: tmpSiswaData[index]['status'] == 1 ? 'Aktif' : 'Tidak Aktif',
                        namaOrangTua: tableData[index][3],
                        pekerjaanOrangTua: tmpSiswaData[index]['pekerjaan_ayah'] ? tmpSiswaData[index]['pekerjaan_ayah'] : tmpSiswaData[index]['pekerjaan_ibu'] ? tmpSiswaData[index]['pekerjaan_ibu'] : '-',
                        nikOrangTua: tmpSiswaData[index]['nik_orang_tua'] ? tmpSiswaData[index]['nik_orang_tua'] : '-',
                        telpOrangTua: tmpSiswaData[index]['telp_orang_tua'] ? tmpSiswaData[index]['telp_orang_tua'] : '-',
                        foto: tmpSiswaData[index]['foto'] ? tmpSiswaData[index]['foto'] : '-',
                    }
                )
            }
        >    
            <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            {/* <KeteranganHeader text1="Tahun Ajaran adalah data 1 tahun" text2="terhitung dari awal hingga akhir tahun ajaran" /> */}  
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
                </View>
            </View>

            <TouchableOpacity onPress={pesertaDidikHandler} style={{ backgroundColor: 'white', padding: 10, borderWidth: 1, borderColor: core.primaryColor, borderRadius: 10, width: '70%', alignSelf: 'center', opacity: .8, marginBottom: 20, marginTop: '5%' }}>
                <View>
                    <Text style={{ color: core.primaryColor, textAlign: 'center' }}>Cari Data</Text>
                </View>
            </TouchableOpacity>

            {tableData.length > 0 ?
                <View>
                <Text style={styles.label}>Masukkan kata pencarian</Text>
                <TextInput
                    style={styles.input}
                    value={pencarianVal}
                    onChangeText={textChangeHandler}
                />
                </View>
            :
                <View></View>
            }

            {tableData.length > 0 ?
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{namaSekolah}</Text>
                    <Text style={{ fontSize: 10 }}>{alamatSekolah}</Text>
                    <Text style={{ fontSize: 10 }}>Telp: {telp}</Text>
                    <Text style={{ fontSize: 10 }}>Website: {website}</Text>
                </View>
            :
                <View></View>
            }
            
            {tableData.length > 0 ?
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
                                                    <Cell style={{ width: widthArr[cellIndex] }} key={cellIndex} data={cellIndex === 5 ? element(cellData, index) : cellData} textStyle={styles.text}/>
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

            <KeteranganFooter text1={ketText} text2="" />
            <View style={{ marginBottom: 50 }}></View>
        </ScrollView>
    );
      
    // return (
    //     <DataTable>
    //         <DataTableRow>
    //             <DataTableCell text={'Desert'} type={'header'} borderRight flex={2} />
    //             <DataTableCell text={'Calories'}  type={'header'}  right />
    //             <DataTableCell text={'Fat (g)'}  type={'header'}  right />
    //             <DataTableCell text={'Carbs (g)'}  type={'header'}  right />
    //             <DataTableCell text={'Protein (g)'}  type={'header'}  right />
    //         </DataTableRow>
    //         {data
    //           .slice(
    //             this.state.page * this.state.perPage,
    //             this.state.page * this.state.perPage + this.state.perPage,
    //           )
    //           .map(row => (
    //             <DataTableRow key={row.name}>
    //               <DataTableCell text={row.name} borderRight flex={2} />
    //               <DataTableCell text={row.calories} right />
    //               <DataTableCell text={row.fat} right />
    //               <DataTableCell text={row.carbs} right />
    //               <DataTableCell text={row.protein} right />
    //             </DataTableRow>
    //           ))}
  
    //         <DataTablePagination
    //           page={page}
    //           numberOfPages={data.length / perPage}
    //           numberOfRows={data.length}
    //           perPage={perPage}
    //           onChangePage={page => setPage(page)}
    //           onChangeRowsPerPage={perPage => setPerPage(perPage)}
    //           possibleNumberPerPage={[2,3,4,5, 6]}
    //         />
    //     </DataTable>
    // );
}

PesertaDidik.navigationOptions = navigationData => {
	return {
        headerTitle: 'Data Peserta Didik',
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

export default PesertaDidik;