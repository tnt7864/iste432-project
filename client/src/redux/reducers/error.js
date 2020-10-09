export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

//reducer for errors
export default (state = { message: null }, action) => {
	switch(action.type){
		case SET_ERROR:
			return {
				...state,
				message: action.payload
			}
		case CLEAR_ERROR:
			return {
				...state,
				message: null
			}
		default:
			return state
	}
}
