import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { clearError } from '../redux/actions/error';
import styles from './ErrorDialog.module.css';

//tells react-redux what parts of the state this component should receive as props
//the component will update only when the relevant parts of state change
const mapStateToProps = (state, props) => ({
	...props,
	message: state.error.message
})

const ErrorDialog = ({ message }) => {
	//get the dispatch function for the store in the parent <Provider> element
	const dispatch = useDispatch();
	
	//there's no error to display if message is null, so return an empty fragment
	if(!message){
		return <></>;
	}
	
	return <div className={styles.overlay}>
		<div className={styles.dialog}>
			<div>
				{message}
			</div>
			<button onClick={() => dispatch(clearError())}>OK</button>
		</div>
	</div>
}

//connect the component to react-redux using the mapStateToProps function
export default connect(mapStateToProps)(ErrorDialog)
