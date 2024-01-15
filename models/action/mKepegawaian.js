export const fetchKepegawaian = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/Listuser/allinone_quer?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const listData = resData;

        dispatch({ type: 'getKepegawaian', data: listData });
    };
};

export const fetchKepegawaianDefault = () => {
    return async dispatch => {
        const listData = {
            data_pegawas: [],
            data_guru: [],
            data_manajemen: [],
            data_guru_piket: [],
            data_pegawai: [],
            data_operator: [],
            data_orang_tua: []
        }
        
        dispatch({ type: 'getKepegawaian', data: listData });
    };
};