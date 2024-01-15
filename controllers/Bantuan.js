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
    useWindowDimensions
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as mAuth from '../models/action/mAuth';
import Spinner from 'react-native-loading-spinner-overlay';
// import { RadioButton } from 'react-native-paper';
import { List } from 'react-native-paper';

const landingPageData = {
    image: require('../assets/creekgarden/creekpoin/background.png'),
    tips: require('../assets/creekgarden/creekpoin/tips.png'),
    text: 'YUK IKUT PARTISIPASI DALAM MENYAMBUT\nHARI KEMERDEKAAN INDONESIA YANG KE-76',
    btn1: 'PROMO BUAH CREEK GARDEN\nDiskon sampai 50 % Lho',
    btn2: 'SAYURAN SEGAR\nGratis Ongkos Kirim',
    btn1Href: '',
    btn2Href: '',
}

const LandingPage = () => {
    const window = useWindowDimensions();
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const styles = StyleSheet.create({
        image: {
            width: 200,
            height: undefined,
            aspectRatio: 0.62 / 1,
            alignSelf: 'flex-end',
            // position: 'absolute',
            // right: 0,
            // zIndex: 0,
            // elevation: 0,
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
    });
    return (
        <ScrollView>
            <List.Section title="">
                <List.Accordion
                    title="Hubungi Kami"
                    titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15, color: '#000' }}
                    style={{backgroundColor: '#fff', borderBottomColor: '#E1F1DA', borderBottomWidth: 1}}
                >
                    <List.Item titleStyle={{ fontFamily: 'poppins-semi-bold', fontSize: 18, color: '#6BB745' }} title="Customer Service Creek Garden" />
                    <List.Item titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15, marginTop: -25 }} title="WhatsApp: +6287777575231" />
                    <List.Item style={{borderBottomColor: '#E1F1DA', marginTop: -25, borderBottomWidth: 1}}  titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15 }} title="Email: admin@creekgarden.co.id" />
                </List.Accordion>
                
                <List.Accordion
                    title="Informasi Produk"
                    titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15, color: '#000' }}
                    style={{backgroundColor: '#fff', borderBottomColor: '#E1F1DA', borderBottomWidth: 1}}
                >
                    <List.Item titleStyle={{ fontFamily: 'poppins-semi-bold', fontSize: 18, color: '#6BB745' }} title="Informasi Produk" />
                    <List.Item style={{borderBottomColor: '#E1F1DA', marginTop: -25, borderBottomWidth: 1}}  titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15 }} title="Dapat ditemukan langsung melalui website creekgarden.co.id ataupun aplikasi Creekgarden" titleNumberOfLines={99} />
                </List.Accordion>

                <List.Accordion
                    title="Status Pemesanan"
                    titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15, color: '#000' }}
                    style={{backgroundColor: '#fff', borderBottomColor: '#E1F1DA', borderBottomWidth: 1}}
                >
                    <List.Item titleStyle={{ fontFamily: 'poppins-semi-bold', fontSize: 18, color: '#6BB745' }} title="Status Pemesanan" />
                    <List.Item style={{borderBottomColor: '#E1F1DA', marginTop: -25, borderBottomWidth: 1}}  titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15 }} title="Status Pemesanan dapat dilihat langsung melalui website creekgarden.co.id ataupun aplikasi Creekgarden" titleNumberOfLines={99} />
                </List.Accordion>

                <List.Accordion
                    title="Pengembalian Dana"
                    titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15, color: '#000' }}
                    style={{backgroundColor: '#fff', borderBottomColor: '#E1F1DA', borderBottomWidth: 1}}
                >
                    <List.Item titleStyle={{ fontFamily: 'poppins-semi-bold', fontSize: 18, color: '#6BB745' }} title="Pengembalian Dana" />
                    <List.Item style={{borderBottomColor: '#E1F1DA', marginTop: -25, borderBottomWidth: 1}}  titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15 }} title="Mohon untuk menghubungi kami, apabila ingin mengajukan pengembalian dana melalui Email / Whatsapp yang sudah tertera" titleNumberOfLines={99} />
                </List.Accordion>

                <List.Accordion
                    title="Metode Pembayaran"
                    titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15, color: '#000' }}
                    style={{backgroundColor: '#fff', borderBottomColor: '#E1F1DA', borderBottomWidth: 1}}
                >
                    <List.Item titleStyle={{ fontFamily: 'poppins-semi-bold', fontSize: 18, color: '#6BB745' }} title="Metode Pembayaran" />
                    <List.Item style={{borderBottomColor: '#E1F1DA', marginTop: -25, borderBottomWidth: 1}}  titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15 }} title="Semua metode pembayaran yang kami sediakan dapat digunakan, dan sewaktu-waktu dapat berubah sesuai syarat dan ketentuan yang berlaku" titleNumberOfLines={99} />
                </List.Accordion>

                <List.Accordion
                    title="Voucher & Poin"
                    titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15, color: '#000' }}
                    style={{backgroundColor: '#fff', borderBottomColor: '#E1F1DA', borderBottomWidth: 1}}
                >
                    <List.Item titleStyle={{ fontFamily: 'poppins-semi-bold', fontSize: 18, color: '#6BB745' }} title="Voucher & Poin" />
                    <List.Item style={{borderBottomColor: '#E1F1DA', marginTop: -25, borderBottomWidth: 1}} titleStyle={{ fontFamily: 'poppins-regular', fontSize: 15 }} title="Voucher & Poin dapat digunakan berupa potongan diskon ketika berbelanja melalui website creekgarden.co.id ataupun aplikasi Creekgarden dan tidak dapat diuangkan" titleNumberOfLines={99} />
                </List.Accordion>
            </List.Section>

            <Image source={require('../assets/creekgarden/bantuan/background.png')} resizeMode="contain" style={styles.image} />
        </ScrollView>
    );
};
LandingPage.navigationOptions = {
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Bantuan</Text>,
    headerTitleAlign: 'center',
    headerTintColor: '#000',
    headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
};

export default LandingPage;