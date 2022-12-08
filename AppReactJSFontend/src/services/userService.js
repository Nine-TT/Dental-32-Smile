import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserSevice = (data) => {
    console.log('check data fr sevice: ', data)
    return axios.post('/api/create-new-user', data)
}


const deleteUserSevice = (userId) => {
    // return axios.delete('/api/delete-user', {id: userId})
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}


const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getDoctorHomeService = (limit) => {
    return axios.get(`/api/doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveScheduleDocter = (data) => {
    return axios.post(`/api/create-schedule`, data)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserSevice,
    deleteUserSevice,
    editUserService,
    getAllCodeService,
    getDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveScheduleDocter
}
