import { combineReducers } from 'redux'
import shellReducer , { ShellState } from './shellReducer';

export const initialState = {
    shellReducer: ShellState
}

export default combineReducers({
    shellReducer
});