const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUEST_LOAN = "account/requestLoan";
const ACCOUNT_PAY_LOAN = "account/payLoan";

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

export default function accountReducer(
	actualState = initialStateAccount,
	action
) {
	switch (action.type) {
		case ACCOUNT_DEPOSIT:
			return {
				...actualState,
				balance: actualState.balance + action.payload,
			};
		case ACCOUNT_WITHDRAW:
			return {
				...actualState,
				balance: actualState.balance - action.payload,
			};
		case ACCOUNT_REQUEST_LOAN:
			if (actualState.loan > 0) return;
			return {
				...actualState,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: actualState.balance + action.payload.amount,
			};
		case ACCOUNT_PAY_LOAN:
			return {
				...actualState,
				loan: 0,
				loanPurpose: "",
				balance: actualState.balance - actualState.loan,
			};
		default:
			return actualState;
	}
}

export function deposit(amount) {
	return {
		type: ACCOUNT_DEPOSIT,
		payload: amount,
	};
}

export function withdraw(amount) {
	return {
		type: ACCOUNT_WITHDRAW,
		payload: amount,
	};
}

export function requestLoan(amount, purpose) {
	return {
		type: ACCOUNT_REQUEST_LOAN,
		payload: {
			amount,
			purpose,
		},
	};
}

export function payLoan() {
	return {
		type: ACCOUNT_PAY_LOAN,
	};
}
