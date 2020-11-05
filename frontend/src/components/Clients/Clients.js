import React from 'react';

import './Clients.css';
import Client from './Client/Client';
import Button from '../UI/Button/Button';

const clients = (props) => {
    let elementArray = Object.keys(props.clients);

    return (
        <div className="Clients">
            <Button clicked={props.clicked}>Add new client</Button>
            <div className="Container">
                {elementArray.map(input => (
                    <Client
                        key={props.clients[input].email}
                        email={props.clients[input].email}
                        name={props.clients[input].name}
                        picture={props.clients[input].picture} />
                ))}
            </div>
        </div>
    );
};

export default clients;