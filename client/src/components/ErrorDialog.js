import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { clearError } from '../redux/actions/error';
import styles from './ErrorDialog.module.css';

const mapStateToProps = (state, props) => ({
	...props,
	message: state.error.message
})

const ErrorDialog = ({ message }) => {
	const dispatch = useDispatch();
	
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

export default connect(mapStateToProps)(ErrorDialog)
