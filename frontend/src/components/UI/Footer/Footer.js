import React from 'react';

import './Footer.css';

const footer = (props) => (
    <div className="Footer">
        <span>{props.elements.text}</span>
        <a href={props.elements.linkDest}>{props.elements.linkText}</a>
    </div>
);

export default footer;