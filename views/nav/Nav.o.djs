import React, { useState } from 'react';
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
	Alert,
	AsyncStorage
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import core from '../../core/core';
import BottomTabBar from "react-navigation-selective-tab-bar";

// Creekgarden
import ProductsOverview from '../../controllers/ProductsOverview'; // Slide Intro
import LandingPage from '../../controllers/LandingPage'; // Landing Page
import Home from '../../controllers/Home'; // Home
import ListProduct from '../../controllers/ListProduct'; // List Product By Category
import ListProductSearch from '../../controllers/ListProductSearch'; // List Product By Search
import ListProductPromo from '../../controllers/ListProductPromo'; // List Product By Promo
import ProductDetailNew from '../../controllers/ProductDetailNew'; // Product Detail
import Pembayaran from '../../controllers/Pembayaran'; // Pembayaran
import Payment from '../../controllers/Payment'; // Pembayaran
import PaymentV2 from '../../controllers/PaymentV2'; // Pembayaran
import PembayaranSukses from '../../controllers/PembayaranSukses'; // Pembayaran
import PembayaranSuksesV2 from '../../controllers/PembayaranSuksesV2'; // Pembayaran
import Transaksi from '../../controllers/Transaksi'; // Transaksi
import Orderdetail from '../../controllers/Orderdetail'; // Order detail
import Review from '../../controllers/Review'; // Review

import Login from '../../controllers/Login';
import Register from '../../controllers/Register';
import ForgotPassword from '../../controllers/ForgotPassword';
import CreekPoin from '../../controllers/CreekPoin';
import Voucher from '../../controllers/Voucher';
import KebijakanPrivasi from '../../controllers/KebijakanPrivasi';
import Bantuan from '../../controllers/Bantuan';

// Product
import ProductDetail from '../../controllers/ProductDetail';

// Cart
import Cart from '../../controllers/Cart';
import Checkout from '../../controllers/Checkout';
import WishList from '../../controllers/WishList';
import ListAddress from '../../controllers/ListAddress';
import AddressDetail from '../../controllers/AddressDetail';
import AddressAdd from '../../controllers/AddressAdd';
import AddressMap from '../../controllers/AddressMap';
import Inbox from '../../controllers/Inbox';
import Webview from '../../controllers/Webview';
import ListShippings from '../../controllers/ListShippings';

// User
import Profile from '../../controllers/Profile';

const defaultNavSettings = {
	headerStyle: {
		backgroundColor: '#FFFFFF'
	},
	headerTitleStyle: {
		fontSize: 18,
		fontWeight: '100'
	},
	cardStyle: { 
		backgroundColor: '#FFFFFF' 
	}
};
const defaultNavSettingsCart = {
	headerStyle: {
		backgroundColor: '#FFFFFF'
	},
	headerTitleStyle: {
		fontSize: 18,
		fontWeight: '100'
	},
	cardStyle: { 
		backgroundColor: '#FFFFFF' 
	}
};

const HomeNavigator = createStackNavigator(
	{
		// Creekgarden
		// Default: Default,
		ProductsOverview: ProductsOverview,
		// PembayaranSukses: PembayaranSukses,
		Home: Home,
		LandingPage: LandingPage,
		// ListProduct: ListProduct,
		ListProductSearch: ListProductSearch,
		ListProductPromo: ListProductPromo,
		ProductDetailNew: ProductDetailNew,
		ListAddress: ListAddress,
		AddressAdd: AddressAdd,
		AddressDetail: AddressDetail,
		AddressMap: AddressMap,
		Inbox: Inbox,

		// etc
		CreekPoin: CreekPoin,
		Voucher: Voucher,
	},
	{
		defaultNavigationOptions: defaultNavSettings
	}
);
HomeNavigator.navigationOptions = ({ navigation }) => {
	let _tabBarVisible = false;
	if (navigation.state.routes[navigation.state.index].routeName == 'Home') {
		_tabBarVisible = true;
	}
    return {
        tabBarVisible: _tabBarVisible,
    };
};

const KategoriNavigator = createStackNavigator(
	{
		// Home: Home,
		ListProduct: ListProduct,
		ListProductSearch: ListProductSearch,
		ProductDetailNew: ProductDetailNew,
		ListAddress: ListAddress,
		AddressAdd: AddressAdd,
		AddressDetail: AddressDetail,
		AddressMap: AddressMap,
		Inbox: Inbox,
	},
	{
		defaultNavigationOptions: defaultNavSettings
	}
);
KategoriNavigator.navigationOptions = ({ navigation }) => {
	const _tabBarVisible = navigation.state.index > 0 ? false : true;
	// const _tabBarVisible = true;
    return {
        tabBarVisible: _tabBarVisible,
    };
};

