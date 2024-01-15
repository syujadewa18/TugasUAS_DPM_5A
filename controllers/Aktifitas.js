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
import CountDown from 'react-native-countdown-component';

import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { Ionicons } from '@expo/vector-icons';

import * as mProducts from '../models/action/mProducts';
import * as mPresensi from '../models/action/mPresensi';
import * as mAuth from '../models/action/mAuth';

const Aktifitas = props => {
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const [timer, setTimer] = useState(0);

    const handlerClick = async () => {
        // Alert.alert('Notification', 'Fitur ini masih dalam pengembangan.', [{ text: 'Ok' }]);
    };
    const handlerClickV2 = async () => {
        Alert.alert(
            "Konfirmasi",
            "Diperlukan waktu 3 menit untuk menampilkan data terbaru, apakah anda yakin?",
            [
                {
                    text: "Tidak",
                    style: "cancel"
                },
                { 
                    text: "Ya", 
                    onPress: async () => { 
                        await dispatch(mPresensi.fetchAktifitasRefresh(idSekolah));
                        setTimer(20)
                    }
                },
            ],
        );
    };
    const handlerClickV3 = async () => {
        await dispatch(mPresensi.fetchAktifitas(idSekolah));
        await setTimer(0)
        Alert.alert(
            "Notifikasi",
            "Data berhasil diperbarui!",
            [
                {
                    text: "Ok",
                },
            ],
        );
    };
    const handlerClickV4 = async () => {
        // Alert.alert('Notification', 'Fitur ini masih dalam pengembangan.', [{ text: 'Ok' }]);
    };

    let listData = [
        {
            "menuName": "Operator",
            "icon": require("../assets/aktifitas/aktif_operator.png"),
            "online": 0,
            "offline": 0,
        },
        {
            "menuName": "Guru",
            "icon": require("../assets/aktifitas/aktif_guru.png"),
            "online": 0,
            "offline": 0,
        },
        {
            "menuName": "Siswa",
            "icon": require("../assets/aktifitas/aktif_siswa.png"),
            "online": 0,
            "offline": 0,
        },
        {
            "menuName": "Orang Tua",
            "icon": require("../assets/aktifitas/aktif_ortu.png"),
            "online": 0,
            "offline": 0,
        },
        {
            "menuName": "Pengawas Internal",
            "icon": require("../assets/aktifitas/aktifitas_pengin.png"),
            "online": 0,
            "offline": 0,
        },
        {
            "menuName": "Pengawas Eksternal",
            "icon": require("../assets/aktifitas/aktifitas_pengeks.png"),
            "online": 0,
            "offline": 0,
        }
    ];

    const dispatch = useDispatch();
    
    let userLogin = useSelector(state => state.auth.user);
    let originListData = useSelector(state => state.presensi.aktifitas);

    let idSekolah = userLogin.id_sekolah == undefined ? 'abc123' : userLogin.id_sekolah;
    useEffect(() => {
        dispatch(mPresensi.fetchAktifitas(idSekolah));
    }, [dispatch]);

    if (originListData.length > 0) {
        const listOnlineUser = originListData[0];
        
        listData[0]['online'] = listOnlineUser.total_operator_online;
        listData[0]['offline'] = listOnlineUser.total_operator_offline;

        listData[1]['online'] = listOnlineUser.total_pengajar_online;
        listData[1]['offline'] = listOnlineUser.total_pengajar_offline;

        listData[2]['online'] = listOnlineUser.total_siswa_online;
        listData[2]['offline'] = listOnlineUser.total_siswa_offline;

        listData[3]['online'] = listOnlineUser.total_orang_tua_online;
        listData[3]['offline'] = listOnlineUser.total_orang_tua_offline;

        listData[4]['online'] = listOnlineUser.total_pengawas_internal_online;
        listData[4]['offline'] = listOnlineUser.total_pengawas_internal_offline;

        listData[5]['online'] = listOnlineUser.total_pengawas_eksternal_online;
        listData[5]['offline'] = listOnlineUser.total_pengawas_eksternal_offline;
    }

    // let userLogin = useSelector(state => state.auth.user);
    if (isEmpty(userLogin)) {
        AsyncStorage.getItem("userData").then((user) => {
            if (user !== null) {
                const alreadyLoggedIn = JSON.parse(user);
                if (alreadyLoggedIn.email && alreadyLoggedIn.password) {
                    dispatch(mAuth.login(alreadyLoggedIn.email, alreadyLoggedIn.password));
                }
            }
        });
    }

	const renderGridItem = (data) => {
        const item = data.item;
        
		return (
            <TouchableOpacity style={{ width: '40%', marginHorizontal: '5%', marginVertical: 10 }} onPress={handlerClick}>                
                <View>
                    {/* <View style={{width: '100%', backgroundColor: 'white', borderWidth: 1, borderRadius: 7, borderColor: core.primaryColor}}>
                        <Image 
                            style={{ height: 70, width: '100%', resizeMode: 'contain', marginVertical: 10}}  
                            source={item.icon} 
                        />
                        <Text style={{ textAlign: 'center', color: core.primaryColor, marginBottom: 10 }}>{item.menuName}</Text>
                    </View> */}
                    <Image 
                        style={{ height: 150, width: '100%', resizeMode: 'contain', marginVertical: 10}}  
                        source={item.icon} 
                    />

                    <View style={{
                        flexDirection: "row",
                        // backgroundColor: "#ddd",
                        backgroundColor: "white",
                        flex: 1,
                        justifyContent: "space-around",
                        // borderWidth: 1, 
                        // borderRadius: 7,
                        // borderColor: '#ddd',
                        borderColor: core.primaryColor,
                        marginTop: -10
                    }}>
                        <View style={{width: '50%'}}>
                            <View style={{
                                flexDirection: "row",
                                flex: 1,
                                justifyContent: "space-evenly",
                            }}>
                                <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#0f9d58', fontSize: 8 }}>●</Text>
                                <Text style={{ textAlign: 'center', color: '#0f9d58', fontSize: 15 }}>{item.online}</Text>
                            </View>
                        </View>
                        
                        <View style={{width: '50%', marginTop: 2}}>
                            <View style={{
                                flexDirection: "row",
                                flex: 1,
                                justifyContent: "space-evenly",
                            }}>
                                <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#db4437', fontSize: 8 }}>●</Text>
                                <Text style={{ textAlign: 'center', color: '#db4437', fontSize: 15 }}>{item.offline}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
		);
	}
	  
	return (
        <ScrollView>
            <FlatList
                keyExtractor={ (data, index) => data.id}
                data={listData}
                renderItem={renderGridItem}
                numColumns={2}
                style={{padding: 0}}
            />

            {timer > 0 ?
            <CountDown
                style={{ marginTop: '5%' }}
                until={timer}
                onFinish={handlerClickV3}
                digitStyle={{backgroundColor: core.primaryColor}}
                digitTxtStyle={{color: '#FFF'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: 'Menit', s: 'Detik'}}
                size={20}
            />
            : <Text></Text>}

            {/* {timer > 0 ?
            <TouchableOpacity onPress={handlerClickV4} style={{ color: 'white', backgroundColor: core.primaryColor, padding: 10, borderWidth: 2, borderColor: 'white', borderRadius: 10, width: '70%', alignSelf: 'center', marginBottom: '2%', marginTop: '2%' }}>
                <View>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Refresh</Text>
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={handlerClickV2} style={{ color: 'white', backgroundColor: core.primaryColor, padding: 10, borderWidth: 2, borderColor: 'white', borderRadius: 10, width: '70%', alignSelf: 'center', marginBottom: '2%', marginTop: '2%' }}>
                <View>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Refresh</Text>
                </View>
            </TouchableOpacity>} */}
            {/* <Text style={{ textAlign: 'center', fontSize: 10, fontStyle: 'italic', color: '#888', marginBottom: 20 }}>Untuk melihat data terbaru, silahkan klik refresh.</Text> */}
        </ScrollView>
  	);
}

Aktifitas.navigationOptions = navigationData => {
	return {
        headerTitle: 'Data Aktifitas',
        headerTintColor: core.primaryColor
	};
};

const styles = StyleSheet.create({
    
});

export default Aktifitas;