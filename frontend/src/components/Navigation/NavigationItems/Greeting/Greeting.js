import React, {Component} from 'react';

import './Greeting.css';

class Greeting extends Component {
    render() {
        const greeting = 'Hi ' + this.props.name + ', welcome to your admin account';
        return (
            <div className="Greeting">
                {greeting}
            </div>
        )
    }
}

export default Greeting;