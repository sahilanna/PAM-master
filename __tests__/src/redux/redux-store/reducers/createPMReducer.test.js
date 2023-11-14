import createPMReducer from "../../../../../src/redux/reduxStore/reducers/createPMReducer";

describe('createPMReducer', () => {
  it('should return the initial state', () => {
    // Initialize the reducer with an undefined state and an empty action.
    const initialState = createPMReducer(undefined, {});
    expect(initialState).toEqual([]);
  });

  it('should handle the "createPM" action type', () => {
    // Define an initial state.
    const initialState = [];

    // Create an action with the "createPM" type and some payload.
    const action = {
      type: 'createPM',
      payload: [{ name: 'John', email: 'john@example.com' }],
    };

    // Dispatch the action to the reducer.
    const newState = createPMReducer(initialState, action);

    // Expect the state to be updated correctly.
    expect(newState).toEqual(action.payload);
  });

  it('should return the current state for unknown action types', () => {
    // Define an initial state.
    const initialState = [{ name: 'Alice', email: 'alice@example.com' }];

    // Create an action with an unknown type.
    const action = {
      type: 'unknown_action',
      payload: { name: 'Bob', email: 'bob@example.com' },
    };

    // Dispatch the action to the reducer.
    const newState = createPMReducer(initialState, action);

    // Expect the state to remain unchanged.
    expect(newState).toEqual(initialState);
  });
});
