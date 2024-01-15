const initialState = {
    availableProducts: [],
    userProducts: [],
    singleProduct: [],
    isLoading: true,
    kritikDanSaran: [],
    notifikasi: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getProducts':
            return {
                availableProducts: action.products,
                userProducts: action.products,
                singleProduct: [],
                kritikDanSaran: [],
                notifikasi: []
            };
        case 'getInformation':
            return {
                ...state,
                availableProducts: action.products,
            };
        case 'getProductById':
            return {
                ...state,
                singleProduct: action.products
            };
        case 'getKritikSaran':
            return {
                ...state,
                kritikDanSaran: action.products
            };
        case 'getNotifikasi':
            return {
                ...state,
                notifikasi: action.products
            };

    }
    
    return state;
};