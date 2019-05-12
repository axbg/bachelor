import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';

export const ACTIONS = {
    AUTHENTICATE: "AUTHENTICATE"
}

export const AuthState = {
    id: null,
    username: null,
    role: null,
    firstname: null,
    lastname: null,
    loaded: true
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
                loaded: true
            }
        default:
            return state
    }
}

export const authenticate = () => dispatch => {
    dispatch({
        type: ACTIONS.AUTHENTICATE,
        payload: axios.get("https://api.myjson.com/bins/qfssu")
    })
}