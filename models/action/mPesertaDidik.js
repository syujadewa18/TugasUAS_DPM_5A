export const fetchPesertaDidik = (idSekolah, idKelas, page) => {
    return async dispatch => {
        const itemsPerPage = 500;
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/peserta_didik/detail?id_sekolah='+idSekolah+'&kelas='+idKelas+'&page='+page+'&limit='+itemsPerPage
        );

        const resData = await response.json();
        const siswaData = {
            'data': resData.data,
            'total': resData.total_data
        };

        dispatch({ type: 'getSiswa', siswa: siswaData });
    };
};

export const fetchPesertaDidikDefault = () => {
    return async dispatch => {
        const siswaData = {
            'data': [],
            'total': 0
        };
        dispatch({ type: 'getSiswa', siswa: siswaData });
    };
};