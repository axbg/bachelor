import { combineReducers } from 'redux'
import shellReducer , { ShellState } from './shellReducer';
import authReducer, { AuthState } from './authReducer';

export const initialState = {
    shellReducer: ShellState,
    authReducer: AuthState
}

export default combineReducers({
    shellReducer,
    authReducer
});