import ProductModel from '../mProduct';

export const fetchInformasi = (type, idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/index.php/api/sekolah/informasi/list?type='+type+'&id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const loadedInformation = [];

        if (resData.length > 0) {
            for (let i = 0; i < resData.length; i++) {
                const itemData = resData[i];                
                loadedInformation.push(itemData);
            }
        } 

        dispatch({ type: 'getInformation', products: loadedInformation });
    };
};

export const fetchInformasiDetail = (type, idSekolah, id) => {
    return async dispatch => {
        const loadedPerProduct = [];
        try {
            const response = await fetch(
                'https://app.disekolah.id/index.php/api/sekolah/informasi/list?type='+type+'&id_sekolah='+idSekolah+'&id='+id
            );
    
            const resData = await response.json();
            if (resData.id) {
                const itemData = resData; 
                loadedPerProduct.push(itemData);
            }   
        } catch (error) {}

        dispatch({ type: 'getProductById', products: loadedPerProduct });
    };
};

export const fetchKritikDanSaran = (userId, type) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/index.php/api/gtech/feedback/get?user_id='+userId+'&type='+type
        );

        const resData = await response.json();
        const loeadedKritikSaran = [];

        if (resData.data.length > 0) {
            for (let i = 0; i < resData.data.length; i++) {
                const itemData = resData.data[i];                
                loeadedKritikSaran.push(itemData);
            }
        } 

        dispatch({ type: 'getKritikSaran', products: loeadedKritikSaran });
    };
};

export const fetchNotifikasi = (idSekolah) => {
    return async dispatch => {
        const response = await fetch(
            'https://app.disekolah.id/index.php/api/sekolah/informasi/notification?id_sekolah='+idSekolah
        );

        const resData = await response.json();
        const loadedNotifikasi = [];

        if (resData.data.length > 0) {
            for (let i = 0; i < resData.data.length; i++) {
                const itemData = resData.data[i];                
                loadedNotifikasi.push(itemData);
            }
        } 

        dispatch({ type: 'getNotifikasi', products: loadedNotifikasi });
    };
};

export const sendKritikSaran = (userId, fullName, email, kategoriFeedback, keteranganFeedback, kategoriUser) => {
    return async dispatch => {
        if (!kategoriFeedback) {
            const messageError = 'Kategori Feedback is required!';
            throw new Error(messageError);
        }
        if (!keteranganFeedback) {
            const messageError = 'Keterangan Feedback is required!';
            throw new Error(messageError);
        }

        let result = [];
        try {
            const response = await fetch('https://app.disekolah.id/index.php/api/gtech/feedback/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    nama_lengkap: fullName,
                    email: email,
                    kategori_feedback: kategoriFeedback,
                    keterangan_feedback: keteranganFeedback,
                    kategori_user: kategoriUser
                })
            });
            const resData = await response.json();
            result = resData;

        } catch (error) {}

        if (result.message != 'SUCCESS') {
            const messageError = 'Mohon maaf, feedback anda gagal terkirim silahkan cek koneksi internet anda atau coba lagi.';
            throw new Error(messageError);
        }

        // dispatch({ type: 'Login', user: user });
    };
};