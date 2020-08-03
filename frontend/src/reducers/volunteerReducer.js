import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../config/actions-async-types';
import { BASE_URL, SORT_URL } from '../constants';

export const ACTIONS = {
  LOAD_VOLUNTEER_DATA: 'LOAD_VOLUNTEER_DATA',
  SEARCH_STUDENT_DATA: 'SEARCH_STUDENT_DATA',
  ADD_CREDITS: 'ADD_CREDITS',
  CHANGE_TAX_STATUS: 'CHANGE_TAX_STATUS',
  GET_STUDENT_FORMATTED_OPTIONS: 'GET_STUDENT_FORMATTED_OPTIONS',
  ADD_STUDENT_OPTION: 'ADD_STUDENT_OPTION',
  DELETE_STUDENT_OPTION: 'DELETE_STUDENT_OPTION',
  UPDATE_STUDENT_DATA_AS_USER: 'UPDATE_STUDENT_DATA_AS_USER',
  CREATE_FLOW: 'CREATE_FLOW',
  SEND_STUDENT_NOTIFICATIONS: 'SEND_STUDENT_NOTIFICATIONS',
  GET_FACULTIES: 'GET_FACULTIES',
  GENERATE_ORDER_NUMBER_AS_USER: 'GENERATE_ORDER_NUMBER_AS_USER',
  GET_POSITIONS: 'GET_POSITIONS',
  CREATE_POSITION_REQUEST: 'CREATE_POSITION_REQUEST',
  GET_ROLES: 'GET_ROLES',
  GET_VOLUNTEERS: 'GET_VOLUNTEERS',
  UPDATE_VOLUNTEER: 'UPDATE_VOLUNTEER',
  CREATE_VOLUNTEER: 'CREATE_VOLUNTEER',
  DRY_SORT: 'DRY_SORT',
  SORT: 'SORT',
  GET_ITERATIONS: 'GET_ITERATIONS',
  SOLVE_POSITION_REQUEST: 'SOLVE_POSITION_REQUEST',
  ENROLL_STUDENT: 'ENROLL_STUDENT',
  GET_WITHDRAWALS: 'GET_WITHDRAWALS',
  UPDATE_VOLUNTEER_POSITION: 'UPDATE_VOLUNTEER_POSITION',
};

