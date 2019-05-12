import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';

export const ACTIONS = {
    GET_ID: "GET_ID",
    CHANGE_DEVICE_TYPE: "CHANGE_DEVICE_TYPE"
}

export const ShellState = {
    testId: 0,
    mobileDevice: true
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
            }
        case ACTIONS.CHANGE_DEVICE_TYPE:
            return {
                ...state,
                mobileDevice: action.payload
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

export const mobileLayout = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.CHANGE_DEVICE_TYPE,
        payload: payload
    })
}