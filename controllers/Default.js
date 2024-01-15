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

const slides = [
    {
        title: 'Buah & Sayur Berkualitas, \nSehat & Segar',
        // subtitle: 'Buah dan Sayur Berkualitas\nHarga tidak mahal tetapi\ntidak murahan',
        image: require('../assets/creekgarden/intro/1-group.png'),
        imageBg: require('../assets/creekgarden/intro/1.png'),
    },
    {
        title: 'Pesanan Anda \nlebih cepat sampai',
        // subtitle: 'Cepat pelayanannya,\nCepat sampainya\nAman Buah dan Sayurnya',
        image: require('../assets/creekgarden/intro/2-group.png'),
        imageBg: require('../assets/creekgarden/intro/2.png'),
    },
    {
        title: 'Kini berbelanja lebih mudah,\nbersih dan indah',
        // subtitle: 'Beli buah dan sayur lebih\nmudah, cepat, higienis\ndan segar sampai tujuan',
        image: require('../assets/creekgarden/intro/3-group.png'),
        imageBg: require('../assets/creekgarden/intro/3.png'),
    },
];

const ProductsOverview = props => {
    return props.navigation.navigate('ProductsOverview')

    const [afterSplash, setAfterSplash] = useState([]);
    const [fontLoaded, setFontLoaded] = useState(false);
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
    
        setTimeout(async () => {
            if (mounted.current) {
                await Font.loadAsync({'poppins-regular-home': require('../assets/creekgarden/font/Poppins-Regular.ttf')});
                await Font.loadAsync({'poppins-bold-home': require('../assets/creekgarden/font/Poppins-Bold.ttf')});
                setFontLoaded(true);
            }
        }, 1000);
    
        return function cleanup() {
            mounted.current = false;
        }
    }, []);

    if (afterSplash.length == 0) {
        AsyncStorage.getItem("afterSplash").then((data) => {
            console.log(data)
            if (data && data != '[]') {
                setAfterSplash(['already_splashed']);
            }
        });
    }
    if (afterSplash.length > 0) {
        return props.navigation.navigate('LandingPage')
    }

    const _renderItem = ({ item }) => {
        return (
            <View style={{flex: 1, marginTop: "-20%"}}>
                <ImageBackground source={item.imageBg} resizeMode="cover" style={styles.imageBg}>
                    <SafeAreaView style={styles.slide}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Image source={item.image} style={styles.image} resizeMode="contain" />
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        );
    }
    const _onDone = async () => {
        await AsyncStorage.setItem('afterSplash', JSON.stringify(['already_splashed']))
        props.navigation.navigate('LandingPage');
    }
    const _renderNextButton = () => {
        return (
            <View style={styles.buttonContainer}>
                {/* <TouchableOpacity style={styles.button}> */}
                    <Text style={styles.buttonText}>Lewati</Text>
                {/* </TouchableOpacity> */}
            </View>
        );
    };
    const _renderDoneButton = () => {
        return (
            <View style={styles.buttonContainer}>
                {/* <TouchableOpacity style={styles.button}> */}
                    <Text style={styles.buttonText}>Selesai</Text>
                {/* </TouchableOpacity> */}
            </View>
        );
    };  
    if (afterSplash.length == 0) {
        if (!fontLoaded) {
            return <AppLoading/>
        }

        return (
            <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} bottomButton={true} renderDoneButton={_renderDoneButton} renderNextButton={_renderNextButton} />
        );
    }

}
ProductsOverview.navigationOptions = {
    headerShown: false,
    tabBarVisible: false
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: 96,
    },
    image: {
        width: 350,
        height: 350,
        marginTop: Platform.OS == 'android' ? '20%' : '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 23,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'poppins-bold-home',
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'poppins-regular-home',
    },
    imageBg: {
        flex: 1,
        justifyContent: "center"
    },
    buttonContainer: {
        // flexDirection: 'row',
        flex: 1,
        marginHorizontal: 24,
        paddingVertical: 15,
        marginHorizontal: '20%',
        borderWidth: 1,
        // borderRadius: 24,
        borderRadius: 10,
        borderColor: 'white',
    },
    // button: {
    //     // flex: 1,
    //     // paddingVertical: 20,
    //     // marginHorizontal: 8,
    //     // borderRadius: 24,
    //     // borderWidth: 1,
    //     // borderRadius: 10,
    //     // borderColor: 'white'
    // },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default ProductsOverview;