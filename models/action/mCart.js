export const addToCart = product => {
    return { type: 'addToCart', product: product };
};

export const addToCartLocalStorage = product => {
    return { type: 'localStorageCart', product: product };
};

export const increaseCart = product => {
    return { type: 'increaseCart', product: product };
};

export const decreaseCart = product => {
    return { type: 'decreaseCart', product: product };
};

export const removeFromCart = product => {
    return { type: 'removeFromCart', product: product };
};

export const addToWishlist = product => {
    return { type: 'addToWishlist', product: product };
};

export const removeFromWishlist = product => {
    return { type: 'removeFromWishlist', product: product };
};

export const placeOrder = product => {
    return { type: 'placeOrder', product: product };
};

export const fetchAddress = (userId) => {
    return async dispatch => {
        let addressList = [];
        try {
            const response = await fetch(
                'https://disekolah.id/api/yudha/appversion/get_address?userId=' + userId
            );

            const resData = await response.json();
            // console.log(resData);
            if (resData.status === true && resData.data != null) {
                addressList = resData.data;
            }
        } catch (error) { }

        dispatch({ type: 'getAddress', address: addressList });
    };
};

export const addAddress = (userId, addressData) => {
    return async dispatch => {
        // console.log(addressData);
        // console.log(userId);

        if (!addressData.profileName) {
            const messageError = 'Profile Name is required!';
            throw new Error(messageError);
        }
        if (!addressData.firstName) {
            const messageError = 'First Name is required!';
            throw new Error(messageError);
        }
        if (!addressData.lastName) {
            const messageError = 'Last Name is required!';
            throw new Error(messageError);
        }
        if (!addressData.phoneNumber) {
            const messageError = 'Phone Number is required!';
            throw new Error(messageError);
        }
        if (!addressData.address) {
            const messageError = 'Address is required!';
            throw new Error(messageError);
        }
        if (!addressData.zipCode) {
            const messageError = 'Zip Code is required!';
            throw new Error(messageError);
        }
        if (!addressData.country) {
            const messageError = 'Country is required!';
            throw new Error(messageError);
        }

        let addressList = [];
        try {
            const response = await fetch('https://disekolah.id/api/yudha/appversion/add_address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    profile: addressData.profileName,
                    firstname: addressData.firstName,
                    lastname: addressData.lastName,
                    phone_number: addressData.phoneNumber,
                    address: addressData.address,
                    zipcode: addressData.zipCode,
                    country: addressData.country,
                })
            });

            const resData = await response.json();

            // console.log(resData);
            if (resData.message === 'Ok') {
                addressList = resData.data;
            }

        } catch (error) {
            console.log(error);
        }

        if (addressList.length === 0) {
            const messageError = 'There s something error when add data, please try again later.';
            throw new Error(messageError);
        }

        dispatch({ type: 'getAddress', address: addressList });
    };
};

export const updateAddress = (addressId, userId, addressData) => {
    return async dispatch => {
        // console.log(addressData);
        // console.log(addressId);
        // console.log(userId);

        if (!addressData.profileName) {
            const messageError = 'Profile Name is required!';
            throw new Error(messageError);
        }
        if (!addressData.firstName) {
            const messageError = 'First Name is required!';
            throw new Error(messageError);
        }
        if (!addressData.lastName) {
            const messageError = 'Last Name is required!';
            throw new Error(messageError);
        }
        if (!addressData.phoneNumber) {
            const messageError = 'Phone Number is required!';
            throw new Error(messageError);
        }
        if (!addressData.address) {
            const messageError = 'Address is required!';
            throw new Error(messageError);
        }
        if (!addressData.zipCode) {
            const messageError = 'Zip Code is required!';
            throw new Error(messageError);
        }
        if (!addressData.country) {
            const messageError = 'Country is required!';
            throw new Error(messageError);
        }

        let addressList = [];
        try {
            const response = await fetch('https://disekolah.id/api/yudha/appversion/update_address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address_id: addressId,
                    user_id: userId,
                    profile: addressData.profileName,
                    firstname: addressData.firstName,
                    lastname: addressData.lastName,
                    phone_number: addressData.phoneNumber,
                    address: addressData.address,
                    zipcode: addressData.zipCode,
                    country: addressData.country,
                })
            });

            const resData = await response.json();

            // console.log(resData);
            if (resData.message === 'Ok') {
                addressList = resData.data;
            }

        } catch (error) {
            console.log(error);
        }

        if (addressList.length === 0) {
            const messageError = 'There s something error when update data, please try again later.';
            throw new Error(messageError);
        }

        dispatch({ type: 'getAddress', address: addressList });
    };
};

export const removeAddress = (userId, addressId) => {
    return async dispatch => {
        let addressList = [];
        try {
            const response = await fetch(
                'https://disekolah.id/api/yudha/appversion/delete_address?addressId=' + addressId + '&userId=' + userId
            );

            const resData = await response.json();
            // console.log(resData);

            if (resData.status === true && resData.data != null) {
                addressList = resData.data;
            }
        } catch (error) {
            console.log(error);
        }

        dispatch({ type: 'getAddress', address: addressList });
    };
};

export const selectAddress = (addressData) => {
    return async dispatch => {
        dispatch({ type: 'selectAddress', addressData: addressData });
    };
};

export const fetchShippings = (addressData) => {
    console.log('fetch shipping')
    return async dispatch => {
        let shippingsList = [];
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/shippings_new?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sample: 'oke'
                })
            });

            const resData = await response.json();
            console.log(resData)
            if (resData.status == true) {
                shippingsList = resData.data;
            }
        } catch (error) {
        }

        dispatch({ type: 'getShippings', shippings: shippingsList });
    };
};

export const selectShipping = (shippingData) => {
    return async dispatch => {
        dispatch({ type: 'selectShipping', shippingData: shippingData });
    };
};

export const removeSelectShipping = () => {
    return async dispatch => {
        dispatch({ type: 'selectShipping', shippingData: [] });
    };
};

export const removePurchaseCart = () => {
    return async dispatch => {
        dispatch({ type: 'RemovePurchaseCart', removepurchasecart: [] });
    };
};