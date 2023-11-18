import createPMReducer from "./createPMReducer";
import createUserReducer from "./createUserReducer";
import createPmGithubNameReducer from "./createPmGithubNameReducer";
import { combineReducers } from "redux";
import createProjectReducer from "./createProjectReducer";

const rootReducer = combineReducers({
  createProjectReducer,
  createPMReducer,
  createUserReducer,
  createPmGithubNameReducer,
});

export default rootReducer;
