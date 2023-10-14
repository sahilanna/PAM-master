import createUserReducer from "../../../../../src/redux/redux-store/reducers/createUserReducer";

describe('createUserReducer', () => {
  it('should return the initial state', () => {
    // Initialize the reducer with an undefined state and an empty action.
    const initialState = createUserReducer(undefined, {});
    expect(initialState).toEqual([]);
  });

  it('should handle the "createUser" action type', () => {
    // Define an initial state.
    const initialState = [];

    // Create an action with the "createUser" type and some payload.
    const action = {
      type: 'createUser',
      payload: { name: 'User1', email: 'user1@example.com', enumRole: 'USER' },
    };

    // Dispatch the action to the reducer.
    const newState = createUserReducer(initialState, action);

    // Expect the state to be updated correctly.
    expect(newState).toEqual(action.payload);
  });

  it('should return the current state for unknown action types', () => {
    // Define an initial state.
    const initialState = [{ name: 'User1', email: 'user1@example.com', enumRole: 'USER' }];

    // Create an action with an unknown type.
    const action = {
      type: 'unknown_action',
      payload: { name: 'User2', email: 'user2@example.com', enumRole: 'USER' },
    };

    // Dispatch the action to the reducer.
    const newState = createUserReducer(initialState, action);

    // Expect the state to remain unchanged.
    expect(newState).toEqual(initialState);
  });
});
