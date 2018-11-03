/**
 * Site-wide login page.
 *
 * @module src/Login
 */

import React from 'react';
import { func, shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Octicon, { SignIn, Plus } from '@githubprimer/octicons-react';
import classNames from 'classnames';

import User from 'src/User';
import Spinner from 'src/Spinner';

import styles from './index.less';

/**
 * Login React component.
 */
export default class Login extends React.Component {
    /**
     * Initializes the component.
     */
    constructor() {
        super();

        const { loggedIn } = User;

        const loading = loggedIn === null;
        const redirect = loggedIn === true;

        this.state = {
            loading,
            redirect,
            message: null
        };

        this.inputs = {
            username: null,
            password: null
        };

        if (loading) {
            (async() => {
                await User.refreshLoginStatus();
                this.setState({
                    loading: false,
                    redirect: User.loggedIn
                });
            })();
        }
    }

    /**
     * Renders the component.
     *
     * @returns {ReactElement} The component's elements.
     */
    render() {
        const { className, onClick, location, history } = this.props;
        const { loading, redirect, message } = this.state;

        const locationState = location.state || {
            referer: { pathname: '/' }
        };

        const { referer } = locationState;

        if (redirect) {
            return <Redirect to={referer} />;
        }

        const classes = classNames(styles.login, className);

        return <form
            className={classes}
            onClick={onClick}
            onSubmit={event => {
                event.preventDefault();

                const { username, password } = this.inputs;
                const usernameValue = username.value;
                const passwordValue = password.value;
                password.value = '';

                this.setState({ loading: true });
                this.login(usernameValue, passwordValue);
            }}
        >
            {loading ? <Spinner /> : null}
            <input
                type="username"
                ref={input => (this.inputs.username = input)}
                placeholder="Username"
                required={true}
                disabled={loading}
            />
            <input
                type="password"
                ref={input => (this.inputs.password = input)}
                placeholder="Password"
                required={true}
                disabled={loading}
            />
            <button
                type="submit"
                disabled={loading}
            >
                <Octicon icon={SignIn} />
                &nbsp;Log in
            </button>
            <button
                disabled={loading}
                onClick={() => {
                    const { inputs } = this;
                    const username = inputs.username.value;
                    const password = inputs.password.value;
                    history.push('/signup/', {
                        referer, username, password
                    });
                }}
            >
                <Octicon icon={Plus} />
                &nbsp;Sign up
            </button>
            {message}
        </form>;
    }

    /**
     * Attempts to log in with the given credentials.
     *
     * @param {string} username - The username.
     * @param {string} password - The password.
     * @returns {Promise} Resolves with `null` on success, or with an `Error` if
     * an error was handled.
     */
    async login(username, password) {
        try {
            await User.login(username, password);

            this.setState({ loading: false, redirect: true, message: null });

            return null;
        } catch (err) {
            const message = <p className={styles.error}>
                Login failed: {err.message}
            </p>;

            this.setState({ loading: false, message });

            return err;
        }
    }
}

Login.propTypes = {
    className: string,
    onClick: func,
    location: shape({
        state: shape({
            referer: shape({
                pathname: string.isRequired
            }).isRequired
        })
    }).isRequired,
    history: shape({
        push: func.isRequired
    }).isRequired
};

