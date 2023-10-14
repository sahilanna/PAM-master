import createProjectReducer from '../../../../../src/redux/redux-store/reducers/createProjectReducer';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
} from '/home/nineleaps/Desktop/Pratap/PAM-master/src/redux/redux-store/actions/actionTypes.js';

describe('createProjectReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      loading: false,
      success: false,
      error: null,
    };

    // Initialize the reducer with an undefined state and an empty action.
    const newState = createProjectReducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it('should handle the CREATE_PROJECT_REQUEST action type', () => {
    const initialState = {
      loading: false,
      success: false,
      error: null,
    };

    const action = {
      type: CREATE_PROJECT_REQUEST,
    };

    const newState = createProjectReducer(initialState, action);

    // Expect loading to be true while other properties remain unchanged.
    expect(newState).toEqual({
      loading: true,
      success: false,
      error: null,
    });
  });

  it('should handle the CREATE_PROJECT_SUCCESS action type', () => {
    const initialState = {
      loading: true,
      success: false,
      error: null,
    };

    const action = {
      type: CREATE_PROJECT_SUCCESS,
      payload: 'Project created successfully!',
    };

    const newState = createProjectReducer(initialState, action);

    // Expect loading to be false, success to be true, and error to be null.
    expect(newState).toEqual({
      loading: false,
      success: action.payload,
      error: null,
    });
  });

  it('should handle the CREATE_PROJECT_FAILURE action type', () => {
    const initialState = {
      loading: true,
      success: false,
      error: null,
    };

    const action = {
      type: CREATE_PROJECT_FAILURE,
      payload: 'Error: Something went wrong!',
    };

    const newState = createProjectReducer(initialState, action);

    // Expect loading to be false, success to be false, and error to match the payload.
    expect(newState).toEqual({
      loading: false,
      success: false,
      error: action.payload,
    });
  });

  it('should return the current state for unknown action types', () => {
    const initialState = {
      loading: false,
      success: false,
      error: null,
    };

    const action = {
      type: 'UNKNOWN_ACTION',
    };

    const newState = createProjectReducer(initialState, action);

    // Expect the state to remain unchanged for unknown action types.
    expect(newState).toEqual(initialState);
  });
});
