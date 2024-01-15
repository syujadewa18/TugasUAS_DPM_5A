const initialState = {
    yayasanData: [],
    sekolahData: null,
    tahunAjaranData: [],
    semesterData: [],
    tingkatData: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'getYayasan':
            return {
                ...state,
                yayasanData: action.yayasanData
            };
        case 'getSekolah':
            return {
                ...state,
                sekolahData: action.sekolahData
            };
        case 'getTahunAjaran':
            return {
                ...state,
                tahunAjaranData: action.tahunAjaranData
            };
        case 'getSemester':
            return {
                ...state,
                semesterData: action.semesterData
            };
        case 'getTingkat':
            return {
                ...state,
                tingkatData: action.tingkatData
            };

    }
    
    return state;
};