export const VolunteerState = {
  role: null,
  loading: true,
  initialLoadFailed: false,
  inAppLoading: false,
  volunteer: {},
  student: {},
  searchLoading: false,
  notFound: false,
  formattedOptions: null,
  faculties: null,
  positions: null,
  roles: null,
  volunteers: null,
  iterations: null,
  withdrawals: null,
};

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST(ACTIONS.LOAD_VOLUNTEER_DATA):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTIONS.LOAD_VOLUNTEER_DATA):
      return {
        ...state,
        volunteer: { ...action.payload.data.message.user },
        loading: false,
        role: action.payload.data.message.user.role.role,
      };
    case FAILURE(ACTIONS.LOAD_VOLUNTEER_DATA):
      return {
        ...state,
        initialLoadFailed: true,
      };
    case REQUEST(ACTIONS.SEARCH_STUDENT_DATA):
      return {
        ...state,
        searchLoading: true,
        notFound: false,
      };
    case SUCCESS(ACTIONS.SEARCH_STUDENT_DATA):
      return {
        ...state,
        student: { ...action.payload.data.message.student },
        searchLoading: false,
        notFound: action.payload.data.message.student.id ? false : true,
      };
    case FAILURE(ACTIONS.SEARCH_STUDENT_DATA):
      return {
        ...state,
        searchLoading: false,
      };
    case REQUEST(ACTIONS.ADD_CREDITS):
    case SUCCESS(ACTIONS.ADD_CREDITS):
    case FAILURE(ACTIONS.ADD_CREDITS):
    case REQUEST(ACTIONS.CHANGE_TAX_STATUS):
    case SUCCESS(ACTIONS.CHANGE_TAX_STATUS):
    case FAILURE(ACTIONS.CHANGE_TAX_STATUS):
      return {
        ...state,
      };
    case REQUEST(ACTIONS.GET_STUDENT_FORMATTED_OPTIONS):
    case REQUEST(ACTIONS.ADD_STUDENT_OPTION):
    case REQUEST(ACTIONS.DELETE_STUDENT_OPTION):
      return {
        ...state,
      };
    case SUCCESS(ACTIONS.GET_STUDENT_FORMATTED_OPTIONS):
    case SUCCESS(ACTIONS.ADD_STUDENT_OPTION):
    case SUCCESS(ACTIONS.DELETE_STUDENT_OPTION):
      return {
        ...state,
        student: { ...action.payload.data.message.student },
        formattedOptions: { ...action.payload.data.message.options },
      };
    case FAILURE(ACTIONS.GET_STUDENT_FORMATTED_OPTIONS):
    case FAILURE(ACTIONS.ADD_STUDENT_OPTION):
    case FAILURE(ACTIONS.DELETE_STUDENT_OPTION):
      return {
        ...state,
      };
    case REQUEST(ACTIONS.UPDATE_STUDENT_DATA_AS_USER):
      return {
        ...state,
        student: null,
        searchLoading: true,
      };
    case SUCCESS(ACTIONS.UPDATE_STUDENT_DATA_AS_USER):
      return {
        ...state,
        student: { ...action.payload.data.message.student.student },
        searchLoading: false,
      };
    case FAILURE(ACTIONS.UPDATE_STUDENT_DATA_AS_USER):
      return {
        ...state,
        searchLoading: false,
      };
    case REQUEST(ACTIONS.GET_FACULTIES):
      return {
        ...state,
      };
    case SUCCESS(ACTIONS.GET_FACULTIES):
      return {
        ...state,
        faculties: action.payload.data.message.faculties,
      };
    case FAILURE(ACTIONS.GET_FACULTIES):
      return {
        ...state,
      };
    case REQUEST(ACTIONS.GET_POSITIONS):
      return {
        ...state,
      };
    case SUCCESS(ACTIONS.GET_POSITIONS):
      return {
        ...state,
        positions: action.payload.data.message,
      };
    case FAILURE(ACTIONS.GET_POSITIONS):
      return {
        ...state,
      };
    case REQUEST(ACTIONS.GET_ROLES):
      return {
        ...state,
      };
    case SUCCESS(ACTIONS.GET_ROLES):
      return {
        ...state,
        roles: action.payload.data.message.roles,
      };
    case FAILURE(ACTIONS.GET_ROLES):
      return {
        ...state,
      };
    case REQUEST(ACTIONS.GET_VOLUNTEERS):
    case REQUEST(ACTIONS.CREATE_VOLUNTEER):
      return {
        ...state,
      };
    case SUCCESS(ACTIONS.GET_VOLUNTEERS):
    case SUCCESS(ACTIONS.CREATE_VOLUNTEER):
      return {
        ...state,
        volunteers: action.payload.data.message.volunteers,
      };
    case FAILURE(ACTIONS.GET_VOLUNTEERS):
    case FAILURE(ACTIONS.CREATE_VOLUNTEER):
      return {
        ...state,
      };
    case REQUEST(ACTIONS.GET_ITERATIONS):
      return {
        ...state,
      };
    case SUCCESS(ACTIONS.GET_ITERATIONS):
      return {
        ...state,
        iterations: action.payload.data.message.iterations,
      };
    case FAILURE(ACTIONS.GET_ITERATIONS):
      return {
        ...state,
      };
    case REQUEST(ACTIONS.ENROLL_STUDENT):
      return {
        ...state,
        searchLoading: true,
      };
    case SUCCESS(ACTIONS.ENROLL_STUDENT):
      return {
        ...state,
        searchLoading: false,
        student: {},
      };
    case FAILURE(ACTIONS.ENROLL_STUDENT):
      return {
        ...state,
        searchLoading: false,
      };
    case REQUEST(ACTIONS.GET_WITHDRAWALS):
      return {
        ...state,
        searchLoading: true,
      };
    case SUCCESS(ACTIONS.GET_WITHDRAWALS):
      return {
        ...state,
        searchLoading: false,
        withdrawals: action.payload.data.message.withdrawals,
      };
    case FAILURE(ACTIONS.GET_WITHDRAWALS):
      return {
        ...state,
        searchLoading: false,
      };
    case SUCCESS(ACTIONS.UPDATE_VOLUNTEER_POSITION):
      return {
        ...state,
        volunteer: { ...action.payload.data.message.user },
      };
    default:
      return state;
  }
};

