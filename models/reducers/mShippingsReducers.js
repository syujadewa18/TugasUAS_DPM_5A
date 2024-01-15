const initialState = {
    shippings: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getShippings':
            return {
                ...state,
                shippings: action.shippings,
            };
    }
    
    return state;
};