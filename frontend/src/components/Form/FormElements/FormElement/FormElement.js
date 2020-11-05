import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './FormElement.css';

class FormElement extends Component {
    render() {
        const required = this.props.required ? 'required' : '';

        return (
            <div className="Row">
                <input className="Input" type={this.props.type} name={this.props.name} required={required} onChange={this.props.inputChange} />
                <label className="Label" htmlFor={this.props.name}>{this.props.label}</label>
            </div>
        );
    }
}

FormElement.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default FormElement;