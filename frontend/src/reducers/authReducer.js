import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';
import { BASE_URL } from '../constants';

export const ACTIONS = {
    AUTHENTICATE: "AUTHENTICATE",
    LOGOUT: "LOGOUT"
}

export const AuthState = {
    loading: true,
    jwt: null,
    failed: false
}

export default (state = {}, action) => {
    switch (action.type) {
        case REQUEST(ACTIONS.AUTHENTICATE):
            return {
                ...state,
                failed: false
            }
        case SUCCESS(ACTIONS.AUTHENTICATE):
            return {
                ...state,
                ...action.payload.data,
                loading: true,
                failed: false
            }
        case FAILURE(ACTIONS.AUTHENTICATE):
            return {
                ...state,
                failed: true
            }
        case ACTIONS.LOGOUT:
            return {
                ...AuthState
            }
        default:
            return state
    }
}

export const authenticate = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.AUTHENTICATE,
        payload: axios.post(BASE_URL + "/login", { ...payload })
    });
}

export const clearAuthToken = () => {
    if (window.localStorage.getItem("auth-token")) {
        window.localStorage.removeItem("auth-token");
        window.localStorage.removeItem("email");
        window.location.reload();
    }
}

export const logout = () => dispatch => {
    clearAuthToken();
    dispatch({
        type: ACTIONS.LOGOUT
    })
}