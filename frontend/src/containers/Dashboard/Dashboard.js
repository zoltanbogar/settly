import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
//import axios from '../../axios-orders';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Clients from "../../components/Clients/Clients";

import { onLoadClients } from '../../ClientAPI';
import Form from "../../components/Form/Form";
import Modal from "../../components/UI/Modal/Modal";

let CREATE_CLIENT_PRESET = {
    formElements: {
        name: {
            label: 'Name',
            type: 'text',
            name: 'name',
            required: 'true'
        },
        email: {
            label: 'Email address',
            type: 'text',
            name: 'email',
            required: 'true'
        },
    },
    formLabel: 'Create a client',
    buttonLabel: 'Create client',
    buttonType: 'button',
};

class Dashboard extends Component {
    signal = axios.CancelToken.source();

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: false,
            loggedIn: false,
            user: {},
            clients: {},
            email: null,
            name: null,
            cancelSource: '',
            showClientModal: false
        };

        this.addClientHandler = this.addClientHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            loggedIn: this.props.loggedIn,
            user: this.props.user,
        });

        this.onLoadClients();
    }

    onLoadClients = async () => {
        try {
            this.setState({ loading: true });
            const data = await onLoadClients(this.signal.token);

            this.setState({
                clients: data.data.clients,
                loading: false
            });
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Error: ', error.message); // => prints: Api is being canceled
            } else {
                this.setState({ loading: false });
            }
        }
    };

    componentWillUnmount() {
        this.signal.cancel('Unmounted');
    }

    addClientHandler() {
        this.setState({
            showClientModal: true
        })
    };

    modalClosedHandler = () => {
        this.setState({
            showClientModal: false,
        })
    };

    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    clientCreatedHandler(data){
        this.setState({
            clients: data.clients
        });

        this.modalClosedHandler();
    }

    submitHandler(event) {
        const {
            email,
            name,
        } = this.state;

        axios.post("/create-client", {
            email: email,
            name: name,
            user_id: this.state.user.id
        }, {
            withCredentials: true
        }).then(response => {
            if (response.data.success === true) {
                this.clientCreatedHandler(response.data.data);
            }
        }).catch(error => {
            if(typeof error.response !== 'undefined') {
                const keys = Object.keys(error.response.data.error);
                const messages = keys.map(key => {
                    return error.response.data.error[key]
                });

                this.setState({
                    'error': {
                        'message': messages.join("\n")
                    }
                });
            }
        });
    }

    errorConfirmedHandler = () => {
        this.setState({error: null})
    };

    render() {
        let form = null;

        CREATE_CLIENT_PRESET = {...CREATE_CLIENT_PRESET, buttonClick: this.submitHandler, inputChange: this.changeHandler};

        let form2 = <Form formPreset={CREATE_CLIENT_PRESET}/>;

        if (this.props.loggedIn !== true) {
            form = <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
        }

        if (this.state.loading) {
            form = <Spinner/>;
        }

        const name = this.state.user.surname + ' ' + this.state.user.firstname;

        let error = null;
        if (this.state.error) {
            error = (<Auxiliary>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler} isError={true}>
                    {this.state.error ? <pre>{this.state.error.message}</pre> : null}
                </Modal>
            </Auxiliary>);
        }

        return (
            <Auxiliary>
                <Toolbar name={name}/>
                {error}
                <Clients clients={this.state.clients} clicked={this.addClientHandler}/>
                {form}
                <Modal show={this.state.showClientModal} modalClosed={this.modalClosedHandler}>
                    {form2}
                </Modal>

            </Auxiliary>
        );
    }
}

export default withErrorHandler(Dashboard, axios);