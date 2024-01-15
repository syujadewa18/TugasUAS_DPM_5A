const initialState = {
    presensi: [],
    aktifitas: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getPresensi':
            return {
                ...state,
                presensi: action.presensi
            };
        case 'getAktifitas':
            return {
                ...state,
                aktifitas: action.aktifitas
            };

    }
    
    return state;
};