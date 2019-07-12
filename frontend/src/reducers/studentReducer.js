import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';
import { BASE_URL } from '../constants/index';

export const ACTIONS = {
    LOAD_STUDENT_DATA: "LOAD_STUDENT_DATA",
}

export const StudentState = {
    role: null,
    loading: true,
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
