import createReducer from './createReducer'
import updateReducer from './updateReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({createReducer,updateReducer,});

export default rootReducer;