import { combineReducers } from 'redux'
import shellReducer, { ShellState } from './shellReducer';
import authReducer, { AuthState } from './authReducer';
import volunteerReducer, { VolunteerState } from './volunteerReducer';
import studentReducer, { StudentState } from './studentReducer';
import studentRegistrationReducer, { StudentRegistrationState } from './studentRegistrationReducer';

export const initialState = {
    shellReducer: ShellState,
    authReducer: AuthState,
    volunteerReducer: VolunteerState,
    studentReducer: StudentState,
    studentRegistrationReducer: StudentRegistrationState
}

export default combineReducers({
    shellReducer,
    authReducer,
    volunteerReducer,
    studentReducer,
    studentRegistrationReducer
});