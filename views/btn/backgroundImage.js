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

const BackgroundImage = ({ source, children, style, ...props }) => {
	return (
		<ImageBackground
		    source={source}
		    style={{flex: 1, width: null, height: null, ...style}}
		    {...props}
        >
		    {children}
		</ImageBackground>
	);
}

export default BackgroundImage;
