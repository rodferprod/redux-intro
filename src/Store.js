import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/AccountActions";
import customerReducer from "./features/customers/CustomerActions";

const store = configureStore({
	reducer: {
		account: accountReducer,
		customer: customerReducer,
	},
});

export default store;
