import createReducer from './crudReducer'
import updateReducer from './updateReducer';
import createPMReducer from './createPMReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({createReducer,updateReducer,createPMReducer});

export default rootReducer;