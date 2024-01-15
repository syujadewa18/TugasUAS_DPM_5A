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
import Spinner from 'react-native-loading-spinner-overlay';

import * as mAkademik from '../models/action/mAkademik';
import * as mKepegawaian from '../models/action/mKepegawaian';

const PesertaDidik = props => {
    const dispatch = useDispatch();
    const selectedMenuId = props.navigation.getParam('menuId') ? props.navigation.getParam('menuId') : 'pegawai';
    
    const [isLoading, setIsLoading] = useState(false);

    let _data = [];
    let pegawaiData = [];
    if (selectedMenuId == 'pegawai') {
        pegawaiData = useSelector(state => state.pegawai.pegawai);
    } else if (selectedMenuId == 'manajemen') {
        pegawaiData = useSelector(state => state.pegawai.manajemen);
    } else if (selectedMenuId == 'pengawas') {
        pegawaiData = useSelector(state => state.pegawai.pengawas);
    } else if (selectedMenuId == 'operator') {
        pegawaiData = useSelector(state => state.pegawai.operator);
    } else if (selectedMenuId == 'guru') {
        pegawaiData = useSelector(state => state.pegawai.guru);
    } else if (selectedMenuId == 'guru_piket') {
        pegawaiData = useSelector(state => state.pegawai.guru_piket);
    }

    let userLogin = useSelector(state => state.auth.user);
    const idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    const tmpSekolahData = useSelector(state => state.akademik.sekolahData);
    
    /* useEffect(() => {
        dispatch(mKepegawaian.fetchKepegawaian(idSekolah));
    }, []); */
    useEffect(() => {
        const loadKepegawaian = async () => {
            setIsLoading(true);
            await dispatch(mKepegawaian.fetchKepegawaian(idSekolah));
            await dispatch(mAkademik.fetchSekolah(idSekolah));
            setIsLoading(false);
        };
        loadKepegawaian();
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

    if (pegawaiData == null || !pegawaiData) {
        pegawaiData = [];
    }

    if (pegawaiData.length > 0) {
        for (let i = 0; i < pegawaiData.length; i++) {
            const noItem = parseInt(i) + 1;
            const item = pegawaiData[i];
            
            if (selectedMenuId == 'pegawai') {
                _data.push(
                    [
                        noItem,
                        item.nama,
                        item.nip,
                        '',
                    ]
                );  
            
            } else if (selectedMenuId == 'manajemen') {
                _data.push(
                    [
                        noItem,
                        item.nama_manajemen,
                        item.jabatan,
                        '2019/2020',
                        item.status == 1 ? 'Aktif' : 'Tidak Aktif',
                        item.keterangan,
                        // '',
                    ]
                );  
            
            } else if (selectedMenuId == 'pengawas') {
                _data.push(
                    [
                        noItem,
                        item.nama,
                        item.grup_user,
                        '2019/2020',
                        '',
                    ]
                );  
            
            } else if (selectedMenuId == 'operator') {
                _data.push(
                    [
                        noItem,
                        item.nama,
                        item.grup_user,
                        '2019/2020',
                        '',
                    ]
                );  
            
            } else if (selectedMenuId == 'guru') {
                _data.push(
                    [
                        noItem,
                        item.nama_pengajar,
                        item.kategori_pengajar,
                        '',
                    ]
                );  
            
            } else if (selectedMenuId == 'guru_piket') {
                _data.push(
                    [
                        noItem,
                        item.nama_pengajar,
                        'Guru Piket',
                        '2019/2020',
                        '',
                    ]
                );  
            }          
        }
    }

    let tableHead = [];
    let widthArr = [];
    let selectedCellIndex;
    if (selectedMenuId == 'pegawai') {
        tableHead = ['No', 'Nama', 'NIP', 'Detail'];
        widthArr = [40, 120, 120, 80];
        selectedCellIndex = 3;
    } else if (selectedMenuId == 'manajemen') {
        // tableHead = ['No', 'Nama Pegawai', 'Jabatan', 'Tahun Ajaran', 'Status', 'Keterangan', 'Detail'];
        // widthArr = [40, 90, 70, 80, 60, 90, 80];
        // selectedCellIndex = 6;

        tableHead = ['No', 'Nama Pegawai', 'Jabatan', 'Tahun Ajaran', 'Status', 'Keterangan'];
        widthArr = [40, 90, 70, 80, 60, 90];
        selectedCellIndex = 9;
    } else if (selectedMenuId == 'pengawas') {
        tableHead = ['No', 'Nama Pegawai', 'Fungsional', 'Tahun Ajaran', 'Lihat Detail'];
        widthArr = [40, 90, 70, 60, 80];
        selectedCellIndex = 4;
    } else if (selectedMenuId == 'operator') {
        tableHead = ['No', 'Nama Pegawai', 'Fungsional', 'Tahun Ajaran', 'Lihat Detail'];
        widthArr = [40, 90, 70, 60, 80];
        selectedCellIndex = 4;
    } else if (selectedMenuId == 'guru') {
        tableHead = ['No', 'Nama', 'NIP', 'Detail'];
        widthArr = [40, 120, 120, 80];
        selectedCellIndex = 3;
    } else if (selectedMenuId == 'guru_piket') {
        tableHead = ['No', 'Nama Pegawai', 'Fungsional', 'Tahun Ajaran', 'Lihat Detail'];
        widthArr = [40, 90, 70, 60, 80];
        selectedCellIndex = 4;
    }
    
    let arrTableData = [];
    if (_data.length > 0) {
        arrTableData = _data;
    }
    
    const [pencarianVal, setPencarian] = useState('');
    const textChangeHandler = text => {
        setPencarian(text);
    };

    let tableData = [];
    if (pencarianVal) {
        if (selectedMenuId == 'pegawai') {
            tableData = arrTableData.filter(o => 
                o[1].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[2].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1
            );
        
        } else if (selectedMenuId == 'manajemen') {
            tableData = arrTableData.filter(o => 
                o[1].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[2].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[3].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[4].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[5].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1
            );
        
        } else if (selectedMenuId == 'pengawas') {
            tableData = arrTableData.filter(o => 
                o[1].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[2].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[3].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1
            );
        
        } else if (selectedMenuId == 'operator') {
            tableData = arrTableData.filter(o => 
                o[1].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[2].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[3].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1
            );
        
        } else if (selectedMenuId == 'guru') {
            tableData = arrTableData.filter(o => 
                o[1].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[2].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1
            );
        
        } else if (selectedMenuId == 'guru_piket') {
            tableData = arrTableData.filter(o => 
                o[1].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[2].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1 ||
                o[3].toLowerCase().indexOf(pencarianVal.toLowerCase()) > -1
            );
        }

    } else {
        tableData = arrTableData;
    }

    const ketText = 'Menampilkan '+tableData.length+' dari '+arrTableData.length+' data pegawai';
    let element;

    if (selectedMenuId == 'pegawai') {
        element = (data, index) => (
            <TouchableOpacity 
                onPress={() => 
                    props.navigation.navigate('KepegawaianDetail', 
                        {
                            idSekolah: pegawaiData[index]['id_sekolah'] ? pegawaiData[index]['id_sekolah'] : '-', 
                            email: pegawaiData[index]['email'] ? pegawaiData[index]['email'] : '-',
                            handphone: pegawaiData[index]['handphone'] ? pegawaiData[index]['handphone'] : '-',
                            noIdentitas: pegawaiData[index]['no_identitas'] ? pegawaiData[index]['no_identitas'] : '-',
                            namaLengkap: pegawaiData[index]['nama'] ? pegawaiData[index]['nama'] : '-',
                            gelarAwal: pegawaiData[index]['gelar_awal'] ? pegawaiData[index]['gelar_awal'] : '-',
                            gelarAkhir: pegawaiData[index]['gelar_akhir'] ? pegawaiData[index]['gelar_akhir'] : '-',
                            tempatLahir: pegawaiData[index]['tempat_lahir'] ? pegawaiData[index]['tempat_lahir'] : '-',
                            tanggalLahir: pegawaiData[index]['tgl_lahir'] == '0000-00-00' || !pegawaiData[index]['tgl_lahir'] ? '-' : pegawaiData[index]['tgl_lahir'],
                            agama: pegawaiData[index]['agama'] ? pegawaiData[index]['agama'] : '-',
                            foto: pegawaiData[index]['foto'] ? pegawaiData[index]['foto'] : '-',
                            nik: pegawaiData[index]['nik'] ? pegawaiData[index]['nik'] : '-',
                            nip: pegawaiData[index]['nip'] ? pegawaiData[index]['nip'] : '-',
                            alamat: pegawaiData[index]['alamat'] ? pegawaiData[index]['alamat'] : '-',
                            idUser: pegawaiData[index]['id'] ? pegawaiData[index]['id'] : '-',
                            status: pegawaiData[index]['status'] == 1 ? 'Aktif' : 'Tidak Aktif',
                        }
                    )
                }
            >    
                <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
            </TouchableOpacity>
        );
    
    } else if (selectedMenuId == 'manajemen') {
        element = (data, index) => (
            <TouchableOpacity 
                // onPress={() => 
                //     props.navigation.navigate('KepegawaianDetail', 
                //         {
                //             id: tableData[index][0], 
                //             namaLengkap: tmpSiswaData[index]['nama'] ? tmpSiswaData[index]['nama'] : '-', 
                //             nis: tmpSiswaData[index]['nis'] ? tmpSiswaData[index]['nis'] : '-',
                //             kelas: tmpSiswaData[index]['kelas'] ? tmpSiswaData[index]['kelas'] : '-',
                //             alamat: tmpSiswaData[index]['alamat'] ? tmpSiswaData[index]['alamat'] : '-',
                //             nisn: tmpSiswaData[index]['nisn'] ? tmpSiswaData[index]['nisn'] : '-',
                //             tempatLahir: tmpSiswaData[index]['tempat_lahir'] ? tmpSiswaData[index]['tempat_lahir'] : '-',
                //             tanggalLahir: tmpSiswaData[index]['tgl_lahir'] == '0000-00-00' || !tmpSiswaData[index]['tgl_lahir'] ? '-' : tmpSiswaData[index]['tgl_lahir'],
                //             telp: tmpSiswaData[index]['handphone'] ? tmpSiswaData[index]['handphone'] : '-',
                //             kategoriUser: tmpSiswaData[index]['kategori_user'] ? tmpSiswaData[index]['kategori_user'] : 'Reguler',
                //             status: tmpSiswaData[index]['status'] == 1 ? 'Aktif' : 'Tidak Aktif',
                //             namaOrangTua: tableData[index][3],
                //             pekerjaanOrangTua: tmpSiswaData[index]['pekerjaan_ayah'] ? tmpSiswaData[index]['pekerjaan_ayah'] : tmpSiswaData[index]['pekerjaan_ibu'] ? tmpSiswaData[index]['pekerjaan_ibu'] : '-',
                //             nikOrangTua: tmpSiswaData[index]['nik_orang_tua'] ? tmpSiswaData[index]['nik_orang_tua'] : '-',
                //             telpOrangTua: tmpSiswaData[index]['telp_orang_tua'] ? tmpSiswaData[index]['telp_orang_tua'] : '-',
                //         }
                //     )
                // }
            >    
                <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
            </TouchableOpacity>
        );
    
    } else if (selectedMenuId == 'pengawas') {
        element = (data, index) => (
            <TouchableOpacity 
                onPress={() => 
                    props.navigation.navigate('PengawasDetail', 
                        {
                            namaLengkap: pegawaiData[index]['nama'] ? pegawaiData[index]['nama'] : '-', 
                            email: pegawaiData[index]['email'] ? pegawaiData[index]['email'] : '-',
                            handphone: pegawaiData[index]['handphone'] ? pegawaiData[index]['handphone'] : '-',
                            noIdentitas: pegawaiData[index]['no_identitas'] ? pegawaiData[index]['no_identitas'] : '-',
                            gelarAwal: pegawaiData[index]['gelar_awal'] ? pegawaiData[index]['gelar_awal'] : '-',
                            gelarAkhir: pegawaiData[index]['gelar_akhir'] ? pegawaiData[index]['gelar_akhir'] : '-',
                            tempatLahir: pegawaiData[index]['tempat_lahir'] ? pegawaiData[index]['tempat_lahir'] : '-',
                            tanggalLahir: pegawaiData[index]['tgl_lahir'] == '0000-00-00' || !pegawaiData[index]['tgl_lahir'] ? '-' : pegawaiData[index]['tgl_lahir'],
                            agama: pegawaiData[index]['agama'] ? pegawaiData[index]['agama'] : '-',
                            foto: pegawaiData[index]['foto'] ? pegawaiData[index]['foto'] : '-',
                            nik: pegawaiData[index]['nik'] ? pegawaiData[index]['nik'] : '-',
                            nip: pegawaiData[index]['nip'] ? pegawaiData[index]['nip'] : '-',
                            alamat: pegawaiData[index]['alamat'] ? pegawaiData[index]['alamat'] : '-',
                            status: pegawaiData[index]['status'] == 1 ? 'Aktif' : 'Tidak Aktif',
                            idPegawai: pegawaiData[index]['id_pegawai'] ? pegawaiData[index]['id_pegawai'] : 0,
                        }
                    )
                }
            >    
                <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
            </TouchableOpacity>
        );
    
    } else if (selectedMenuId == 'operator') {
        element = (data, index) => (
            <TouchableOpacity 
                onPress={() => 
                    props.navigation.navigate('OperatorDetail', 
                        {
                            idSekolah: pegawaiData[index]['id_sekolah'] ? pegawaiData[index]['id_sekolah'] : '-', 
                            email: pegawaiData[index]['email'] ? pegawaiData[index]['email'] : '-',
                            handphone: pegawaiData[index]['handphone'] ? pegawaiData[index]['handphone'] : '-',
                            noIdentitas: pegawaiData[index]['no_identitas'] ? pegawaiData[index]['no_identitas'] : '-',
                            namaLengkap: pegawaiData[index]['nama'] ? pegawaiData[index]['nama'] : '-',
                            gelarAwal: pegawaiData[index]['gelar_awal'] ? pegawaiData[index]['gelar_awal'] : '-',
                            gelarAkhir: pegawaiData[index]['gelar_akhir'] ? pegawaiData[index]['gelar_akhir'] : '-',
                            tempatLahir: pegawaiData[index]['tempat_lahir'] ? pegawaiData[index]['tempat_lahir'] : '-',
                            tanggalLahir: pegawaiData[index]['tgl_lahir'] == '0000-00-00' || !pegawaiData[index]['tgl_lahir'] ? '-' : pegawaiData[index]['tgl_lahir'],
                            agama: pegawaiData[index]['agama'] ? pegawaiData[index]['agama'] : '-',
                            foto: pegawaiData[index]['foto'] ? pegawaiData[index]['foto'] : '-',
                            nik: pegawaiData[index]['nik'] ? pegawaiData[index]['nik'] : '-',
                            nip: pegawaiData[index]['nip'] ? pegawaiData[index]['nip'] : '-',
                            alamat: pegawaiData[index]['alamat'] ? pegawaiData[index]['alamat'] : '-',
                            idUser: pegawaiData[index]['id'] ? pegawaiData[index]['id'] : '-',
                            status: pegawaiData[index]['status'] == 1 ? 'Aktif' : 'Tidak Aktif',
                        }
                    )
                }
            >    
                <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
            </TouchableOpacity>
        );
    
    } else if (selectedMenuId == 'guru') {
        element = (data, index) => (
            <TouchableOpacity 
                onPress={() => 
                    props.navigation.navigate('GuruDetail', 
                        {
                            idSekolah: pegawaiData[index]['id_sekolah'] ? pegawaiData[index]['id_sekolah'] : '-', 
                            namaSekolah: pegawaiData[index]['nama_sekolah'] ? pegawaiData[index]['nama_sekolah'] : '-',
                            idUser: pegawaiData[index]['id_user'] ? pegawaiData[index]['id_user'] : '-',
                            kelas: pegawaiData[index]['kelas'] ? pegawaiData[index]['kelas'] : '-',
                            idKelas: pegawaiData[index]['id_kelas'] ? pegawaiData[index]['id_kelas'] : '-',
                            namaMapel: pegawaiData[index]['nama_mapel'] ? pegawaiData[index]['nama_mapel'] : '-',
                            idMapel: pegawaiData[index]['id_mapel'] ? pegawaiData[index]['id_mapel'] : '-',
                            nip: pegawaiData[index]['nip'] ? pegawaiData[index]['nip'] : '-',
                            namaPengajar: pegawaiData[index]['nama_pengajar'] ? pegawaiData[index]['nama_pengajar'] : '-',
                            kategoriPengajar: pegawaiData[index]['kategori_pengajar'] ? pegawaiData[index]['kategori_pengajar'] : '-',
                            keterangan: pegawaiData[index]['keterangan'] ? pegawaiData[index]['keterangan'] : '-',
                            status: pegawaiData[index]['status'] == 1 ? 'Aktif' : 'Tidak Aktif',
                            foto: pegawaiData[index]['foto'] ? pegawaiData[index]['foto'] : '-',
                        }
                    )
                }
            >    
                <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
            </TouchableOpacity>
        );
    } else if (selectedMenuId == 'guru_piket') {
        element = (data, index) => (
            <TouchableOpacity 
                onPress={() => 
                    props.navigation.navigate('GuruPiketDetail', 
                        {
                            idSekolah: pegawaiData[index]['id_sekolah'] ? pegawaiData[index]['id_sekolah'] : '-', 
                            namaSekolah: pegawaiData[index]['nama_sekolah'] ? pegawaiData[index]['nama_sekolah'] : '-',
                            email: pegawaiData[index]['email'] ? pegawaiData[index]['email'] : '-',
                            handphone: pegawaiData[index]['handphone'] ? pegawaiData[index]['handphone'] : '-',
                            noIdentitas: pegawaiData[index]['no_identitas'] ? pegawaiData[index]['no_identitas'] : '-',
                            namaLengkap: pegawaiData[index]['nama'] ? pegawaiData[index]['nama'] : '-',
                            gelarAwal: pegawaiData[index]['gelar_awal'] ? pegawaiData[index]['gelar_awal'] : '-',
                            gelarAkhir: pegawaiData[index]['gelar_akhir'] ? pegawaiData[index]['gelar_akhir'] : '-',
                            tempatLahir: pegawaiData[index]['tempat_lahir'] ? pegawaiData[index]['tempat_lahir'] : '-',
                            tanggalLahir: pegawaiData[index]['tgl_lahir'] ? pegawaiData[index]['tgl_lahir'] : '-',
                            agama: pegawaiData[index]['agama'] ? pegawaiData[index]['agama'] : '-',
                            foto: pegawaiData[index]['foto'] ? pegawaiData[index]['foto'] : '-',
                            nik: pegawaiData[index]['nik'] ? pegawaiData[index]['nik'] : '-',
                            nip: pegawaiData[index]['nip'] ? pegawaiData[index]['nip'] : '-',
                            alamat: pegawaiData[index]['alamat'] ? pegawaiData[index]['alamat'] : '-',
                            idUser: pegawaiData[index]['id_user'] ? pegawaiData[index]['id_user'] : '-',
                            kelas: pegawaiData[index]['kelas'] ? pegawaiData[index]['kelas'] : '-',
                            keterangan: pegawaiData[index]['keterangan'] ? pegawaiData[index]['keterangan'] : '-',
                            status: pegawaiData[index]['status'] == 1 ? 'Aktif' : 'Tidak Aktif',
                        }
                    )
                }
            >    
                <Text style={{ textAlign: 'center' }}><Ionicons name='ios-search' size={20} color={core.primaryColor} /></Text>
            </TouchableOpacity>
        );
    }

    const menuData = [
        {
            'id': 'pegawai',
            'name': 'Data Kepegawaian'
        },
        {
            'id': 'manajemen',
            'name': 'Data Manajemen'
        },
        {
            'id': 'pengawas',
            'name': 'Data Pengawas'
        },
        {
            'id': 'operator',
            'name': 'Data Operator'
        },
        {
            'id': 'guru',
            'name': 'Data Guru'
        },
        {
            'id': 'guru_piket',
            'name': 'Data Guru Piket'
        }
    ];

	return (
        <ScrollView>
            <View style={styles.container}>
                {/* <KeteranganHeader text1="Tahun Ajaran adalah data 1 tahun" text2="terhitung dari awal hingga akhir tahun ajaran" /> */}
                
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <ScrollView horizontal={true} style={{ paddingHorizontal: 0, marginTop: 0, height: 65 }}>
                    {menuData.map(
                        r => 
                            selectedMenuId == r.id ?
                                r.id == 'guru_piket' ? 
                                <TouchableOpacity onPress={() => {props.navigation.navigate('Kepegawaian', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, marginRight: 30, textAlign: 'center', backgroundColor: core.primaryColor, color: 'white' }}>{r.name}</Text></TouchableOpacity> : 
                                r.id == 'pegawai' ?
                                <TouchableOpacity onPress={() => {props.navigation.navigate('Kepegawaian', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 0, textAlign: 'center', backgroundColor: core.primaryColor, color: 'white' }}>{r.name}</Text></TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {props.navigation.navigate('Kepegawaian', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, textAlign: 'center', backgroundColor: core.primaryColor, color: 'white' }}>{r.name}</Text></TouchableOpacity>
                            :
                                r.id == 'guru_piket' ? 
                                <TouchableOpacity onPress={() => {props.navigation.navigate('Kepegawaian', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, marginRight: 30, textAlign: 'center' }}>{r.name}</Text></TouchableOpacity> : 
                                r.id == 'pegawai' ?
                                <TouchableOpacity onPress={() => {props.navigation.navigate('Kepegawaian', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 0, textAlign: 'center' }}>{r.name}</Text></TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {props.navigation.navigate('Kepegawaian', {menuId: r.id})}} style={{ height: 50 }}><Text style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: core.primaryColor, marginLeft: 10, textAlign: 'center' }}>{r.name}</Text></TouchableOpacity>
                    )} 
                </ScrollView>

                <Text style={styles.label}>Masukkan kata pencarian</Text>
                <TextInput
                    style={styles.input}
                    value={pencarianVal}
                    onChangeText={textChangeHandler}
                />

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
                    <ScrollView>                       
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
                                                            <Cell 
                                                                style={{ width: widthArr[cellIndex] }} 
                                                                key={cellIndex} 
                                                                data={cellIndex === selectedCellIndex ? element(cellData, index) : cellData} 
                                                                textStyle={styles.text}    
                                                            />
                                                        ))
                                                    }
                                                </TableWrapper>
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </ScrollView>
                :
                    <ScrollView>
                        <DefaultView />
                    </ScrollView>
                }

                <KeteranganFooter text1={ketText} text2="" />
            </View>
        </ScrollView>
    );
}

PesertaDidik.navigationOptions = navigationData => {
	return {
        headerTitle: 'Data Kepegawaian',
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