export const fetchKBMGuru = (idGuru) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/Belajarsiswapengawas/get_kbm?id_guru='+idGuru
        );

        const resData = await response.json();
        const kbmGuru = resData;

        dispatch({ type: 'getKbmGuru', kbm: kbmGuru });
    };
};

export const fetchKBMGuruDefault = () => {
    return async dispatch => {
        dispatch({ type: 'getKbmGuru', kbm: [] });
    };
};

export const fetchAdministrasiGuru = (idSekolah, kodeKBM) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/Belajarsiswapengawas/get_administrasi_guru?id_sekolah='+idSekolah+'&kode_kbm='+kodeKBM
        );

        const resData = await response.json();
        const administrasiGuruData = resData;

        dispatch({ type: 'getAdministrasiGuru', administrasi_guru: administrasiGuruData });
    };
};

export const fetchPertemuanGuru = (idSekolah, idMateri) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/Belajarsiswapengawas/get_pertemuan?id_sekolah='+idSekolah+'&id_materi='+idMateri
        );

        const resData = await response.json();
        const pertemuanGuruData = resData;

        dispatch({ type: 'getPertemuanGuru', pertemuan_guru: pertemuanGuruData });
    };
};

export const fetchLaporanMengajar = (idGuru) => {
    return async dispatch => {
        console.log('sep');
        console.log(idGuru);
        const response = await fetch(
            'https://app.disekolah.id/api/gtech/Belajarsiswapengawas/get_progress_guru?id_guru='+idGuru
        );

        const resData = await response.json();
        const laporanMengajarGuru = resData;

        dispatch({ type: 'getLaporanMengajar', laporan_mengajar: laporanMengajarGuru });
    };
};

export const fetchLaporanMengajarDefault = (idGuru) => {
    return async dispatch => {
        dispatch({ type: 'getLaporanMengajar', laporan_mengajar: [] });
    };
};

export const fetchDetailPertemuan = (idMateri, idSubMateri) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/api/sekolah/belajar_siswa/modul_detail_v2?user_id=0&mode=latihan&id_materi='+idMateri+'&id_sub_materi='+idSubMateri
        );

        const resData = await response.json();
        
        const idsKelas = resData.materi.id_kelas ? resData.materi.id_kelas.split(',') : [];
        const namedKelas = resData.materi.nama_kelas ? resData.materi.nama_kelas.split(',') : [];
        let kelasData = [];
        if (idsKelas.length > 0) {
            for (let i = 0; i < idsKelas.length; i++) {
                const idKelas = idsKelas[i];
                kelasData.push(
                    {
                        "id": idKelas,
                        "kelas": namedKelas[i]
                    }
                )
            }
        }

        const detailPertemuan = {
            "fotoProfileGuru": resData.materi.cover ? resData.materi.cover : "",
            "kelasData": kelasData,
            "linkPertemuan": resData.link_pertemuan,
            "kkmPertemuan": parseInt(resData.information.kkm_pertemuan) > 0 ? parseInt(resData.information.kkm_pertemuan) : 0,
            "videoYoutube": resData.video.url_youtube ? resData.video.url_youtube : "",
            "modul": resData.modul.file ? resData.modul.file : "",
            "sudahDicek": resData.modul.checked == 1 ? 'Sudah' : 'Belum',
            "hadir": resData.pengawas_total_hadir_orang ? resData.pengawas_total_hadir_orang : 0,
            "tidakHadir": resData.pengawas_total_tidak_hadir_orang ? resData.pengawas_total_tidak_hadir_orang : 0,
            "hadirPercent": resData.pengawas_total_hadir ? resData.pengawas_total_hadir : 0,
            "tidakHadirPercent": resData.pengawas_total_tidak_hadir ? resData.pengawas_total_tidak_hadir : 0,
        };

        dispatch({ type: 'getDetailPertemuan', detail_pertemuan: detailPertemuan });
    };
};