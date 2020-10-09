import { CLEAR_ERROR, SET_ERROR } from "../reducers/error";

//creates an action to set the error message
export const setError = message => ({
	type: SET_ERROR,
	payload: message
})

//creates an action to dismiss the error
export const clearError = () => ({
	type: CLEAR_ERROR
})