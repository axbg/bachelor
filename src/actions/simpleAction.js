export const ACTIONS = {
    SIMPLE_ACTION: "SIMPLE_ACTION"
}

export const simpleAction = () => dispatch => {
    dispatch({
        type: ACTIONS.SIMPLE_ACTION,
        payload: "test"
    })
}