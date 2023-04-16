import createReducer from './crudReducer'
import updateReducer from './updateReducer';
import createPMReducer from './createPMReducer';
import updatePMReducer from './updatePMReducer';
import updateUserReducer from './updateUserReducer';
import createUserReducer from './createUserReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({createReducer,updateReducer,createPMReducer, updatePMReducer, createUserReducer,updateUserReducer});

export default rootReducer;