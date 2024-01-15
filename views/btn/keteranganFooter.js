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

const keteranganFooter = props => {
  	return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%', marginBottom: '5%' }}>
                <View style={{ flex: 1, height: 1, marginHorizontal: 100, backgroundColor: '#888' }} />
            </View>

            <Text style={{ textAlign: 'center', fontSize: 10, fontStyle: 'italic', color: '#888' }}>{props.text1}</Text>
            <Text style={{ textAlign: 'center', fontSize: 10, fontStyle: 'italic', color: '#888' }}>{props.text2}</Text>
        </View>
  	);
};

export default keteranganFooter;
