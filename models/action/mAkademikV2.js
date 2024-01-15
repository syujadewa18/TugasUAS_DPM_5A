import ProductModel from '../mProduct';

export const fetchKejuruan = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/kejuruan/detail?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const kejuruanData = resData;

        dispatch({ type: 'getKejuruan', kejuruanData: kejuruanData });
    };
};

export const fetchKelas = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/kelas/detail?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const kelasData = resData;

        dispatch({ type: 'getKelas', kelasData: kelasData });
    };
};

export const fetchMapel = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/mapel_v2/detail?id_sekolah='+idSekolah
        );

        let mapelData = [];
        const resData = await response.json();
        if (resData != undefined) {
            mapelData = resData;   
        }

        dispatch({ type: 'getMapel', mapelData: mapelData });
    };
};

export const fetchAngkatan = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/angkatan/list?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const angkatanData = resData;

        dispatch({ type: 'getAngkatan', angkatanData: angkatanData });
    };
};

export const fetchKBM = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/kbm/detail?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const kbmData = resData;

        dispatch({ type: 'getKBM', kbmData: kbmData });
    };
};