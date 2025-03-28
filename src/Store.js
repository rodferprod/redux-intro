import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import accountReducer from "./features/accounts/AccountActions";
import customerReducer from "./features/customers/CustomerActions";

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
