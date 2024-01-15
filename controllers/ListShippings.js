import { StatusBar } from 'expo-status-bar';
import React, { useState, useReducer, useCallback, useEffect } from 'react';
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
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { ListItem, Body, Right, CardItem, Content, List, Icon } from 'native-base';
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import BtnAddNewAddress from '../views/btn/btnAddNewAddress';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';

import * as mCart from '../models/action/mCart';

const ListShippings = props => {
    // Custom function isEmpty
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const dispatch = useDispatch();
    let _selectedShippingId = useSelector(state => state.cart.selectedShipping.id);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [selectedShippingId, setShippingId] = useState(parseInt(_selectedShippingId) > 0 ? _selectedShippingId : 0);
    const tmpSelectedShippingId = selectedShippingId;
    
    const shippingsList = useSelector(state => state.shippings.shippings);
    useEffect(() => {
        const loadShippingList = async () => {
            setIsLoading(true);
            await dispatch(mCart.fetchShippings());
            setIsLoading(false);
        };
        
        loadShippingList();
    }, []);
    
    const selectShippingHandler = (shippingId) => { 
        setShippingId(shippingId);
    };
    const selectShippingHandlerV2 = async () => { 
        if (tmpSelectedShippingId > 0) {
            const selectedShippingData = shippingsList.find(item => item.id === tmpSelectedShippingId);
            await dispatch(mCart.selectShipping(selectedShippingData));
            props.navigation.navigate('Checkout')
        
        } else {
            Alert.alert(
                "Notification",
                "Please select shipping first before continue.",
                [
                    { 
                        text: "OK", 
                    }
                ],
                { cancelable: false }
            ); 
        }
    };

	const renderGridItem = (data) => {
        const itemData = data.item;
        
		return (
            <View style={{ marginHorizontal: '2%' }}>
                <Card style={{ padding: 2, borderRadius: 15 }}>
                    <CardItem>
                        <Content style={{ flex: 1, paddingTop: 5, paddingBottom: 5, elevation: 2 }}>
                            <ListItem 
                                icon 
                                style={{ marginLeft: 0 }}
                                onPress={() => selectShippingHandler(itemData.id)}
                            >
                                <Body>
                                    <Text style={{ marginLeft: 0 }}>{itemData.name} - ${itemData.price}.00</Text>
                                    <Text style={{ marginLeft: 0, marginBottom: 10 }}>{itemData.estimate}</Text>
                                </Body>
                                <Right>
                                    {tmpSelectedShippingId === itemData.id ? <Ionicons name='ios-checkbox' size={25} color={core.primaryColor} /> : <Ionicons name='ios-square-outline' size={25} color={core.primaryColor} />}
                                </Right>
                            </ListItem>
                        </Content>
                    </CardItem>
                </Card>
            </View>
		);
	}
	  
	return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFFFFF' }}
            />

            <FlatList
                keyExtractor={ (data, index) => data.id}
                data={shippingsList}
                renderItem={renderGridItem}
                numColumns={1}
                style={{ backgroundColor: 'white' }}
            />

            <TouchableOpacity onPress={selectShippingHandlerV2} activeOpacity={0.9} style={styles.cartInformationSummary}>
                <View>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>CONTINUE</Text>
                </View>
            </TouchableOpacity>
        </View>
  	);
}
  
ListShippings.navigationOptions = navigationData => {
    return {
        headerTitle: '',
        headerTintColor: core.primaryColor,
    };
};
  
const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        marginBottom: 5,
        paddingBottom: 0,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        // alignItems: 'center',
        // height: '15%',
        padding: 15
    },
    title: {
        fontSize: 18,
        // marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    priceV2: {
        fontSize: 14,
        color: core.primaryColor
    },
    actions: {
        textAlign: 'center',
        height: '25%',
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 20
    },
    cartInformationSummary: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 0,
        backgroundColor: core.primaryColor,
        // borderColor: '#888',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
});
  
export default ListShippings;