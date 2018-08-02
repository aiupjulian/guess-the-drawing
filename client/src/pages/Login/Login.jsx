import React from 'react';
import PropTypes from 'prop-types';
// import css from './App.scss';
import { emitAddUsername } from '../../socket';
import pages from '../../constants';

class Login extends React.Component {
    state = {
        username: '',
    };

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };

    handleUsernameInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleUsernameSubmit();
        }
    };

    handleUsernameSubmit = () => {
        const { changePage, setUsername } = this.props;
        const { username } = this.state;
        if (username) {
            setUsername(username);
            emitAddUsername(username);
            changePage(pages.LOBBY);
        }
    };

    render() {
        const { username } = this.state;

        return (
            <div className="form">
                <h3 className="title">
                    {'Whats your nickname?'}
                </h3>
                <input
                    type="text"
                    maxLength="10"
                    required
                    value={username}
                    onChange={this.handleUsernameChange}
                    onKeyPress={this.handleUsernameInputKeyPress}
                />
                <button onClick={this.handleUsernameSubmit} type="button">
                    {'Submit'}
                </button>
            </div>
        );
    }
}

Login.propTypes = {
    changePage: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
};

export default Login;
