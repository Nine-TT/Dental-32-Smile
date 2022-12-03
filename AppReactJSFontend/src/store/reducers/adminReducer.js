import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctor: [],
    allDoctors: [],
    allScheduleTime: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;

            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_SUCCESS:

            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state,

            }


        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data;
            return {
                ...state,

            }


        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,

            }


        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_ALLUSER_SUCCESS:
            state.users = action.users;
            return {
                ...state,

            }

        case actionTypes.FETCH_ALLUSER_FAIL:
            state.users = [];
            return {
                ...state,

            }

        case actionTypes.FETCH_DOCTOR_SUCCESS:
            state.doctor = action.dataDoctors;
            return {
                ...state,
            }

        case actionTypes.FETCH_DOCTOR_FAIL:
            state.doctor = [];
            return {
                ...state,
            }


        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataDate;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
            state.allScheduleTime = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;