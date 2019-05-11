import { ACTIONS } from '../actions/simpleAction'

export const SimpleReducerState = {
    testLoaded: false
}

export default (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.SIMPLE_ACTION:
            return {
                ...state,
                testLoaded: action.payload
            }
        default:
            return state
    }
}