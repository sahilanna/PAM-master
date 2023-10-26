import rootReducer from '../../../../src/redux/redux-store/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

describe('Redux Store', () => {
  it('should create a store with the expected initial state', () => {
    const initialState = {}; // Define your expected initial state here
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    // Retrieve the store's current state
    const currentState = store.getState();

    
  });

  
});
