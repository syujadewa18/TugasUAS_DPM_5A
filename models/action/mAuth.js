import { AsyncStorage } from 'react-native';
import city1 from '../../city/city1.json';

export const landingPage = () => {
    return async dispatch => {
        let result = []
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/landing_page?ver=2.1.1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const resData = await response.json();
            if (resData.status == true) {
                result = resData
            }
            console.log('testing')
            console.log(resData)
        } catch (error) { }

        console.log('testing')
        console.log(result)

        dispatch({ type: 'LandingPage', landingPage: result });
    };
};
export const registerProfile = (fullName, email, password) => {
    return async dispatch => {
        if (!fullName) {
            const messageError = 'Nama Lengkap is required!';
            throw new Error(messageError);
        }
        if (!email) {
            const messageError = 'Email is required!';
            throw new Error(messageError);
        }
        if (!password) {
            const messageError = 'Password is required!';
            throw new Error(messageError);
        }

        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/register_mobile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: fullName,
                    email: email,
                    password: password,
                })
            });
            const resData = await response.json();
            throw new Error(JSON.stringify(resData));
        } catch (error) {
            throw new Error(error.message);
        }
    };
};
export const resetPassword = (email, password) => {
    return async dispatch => {
        if (!email) {
            const messageError = 'Email is required!';
            throw new Error(messageError);
        }
        if (!password) {
            const messageError = 'Password is required!';
            throw new Error(messageError);
        }

        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/reset_password?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });
            const resData = await response.json();
            throw new Error(JSON.stringify(resData));
        } catch (error) {
            throw new Error(error.message);
        }
    };
};
export const login = (email, password) => {
    return async dispatch => {
        if (!email) {
            const messageError = 'Email is required!';
            throw new Error(messageError);
        }
        if (!password) {
            const messageError = 'Password is required!';
            throw new Error(messageError);
        }

        let user = [];
        let point = 0
        let address = []
        let voucher = []
        let error = ''
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/login_with_email?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const resData = await response.json();
            if (resData.status == true) {
                user = resData.data;
                point = resData.point
                address = resData.address
                voucher = resData.voucher
            } else {
                error = resData.message
            }
        } catch (error) { }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }

        await AsyncStorage.setItem('userLogin', JSON.stringify(user));
        dispatch({ type: 'Login', user: user, point: point, address: address, voucher: voucher });
    };
};
export const loginSocmed = (email, name) => {
    return async dispatch => {
        let user = [];
        let voucher = []
        let point = 0
        let address = []
        let error = ''
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/login_with_socmed?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                })
            });

            const resData = await response.json();
            if (resData.status == true) {
                user = resData.data
                point = resData.point
                address = resData.address
                voucher = resData.voucher
            } else {
                error = resData.message
            }
        } catch (error) { }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }

        await AsyncStorage.setItem('userLogin', JSON.stringify(user));
        dispatch({ type: 'Login', user: user, point: point, address: address, voucher: voucher });
    };
};
export const loginSocmedApple = (email, name, iosId) => {
    return async dispatch => {
        let user = [];
        let voucher = []
        let point = 0
        let address = []
        let error = ''
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/login_with_socmed_apple?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    iosId: iosId
                })
            });

            const resData = await response.json();
            if (resData.status == true) {
                user = resData.data
                point = resData.point
                address = resData.address
                voucher = resData.voucher
            } else {
                error = resData.message
            }
        } catch (error) { }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }

        await AsyncStorage.setItem('userLogin', JSON.stringify(user));
        dispatch({ type: 'Login', user: user, point: point, address: address, voucher: voucher });
    };
};
export const lupaPassword = (email) => {
    return async dispatch => {
        if (!email) {
            const messageError = 'Email is required!';
            throw new Error(messageError);
        }

        let error = ''
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/lupa_password?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                })
            });

            const resData = await response.json();
            error = resData.message
        } catch (error) { }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }

        // dispatch({ type: 'Login', user: user });
    };
};
export const fetchPoint = (userId) => {
    return async dispatch => {
        let point = 0
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/creekpoint?ver=2.1.1&user_id=' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const resData = await response.json();
            point = await parseInt(resData.point)
        } catch (error) { }

        dispatch({ type: 'Point', point: point });
    };
};
export const uploadFoto = (userId, foto) => {
    return async dispatch => {
        let userData = []
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/upload_foto?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    photo: foto,
                })
            });

            const resData = await response.json();
            if (resData.data) {
                userData = resData.data
            }
        } catch (error) { }

        dispatch({ type: 'Login', user: userData });
    };
};
export const voucherGet = (userId) => {
    return async dispatch => {
        let voucherData = []
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/voucher?ver=2.1.1&user_id=' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const resData = await response.json();
            if (resData.data) {
                voucherData = resData.data
            }
        } catch (error) { }

        dispatch({ type: 'Voucher', voucher: voucherData });
    };
};
export const useVoucher = (selectedVoucher) => {
    return async dispatch => {
        dispatch({ type: 'Selectedvoucher', selectedVoucher: selectedVoucher });
    };
};
export const batalVoucher = () => {
    return async dispatch => {
        dispatch({ type: 'Selectedvoucher', selectedVoucher: [] });
    };
};
export const useKodePromo = (kodePromo, metodePengiriman, totalBelanja, idUser) => {
    return async dispatch => {
        let selectedKodePromo = '';
        let selectedNominalPromo = 0;
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/validate_coupon?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coupon_code: kodePromo,
                    total: totalBelanja,
                    courier_name: metodePengiriman,
                    id_user: idUser
                })
            });

            const resData = await response.json();
            if (resData.status == true) {
                selectedKodePromo = resData.coupon_code;
                selectedNominalPromo = resData.nominal;
            } else {
                const messageError = resData.message;
                throw new Error(messageError);
            }
        } catch (error) {
            throw new Error(error.message);
        }
        dispatch({ type: 'SelectedKodePromo', selectedKodePromo: selectedKodePromo, selectedNominalPromo: selectedNominalPromo });
    };
};
export const batalKodePromo = () => {
    return async dispatch => {
        dispatch({ type: 'SelectedKodePromo', selectedKodePromo: "", selectedNominalPromo: 0 });
    };
};
export const fetchAddress = (userId) => {
    return async dispatch => {
        let addressList = [];
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/get_address?ver=2.1.1&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status === true) {
                addressList = resData.data;
            }
        } catch (error) { }

        dispatch({ type: 'Address', address: addressList });
    };
};
export const addUpdateAddress = (addressData) => {
    return async dispatch => {
        if (!addressData.namaAlamat) {
            const messageError = 'Nama Alamat wajib terisi.';
            throw new Error(messageError);
        }
        if (!addressData.namaPenerima) {
            const messageError = 'Nama Penerima wajib terisi.';
            throw new Error(messageError);
        }
        if (!addressData.noHandphone) {
            const messageError = 'No Handphone wajib terisi.';
            throw new Error(messageError);
        }
        if (!addressData.alamat) {
            const messageError = 'Alamat wajib terisi.';
            throw new Error(messageError);
        }
        if (!addressData.kota) {
            const messageError = 'Kota wajib terisi.';
            throw new Error(messageError);
        }
        if (!addressData.provinsi) {
            const messageError = 'Provinsi wajib terisi.';
            throw new Error(messageError);
        }

        let addressList = [];
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/create_update_address?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
            });

            const resData = await response.json();
            if (resData.status == true) {
                addressList = resData.data;
            }

        } catch (error) {
            console.log(error);
        }

        if (addressList.length === 0) {
            const messageError = 'Terjadi kesalahan ketika menambahkan data, silahkan coba kembali nanti.';
            throw new Error(messageError);
        }

        dispatch({ type: 'Address', address: addressList });
    };
};
export const removeAddress = (addressId, userId) => {
    return async dispatch => {
        let addressList = [];
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/delete_address?ver=2.1.1&addressId=' + addressId + '&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status == true) {
                addressList = resData.data;
            }
        } catch (error) {
            console.log(error);
        }

        dispatch({ type: 'Address', address: addressList });
    };
};
export const login_v2 = (user) => {
    return async dispatch => {
        dispatch({ type: 'Login', user: user });
    };
};
export const logout = () => {
    return async dispatch => {
        AsyncStorage.removeItem('userLogin');
        dispatch({ type: 'Logout', user: [] });
    };
};
export const fetchPromotion = (userId) => {
    return async dispatch => {
        let promotionList = [];
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/get_promotion?ver=2.1.1&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status === true) {
                promotionList = resData.data;
            }
        } catch (error) { }

        dispatch({ type: 'Promotion', promotion: promotionList });
    };
};
export const fetchOrders = (userId) => {
    return async dispatch => {
        let orderList = [];
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/get_order?ver=2.1.1&user_id=' + userId
            );

            const resData = await response.json();
            orderList = resData;
        } catch (error) { }

        dispatch({ type: 'Orderinbox', orderinbox: orderList });
    };
};
export const fetchOrdersV2 = (userId) => {
    return async dispatch => {
        let orderList = {
            diproses: [],
            selesai: []
        };
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/get_order_v2?ver=2.1.1&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status == true) {
                orderList = resData.data;
            }
        } catch (error) { }

        dispatch({ type: 'Orderlist', orderlist: orderList });
    };
};
export const fetchHomeContent = (userId) => {
    return async dispatch => {
        let homeContent = [];
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/home_content?ver=2.1.1&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status == true) {
                homeContent = resData.data;
            }
        } catch (error) { }

        dispatch({ type: 'Homecontent', homecontent: homeContent });
    };
};
export const fetchProduct = (userId, kategori) => {
    return async dispatch => {
        let productData = [];
        let subCategoryData = [];
        try {
            // 'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?kategori='+kategori+'&user_id='+userId
            // 'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?kategori=semua_produk&user_id='+userId
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?ver=2.1.1&kategori=semua_produk&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status == true) {
                productData = resData.data;
                subCategoryData = resData.subcategory;
            }
        } catch (error) { }

        dispatch({ type: 'Product', products: productData, subcategory: subCategoryData });
    };
};
export const fetchProductBySearch = (userId, search) => {
    return async dispatch => {
        let productData = [];
        let subCategoryData = [];
        try {
            // 'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?kategori='+kategori+'&user_id='+userId
            // 'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?kategori=semua_produk&user_id='+userId
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?ver=2.1.1&search=' + search + '&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status == true) {
                productData = resData.data;
                subCategoryData = resData.subcategory;
            }
        } catch (error) { }

        dispatch({ type: 'ProductSearch', products: productData, subcategory: subCategoryData });
    };
};
export const fetchProductByPromo = (userId, homeContentId) => {
    return async dispatch => {
        let productData = [];
        let subCategoryData = [];
        try {
            // 'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?kategori='+kategori+'&user_id='+userId
            // 'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?kategori=semua_produk&user_id='+userId
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/home_content_by_id?ver=2.1.1&home_content_id=' + homeContentId + '&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status == true) {
                productData = resData.data;
            }
        } catch (error) { }

        dispatch({ type: 'ProductPromo', products: productData });
    };
};
export const fetchProductDefault = () => {
    return async dispatch => {
        dispatch({ type: 'Product', products: [] });
    };
};
export const fetchProductBySearchDefault = () => {
    return async dispatch => {
        dispatch({ type: 'ProductSearch', products: [] });
    };
};
export const fetchProductByPromoDefault = () => {
    return async dispatch => {
        dispatch({ type: 'ProductPromo', products: [] });
    };
};
export const fetchProductDetail = (userId, productId) => {
    return async dispatch => {
        let productInformation = {};
        try {
            // 'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?kategori='+kategori+'&user_id='+userId
            // 'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?kategori=semua_produk&user_id='+userId
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/products?ver=2.1.1&id=' + productId + '&user_id=' + userId
            );

            const resData = await response.json();
            if (resData.status == true) {
                productInformation = resData.data;
            }
        } catch (error) { }

        dispatch({ type: 'Productdetail', productdetail: productInformation });
    };
};
export const fetchShippingsV2 = (productCart, selectedAddress) => {
    return async dispatch => {
        let shippingList = [];
        console.log('oke')
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/shippings_new?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productCart: productCart,
                    selectedAddress: selectedAddress
                })
            });

            const resData = await response.json();
            if (resData.status == true) {
                shippingList = resData.data;
            }
        } catch (error) { }
        console.log(shippingList)

        dispatch({ type: 'ShippingList', shippinglist: shippingList });
    };
};
export const fetchPayment = (total) => {
    return async dispatch => {
        let paymentList = [];
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/payment_list?ver=2.1.1&total=' + total
            );

            const resData = await response.json();
            if (resData.status == true) {
                paymentList = resData.data;
            }
        } catch (error) { }

        dispatch({ type: 'PaymentList', paymentlist: paymentList });
    };
};
export const createPurchase = (total, productInformation, selectedAddress, selectedShipping, selectedPayment, userLogin, point, tglPengiriman, kodePromo, nominalKodePromo, catatanPemesanan) => {
    return async dispatch => {
        let url = '';
        let error = ''
        try {
            let itemsProduct = []
            for (const key in productInformation) {
                itemsProduct.push({
                    productId: productInformation[key].productId,
                    productTitle: productInformation[key].productTitle,
                    productPrice: productInformation[key].productPrice,
                    productPriceBefore: productInformation[key].productPriceBefore,
                    weightInfo: productInformation[key].weightInfo,
                    quantity: productInformation[key].quantity,
                    sum: productInformation[key].sum,
                    image: productInformation[key].image,
                });
            }

            let requestBody = {
                id_user: userLogin.id,
                total: total,
                noHandphone: selectedAddress.noHandphone,
                provinceId: selectedAddress.provinsiId,
                cityId: selectedAddress.kotaId,
                receiver_name: selectedAddress.namaPenerima,
                courier_name: selectedShipping.shippingName,
                courier_price: selectedShipping.shippingCost,
                shippingEstimated: selectedShipping.shippingEstimated,
                orderWeight: 5000,
                nama_jalan: selectedAddress.alamat,
                lat: selectedAddress.lat,
                lng: selectedAddress.lon,
                tglPengiriman: tglPengiriman ? tglPengiriman : '',
                point: point,
                selected_payment: selectedPayment,
                products: itemsProduct,
                kodePromo: kodePromo,
                nominalKodePromo: nominalKodePromo,
                catatanPemesanan: catatanPemesanan
            }
            console.log(requestBody)

            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/create_order?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const resData = await response.json();
            if (resData.status == true) {
                error = resData.url;
            } else {
                error = resData.message
            }
        } catch (error) {
            throw new Error(error);
        }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }

        dispatch({ type: 'LandingPayment', url: url });
    };
}
export const removePurchase = () => {
    return async dispatch => {
        dispatch({ type: 'RemovePurchase', removepurchase: [] });
    };
};
export const batalkanPesanan = (orderId) => {
    return async dispatch => {
        let error = ''
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/pesanan_dibatalkan?ver=2.1.1&id=' + orderId
            );

            const resData = await response.json();
            if (resData.status == true) {
                // orderList = resData.data;
            } else {
                error = resData.message
            }
        } catch (error) {
            throw new Error(error);
        }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }

        // dispatch({ type: 'Orderlist', orderlist: orderList });
    };
};
export const selesaikanPesanan = (orderId) => {
    return async dispatch => {
        let error = ''
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/pesanan_selesai?ver=2.1.1&id=' + orderId
            );

            const resData = await response.json();
            if (resData.status == true) {
                // orderList = resData.data;
            } else {
                error = resData.message
            }
        } catch (error) {
            throw new Error(error);
        }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }

        // dispatch({ type: 'Orderlist', orderlist: orderList });
    };
};
export const orderDetail = (orderId) => {
    return async dispatch => {
        let orderDetail = []
        let error = ''
        try {
            const response = await fetch(
                'https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/get_order_details?ver=2.1.1&id=' + orderId
            );

            const resData = await response.json();
            if (resData.status == true) {
                orderDetail = resData.data;
            } else {
                error = resData.message
            }
        } catch (error) {
            throw new Error(error);
        }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }

        dispatch({ type: 'Orderdetail', orderdetail: orderDetail });
    };
};
export const setReview = (reviewface, review, comment, order_id) => {
    return async dispatch => {
        let error = ''
        try {
            const response = await fetch('https://sawamuraplatform.asia/api-laundry/index.php/api/ecommerce/review?ver=2.1.1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: order_id,
                    rating: review,
                    score: reviewface,
                    comment: comment
                })
            });
            const resData = await response.json();

            if (resData.status == true) {
                // orderList = resData.data;
            } else {
                error = resData.message
            }
        } catch (error) {
            throw new Error(error);
        }

        if (error) {
            const messageError = error;
            throw new Error(messageError);
        }
        // dispatch({ type: 'ShippingList', shippinglist: shippingList });
    };
};
export const searchAlamat = (search) => {
    return async dispatch => {
        let result = []
        try {
            const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + search + '.json?limit=5&proximity=106.79507899999999,-6.241057999999995&language=en-US&access_token=pk.eyJ1IjoieXVkaGFlejAyMSIsImEiOiJja3Vqam8wNmoyeXJtMm9ubmdpYnJsNTZvIn0.Pos7JiXp9hYcAb7hHYieug&country=ID', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const resData = await response.json();

            if (resData.features.length > 0) {
                for (let i = 0; i < resData.features.length; i++) {
                    const item = resData.features[i];
                    const mappedItem = {
                        lat: item.center[1],
                        lon: item.center[0],
                        placeName: item.place_name
                    }
                    result.push(mappedItem)
                }
            }
        } catch (error) {

        }

        // if (error) {
        //     const messageError = error;
        //     throw new Error(messageError);
        // }
        dispatch({ type: 'MapList', maplist: result });
    };
}

