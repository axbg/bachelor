import { combineReducers } from 'redux'
import shellReducer, { ShellState } from './shellReducer';
import authReducer, { AuthState } from './authReducer';
import studentRegistrationReducer, { StudentRegistrationState } from './studentRegistrationReducer';

export const initialState = {
    shellReducer: ShellState,
    authReducer: AuthState,
    studentRegistrationReducer: StudentRegistrationState
}

export default combineReducers({
    shellReducer,
    authReducer,
    studentRegistrationReducer
});