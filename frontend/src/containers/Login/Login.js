import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Form from '../../components/Form/Form';
import Modal from "../../components/UI/Modal/Modal";
import {Redirect} from "react-router-dom";

let LOGIN_PRESET = {
    formElements: {
        email: {
            label: 'Email address',
            type: 'text',
            name: 'email',
            required: 'true'
        },
        password: {
            label: 'Password',
            type: 'password',
            name: 'password',
            required: 'true'
        }
    },
    formLabel: 'Login',
    buttonLabel: 'Login',
    captcha: false,
    footer: {
        text: 'No account yet?',
        linkText: 'Create one here.',
        linkDest: '/register'
    }
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loading: false,
            error: false,
            loggedIn: false,
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.successfulAuthHandler = this.successfulAuthHandler.bind(this);
    }

    successfulAuthHandler(data) {
        this.props.handleLogin(data);
        this.props.history.push('/');
    }

    submitHandler(event){
        const {
            email,
            password,
        } = this.state;

        axios.post(`/login`, {
            email: email,
            password: password,
        }, {
            withCredentials: true
        }).then(response => {
            if (response.data.success === true) {
                this.successfulAuthHandler(response.data);
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

        event.preventDefault();
    }

    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount(){
        //console.log(this.props.loggedIn,'diszprops');
        this.setState({
            loggedIn: this.props.loggedIn
        })
    }

    errorConfirmedHandler = () => {
        this.setState({error: null})
    };

    render(){
        let error = null;

        LOGIN_PRESET = {...LOGIN_PRESET, buttonClick: this.submitHandler, inputChange: this.changeHandler};

        let form = <Form formPreset={LOGIN_PRESET} />;

        if(this.state.loggedIn === true) {
            form = <Redirect to={{pathname: '/', state: {from: this.props.location}}}/>
        }

        if(this.state.loading){
            form = <Spinner />;
        }

        if (this.state.error) {
            error = (<Auxiliary>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? <pre>{this.state.error.message}</pre> : null}
                </Modal>
            </Auxiliary>);
        }

        return(
            <Auxiliary>
                {error}
                {form}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(Login, axios);