export const updateProfile = (id_user, nip, nama, email, password, handphone, nik, photo) => {
    return async dispatch => {
        if (!nip) {
            const messageError = 'NIP is required!';
            throw new Error(messageError);
        }
        if (!nama) {
            const messageError = 'Full Name is required!';
            throw new Error(messageError);
        }
        if (!email) {
            const messageError = 'Email is required!';
            throw new Error(messageError);
        }
        if (password != "      ") {
            if (!password) {
                const messageError = 'Password is required!';
                throw new Error(messageError);
            }
        }
        if (!handphone) {
            const messageError = 'No Handphone is required!';
            throw new Error(messageError);
        }
        if (!nik) {
            nik = '';
        }

        let user = [];
        try {
            // Without password
            if (password == "      ") {
                const response = await fetch('https://app.disekolah.id/index.php/api/gtech/PengawasLogin/update_profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_user: id_user,
                        nip: nip,
                        nama: nama,
                        email: email,
                        handphone: handphone,
                        nik: nik,
                        photo: photo
                    })
                });
                const resData = await response.json();
                // console.log(resData);
                if (resData.message === 'Ok') {
                    user = resData.data;
                }

                // With password
            } else {
                const response = await fetch('https://app.disekolah.id/index.php/api/gtech/PengawasLogin/update_profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_user: id_user,
                        nip: nip,
                        nama: nama,
                        email: email,
                        password: password,
                        handphone: handphone,
                        nik: nik,
                        photo: photo
                    })
                });
                const resData = await response.json();
                // console.log(resData);
                if (resData.message === 'Ok') {
                    user = resData.data;
                }
            }

        } catch (error) { }

        if (user.length === 0) {
            const messageError = 'There s something error when update data, please try again later.';
            throw new Error(messageError);
        }

        dispatch({ type: 'Login', user: user });
    };
};
