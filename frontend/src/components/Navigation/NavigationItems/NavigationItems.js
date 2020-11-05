import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems = (props) => (
	<ul className="NavigationItems">
		<NavigationItem link="/" active>Clients</NavigationItem>
		<NavigationItem link="/">Logout</NavigationItem>
	</ul>
);

export default navigationItems;