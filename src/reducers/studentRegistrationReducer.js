import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';

export const ACTIONS = {
    REGISTER: "REGISTER"
}

export const StudentRegistrationState = {
    loading: false,
    registered: false,
    error: false
}

export default (state = {}, action) => {
    switch (action.type) {
        case REQUEST(ACTIONS.REGISTER):
            return {
                ...state,
                loading: true,
            }
        case SUCCESS(ACTIONS.REGISTER):
            return {
                ...state,
                ...action.payload.data,
                loading: false,
                registered: true
            }
        case FAILURE(ACTIONS.REGISTER):
            return {
                registered: false,
                loading: false,
                error: true
            }
        default:
            return state
    }
}

//use the gateway api
export const register = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.REGISTER,
        payload: axios.post("http://localhost:8001/register", payload)
    })
}