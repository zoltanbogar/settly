import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Form from '../../components/Form/Form';
import Modal from "../../components/UI/Modal/Modal";

let REGISTRATION_PRESET = {
    formElements: {
        firstname: {
            label: 'First name',
            type: 'text',
            name: 'firstname',
            required: 'true'
        },
        surname: {
            label: 'Surname',
            type: 'text',
            name: 'surname',
            required: 'true'
        },
        email: {
            label: 'Email address',
            type: 'text',
            name: 'email',
            required: 'true'
        },
        email_confirmation: {
            label: 'Confirm email address',
            type: 'text',
            name: 'email_confirmation',
            required: 'true'
        },
        password: {
            label: 'Password',
            type: 'password',
            name: 'password',
            required: 'true'
        },
        password_confirmation: {
            label: 'Repeat your password',
            type: 'password',
            name: 'password_confirmation',
            required: 'true'
        }
    },
    formLabel: 'Create your account',
    buttonLabel: 'Create account',
    buttonType: 'button',
    captcha: true,
};

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            email_confirmation: "",
            password: "",
            password_confirmation: "",
            firstname: "",
            surname: "",
            loading: false,
            error: false,
            loggedIn: false,
            csrf: '',
            captcha_value: null
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.successfulAuthHandler = this.successfulAuthHandler.bind(this);
        this.captchaChangeHandler = this.captchaChangeHandler.bind(this);
    }

    successfulAuthHandler(data) {
        this.props.handleLogin(data);
        this.props.history.push('/');
    }

    submitHandler(event) {
        const {
            email,
            email_confirmation,
            password,
            password_confirmation,
            firstname,
            surname,
            captcha_value,
        } = this.state;

        axios.post("/registration", {
            email: email,
            email_confirmation: email_confirmation,
            password: password,
            password_confirmation: password_confirmation,
            firstname: firstname,
            surname: surname,
            captcha_value: captcha_value
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
    }

    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        axios.get(`/get-csrf`)
            .then(res => {
                axios.defaults.headers.post['X-CSRF-TOKEN'] = res.data.csrf_token;
            })
    }

    errorConfirmedHandler = () => {
        this.setState({error: null})
    };

    captchaChangeHandler(value){
        //console.log("Captcha value:", value);
        this.setState({captcha_value: value})
    }

    render() {
        let form = null;
        let error = null;

        REGISTRATION_PRESET = {...REGISTRATION_PRESET, buttonClick: this.submitHandler, inputChange: this.changeHandler, captchaChange: this.captchaChangeHandler};

        form = <Form formPreset={REGISTRATION_PRESET}/>;

        if (this.state.loading) {
            form = <Spinner/>;
        }

        if (this.state.error) {
            error = (<Auxiliary>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? <pre>{this.state.error.message}</pre> : null}
                </Modal>
            </Auxiliary>);
        }

        return (
            <Auxiliary>
                {error}
                {form}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(Registration, axios);