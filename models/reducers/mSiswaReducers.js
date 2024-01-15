const initialState = {
    siswa: [],
    total: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getSiswa':
            return {
                ...state,
                siswa: action.siswa.data,
                total: parseInt(action.siswa.total),
            };

    }
    
    return state;
};