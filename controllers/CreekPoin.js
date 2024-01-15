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
import * as mAuth from '../models/action/mAuth';
import Spinner from 'react-native-loading-spinner-overlay';

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
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    let userLogin = useSelector(state => state.auth.user);
    let point = useSelector(state => state.auth.point);
    useEffect(() => {
        const loadPoint = async () => {
            setIsLoading(true);
            await dispatch(mAuth.fetchPoint(userLogin.id));
            setIsLoading(false);
        };
        loadPoint();
    }, []); 

    if (isLoading) {
        return (
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />
        );
    }
    
    return (
        <ScrollView>
            <ImageBackground source={landingPageData.image} resizeMode="contain" style={styles.image}>
                <View style={{ padding: 20, height: 300 }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, elevation: 5 }}>
                        <Text style={{ color: '#397A18', fontFamily: 'poppins-semi-bold', fontSize: 25 }}>{point} Poin</Text>
                        <Text style={{ marginTop: 10, fontFamily: 'poppins-regular' }}>Belanja yuk biar Creek Poin kamu bertambah</Text>
                        <TouchableOpacity
                            onPress={
                                () => {
                                    props.navigation.navigate('Home')
                                }
                            }
                        >
                            <View style={{ marginTop: 15, width: '50%', height: 45, backgroundColor: '#6BB745', borderRadius: 10 }}>
                                <Text style={{ color: '#FFF', fontFamily:'poppins-regular', marginTop: 10, textAlign: 'center' }}>Belanja Yuk</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={{ marginTop: -50, padding: 20, height: 250 }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, elevation: 5 }}>
                    <Image source={landingPageData.tips} style={{ width: 40, height: 40 }} resizeMode="contain" />
                    <Text style={{ marginTop: 10, fontFamily: 'poppins-semi-bold' }}>Tips Mendapatkan Creek Poin</Text>
                    <Text style={{ marginTop: 10, fontFamily: 'poppins-regular' }}>Kamu akan medapatkan 1 Creek Poin sebesar Rp. 100 yang nantinya bisa dibelanjakan lagi lho. Caranya dengan berbelanja minimum Rp. 10.000</Text>
                </View>
            </View>
        </ScrollView>
    );

}
LandingPage.navigationOptions = {
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Creek Poin</Text>,
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
});

export default LandingPage;