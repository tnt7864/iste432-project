import { CLEAR_ERROR, SET_ERROR } from "../reducers/error";

export const setError = message => ({
	type: SET_ERROR,
	payload: message
})

export const clearError = () => ({
	type: CLEAR_ERROR
})