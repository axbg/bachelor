import { ACTIONS } from '../actions/simpleAction'

export default (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.SIMPLE_ACTION:
            return {
                ...state,
                result: action.payload
            }
        default:
            return state
    }
}