const PembayaranWebivewNavigator = createStackNavigator(
	{
		Cart: Cart,
		Payment: Payment,
		PembayaranSukses: PembayaranSukses,
		PaymentV2: PaymentV2,
		PembayaranSuksesV2: PembayaranSuksesV2,
	},
	{
		defaultNavigationOptions: defaultNavSettings
	}
);
PembayaranWebivewNavigator.navigationOptions = ({ navigation }) => {
	const _tabBarVisible = navigation.state.index > 0 ? false : true;
	// const _tabBarVisible = false;
    return {
        tabBarVisible: _tabBarVisible,
    };
};

const NotifikasiNavigator = createStackNavigator(
	{
		Transaksi: Transaksi,
		Orderdetail: Orderdetail,
		Review: Review,
	},
	{
		defaultNavigationOptions: defaultNavSettings
	}
);
NotifikasiNavigator.navigationOptions = ({ navigation }) => {
	const _tabBarVisible = navigation.state.index > 0 ? false : true;
	// const _tabBarVisible = true;
    return {
        tabBarVisible: _tabBarVisible,
    };
};

const CartNavigator = createStackNavigator(
	{
		Cart: Cart,
		Checkout: Checkout,
		ListAddress: ListAddress,
		AddressAdd: AddressAdd,
		AddressDetail: AddressDetail,
		Voucher: Voucher,
		Pembayaran: Pembayaran,
		ProductDetailNew: ProductDetailNew,
	},
	{
		defaultNavigationOptions: defaultNavSettingsCart
	}
);
CartNavigator.navigationOptions = ({ navigation }) => {
	const _tabBarVisible = navigation.state.index > 0 ? false : true;
	// const _tabBarVisible = true;
    return {
        tabBarVisible: _tabBarVisible,
    };
};

const UserNavigator = createStackNavigator(
	{
		Login: Login,
		Register: Register,
		Profile: Profile,
		ForgotPassword: ForgotPassword,
		CreekPoin: CreekPoin,
		Voucher: Voucher,
		KebijakanPrivasi: KebijakanPrivasi,
		Bantuan: Bantuan,
		ListAddress: ListAddress,
		AddressAdd: AddressAdd,
		AddressDetail: AddressDetail,
		AddressMap: AddressMap,
		Inbox: Inbox,
		Webview: Webview,
	},
	{
		defaultNavigationOptions: defaultNavSettings
	}
);
UserNavigator.navigationOptions = ({ navigation }) => {
	const _tabBarVisible = navigation.state.index > 0 ? false : true;
	// const _tabBarVisible = true;
    return {
        tabBarVisible: _tabBarVisible,
    };
};

// const mainNavigator = createBottomTabNavigator(
// 	{
// 		Default: {
// 			screen: DefaultNavigator,
// 			navigationOptions: {
// 				tabBarVisible: false
// 			},
// 		},
// 		Home: {
// 			screen: HomeNavigator,
// 			navigationOptions: {
// 				tabBarLabel: 'Beranda',
// 				tabBarIcon: ({ focused }) => {
// 					const image = focused
// 					? require('../../assets/creekgarden/navigation/homeak.png')
// 					: require('../../assets/creekgarden/navigation/homedis.png')
// 					return (
// 						<Image
// 							source={image}
// 							style={{ height:36, width:36 }}
// 						/>
// 					)
// 				}
// 			},
// 		},
// 		KritikSaran: {
// 			screen: KategoriNavigator,
// 			navigationOptions: {
// 				tabBarLabel: 'Kategori',
// 				tabBarIcon: ({ focused }) => {
// 					const image = focused
// 					? require('../../assets/creekgarden/navigation/kategoriak.png')
// 					: require('../../assets/creekgarden/navigation/kategoridis.png')
// 					return (
// 						<Image
// 							source={image}
// 							style={{ height:36, width:36 }}
// 						/>
// 					)
// 				}
// 			},
// 		},
// 		Notifikasi: {
// 			screen: NotifikasiNavigator,
// 			navigationOptions: {
// 				tabBarLabel: 'Transaksi',
// 				tabBarIcon: ({ focused }) => {
// 					const image = focused
// 					? require('../../assets/creekgarden/navigation/tranak.png')
// 					: require('../../assets/creekgarden/navigation/trandis.png')
// 					return (
// 						<Image
// 							source={image}
// 							style={{ height:36, width:36 }}
// 						/>
// 					)
// 				}
// 			},
// 		},
// 		Profile: {
// 			screen: UserNavigator,
// 			navigationOptions: {
// 				tabBarLabel: 'Akun',
// 				tabBarIcon: ({ focused }) => {
// 					const image = focused
// 					? require('../../assets/creekgarden/navigation/profieak.png')
// 					: require('../../assets/creekgarden/navigation/profiedis.png')
// 					return (
// 						<Image
// 							source={image}
// 							style={{ height:36, width:36 }}
// 						/>
// 					)
// 				}
// 			},
// 		},
// 		// Profile: {
// 		// 	screen: UserNavigator,
// 		// 	navigationOptions: {
// 		// 		tabBarLabel: 'Akun',
// 		// 		tabBarIcon: (tabInfo) => {
// 		// 			return <Ionicons name='ios-person' size={25} color={tabInfo.tintColor} />;
// 		// 		},
// 		// 	},
// 		// },
// 	},
// 	{
// 		tabBarOptions: {
// 			activeTintColor: '#000',
// 			showLabel: true
// 		}
// 	}
// )

