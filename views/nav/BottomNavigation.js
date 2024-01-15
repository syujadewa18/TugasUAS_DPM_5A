import React, { useReducer, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, AsyncStorage, Platform } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
            default:
        
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        editable: props.editableForm ? true : false,
        isValid: props.initiallyValid,
        touched: false
    });

    // console.log(props)
    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            // props.onInputChange.navigation.navigate('ListProductSearch', {search: inputState.value});
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };
    const openCart = () => {
        props.navigationData.navigation.navigate('Cart')
    }

    // const [totalQty, setTotalQty] = useState()
    const [totalCart, setTotalCart] = useState(0)
    const [isRender, setIsRender] = useState(false)

    // const totalQtyCart = () => {
    //     AsyncStorage.getItem("cartData").then(async (_cart) => {
    //         let totalQty = 0
    //         const cart = await _cart; 
    //         // console.log(cart)
    //         if (cart !== null) {
    //             const cartData = JSON.parse(cart);
    //             // console.log(cartData.items)
    //             // console.log(cartData.items)
    //             // cartData.items.forEach(function (item) {
    //             //     console.log(item)
    //             // })
    //             for (let key in cartData.items) {
    //                 if (cartData.items.hasOwnProperty(key)) {
    //                     const cartItem = cartData.items[key];
    //                     // console.log(cartItem.quantity)
    //                     totalQty += parseInt(cartItem.quantity)
    //                 }
    //             }
    //         } 
    //         setTotalCart(totalQty)
    //     });
    // }
    // totalQtyCart()
    const totalQty = useSelector(state => {
        let qty = 0;
        for (const key in state.cart.items) {
            qty += parseInt(state.cart.items[key].quantity)
        }
       
        return qty;
    });

    return (
        <>
            <View
                style={{
                position: 'absolute',
                bottom: Platform.OS == 'android' ? -10 : 5, // space from bottombar
                height: 100,
                width: 100,
                borderRadius: 58,
                // backgroundColor: '#5a95ff',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999999,
            }}>
                {totalQty > 0 ? 
                    (
                        <View style={{ position: 'absolute', right: 26, top: 32, marginLeft: 12, elevation: 9999, zIndex: 9999, marginTop: 5 }}>
                            <View style={{ backgroundColor: '#F99D1C', padding: 5, borderRadius: 50, width: 20, height: 20 }}>
                                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: totalQty > 99 ? 6 : 8, fontFamily: 'poppins-bold', marginTop: Platform.OS == 'android' ? -3 : -1, marginLeft: Platform.OS == 'android' ? -0.5 : 0 }}>{totalQty}</Text>
                            </View>
                        </View>
                    )
                    :
                    (
                        <View></View>
                    )
                }
                <Image
                    source={require('../../assets/new/cart.png')}
                    style={{ height: 65, width: 65 }}
                    resizeMode="contain"
                />
            </View>
        </>
    );
};

export default Input;