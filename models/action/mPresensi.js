export const fetchPresensi = (idSekolah, idKelas, fromDate, toDate) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/Presensipengawas/get_presensi?id_sekolah='+idSekolah+'&from_date='+fromDate+'&to_date='+toDate+'&id_kelas='+idKelas
        );

        const resData = await response.json();
        const presensiData = resData;

        dispatch({ type: 'getPresensi', presensi: presensiData });
    };
};

export const fetchAktifitas = (idSekolah) => {
    console.log(idSekolah);

    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/Presensipengawas/aktifitas?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const aktifitasData = [resData];
        console.log(aktifitasData);

        dispatch({ type: 'getAktifitas', aktifitas: aktifitasData });
    };
};

export const fetchPresensiDefault = () => {
    return async dispatch => {
        dispatch({ type: 'getPresensi', presensi: [] });
    };
};

export const fetchAktifitasRefresh = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/Presensipengawas/refresh_aktifitas?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        // const aktifitasData = [resData];
        // console.log(aktifitasData);

        // dispatch({ type: 'getAktifitas', aktifitas: aktifitasData });
    };
};