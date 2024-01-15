import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
// import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

import Navigator from './views/nav/Nav'
import ProductReducers from './models/reducers/mProductReducers';
import CartReducers from './models/reducers/mCartReducers';
import WishlistReducers from './models/reducers/mWishlistReducers';
import AuthReducers from './models/reducers/mAuthReducers';
import AddressReducers from './models/reducers/mAddressReducers';
import ShippingsReducers from './models/reducers/mShippingsReducers';
import AkademikReducers from './models/reducers/mAkademikReducers';
import AkademikV2Reducers from './models/reducers/mAkademikV2Reducers';
import SiswaReducers from './models/reducers/mSiswaReducers';
import PegawaiReducers from './models/reducers/mKepegawaianReducers';
import PresensiReducers from './models/reducers/mPresensiReducers';
import KegiatanBelajarReducers from './models/reducers/mKegiatanBelajarReducers';

const rootReducer = combineReducers({
    products: ProductReducers,
    cart: CartReducers,
    wishlist: WishlistReducers,
    auth: AuthReducers,
    address: AddressReducers,
    shippings: ShippingsReducers,
    akademik: AkademikReducers,
    akademikv2: AkademikV2Reducers,
    siswa: SiswaReducers,
    pegawai: PegawaiReducers,
    presensi: PresensiReducers,
    kegiatan_belajar: KegiatanBelajarReducers,
}); 
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const getFonts = () => {
    Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSansRegular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSansBold.ttf'),
        'poppins-regular': require('./assets/creekgarden/font/Poppins-Regular.ttf'),
        'poppins-bold': require('./assets/creekgarden/font/Poppins-Bold.ttf'),
        'poppins-semi-bold': require('./assets/creekgarden/font/Poppins-SemiBold.ttf'),
    });
};

export default function App() {
    // useEffect(() => {
    //     (async () => {
    //         const { status } = await requestTrackingPermissionsAsync();
    //         if (status === 'granted') {
    //             console.log('Yay! I have user permission to track data');
    //         }
    //     })();
    // }, []);

    const [fontLoaded, setFontLoaded] = useState(false);
    if (!fontLoaded) {
        return (
            <AppLoading 
                startAsync={getFonts}
                onFinish={ () => setFontLoaded(true) }
                onError={() => console.log('error')}
            />
        );
    }
    
    return (
		<Provider store={store}>
        	<Navigator />
		</Provider>
    );
}