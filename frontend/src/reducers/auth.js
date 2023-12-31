import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADUSER_SUCCESS,
  LOADUSER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  loginError: null,
};

// Name the function "authReducer"
function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case AUTHENTICATED_SUCCESS:
        return {
            ...state,
            isAuthenticated: true
        }
    case LOGIN_SUCCESS:
        localStorage.setItem('access', payload.access);
        localStorage.setItem('refresh', payload.refresh);
        return {
            ...state,
            isAuthenticated: true,
            access: payload.access,
            refresh: payload.refresh
        }
    case SIGNUP_SUCCESS:
        return {
            ...state,
            isAuthenticated: false
        }
    case LOADUSER_SUCCESS:
        return {
            ...state,
            user: payload
        }
    case AUTHENTICATED_FAIL:
        return {
            ...state,
            isAuthenticated: false
        }
    case LOADUSER_FAIL:
        return {
            ...state,
            user: null
        }
    case LOGIN_FAIL:
      return{
        ...state,
        loginError: payload.non_field_errors && payload.non_field_errors.length > 0 ? payload.non_field_errors[0] : "Login failed.",
      }
    case SIGNUP_FAIL:
    case LOGOUT:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null
        }
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
        return {
            ...state
        }
    default:
        return state
}
}

export default authReducer;
