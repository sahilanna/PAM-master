import createPmGithubNameReducer from "../../../../../src/redux/redux-store/reducers/createPmGithubNameReducer";

describe('createPmGithubNameReducer', () => {
  it('should return the initial state', () => {
    // Initialize the reducer with an undefined state and an empty action.
    const initialState = createPmGithubNameReducer(undefined, {});
    expect(initialState).toEqual([]);
  });

  it('should handle the "createPcreatePmGithubName" action type', () => {
    // Define an initial state.
    const initialState = [];

    // Create an action with the "createPcreatePmGithubName" type and some payload.
    const action = {
      type: 'createPcreatePmGithubName',
      payload: { projectName: 'MyProject', repo: 'myrepo', username: 'myuser' },
    };

    // Dispatch the action to the reducer.
    const newState = createPmGithubNameReducer(initialState, action);

    // Expect the state to be updated correctly.
    expect(newState).toEqual(action.payload);
  });

  it('should return the current state for unknown action types', () => {
    // Define an initial state.
    const initialState = [{ projectName: 'Project1', repo: 'repo1', username: 'user1' }];

    // Create an action with an unknown type.
    const action = {
      type: 'unknown_action',
      payload: { projectName: 'Project2', repo: 'repo2', username: 'user2' },
    };

    // Dispatch the action to the reducer.
    const newState = createPmGithubNameReducer(initialState, action);

    // Expect the state to remain unchanged.
    expect(newState).toEqual(initialState);
  });
});
