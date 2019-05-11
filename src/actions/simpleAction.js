export const ACTIONS = {
    SIMPLE_ACTION: "SIMPLE_ACTION"
}

export const simpleAction = (payload) => dispatch => {
    dispatch({
        type: ACTIONS.SIMPLE_ACTION,
        payload: payload
    })
}