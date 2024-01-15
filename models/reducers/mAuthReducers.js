// gak tahu kepake buat apaan
import { ADD_TO_CART, REMOVE_FROM_CART, PLACE_ORDER, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, LOGIN } from '../../models/action/mAuth';
import Login from '../../models/mLogin';

const initialState = {
    user: [],
    orderlist: {
        diproses: [],
        selesai: [],
        dibatalkan: []
    },
    selectedKodePromo: "",
    selectedNominalPromo: 0,
    selectedVoucher: [],
    landingPage: {
        status: true,
        title: "YUK BELANJA DI CREEK GARDEN\nDAN DAPATKAN PROMO SPESIAL YANG MENARIK",
        image: "",
        title_promo_1: "PROMO BUAH CREEK GARDEN\nDiskon sampai 50 % Lho",
        link_promo_1: "ListProduct,promo_spesial",
        title_promo_2: "SAYURAN SEGAR\nGratis Ongkos Kirim",
        link_promo_2: "ListProduct,fruits",
        updateApp: false,
    }
    // orderdetail: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LandingPage':
            return {
                ...state,
                landingPage: action.landingPage,
            }
        case 'SelectedKodePromo':
            return {
                ...state,
                selectedKodePromo: action.selectedKodePromo,
                selectedNominalPromo: action.selectedNominalPromo,
            }
        case 'Login':
            return {
                ...state,
                user: action.user,
                point: action.point,
                voucher: action.voucher,
                address: action.address,
            };
        case 'Point':
            return {
                ...state,
                point: action.point,
            };
        case 'Voucher':
            return {
                ...state,
                voucher: action.voucher,
            };
        case 'Selectedvoucher':
            return {
                ...state,
                selectedvoucher: action.selectedVoucher,
            };
        case 'Provinsi':
            return {
                ...state,
                provinsi: action.provinsi,
            };
        case 'Kota':
            return {
                ...state,
                kota: action.kota,
            };
        case 'Address':
            return {
                ...state,
                address: action.address,
            };
        case 'Promotion':
            return {
                ...state,
                promotion: action.promotion,
            };
        case 'Orderinbox':
            return {
                ...state,
                orderinbox: action.orderinbox,
            };
        case 'Orderlist':
            return {
                ...state,
                orderlist: action.orderlist,
            };
        case 'Orderdetail':
            return {
                ...state,
                orderdetail: action.orderdetail,
            };
        case 'Homecontent':
            return {
                ...state,
                homecontent: action.homecontent,
            };
        case 'Product':
            return {
                ...state,
                products: action.products,
                subcategory: action.subcategory,
            };
        case 'ProductSearch':
            return {
                ...state,
                products_search: action.products,
                subcategory_search: action.subcategory,
            };
        case 'ProductPromo':
            return {
                ...state,
                product_promo: action.products,
            };
        case 'Productdetail':
            return {
                ...state,
                productdetail: action.productdetail,
            };
        case 'ShippingList':
            return {
                ...state,
                shippinglist: action.shippinglist,
            };
        case 'PaymentList':
            return {
                ...state,
                PaymentList: action.paymentlist,
            };
        case 'LandingPayment':
            return {
                ...state,
                landingpayment: action.url
            }
        case 'RemovePurchase':
            return {
                ...state,
                shippinglist: [],
                PaymentList: [],
                landingpayment: ''
            }
        case 'MapList':
            return {
                ...state,
                maplist: action.maplist
            }
        case 'Logout':
            return {
                ...state,
                user: [],
                point: 0,
                voucher: [],
                selectedvoucher: [],
                address: [],
                promotion: [],
                orderinbox: [],
                shippinglist: [],
                orderlist: {
                    diproses: [],
                    selesai: [],
                    dibatalkan: [],
                },
                selectedKodePromo: "",
                selectedNominalPromo: 0,
            };
    }
    
    return state;
};