export const ACTIONS = {
    SIMPLE_ACTION: "SIMPLE_ACTION"
}

export const SimpleReducerState = {
    testLoaded: false
}

export const simpleAction = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.SIMPLE_ACTION,
        payload: payload
    })
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

