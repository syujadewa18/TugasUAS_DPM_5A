const initialState = {
    address: [],
    selectedAddressId: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getAddress':
            return {
                ...state,
                address: action.address,
            };
        case '_selectAddress':
            return {
                ...state,
                selectedAddressId: action.addressId,
            };
        case 'Logout':
            return {
                address: [],
                selectedAddressId: 0
            };
    }
    
    return state;
};