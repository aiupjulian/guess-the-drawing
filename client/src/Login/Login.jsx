import React from 'react';
import PropTypes from 'prop-types';
// import css from './App.scss';
// import subscribeToTimer from '../socket';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentPage: pages.LOGIN,
        };
    }

    // componentDidMount() {
    //     subscribeToTimer(page => this.setState({
    //         page,
    //     }));
    // }

    render() {
        const { changePage } = this.props;

        return (
            <div className="form">
                <h3 className="title">
                    Whats your nickname?
                </h3>
                <input className="username-input" type="text" maxLength="10" required />
            </div>
        );
    }
}

Login.propTypes = {
    changePage: PropTypes.func.isRequired,
};

export default Login;
