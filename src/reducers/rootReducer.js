import { combineReducers } from 'redux'
import simpleReducer, { SimpleReducerState } from './simpleReducer'
import shellReducer , { ShellState } from './shellReducer';

export const initialState = {
    simpleReducer: SimpleReducerState,
    shellReducer: ShellState
}

export default combineReducers({
    simpleReducer,
    shellReducer
});