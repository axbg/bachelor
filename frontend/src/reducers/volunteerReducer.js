import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';
import { BASE_URL } from '../constants/index';

export const ACTIONS = {
    LOAD_VOLUNTEER_DATA: "LOAD_VOLUNTEER_DATA",
    SEARCH_STUDENT_DATA: "SEARCH_STUDENT_DATA",
    ADD_CREDITS: "ADD_CREDITS",
    CHANGE_TAX_STATUS: "CHANGE_TAX_STATUS",
    GET_STUDENT_FORMATTED_OPTIONS: "GET_STUDENT_FORMATTED_OPTIONS",
    ADD_STUDENT_OPTION: "ADD_STUDENT_OPTION",
    DELETE_STUDENT_OPTION: "DELETE_STUDENT_OPTION",
    UPDATE_STUDENT_DATA_AS_USER: "UPDATE_STUDENT_DATA_AS_USER",
    CREATE_FLOW: "CREATE_FLOW",
    SEND_STUDENT_NOTIFICATIONS: "SEND_STUDENT_NOTIFICATIONS",
    GET_FACULTIES: "GET_FACULTIES",
    GENERATE_ORDER_NUMBER_AS_USER: "GENERATE_ORDER_NUMBER_AS_USER",
    GET_POSITIONS: "GET_POSITIONS",
    CREATE_POSITION_REQUEST: "CREATE_POSITION_REQUEST"
}

export const VolunteerState = {
    role: null,
    loading: true,
    inAppLoading: false,
    volunteer: {},
    student: {},
    searchLoading: false,
    notFound: false,
    formattedOptions: null,
    faculties: null,
    positions: null
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
                notFound: false,
            }
        case SUCCESS(ACTIONS.SEARCH_STUDENT_DATA):
            return {
                ...state,
                student: { ...action.payload.data.message.student },
                searchLoading: false,
                notFound: action.payload.data.message.student.id ? false : true,
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
        case REQUEST(ACTIONS.GET_STUDENT_FORMATTED_OPTIONS):
        case REQUEST(ACTIONS.ADD_STUDENT_OPTION):
        case REQUEST(ACTIONS.DELETE_STUDENT_OPTION):
            return {
                ...state,
            }
        case SUCCESS(ACTIONS.GET_STUDENT_FORMATTED_OPTIONS):
        case SUCCESS(ACTIONS.ADD_STUDENT_OPTION):
        case SUCCESS(ACTIONS.DELETE_STUDENT_OPTION):
            return {
                ...state,
                student: { ...action.payload.data.message.student },
                formattedOptions: { ...action.payload.data.message.options },
            }
        case FAILURE(ACTIONS.GET_STUDENT_FORMATTED_OPTIONS):
        case FAILURE(ACTIONS.ADD_STUDENT_OPTION):
        case FAILURE(ACTIONS.DELETE_STUDENT_OPTION):
            return {
                ...state,
            }
        case REQUEST(ACTIONS.UPDATE_STUDENT_DATA_AS_USER):
            return {
                ...state,
                student: null,
                searchLoading: true,
            }
        case SUCCESS(ACTIONS.UPDATE_STUDENT_DATA_AS_USER):
            return {
                ...state,
                student: { ...action.payload.data.message.student.student },
                searchLoading: false,
            }
        case FAILURE(ACTIONS.UPDATE_STUDENT_DATA_AS_USER):
            return {
                ...state,
                searchLoading: false
            }
        case REQUEST(ACTIONS.GET_FACULTIES):
            return {
                ...state,
            }
        case SUCCESS(ACTIONS.GET_FACULTIES):
            return {
                ...state,
                faculties: action.payload.data.message.faculties,
            }
        case FAILURE(ACTIONS.GET_FACULTIES):
            return {
                ...state,
            }
        case REQUEST(ACTIONS.GET_POSITIONS):
            return {
                ...state,
            }
        case SUCCESS(ACTIONS.GET_POSITIONS):
            return {
                ...state,
                positions: action.payload.data.message,
            }
        case FAILURE(ACTIONS.GET_POSITIONS):
            return {
                ...state,
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
        payload: axios.post(BASE_URL + "/payment/update-credits", { ...payload })
    })
}

export const changeTaxStatus = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.ADD_CREDITS,
        payload: axios.post(BASE_URL + "/payment/update-tax", { studentId: payload })
    })
}

export const getFormattedOptions = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.GET_STUDENT_FORMATTED_OPTIONS,
        payload: axios.get(BASE_URL + "/student/options/" + payload)
    })
}

export const addOption = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.ADD_STUDENT_OPTION,
        payload: axios.post(BASE_URL + "/student/create-option/" + payload.studentId, { facultyProfileId: payload.optionId })
    })
}

export const deleteOption = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.DELETE_STUDENT_OPTION,
        payload: axios.delete(BASE_URL + "/student/delete-option/" + payload.optionId + "/" + payload.studentId)
    })
}

export const updateStudentDataAsUser = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.UPDATE_STUDENT_DATA_AS_USER,
        payload: axios.patch(BASE_URL + "/student/update/" + payload.studentId, { ...payload.data })
    })
}

export const createFlow = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.CREATE_FLOW,
        payload: axios.post(BASE_URL + "/volunteer/flow", { flow: payload })
    })
}

export const sendStudentNotifications = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.SEND_STUDENT_NOTIFICATIONS,
        payload: axios.post(BASE_URL + "/volunteer/notify-students", { numberOfStudents: payload })
    })
}

export const getFaculties = () => dispatch => {
    dispatch({
        type: ACTIONS.GET_FACULTIES,
        payload: axios.get(BASE_URL + "/volunteer/faculties")
    })
}

export const getPositions = () => dispatch => {
    dispatch({
        type: ACTIONS.GET_POSITIONS,
        payload: axios.get(BASE_URL + "/volunteer/positions")
    })
}

export const generateOrderNumber = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.GENERATE_ORDER_NUMBER_AS_USER,
        payload: axios.post(BASE_URL + "/volunteer/generate-order-number", { ...payload })
    })
}

export const createPositionRequest = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.CREATE_POSITION_REQUEST,
        payload: axios.post(BASE_URL + "/volunteer/position-request", { positionId: payload })
    })
}