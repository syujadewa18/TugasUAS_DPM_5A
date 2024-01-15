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

const btnProductDetail = props => {
  	return (
    	<TouchableOpacity 
			onPress={
                () => {
                    props.navigation.navigate('ProductsOverview')
                }
            }
		>
			<Text style={{ marginLeft: 25 }}><Ionicons name='ios-arrow-back' size={25} color={core.primaryColor} /></Text>
		</TouchableOpacity>
  	);
};

export default btnProductDetail;
