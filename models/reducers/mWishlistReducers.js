// gak tahu kepake buat apaan
import { ADD_TO_CART, REMOVE_FROM_CART, PLACE_ORDER, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../../models/action/mCart';
import WishlistItem from '../../models/mAddToWishlist';

const initialState = {
    // cart
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'addToWishlist':
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            const imageProduct = addedProduct.imageUrl;
    
            let updatedOrNewCartItem;
    
            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new WishlistItem(
                    addedProduct.id,
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice,
                    imageProduct
                );
            
            } else {
                updatedOrNewCartItem = new WishlistItem(addedProduct.id, 1, prodPrice, prodTitle, prodPrice, imageProduct);
            }
          
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            };
        case 'removeFromWishlist':
            const productId = action.product.productId ? action.product.productId : action.product.id;
            const selectedCartItem = state.items[productId];
            const currentQty = selectedCartItem.quantity;
            
            let updatedCartItems;
  
            updatedCartItems = { ...state.items };
            delete updatedCartItems[productId];
            
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
        case 'Logout':
            return {
                items: {},
                totalAmount: 0
            };
    }
    
    return state;
};