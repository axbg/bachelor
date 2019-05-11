import { combineReducers } from 'redux'
import simpleReducer, { SimpleReducerState } from './simpleReducer'

export const initialState = {
    simpleReducer: SimpleReducerState
}

export default combineReducers({
    simpleReducer
});