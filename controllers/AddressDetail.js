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
import core from '../core/core';
import BtnCart from '../views/btn/btnCart';
import BtnWishlist from '../views/btn/btnWishlist';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../views/form/Input';
import Card from '../views/form/Card';
import Spinner from 'react-native-loading-spinner-overlay';

import * as mCart from '../models/action/mCart';

const formReducer = (state, action) => {
    const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
    };

    return {
        formIsValid: true,
        inputValidities: true,
        inputValues: updatedValues
    };
};

const AddressDetail = props => {
    // Custom function isEmpty
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        
        return true;
    }

    const addressId = props.navigation.getParam('addressId');

    let userLogin = useSelector(state => state.auth.user);
    let addressData = [];
    
    if (addressId) {
        const userId = userLogin.id;
        
        addressData = useSelector(state => state.address.address.find(item => item.id === addressId));
        useEffect(() => {
            dispatch(mCart.fetchAddress(userId));
        }, [dispatch]);
    }

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            profileName: addressData.profile,
            firstName: addressData.firstname,
            lastName: addressData.lastname,
            phoneNumber: addressData.phone_number,
            address: addressData.address,
            zipCode: addressData.zipcode,
            country: addressData.country,
        },
        inputValidities: {},
        formIsValid: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    const updateProfileHandler = async () => {
        const _addressId = addressId;
        const _userId = userLogin.id;
        
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(mCart.updateAddress(_addressId, _userId, formState.inputValues));
            
            Alert.alert('Notification', 'Your profile has been successfully updated!', [{ text: 'Ok' }]);  
            props.navigation.navigate('ListAddress');
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: 'formInputUpdate',
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState]
    );

    return (
        <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
            <View style={styles.gradientAfterLogin}>
                <Spinner
                    visible={isLoading}
                    textStyle={{ color: '#FFFFFF' }}
                />

                <Card style={styles.authContainerAfterLogin}>
                    <View>
                        <Input
                            id="profileName"
                            label="Profile Name"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={addressData.profile}
                            editableForm={true}
                        />

                        <Input
                            id="firstName"
                            label="First Name"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={addressData.firstname}
                            editableForm={true}
                        />
                        
                        <Input
                            id="lastName"
                            label="Last Name"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={addressData.lastname}
                            editableForm={true}
                        />

                        <Input
                            id="phoneNumber"
                            label="Phone Number"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={addressData.phone_number}
                            editableForm={true}
                        />

                        <Input
                            id="address"
                            label="Address"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={addressData.address}
                            editableForm={true}
                        />
                        
                        <Input
                            id="zipCode"
                            label="Zip Code"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={addressData.zipcode}
                            editableForm={true}
                        />

                        <Input
                            id="country"
                            label="Country"
                            keyboardType="default"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage=""
                            onInputChange={inputChangeHandler}
                            initialValue={addressData.country}
                            editableForm={true}
                        />

                        <View style={styles.buttonContainer}>
                            <Button title="Update" color={core.primaryColor} onPress={updateProfileHandler} />
                        </View>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};
  
AddressDetail.navigationOptions = {
    // headerShown: false
    headerTitle: '',
    headerTintColor: core.primaryColor,
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
        maxHeight: 800,
        padding: 20
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 30
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
        // maxHeight: 800,
        padding: 20,
        marginTop: '10%'
    },
});
  
export default AddressDetail;