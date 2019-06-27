import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';

export const ACTIONS = {
    AUTHENTICATE: "AUTHENTICATE",
    LOGOUT: "LOGOUT"
}

export const AuthState = {
    id: null,
    username: null,
    role: null,
    firstname: null,
    lastname: null,
    loaded: false
}

export default (state = {}, action) => {
    switch (action.type) {
        case REQUEST(ACTIONS.AUTHENTICATE):
            return {
                ...state,
                loaded: false
            }
        case SUCCESS(ACTIONS.AUTHENTICATE):
            return {
                ...state,
                ...action.payload.data,
                loaded: true,
                role: "VOLUNTEER"
            }
        case ACTIONS.LOGOUT:
            return {
                ...AuthState
            }
        default:
            return state
    }
}

export const authenticate = () => dispatch => {
    dispatch({
        type: ACTIONS.AUTHENTICATE,
        payload: axios.get("http://www.mocky.io/v2/5cdd21633000001a46e23534")
    })
}

export const clearAuthToken = () => {
    if (window.localStorage.getItem("auth-token")) {
        window.localStorage.removeItem("auth-token");
    }
}

export const logout = () => dispatch => {
    clearAuthToken();
    dispatch({
        type: ACTIONS.LOGOUT
    })
}