import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import axios from 'axios';
import Layout from './containers/Layout/Layout';
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import Registration from "./containers/Register/Registration";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            user: {},
        };

        this.loginHandler = this.loginHandler.bind(this);
    }

    checkLoginStatus() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);

            this.setState({
                loggedIn: AppState.isLoggedIn,
                user: AppState.user,
            }, () => this.check());
        }
    }

    check() {
        axios.get(`http://localhost:8000/api/logged_in`, {
            headers: {
                //'X-CSRF-TOKEN': this.state.csrf,
                token: this.state.user.auth_token
            },
        }, { withCredentials: true }).then(response => {
            if(response.data.success !== true || response.data.data.status !== 'logged_in') {
                this.logoutHandler();
            }
        }).catch(error => {
            console.log('check error login', error);
            this.logoutHandler();
        });
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    logoutHandler(){
        let appState = {
            isLoggedIn: false,
            user: {}
        };

        localStorage["appState"] = JSON.stringify(appState);

        this.setState({
            loggedIn: appState.isLoggedIn,
            user: appState.user
        });
    }

    loginHandler(data){
        let appState = {
            isLoggedIn: true,
            user: data.data.user
        };

        localStorage["appState"] = JSON.stringify(appState);

        this.setState({
            loggedIn: appState.isLoggedIn,
            user: appState.user
        });
    }

    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path="/login"
                            exact
                            render={props => (
                                <Login {...props} handleLogin={this.loginHandler} loggedIn={this.state.loggedIn} />
                            )}
                        />
                        <Route
                            path="/register"
                            exact
                            render={props => (
                                <Registration {...props} handleLogin={this.loginHandler} loggedIn={this.state.loggedIn} />
                            )}
                        />
                        <Route
                            path="/"
                            exact
                            render={props => (
                                <Dashboard {...props} loggedIn={this.state.loggedIn} user={this.state.user} />
                            )}
                        />
                    </Switch>
                </BrowserRouter>
            </Layout>
        );
    }
}

export default App;
