import React from 'react';

import './Button.css';

const button = (props) => (
	<button className="Button" onClick={props.clicked} type={props.type}>{props.children}</button>
);

export default button;