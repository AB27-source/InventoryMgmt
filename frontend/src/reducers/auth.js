import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADUSER_SUCCESS,
  LOADUSER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

// Name the function "authReducer"
function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case LOADUSER_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };
    case LOADUSER_FAIL:
      return {
        ...state,
        user: null,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
      };
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          access: null,
          refresh: null,
          user: null,
        };
    default:
      return state;
  }
}

// Export the named function
export default authReducer;
