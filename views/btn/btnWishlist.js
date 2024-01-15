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
import core from '../../core/core';
import { Ionicons } from '@expo/vector-icons';

const btnWishlist = props => {
  	return (
    	<TouchableOpacity 
			activeOpacity={0.7}
			onPress={
                () => {
                    props.navigation.navigate('Notifikasi')
                }
            }
		>
			<Text style={{ marginRight: 25 }}><Ionicons name='ios-notifications' size={25} color={core.primaryColor} /></Text>
		</TouchableOpacity>
  	);
};

export default btnWishlist;
