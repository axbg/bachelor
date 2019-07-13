import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';
import { BASE_URL } from '../constants/index';

export const ACTIONS = {
    LOAD_VOLUNTEER_DATA: "LOAD_VOLUNTEER_DATA",
    SEARCH_STUDENT_DATA: "SEARCH_STUDENT_DATA",
    ADD_CREDITS: "ADD_CREDITS",
    CHANGE_TAX_STATUS: "CHANGE_TAX_STATUS"
}

export const VolunteerState = {
    role: null,
    loading: true,
    inAppLoading: false,
    volunteer: {},
    student: {},
    searchLoading: false,
    notFound: false
}

export default (state = {}, action) => {
    switch (action.type) {
        case REQUEST(ACTIONS.LOAD_VOLUNTEER_DATA):
            return {
                ...state,
                loading: true
            }
        case SUCCESS(ACTIONS.LOAD_VOLUNTEER_DATA):
            return {
                ...state,
                volunteer: { ...action.payload.data.message.user },
                loading: false,
                role: action.payload.data.message.user.role.role
            }
        case FAILURE(ACTIONS.LOAD_VOLUNTEER_DATA):
            return {
                ...state,
                loading: false
            }
        case REQUEST(ACTIONS.SEARCH_STUDENT_DATA):
            return {
                ...state,
                searchLoading: true,
                notFound: false
            }
        case SUCCESS(ACTIONS.SEARCH_STUDENT_DATA):
            return {
                ...state,
                student: { ...action.payload.data.message.student },
                searchLoading: false,
                notFound: action.payload.data.message.student.id ? false : true
            }
        case FAILURE(ACTIONS.SEARCH_STUDENT_DATA):
            return {
                ...state,
                searchLoading: false,
            }
        case REQUEST(ACTIONS.ADD_CREDITS):
        case SUCCESS(ACTIONS.ADD_CREDITS):
        case FAILURE(ACTIONS.ADD_CREDITS):
        case REQUEST(ACTIONS.CHANGE_TAX_STATUS):
        case SUCCESS(ACTIONS.CHANGE_TAX_STATUS):
        case FAILURE(ACTIONS.CHANGE_TAX_STATUS):
            return {
                ...state
            }
        default:
            return state
    }
}

export const loadVolunteerData = () => dispatch => {
    dispatch({
        type: ACTIONS.LOAD_VOLUNTEER_DATA,
        payload: axios.get(BASE_URL + "/volunteer/load")
    })
}

export const loadStudentData = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.SEARCH_STUDENT_DATA,
        payload: axios.get(BASE_URL + "/volunteer/search-student/" + payload)
    })
}

export const addCredits = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.ADD_CREDITS,
        payload: axios.post(BASE_URL + "/payment/update-credits", {...payload})
    })
}

export const changeTaxStatus = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.ADD_CREDITS,
        payload: axios.post(BASE_URL + "/payment/update-tax", {studentId: payload})
    })
}