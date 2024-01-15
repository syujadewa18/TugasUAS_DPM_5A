import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
    Image
} from 'react-native';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';

const DefaultOverview = props => {
    props.navigation.navigate('ProductsOverview');

    return (
		<View><Text>Hi</Text></View>
  	);
}

export default DefaultOverview;