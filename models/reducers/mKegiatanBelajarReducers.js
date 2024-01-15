const initialState = {
    administrasi_guru: [],
    kbm: [],
    pertemuan_guru: [],
    laporan_mengajar: [],
    detail_pertemuan: {
        "fotoProfileGuru": "",
        "kelasData": [],
        "linkPertemuan": [],
        "kkmPertemuan": 0,
        "videoYoutube": "",
        "modul": "",
        "hadir": 0,
        "tidakHadir": 0,
        "hadirPercent": 0,
        "tidakHadirPercent": 0,
        "sudahDicek": "Belum"
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getKbmGuru':
            return {
                ...state,
                kbm: action.kbm
            };
        case 'getAdministrasiGuru':
            return {
                ...state,
                administrasi_guru: action.administrasi_guru
            };
        case 'getPertemuanGuru':
            return {
                ...state,
                pertemuan_guru: action.pertemuan_guru
            };
        case 'getLaporanMengajar':
            return {
                ...state,
                laporan_mengajar: action.laporan_mengajar
            };
        case 'getDetailPertemuan': 
            return {
                ...state,
                detail_pertemuan: action.detail_pertemuan
            }

    }
    
    return state;
};