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
import Card from '../form/Card';
import core from '../../core/core';
import { Ionicons } from '@expo/vector-icons';

const defaultNotLogin = props => {
  	return (
    	<View style={styles.gradient}>
            <Card style={styles.authContainer}>
                <Image style={{ height: 200, width: '100%', resizeMode: 'contain', marginBottom: 30 }}  source={require('../../assets/defaultShow.png')} />
                <Text style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>Silahkan login terlebih dahulu untuk menggunakan fitur pengawas disekolah.id</Text>
            </Card>
        </View>
  	);
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 600,
        padding: 20
    },
    buttonContainer: {
        marginTop: 30
    },

    gradientAfterLogin: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    alreadyLoginContainer: {
        width: '100%',
        padding: 0,
    },
    authContainerAfterLogin: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 600,
        padding: 20,
        marginTop: '20%'
    },
});

export default defaultNotLogin;
