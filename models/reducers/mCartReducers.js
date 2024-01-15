import { ADD_TO_CART, REMOVE_FROM_CART, PLACE_ORDER } from '../../models/action/mCart'; // gak tahu kepake buat apaan
import CartItem from '../../models/mAddToCart';
import { 
    AsyncStorage,
} from 'react-native';

const initialState = {
    // cart
    items: {},
    totalAmount: 0,
    initialLocalStorageTotalAmount: 0,
    selectedAddress: [],
    tmpSelectedShippingId: 0,
    selectedShipping: [],
    selectedPayment: 0,
    shippings: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'localStorageCart':
            const __addedProduct = action.product;
            const __weightInfo = __addedProduct.typeweight;
            const __prodPriceBefore = parseInt(__addedProduct.priceBefore);
            const __prodPrice = parseInt(__addedProduct.priceAfter);
            const __prodTitle = __addedProduct.title;
            const __imageProduct = __addedProduct.imageUrl;
    
            let ____updatedOrNewCartItem = new CartItem(parseInt(__addedProduct.id), parseInt(__addedProduct.quantity), __weightInfo, __prodPriceBefore, __prodPrice, __prodTitle, __prodPrice, __imageProduct);

            // const saveCart = {
            //     items: { ...state.items, [parseInt(addedProduct.id)]: updatedOrNewCartItem },
            //     totalAmount: state.totalAmount + prodPrice
            // };
            // AsyncStorage.setItem('cartData', JSON.stringify(saveCart));
          
            return {
                ...state,
                items: { ...state.items, [parseInt(__addedProduct.id)]: ____updatedOrNewCartItem },
                totalAmount: state.totalAmount + (__prodPrice * parseInt(__addedProduct.quantity))
            };
        case 'addToCart':
            const addedProduct = action.product;
            const weightInfo = addedProduct.typeweight;
            const prodPriceBefore = parseInt(addedProduct.priceBefore);
            const prodPrice = parseInt(addedProduct.priceAfter);
            const prodTitle = addedProduct.title;
            const imageProduct = addedProduct.imageUrl;
    
            let updatedOrNewCartItem;
    
            if (state.items[addedProduct.id]) {
                // already have the item in the cart
                updatedOrNewCartItem = new CartItem(
                    parseInt(addedProduct.id),
                    state.items[addedProduct.id].quantity + 1,
                    weightInfo,
                    prodPriceBefore,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice,
                    imageProduct
                );
            
            } else {
                updatedOrNewCartItem = new CartItem(parseInt(addedProduct.id), 1, weightInfo, prodPriceBefore, prodPrice, prodTitle, prodPrice, imageProduct);
            }

            const saveCart = {
                items: { ...state.items, [parseInt(addedProduct.id)]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            };
            AsyncStorage.setItem('cartData', JSON.stringify(saveCart));
          
            return {
                ...state,
                items: { ...state.items, [parseInt(addedProduct.id)]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            };

        case 'decreaseCart':
            const _productId = action.product.productId ? action.product.productId : action.product.id;
            const _selectedCartItem = state.items[_productId];
            const _currentQty = _selectedCartItem.quantity;
            
            let _updatedCartItems;
            
            if (_currentQty > 1) {
                // need to reduce it, not erase it
                const _updatedCartItem = new CartItem(
                    _productId,
                    _selectedCartItem.quantity - 1,
                    _selectedCartItem.weightInfo,
                    _selectedCartItem.productPriceBefore,
                    _selectedCartItem.productPrice,
                    _selectedCartItem.productTitle,
                    _selectedCartItem.sum - _selectedCartItem.productPrice,
                    _selectedCartItem.image,
                );
                _updatedCartItems = { ...state.items, [_productId]: _updatedCartItem };
            } else {
                _updatedCartItems = { ...state.items };
                delete _updatedCartItems[_productId];
            }

            // updatedCartItems = { ...state.items };
            // delete __updatedCartItems[__productId];

            const _saveCart = {
                items: _updatedCartItems,
                totalAmount: state.totalAmount - _selectedCartItem.productPrice
            };
            AsyncStorage.setItem('cartData', JSON.stringify(_saveCart));
            
            return {
                ...state,
                items: _updatedCartItems,
                totalAmount: state.totalAmount - _selectedCartItem.productPrice
            }

        case 'increaseCart':
            const __productId = action.product.productId ? action.product.productId : action.product.id;
            const __selectedCartItem = state.items[__productId];
            const __currentQty = __selectedCartItem.quantity;
            
            let __updatedCartItems;
            
            if (__currentQty >= 1) {
                // need to reduce it, not erase it
                const __updatedCartItem = new CartItem(
                    __productId,
                    __selectedCartItem.quantity + 1,
                    __selectedCartItem.weightInfo,
                    __selectedCartItem.productPriceBefore,
                    __selectedCartItem.productPrice,
                    __selectedCartItem.productTitle,
                    __selectedCartItem.sum + __selectedCartItem.productPrice,
                    __selectedCartItem.image,
                );
                __updatedCartItems = { ...state.items, [__productId]: __updatedCartItem };
            } else {
                __updatedCartItems = { ...state.items };
                delete __updatedCartItems[__productId];
            }

            // updatedCartItems = { ...state.items };
            // delete __updatedCartItems[__productId];

            const __saveCart = {
                items: __updatedCartItems,
                totalAmount: state.totalAmount + __selectedCartItem.productPrice
            };
            AsyncStorage.setItem('cartData', JSON.stringify(__saveCart));
            
            return {
                ...state,
                items: __updatedCartItems,
                totalAmount: state.totalAmount + __selectedCartItem.productPrice
            };
        
        case 'removeFromCart':
            const productId = action.product.productId ? action.product.productId : action.product.id;
            const selectedCartItem = state.items[productId];
            const currentQty = selectedCartItem.quantity;
            
            let updatedCartItems;
            
            // if (currentQty > 1) {
            //     // need to reduce it, not erase it
            //     const updatedCartItem = new CartItem(
            //         selectedCartItem.quantity - 1,
            //         selectedCartItem.productPrice,
            //         selectedCartItem.productTitle,
            //         selectedCartItem.sum - selectedCartItem.productPrice
            //     );
            //     updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
            // } else {
            //     updatedCartItems = { ...state.items };
            //     delete updatedCartItems[action.pid];
            // }

            updatedCartItems = { ...state.items };
            delete updatedCartItems[productId];

            const ___saveCart = {
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice * currentQty
            };
            AsyncStorage.setItem('cartData', JSON.stringify(___saveCart));
            
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice * currentQty
            };
        
        case 'selectAddress':
            return {
                ...state,
                selectedAddress: action.addressData
            };

        case 'getShippings':
            return {
                ...state,
                shippings: action.shippings,
            };

        case 'selectShipping':
            return {
                ...state,
                selectedShipping: action.shippingData
            };
        
        case 'selectPayment':
            const paymentId = action.paymentId;
            return {
                ...state,
                selectedPayment: paymentId
            };

        case 'RemovePurchaseCart':
            return {
                ...state,
                items: {},
                totalAmount: 0,
                selectedAddress: [],
                selectedShipping: [],
            };
        
        case 'placeOrder':
            // const productId = action.product.productId ? action.product.productId : action.product.id;
            // const selectedCartItem = state.items[productId];
            // const currentQty = selectedCartItem.quantity;
            
            // let updatedCartItems;
            
            // // if (currentQty > 1) {
            // //     // need to reduce it, not erase it
            // //     const updatedCartItem = new CartItem(
            // //         selectedCartItem.quantity - 1,
            // //         selectedCartItem.productPrice,
            // //         selectedCartItem.productTitle,
            // //         selectedCartItem.sum - selectedCartItem.productPrice
            // //     );
            // //     updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
            // // } else {
            // //     updatedCartItems = { ...state.items };
            // //     delete updatedCartItems[action.pid];
            // // }

            // updatedCartItems = { ...state.items };
            // delete updatedCartItems[productId];
            
            // return {
            //     ...state,
            //     items: updatedCartItems,
            //     totalAmount: state.totalAmount - selectedCartItem.productPrice
            // };

        case 'Logout':
            return {
                items: {},
                totalAmount: 0,
                selectedAddress: [],
                tmpSelectedShippingId: 0,
                selectedShipping: [],
                selectedPayment: 0
            };
    }
    
    return state;
};