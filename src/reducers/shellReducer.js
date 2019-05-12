import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';

export const ACTIONS = {
    GET_ID: "GET_ID"
}

export const ShellState = {
    loaded: false
}

export default (state = {}, action) => {
    switch (action.type) {
        case REQUEST(ACTIONS.GET_ID):
            return {
                ...state,
            }
        case SUCCESS(ACTIONS.GET_ID):
            return {
                ...state,
                ...action.payload.data,
                loaded: true
            }
        default:
            return state
    }
}

export const getId = () => dispatch => {
    dispatch({
        type: ACTIONS.GET_ID,
        payload: axios.get("https://api.myjson.com/bins/qfssu")
    })
}