import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
	let classNames = ["Backdrop"];
	if(props.isError) {
		classNames.push('Error');
	}

	return (
		props.show ? <div className={classNames.join(' ')} onClick={props.clicked}></div> : null
	);
};

export default backdrop;