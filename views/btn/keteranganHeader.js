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

const keteranganHeader = props => {
  	return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 10, color: '#888' }}>{props.text1}</Text>
            {props.text2 ? <Text style={{ textAlign: 'center', fontSize: 10, color: '#888' }}>{props.text2}</Text> : <View></View>}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '6%', marginTop: '2%' }}>
                <View style={{ flex: 1, height: 1, marginHorizontal: 0, backgroundColor: core.primaryColor }} />
            </View>
        </View>
  	);
};

export default keteranganHeader;
