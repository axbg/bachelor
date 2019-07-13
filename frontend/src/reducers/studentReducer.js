import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';
import { BASE_URL } from '../constants/index';

export const ACTIONS = {
    LOAD_STUDENT_DATA: "LOAD_STUDENT_DATA",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    UPDATE_STUDENT_DATA: "UPDATE_STUDENT_DATA",
    REQUEST_ORDER_NUMBER: "REQUEST_ORDER_NUMBER",
    GET_FORMATTED_OPTIONS: "GET_FORMATTED_OPTIONS",
    ADD_OPTION: "ADD_OPTION",
    DELETE_OPTION: "DELETE_OPTION",
    BUY_CREDITS: "BUY_CREDITS"
}

export const StudentState = {
    role: null,
    loading: true,
    inAppLoading: false,
    faculties: {},
    locationFailed: false,
    formattedOptions: null
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
                ...action.payload.data.message.student,
                faculties: action.payload.data.message.faculties,
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
            return {
                ...state,
                active: true
            }
        case FAILURE(ACTIONS.CHANGE_PASSWORD):
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
                ...action.payload.data.message.student,
                inAppLoading: false,
            }
        case FAILURE(ACTIONS.UPDATE_STUDENT_DATA):
            return {
                ...state,
                inAppLoading: false
            }
        case REQUEST(ACTIONS.REQUEST_ORDER_NUMBER):
        case REQUEST(ACTIONS.BUY_CREDITS):
            return {
                ...state,
                inAppLoading: true
            }
        case SUCCESS(ACTIONS.REQUEST_ORDER_NUMBER):
            return {
                ...state,
                ...action.payload.data.message.student,
                inAppLoading: false,
            }
        case FAILURE(ACTIONS.REQUEST_ORDER_NUMBER):
        case FAILURE(ACTIONS.BUY_CREDITS):
            return {
                ...state,
                inAppLoading: false
            }
        case SUCCESS(ACTIONS.BUY_CREDITS):
            return {
                ...state,
                ...action.payload.data.message,
                inAppLoading: false,
            }
        case REQUEST(ACTIONS.GET_FORMATTED_OPTIONS):
        case REQUEST(ACTIONS.ADD_OPTION):
        case REQUEST(ACTIONS.DELETE_OPTION):
            return {
                ...state,
                inAppLoading: true
            }
        case SUCCESS(ACTIONS.GET_FORMATTED_OPTIONS):
        case SUCCESS(ACTIONS.ADD_OPTION):
        case SUCCESS(ACTIONS.DELETE_OPTION):
            return {
                ...state,
                ...action.payload.data.message.student,
                formattedOptions: { ...action.payload.data.message.options },
                inAppLoading: false,
            }
        case FAILURE(ACTIONS.GET_FORMATTED_OPTIONS):
        case FAILURE(ACTIONS.ADD_OPTION):
        case FAILURE(ACTIONS.DELETE_OPTION):
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

export const requestOrderNumber = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.REQUEST_ORDER_NUMBER,
        payload: axios.post(BASE_URL + "/student/generate-order-number", { ...payload })
    })
}

export const getFormattedOptions = () => dispatch => {
    dispatch({
        type: ACTIONS.GET_FORMATTED_OPTIONS,
        payload: axios.get(BASE_URL + "/student/options")
    })
}

export const addOption = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.ADD_OPTION,
        payload: axios.post(BASE_URL + "/student/create-option", { facultyProfileId: payload })
    })
}

export const deleteOption = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.DELETE_OPTION,
        payload: axios.delete(BASE_URL + "/student/delete-option/" + payload)
    })
}

export const buyCredits = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.BUY_CREDITS,
        payload: axios.post(BASE_URL + "/payment/update-credits", { ...payload })
    })
}