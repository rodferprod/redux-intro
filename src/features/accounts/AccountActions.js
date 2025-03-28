const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUEST_LOAN = "account/requestLoan";
const ACCOUNT_PAY_LOAN = "account/payLoan";
const ACCOUNT_CONVERTING_CURRENCY = "account/convertingCurrency";

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
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
				isLoading: false,
			};
		case ACCOUNT_CONVERTING_CURRENCY:
			return {
				...actualState,
				isLoading: true,
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

export function deposit(amount, currency) {
	if (currency === "USD") {
		return {
			type: ACCOUNT_DEPOSIT,
			payload: amount,
		};
	}

	return async function (dispatch, getState) {
		dispatch({ type: ACCOUNT_CONVERTING_CURRENCY });
		const res = await fetch(
			`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
		);
		const data = await res.json();
		const convertedAmount = amount * data.rates["USD"];
		dispatch({
			type: ACCOUNT_DEPOSIT,
			payload: convertedAmount,
		});
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
