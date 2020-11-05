import React, {Component} from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            axios.interceptors.response.use(function (response) {
                return response;
            }, function (error) {
                return Promise.reject(error);
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Auxiliary>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
};

export default withErrorHandler;