  import createReducer from './crudReducer'
import updateReducer from './updateReducer';
import createPMReducer from './createPMReducer';
import updatePMReducer from './updatePMReducer';
import updateUserReducer from './updateUserReducer';
import createUserReducer from './createUserReducer';
import createPmGithubNameReducer from './createPmGithubNameReducer';
import { combineReducers } from 'redux'
import createProjectReducer from './createProjectReducer';

const rootReducer = combineReducers({createProjectReducer, createReducer,updateReducer,createPMReducer, updatePMReducer, createUserReducer,updateUserReducer, createPmGithubNameReducer});

export default rootReducer;