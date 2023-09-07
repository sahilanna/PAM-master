import createReducer from './crudReducer'
import createPMReducer from './createPMReducer';
import updatePMReducer from './updatePMReducer';
import createUserReducer from './createUserReducer';
import createPmGithubNameReducer from './createPmGithubNameReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({createReducer,createPMReducer, 
    updatePMReducer, createUserReducer,
    createPmGithubNameReducer});

export default rootReducer;