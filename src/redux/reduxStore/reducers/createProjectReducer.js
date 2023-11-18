// projectReducer.js
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
} from "/home/nineleaps/Desktop/Pratap/PAM-master/src/redux/reduxStore/actions/actionTypes.js";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const createProjectReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        // success: false,
        // error: null,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        error: null,
      };
    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createProjectReducer;
