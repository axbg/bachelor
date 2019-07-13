import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';
import { BASE_URL } from '../constants/index';

export const ACTIONS = {
    LOAD_STUDENT_DATA: "LOAD_STUDENT_DATA",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    UPDATE_STUDENT_DATA: "UPDATE_STUDENT_DATA"
}

export const StudentState = {
    role: null,
    loading: true,
    inAppLoading: false,
    student: {}
}

export default (state = {}, action) => {
    switch (action.type) {
        case REQUEST(ACTIONS.LOAD_STUDENT_DATA):
            return {
                ...state,
                loading: true
            }
        case SUCCESS(ACTIONS.LOAD_STUDENT_DATA):
            return {
                ...state,
                student: { ...action.payload.data.message.student },
                loading: false,
                role: "STUDENT"
            }
        case FAILURE(ACTIONS.LOAD_STUDENT_DATA):
            return {
                ...state,
                loading: false
            }
        case REQUEST(ACTIONS.CHANGE_PASSWORD):
        case SUCCESS(ACTIONS.CHANGE_PASSWORD):
        case SUCCESS(ACTIONS.CHANGE_PASSWORD):
            return {
                ...state,
            }
        case REQUEST(ACTIONS.UPDATE_STUDENT_DATA):
            return {
                ...state,
                inAppLoading: true
            }
        case SUCCESS(ACTIONS.UPDATE_STUDENT_DATA):
            return {
                ...state,
                student: { ...action.payload.data.message.student },
                inAppLoading: false,
            }
        case FAILURE(ACTIONS.UPDATE_STUDENT_DATA):
            return {
                ...state,
                inAppLoading: false
            }
        default:
            return state
    }
}

export const loadStudentData = () => dispatch => {
    dispatch({
        type: ACTIONS.LOAD_STUDENT_DATA,
        payload: axios.get(BASE_URL + "/student/load")
    })
}

export const changePassword = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.CHANGE_PASSWORD,
        payload: axios.post(BASE_URL + "/student/change-password", { password: payload })
    })
}

export const updateData = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.UPDATE_STUDENT_DATA,
        payload: axios.patch(BASE_URL + "/student/update", { ...payload })
    })
}
