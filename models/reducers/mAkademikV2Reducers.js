const initialState = {
    kejuruanData: [],
    kelasData: [],
    mapelData: [],
    angkatanData: [],
    kbmData: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getKejuruan':
            return {
                ...state,
                kejuruanData: action.kejuruanData
            };
        case 'getKelas':
            return {
                ...state,
                kelasData: action.kelasData
            };
        case 'getMapel':
            return {
                ...state,
                mapelData: action.mapelData
            };
        case 'getAngkatan':
            return {
                ...state,
                angkatanData: action.angkatanData
            };
        case 'getKBM':
            return {
                ...state,
                kbmData: action.kbmData
            };

    }
    
    return state;
};