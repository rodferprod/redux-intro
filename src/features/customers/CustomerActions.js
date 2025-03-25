const CUSTOMER_CREATE = "customer/customerCreate";
const UPDATE_NAME = "customer/updateName";

const initialStateCustomer = {
	fullName: "",
	nationalID: "",
	createdAt: "",
};

export default function customerReducer(
	actualState = initialStateCustomer,
	action
) {
	switch (action.type) {
		case CUSTOMER_CREATE:
			return {
				...actualState,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};
		case UPDATE_NAME:
			return {
				...actualState,
				fullName: action.payload.fullName,
			};
		default:
			return actualState;
	}
}

export function customerCreate(fullName, nationalID) {
	return {
		type: CUSTOMER_CREATE,
		payload: {
			fullName,
			nationalID,
			createdAt: new Date().toISOString(),
		},
	};
}

export function updateName(fullName) {
	return {
		type: UPDATE_NAME,
		payload: {
			fullName,
		},
	};
}
