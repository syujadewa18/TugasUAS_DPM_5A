const initialState = {
    pengawas: [],
    guru: [],
    manajemen: [],
    guru_piket: [],
    pegawai: [],
    operator: [],
    orang_tua: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getKepegawaian':
            return {
                pengawas: action.data.data_pegawas,
                guru: action.data.data_guru,
                manajemen: action.data.data_manajemen,
                guru_piket: action.data.data_guru_piket,
                pegawai: action.data.data_pegawai,
                operator: action.data.data_operator,
                orang_tua: action.data.data_orang_tua
            };

    }
    
    return state;
};