export const loadVolunteerData = () => (dispatch) => {
  dispatch({
    type: ACTIONS.LOAD_VOLUNTEER_DATA,
    payload: axios.get(BASE_URL + '/volunteer/load'),
  });
};

export const loadStudentData = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.SEARCH_STUDENT_DATA,
    payload: axios.get(BASE_URL + '/volunteer/search-student/' + payload),
  });
};

export const addCredits = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_CREDITS,
    payload: axios.post(BASE_URL + '/payment/update-credits', { ...payload }),
  });
};

export const changeTaxStatus = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_CREDITS,
    payload: axios.post(BASE_URL + '/payment/update-tax', { studentId: payload }),
  });
};

export const getFormattedOptions = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_STUDENT_FORMATTED_OPTIONS,
    payload: axios.get(BASE_URL + '/student/options/' + payload),
  });
};

export const addOption = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_STUDENT_OPTION,
    payload: axios.post(BASE_URL + '/student/create-option/' + payload.studentId, { facultyProfileId: payload.optionId }),
  });
};

export const deleteOption = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.DELETE_STUDENT_OPTION,
    payload: axios.delete(BASE_URL + '/student/delete-option/' + payload.optionId + '/' + payload.studentId),
  });
};

export const updateStudentDataAsUser = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.UPDATE_STUDENT_DATA_AS_USER,
    payload: axios.patch(BASE_URL + '/student/update/' + payload.studentId, { ...payload.data }),
  });
};

export const createFlow = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.CREATE_FLOW,
    payload: axios.post(BASE_URL + '/volunteer/flow', { flow: payload }),
  });
};

export const sendStudentNotifications = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.SEND_STUDENT_NOTIFICATIONS,
    payload: axios.post(BASE_URL + '/volunteer/notify-students', { numberOfStudents: payload }),
  });
};

export const getFaculties = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_FACULTIES,
    payload: axios.get(BASE_URL + '/volunteer/faculties'),
  });
};

export const getPositions = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_POSITIONS,
    payload: axios.get(BASE_URL + '/volunteer/positions'),
  });
};

export const getRoles = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_ROLES,
    payload: axios.get(BASE_URL + '/volunteer/roles'),
  });
};

export const getVolunteers = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_VOLUNTEERS,
    payload: axios.get(BASE_URL + '/admin/volunteers'),
  });
};

export const generateOrderNumber = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.GENERATE_ORDER_NUMBER_AS_USER,
    payload: axios.post(BASE_URL + '/volunteer/generate-order-number', { ...payload }),
  });
};

export const createPositionRequest = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.CREATE_POSITION_REQUEST,
    payload: axios.post(BASE_URL + '/volunteer/position-request', { positionId: payload }),
  });
};

export const updateVolunteer = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.UPDATE_VOLUNTEER,
    payload: axios.patch(BASE_URL + '/admin/volunteer', { ...payload }),
  });
};

export const createVolunteer = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.CREATE_VOLUNTEER,
    payload: axios.post(BASE_URL + '/volunteer/create', { ...payload }),
  });
};

export const drySort = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.DRY_SORT,
    payload: axios.post(SORT_URL + '/dry-sort', { ...payload }),
  });
};

export const sort = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.SORT,
    payload: axios.post(SORT_URL + '/sort', { ...payload }),
  });
};

export const getIterations = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_ITERATIONS,
    payload: axios.get(SORT_URL + '/iterations'),
  });
};

export const solvePositionRequest = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.SOLVE_POSITION_REQUEST,
    payload: axios.patch(BASE_URL + '/admin/solve-position-request', { ...payload }),
  });
};

export const enrollStudent = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.ENROLL_STUDENT,
    payload: axios.post(BASE_URL + '/enrollment/enroll-student', { studentId: payload }),
  });
};

export const getWithdrawals = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_WITHDRAWALS,
    payload: axios.get(BASE_URL + '/enrollment/withdrawals'),
  });
};

export const updateVolunteerPosition = () => (dispatch) => {
  dispatch({
    type: ACTIONS.UPDATE_VOLUNTEER_POSITION,
    payload: axios.get(BASE_URL + '/volunteer/load'),
  });
};
