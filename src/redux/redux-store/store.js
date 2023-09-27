import rootReducer from "./reducers";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk),);

export default store;