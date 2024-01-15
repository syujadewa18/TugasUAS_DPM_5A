import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
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
    Alert,
    SafeAreaView,
    Dimensions
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as mAuth from '../models/action/mAuth';
import Spinner from 'react-native-loading-spinner-overlay';
// import { RadioButton } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const landingPageData = {
    image: require('../assets/creekgarden/creekpoin/background.png'),
    tips: require('../assets/creekgarden/creekpoin/tips.png'),
    text: 'YUK IKUT PARTISIPASI DALAM MENYAMBUT\nHARI KEMERDEKAAN INDONESIA YANG KE-76',
    btn1: 'PROMO BUAH CREEK GARDEN\nDiskon sampai 50 % Lho',
    btn2: 'SAYURAN SEGAR\nGratis Ongkos Kirim',
    btn1Href: '',
    btn2Href: '',
}

const LandingPage = props => {
    function rupiah(number) {
        try {
            var	reverse = number.toString().split('').reverse().join(''),
            ribuan 	= reverse.match(/\d{1,3}/g);
            ribuan	= ribuan.join('.').split('').reverse().join('');
            
            return ribuan;   
        } catch (error) {
            return 0;
        }
    }

    const [error, setError] = useState();
    useEffect(() => {
        if (error) {
            Alert.alert('Gagal', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    const heightDevice = Dimensions.get('window').height + 300;
    const isCheckout = props.navigation.getParam('isCheckout')
    const metodePengiriman = props.navigation.getParam('metodePengiriman')
    const totalBelanja = props.navigation.getParam('totalBelanja')
    const [couponCode, setCouponCode] = useState('')
    const couponCodeHandler = text => {
        setCouponCode(text);
    }

    function arrayColumn(array, columnName) {
        return array.map(function(value,index) {
            return value[columnName];
        })
    }

    const dispatch = useDispatch();
    const [selectedVoucher, setSelectedVoucher] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let userLogin = useSelector(state => state.auth.user);
    let voucherData = []
    let voucherDataArr = [];
    let selectedVoucherArr = [];
    useEffect(() => {
        const loadVoucher = async () => {
            setIsLoading(true);
            await dispatch(mAuth.voucherGet(userLogin.id));
            setIsLoading(false);
        };
        loadVoucher();
    }, []); 
    let svoucherData = useSelector(state => state.auth.voucher);
    if (svoucherData) {
        voucherData = svoucherData
    }
    let sSelectedVoucher = useSelector(state => state.auth.selectedvoucher);
    if (sSelectedVoucher) {
        selectedVoucherArr = sSelectedVoucher
    }

    const useVoucher = async () => {
        if (selectedVoucherArr.length > 0 && !selectedVoucher) {
            Alert.alert('Sukses', `Voucher berhasil digunakan`, [{ text: 'Ok' }]);

        } else if (selectedVoucher) {
            const _selectedVoucher = await voucherData.filter((item) => item.id == selectedVoucher)
            await dispatch(mAuth.useVoucher(_selectedVoucher));
            Alert.alert('Sukses', `Voucher berhasil digunakan`, [{ text: 'Ok' }]);

        } else {
            Alert.alert('Gagal', `Harap untuk memilih voucher terlebih dahulu`, [{ text: 'Ok' }]);
            return;
        }
    }
    const useKodePromo = async () => {
        if (!couponCode) {
            Alert.alert('Gagal', `Harap mengisi Kode Promo terlebih dahulu`, [{ text: 'Ok' }]);
            return;
        }
        
        try {
            await dispatch(mAuth.useKodePromo(couponCode, metodePengiriman, totalBelanja, userLogin.id));
            await setCouponCode('')
            Alert.alert('Sukses', `Kode Promo berhasil digunakan`, [{ text: 'Ok' }]);
            return;
        } catch (error) {
            await dispatch(mAuth.batalKodePromo());
            Alert.alert('Gagal', error.message, [{ text: 'Ok' }]);
            return;
        }
    }
    const hapusKodePromo = async () => {
        await dispatch(mAuth.batalKodePromo());
        Alert.alert('Sukses', `Kode Promo berhasil dihapus`, [{ text: 'Ok' }]);
    }
    const hapusVoucher = async () => {
        await dispatch(mAuth.batalVoucher());
        await setSelectedVoucher(0)
        Alert.alert('Sukses', `Voucher berhasil dihapus`, [{ text: 'Ok' }]);
    }

    const selectedPromo = useSelector(state => {
        const result = {
            kodePromo: state.auth.selectedKodePromo,
            nominalPromo: state.auth.selectedNominalPromo
        };
        return result;
    });

    const renderGridItem = (data) => {
        let item = data.item;
        item.label = item.title;
        
		return (
            <View style={{ marginBottom: 20 }}>
                <View style={{ marginBottom: 5 }}>
                    <RadioForm animation={true}>
                        <RadioButton labelHorizontal={true} key={item.id}>
                            <RadioButtonInput
                                obj={item}
                                index={item.id}
                                isSelected={selectedVoucher ? selectedVoucher === item.id : selectedVoucherArr.length > 0 ? arrayColumn(selectedVoucherArr, "id").includes(item.id) : selectedVoucher === item.id}
                                borderWidth={1}
                                buttonInnerColor={'#6BB745'}
                                buttonOuterColor={selectedVoucher === item.id ? '#6BB745' : '#6BB745'}
                                buttonSize={20}
                                buttonOuterSize={28}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}
                                onPress={() => {
                                    setSelectedVoucher(item.id)
                                }}
                            />
                            <RadioButtonLabel
                                obj={item}
                                index={item.id}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 14, color: '#000', fontFamily: 'poppins-regular'}}
                                labelWrapStyle={{}}
                                onPress={() => {
                                    setSelectedVoucher(item.id)
                                }}
                            />
                        </RadioButton>
                    </RadioForm>
                </View>
                <Image source={{uri: item.image}} style={{ width: '100%', height: undefined, aspectRatio: 2.07 / 1, }} resizemode="contain" />
            </View>
		);
	}
    
    return (
        <ScrollView>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />

            <View style={{ backgroundColor: '#fff', marginTop: 0, paddingVertical: 20, paddingHorizontal: 30 }}>
                {isCheckout == 'true' ? (<View>
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#6BB745',
                        borderRadius: 10,
                        padding: 10,
                    }}>
                        <TextInput
                            onChangeText={couponCodeHandler}
                            placeholder={'Masukkan kode promo'}
                            style={styles.input}
                            value={couponCode}
                        />
                    </View>

                    {selectedPromo.kodePromo != "" ? (<View style={{ backgroundColor: '#E1F1DA', padding: 15, marginTop: 10, borderRadius: 10 }}>
                        <Text style={{ fontFamily:'poppins-semi-bold', color: '#000' }}>Kode Promo: {selectedPromo.kodePromo}</Text>
                        <Text style={{ fontFamily:'poppins-regular', color: '#000' }}>Potongan Harga: Rp {rupiah(selectedPromo.nominalPromo ? selectedPromo.nominalPromo : 0)}</Text>
                    </View>) : (<View></View>)}
                    
                    {selectedPromo.kodePromo != "" ?
                    (
                        <TouchableOpacity onPress={hapusKodePromo}>
                            <View style={{ marginTop: 35, width: Platform.OS == 'android' ? '55%' : '50%', height: 45, backgroundColor: '#D43346', borderRadius: 10, alignSelf: 'center' }}>
                                <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 10, textAlign: 'center' }}>Hapus Kode Promo</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    :
                    (
                        <TouchableOpacity onPress={useKodePromo}>
                            <View style={{ marginTop: 35, width: Platform.OS == 'android' ? '55%' : '50%', height: 45, backgroundColor: '#6BB745', borderRadius: 10, alignSelf: 'center' }}>
                                <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 10, textAlign: 'center' }}>Gunakan Kode Promo</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    }

                    <View style={{ marginVertical: 20, borderBottomColor: '#6BB745', borderBottomWidth: 1 }}></View>
                </View>) : (<View></View>)}

                <FlatList
                    keyExtractor={ (data, index) => data.id}
                    data={voucherData}
                    renderItem={renderGridItem}
                    numColumns={1}
                />
                {voucherData.length > 0 ?
                (<><TouchableOpacity onPress={useVoucher}>
                    <View style={{ marginTop: 35, width: Platform.OS == 'android' ? '55%' : '50%', height: 45, backgroundColor: '#6BB745', borderRadius: 10, alignSelf: 'center' }}>
                        <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 10, textAlign: 'center' }}>Gunakan Voucher</Text>
                    </View>
                </TouchableOpacity>
                
                {
                    selectedVoucherArr.length > 0 ?
                    (
                        <TouchableOpacity onPress={hapusVoucher}>
                            <View style={{ marginTop: 15, width: Platform.OS == 'android' ? '55%' : '50%', height: 45, backgroundColor: '#D43346', borderRadius: 10, alignSelf: 'center' }}>
                                <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 10, textAlign: 'center' }}>Hapus Voucher</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    :
                    (
                        <View></View>
                    )
                }
                </>) :
                (<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '25%' }}>
                    <Image style={{ width: 200, height: 200 }} resizeMode="contain" source={require('../assets/creekgarden/voucher/default.png')} />
                    <Text style={{ marginTop: 20, fontFamily: 'poppins-semi-bold', fontSize: 16, textAlign: 'center' }}>Yah voucher tidak ditemukan</Text>
                    <Text style={{ fontFamily: 'poppins-regular', fontSize: 14, textAlign: 'center' }}>buka terus aplikasi Creek Garden temukan voucher dilain waktu</Text>
                </View>)}
            </View>
        </ScrollView>
    );

}
LandingPage.navigationOptions = {
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Voucher Saya</Text>,
    headerTitleAlign: 'center',
    headerTintColor: '#000',
    headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 0.84 / 1,
    },
    text: {
        fontFamily: 'poppins-semibold-landing',
        color: '#397A18',
        fontWeight: '300',
        textAlign: 'center',
        marginTop: '5%'
    },
    imageBg: {
        // flex: 1,
        justifyContent: "center",
        padding: '5%'
    },
    imageBg2: {
        // flex: 1,
        justifyContent: "center",
        marginTop: '4%',
        padding: '5%'
    },

    input: {
        // paddingHorizontal: 12,
        paddingVertical: 0,
        // borderBottomColor: '#008bca',
        // borderBottomWidth: 1
        // borderRadius: 5,
        // borderColor: '#6BB745',
        // borderWidth: 1,
        marginTop: 0,
        // marginBottom: 15,
        fontFamily: "poppins-regular",
        // marginLeft: 12,
        width: 320,
    },
});

export default LandingPage;