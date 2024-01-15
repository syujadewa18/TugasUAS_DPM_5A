import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

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

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            props.onInputChange.navigation.navigate('ListProductSearch', {search: inputState.value});
            // onInputChange(id, inputState.value, inputState.isValid);
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

    return (
        <View style={styles.formControl}>
            {props.textarea == true ? 
                (   
                    <TextInput
                        {...props}
                        style={styles.inputTextarea}
                        value={inputState.editable === true ? inputState.value : props.initialValue}
                        onChangeText={textChangeHandler}
                        onBlur={lostFocusHandler}
                        editable={inputState.editable}
                        placeholder={props.placeholder ? props.placeholder : ""}
                        multiline={true}
                        numberOfLines={99}
                        placeholderTextColor="#888"
                    />
                )
                :
                (            
                    <TextInput
                        {...props}
                        style={styles.input}
                        value={inputState.editable === true ? inputState.value : props.initialValue}
                        onChangeText={textChangeHandler}
                        onBlur={lostFocusHandler}
                        editable={inputState.editable}
                        placeholder={props.placeholder ? props.placeholder : ""}
                        placeholderTextColor="#888"
                    />
                )
            }
            
            {/* {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'poppins-semi-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 12,
        paddingVertical: 0,
        // borderBottomColor: '#008bca',
        // borderBottomWidth: 1
        borderRadius: 10,
        borderColor: '#6BB745',
        borderWidth: 1,
        marginTop: 0,
        marginBottom: 15,
        fontFamily: "poppins-regular",
        marginLeft: 12,
        width: 320,
    },
    inputTextarea: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        // borderBottomColor: '#008bca',
        // borderBottomWidth: 1
        borderRadius: 10,
        borderColor: '#6BB745',
        borderWidth: 1,
        marginTop: 0,
        marginBottom: 15,
        fontFamily: "poppins-regular",
        marginLeft: 2,
        height: 100
    },
    errorContainer: {
        marginVertical: 0
    },
    errorText: {
        fontFamily: 'poppins-semi-bold',
        color: 'red',
        fontSize: 13
    }
});

export default Input;
