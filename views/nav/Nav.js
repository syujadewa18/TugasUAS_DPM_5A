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
	AsyncStorage,
	Dimensions
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import core from '../../core/core';
import BottomTabBar from "react-navigation-selective-tab-bar";
import CartBottomNavigator from "../nav/BottomNavigation"
// import { hasNotch } from 'react-native-device-info';

import ProductsOverview from '../../controllers/ProductsOverview';
import LandingPage from '../../controllers/LandingPage';
import Home from '../../controllers/Home';
import Login from '../../controllers/Login';
import Login2 from '../../controllers/Login2';
import Register from '../../controllers/Register';
import ForgotPassword from '../../controllers/ForgotPassword';
import SendOtp from '../../controllers/SendOtp';
import CreatePassword from '../../controllers/CreatePassword';
import CreatePasswordSuccess from '../../controllers/CreatePasswordSuccess';
import CreekPoin from '../../controllers/CreekPoin';
import Voucher from '../../controllers/Voucher';
import KebijakanPrivasi from '../../controllers/KebijakanPrivasi';
import Bantuan from '../../controllers/Bantuan';
import ListAddress from '../../controllers/ListAddress';
import AddressDetail from '../../controllers/AddressDetail';
import AddressAdd from '../../controllers/AddressAdd';
import AddressMap from '../../controllers/AddressMap';
import Inbox from '../../controllers/Inbox';
import Webview from '../../controllers/Webview';
import Profile from '../../controllers/Profile';
import PickupController from '../../controllers/PickupController';
import ServiceController from '../../controllers/ServiceController';
import PickupConfirmController from '../../controllers/PickupConfirmController';
import ServiceControllerDropOff from '../../controllers/ServiceControllerDropOff';
import DropOffConfirmController from '../../controllers/DropOffConfirmController';
import CartController from '../../controllers/CartController';
import CheckoutController from '../../controllers/CheckoutController';
import ConfirmDeliveryController from '../../controllers/ConfirmDeliveryController';
import OrderController from '../../controllers/OrderController';
import OrderDetailController from '../../controllers/OrderDetailController';
import ReviewController from '../../controllers/ReviewController';
import DriverDeliveryController from '../../controllers/DriverDeliveryController';

const defaultNavSettings = {
	headerStyle: {
		backgroundColor: '#F6F0E4',
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
		backgroundColor: '#FFFFFF',
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
		ProductsOverview: ProductsOverview,
		Home: Home,
		PickupController: PickupController,
		ServiceController: ServiceController,
		PickupConfirmController: PickupConfirmController,
		ServiceControllerDropOff: ServiceControllerDropOff,
		DropOffConfirmController: DropOffConfirmController,
		OrderDetailController: OrderDetailController,
		ReviewController: ReviewController,
		OrderController: OrderController,
		LandingPage: LandingPage,
		Register: Register,
		ForgotPassword: ForgotPassword,
		SendOtp: SendOtp,
		CreatePassword: CreatePassword,
		CreatePasswordSuccess: CreatePasswordSuccess,
		DriverDeliveryController: DriverDeliveryController,
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

const CartNavigator = createStackNavigator(
	{
		CartController: CartController,
		CheckoutController: CheckoutController,
		ConfirmDeliveryController: ConfirmDeliveryController,
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
		Login2: Login2,
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

const mainNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeNavigator,
			navigationOptions: {
				tabBarLabel: ' ',
				tabBarIcon: ({ focused }) => {
					const image = focused
						? require('../../assets/new/home.png')
						: require('../../assets/new/home.png')
					return (
						<Image
							source={image}
							style={{ height: 25, width: 25, marginTop: 10 }}
						/>
					)
				},
			},
		},
		Cart: {
			screen: CartNavigator,
			navigationOptions: {
				tabBarLabel: ' ',
				tabBarIcon: ({ focused }) => {
					const image = focused
						? require('../../assets/new/cart.png')
						: require('../../assets/new/cart.png')
					return (
						<Image
							source={image}
							style={{ height: 35, width: 35, marginTop: 10 }}
						/>
					)
				},
			},
		},
		Profile: {
			screen: UserNavigator,
			navigationOptions: {
				tabBarLabel: ' ',
				tabBarIcon: ({ focused }) => {
					const image = focused
						? require('../../assets/new/profile.png')
						: require('../../assets/new/profile.png')
					return (
						<Image
							source={image}
							style={{ height: 25, width: 25, marginTop: 10 }}
						/>
					)
				},
			},
		}
	},
	{
		tabBarComponent: props => {
			return (
				<View style={{ backgroundColor: '#FFFFFF', margin: 20, }}>
					<View style={{ borderWidth: 2, borderColor: 'white', borderRadius: 20, backgroundColor: '#7F7F7F', padding: 10 }}>
						<BottomTabBar
							{...props} // Required
							display={["Home", "Kategori", "Cart", "Notifikasi", "Profile"]}
							activeTintColor='#000'
							inactiveTintColor='#000'
							style={{ marginBottom: Platform.OS == 'ios' ? 25 : 0, backgroundColor: '#7F7F7F' }}
						/>
					</View>
				</View>
			);
		}
	}
);

export default createAppContainer(mainNavigator);