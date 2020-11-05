import React from 'react';

import './FormElements.css';
import FormElement from './FormElement/FormElement';

const formElements = (props) => {
    let elementArray = Object.keys(props.formElements);

    return (
        <div className="FormElements">
            {elementArray.map(input => (
                <FormElement
                    key={props.formElements[input].label}
                    type={props.formElements[input].type}
                    name={props.formElements[input].name}
                    required={props.formElements[input].required}
                    inputChange={props.inputChange}
                    label={props.formElements[input].label} />
            ))}
        </div>
    );
};

export default formElements;