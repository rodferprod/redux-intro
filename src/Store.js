import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/AccountActions";
import customerReducer from "./features/customers/CustomerActions";

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