const mainNavigator = createBottomTabNavigator(
	{
		// Default: {
		// 	screen: DefaultNavigator
		// },
	  	Home: {
			screen: HomeNavigator,
			navigationOptions: {
				tabBarLabel: 'Beranda',
				tabBarIcon: ({ focused }) => {
					const image = focused
					? require('../../assets/creekgarden/navigation/homeak.png')
					: require('../../assets/creekgarden/navigation/homedis.png')
					return (
						<Image
							source={image}
							style={{ height:36, width:36 }}
						/>
					)
				}
			},
	  	},
		Pembayaran: {
			screen: PembayaranWebivewNavigator,
	  	},
	  	Kategori: {
			screen: KategoriNavigator,
			navigationOptions: {
				tabBarLabel: 'Kategori',
				tabBarIcon: ({ focused }) => {
					const image = focused
					? require('../../assets/creekgarden/navigation/kategoriak.png')
					: require('../../assets/creekgarden/navigation/kategoridis.png')
					return (
						<Image
							source={image}
							style={{ height:36, width:36 }}
						/>
					)
				}
			},
	  	},
		Cart: {
			screen: CartNavigator,
			navigationOptions: {
				tabBarLabel: () => null,
				tabBarIcon: ({ focused }) => {
					const image = focused
					? require('../../assets/creekgarden/navigation/keranjanghomekos.png')
					: require('../../assets/creekgarden/navigation/keranjanghomekos.png')
					return (
						<>
							<View
								style={{
								// position: 'absolute',
								bottom: 30, // space from bottombar
								height: 100,
								width: 100,
								borderRadius: 58,
								// backgroundColor: '#5a95ff',
								justifyContent: 'center',
								alignItems: 'center',
								zIndex: 999999
								}}>
								<Image
									source={image}
									style={{ height: 65, width: 65 }}
									resizeMode="contain"
								/>
							</View>
						</>
					)
				},
			},
	  	},
	  	Notifikasi: {
			screen: NotifikasiNavigator,
			navigationOptions: {
				tabBarLabel: 'Transaksi',
				tabBarIcon: ({ focused }) => {
					const image = focused
					? require('../../assets/creekgarden/navigation/tranak.png')
					: require('../../assets/creekgarden/navigation/trandis.png')
					return (
						<Image
							source={image}
							style={{ height:36, width:36 }}
						/>
					)
				}
			},
	  	},
	  	Profile: {
			screen: UserNavigator,
			navigationOptions: {
				tabBarLabel: 'Akun',
				tabBarIcon: ({ focused }) => {
					const image = focused
					? require('../../assets/creekgarden/navigation/profieak.png')
					: require('../../assets/creekgarden/navigation/profiedis.png')
					return (
						<Image
							source={image}
							style={{ height:36, width:36 }}
						/>
					)
				},
			},
	  	}
	},
	// {
	// 	tabBarOptions: {
	// 		inactiveTintColor: '#000',
	// 		activeTintColor: '#000',
	// 		showLabel: true,
	// 		zIndex: 9999,
	// 		style: {
	// 			height: 200
	// 		}
	// 	}
	// },
	{
	  	tabBarComponent: props => {
			return (
				<BottomTabBar
					{...props} // Required
					display={["Home", "Kategori", "Cart", "Notifikasi", "Profile"]}
					activeTintColor='#000'
					inactiveTintColor='#000'
					style={{ position: 'absolute', height: 10, width: '100%', marginTop: '-10%', backgroundColor: '#FFF', zIndex: 1 }}
				/>
			);
	  	}
	}
);

// AsyncStorage.getItem("userLogin").then((user) => {
// 	if (user == '[]' || !user) {
// 		DefaultNavigator.navigationOptions = ({ navigation }) => {
// 			return {
// 				tabBarVisible: false,
// 			};
// 		};
// 		KritikSaranNavigator.navigationOptions = ({ navigation }) => {
// 			return {
				// tabBarVisible: false,
// 			};
// 		};
// 		NotifikasiNavigator.navigationOptions = ({ navigation }) => {
// 			return {
// 				tabBarVisible: false,
// 			};
// 		};
// 		UserNavigator.navigationOptions = ({ navigation }) => {
// 			return {
// 				tabBarVisible: false,
// 			};
// 		};
// 	}
// });

export default createAppContainer(mainNavigator);