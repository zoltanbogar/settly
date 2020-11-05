import React, {Component} from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

import './Client.css';

class Client extends Component {
    render() {
        const pictureName = require('../../../assets/' + (this.props.picture ? 'ProfilePicture/' + this.props.picture : '_default.jpg'));

        return (
                <div className="Card">
                    <div className="Card__nav">
                        <ul>
                            <li>
                                <a href="#" className="active"><FaPencilAlt /></a>
                            </li>
                            <li>
                                <a href="#"><FaTrash /></a>
                            </li>
                        </ul>
                    </div>
                    <div className="Card__content">
                        <div className="Card__info">
                            <h1>{this.props.name}</h1>
                            <h5>{this.props.email}</h5>
                        </div>
                    </div>
                    <div className="Card__img">
                        <img src={pictureName} alt="Profile picture"/>
                    </div>
                </div>
        );
    }
}

export default Client;