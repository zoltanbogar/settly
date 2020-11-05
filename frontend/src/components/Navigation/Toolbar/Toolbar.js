import React from 'react';

import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Greeting from '../NavigationItems/Greeting/Greeting';

const toolbar = (props) => (
	<header className="Toolbar">
		<Greeting name={props.name}/>
		<nav>
			<NavigationItems/>
		</nav>
	</header>
);

export default toolbar;