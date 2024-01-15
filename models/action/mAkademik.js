import ProductModel from '../mProduct';

export const fetchYayasan = (idYayasan) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/yayasan_v2?id_yayasan='+idYayasan
        );

        const resData = await response.json();
        let yayasanData = [];

        if (resData.detail_yayasan != null) {
            yayasanData = resData;
        } 

        dispatch({ type: 'getYayasan', yayasanData: yayasanData });
    };
};

export const fetchSekolah = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/sekolah/detail?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        let sekolahData = null;

        if (resData.id_sekolah != null) {
            sekolahData = resData;
        } 

        dispatch({ type: 'getSekolah', sekolahData: sekolahData });
    };
};

export const fetchTahunAjaran = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/index.php/api/gtech/tahun_ajaran/list?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        let tahunAjaranData = [];

        if (resData.status != false) {
            tahunAjaranData = resData;
        } 

        dispatch({ type: 'getTahunAjaran', tahunAjaranData: tahunAjaranData });
    };
};

export const fetchSemester = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/index.php/api/gtech/semester/detail?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const semesterData = resData;

        dispatch({ type: 'getSemester', semesterData: semesterData });
    };
};

export const fetchTingkat = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/index.php/api/gtech/tingkat?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const tingkatData = resData;

        dispatch({ type: 'getTingkat', tingkatData: tingkatData });
    };
};