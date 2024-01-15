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
    SafeAreaView
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { WebView } from 'react-native-webview';
import * as mAuth from '../models/action/mAuth';
import Spinner from 'react-native-loading-spinner-overlay';
// import { RadioButton } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as Linking from 'expo-linking';

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
    const url = props.navigation.getParam('url');
    const handleWebViewNavigationStateChange = (newNavState) => {
        const { url } = newNavState;
        if (url.includes('gojek')) {
            Linking.openURL(url);
            // const newURL = props.navigation.getParam('url');
            // const redirectTo = 'window.location = "' + newURL + '"';
            // injectJavaScript(redirectTo)
        }
    }

    return (
        <WebView 
            originWhitelist={['gojek://']}
            style={styles.container}
            source={{ uri: url }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
        />
    );

}
LandingPage.navigationOptions = navigationData => {
    return {
        headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Halaman Pembayaran</Text>,
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        // headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
        headerLeft: <></>,
        headerRight: <TouchableOpacity onPress={() => navigationData.navigation.navigate('PembayaranSukses', {totalTagihan: navigationData.navigation.getParam('totalTagihan')})}><Text style={{ textAlign: 'center', fontSize: 12, color: '#000', marginRight: 12, fontFamily: 'poppins-semi-bold'}}>Tutup</Text></TouchableOpacity>,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
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
});

export default LandingPage;