import React from 'react';

import './Label.css';

const label = (props) => (
    <h1 className="FormLabel">{props.children}</h1>
);

export default label;