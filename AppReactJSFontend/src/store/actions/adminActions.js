import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserSevice, getAllUsers,
    deleteUserSevice, editUserService, getDoctorHomeService,
    getAllDoctors, saveDetailDoctorService
} from '../../services/userService'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// export const fetchGenderStar = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFail())
            }

        } catch (error) {
            dispatch(fetchGenderFail())
            console.log(error)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFail())
            }

        } catch (error) {
            dispatch(fetchPositionFail())
            console.log(error)
        }
    }

}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFail())
            }

        } catch (error) {
            dispatch(fetchRoleFail())
            console.log(error)
        }
    }

}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Thêm mới thành công!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else if (res.errCode === 1) {
                toast.error("Thêm mới thất bại")
                dispatch(saveUserFail())
                dispatch(fetchAllUserStart())
            }

        } catch (error) {
            toast.error("Thêm mới thất bại")
            dispatch(saveUserFail())
            console.log(error)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})



export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFail())
            }

        } catch (error) {
            dispatch(fetchAllUserFail())
            console.log(error)
        }
    }

}


export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALLUSER_SUCCESS,
    users: data
})

export const fetchAllUserFail = (data) => ({
    type: actionTypes.FETCH_ALLUSER_FAIL

})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserSevice(userId);
            if (res && res.errCode === 0) {
                toast.success("Xóa người dùng thành công!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Xóa người dùng thất bại!")
                dispatch(deleteUserFail())
            }

        } catch (error) {
            toast.error("Xóa người dùng thất bại!")
            dispatch(deleteUserFail())
            console.log(error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.FETCH_ALLUSER_FAIL
})


export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Sửa người dùng thành công!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Sửa thất bại!")
                dispatch(editUserFail())
            }

        } catch (error) {
            toast.error("Sửa thất bại!")
            dispatch(editUserFail())
            console.log(error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_FAIL
                })
            }
        } catch (error) {
            console.log('FETCH_ALL_DOCTOR_FAIL', error)
            dispatch({
                type: actionTypes.FETCH_DOCTOR_FAIL
            })
        }
    }
}


export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIL
                })
            }
        } catch (error) {
            console.log('actionTypes.FETCH_DOCTOR_FAIL', error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIL
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Thêm thông tin thành công!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("Thêm thông tin thất bại!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
                })
            }
        } catch (error) {
            toast.error("Thêm thông tin thất bại!")
            console.log('actionTypes.FETCH_DOCTOR_FAIL', error)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
            })
        }
    }
}


export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('time');
            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataDate: res.data


                })


            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
                })
            }
        } catch (error) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAIL', error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
            })
        }
    }
}
