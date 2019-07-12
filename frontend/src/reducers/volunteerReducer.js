import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';
import { BASE_URL } from '../constants/index';

export const ACTIONS = {
    LOAD_VOLUNTEER_DATA: "LOAD_VOLUNTEER_DATA",
}

export const VolunteerState = {
    role: null,
    loading: true,
    volunteer: {}
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
