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
            <p>
                { 'login' }
                <button
                    type="button"
                    onClick={() => changePage('lobby')}
                >
                    { 'Next Page' }
                </button>
            </p>
        );
    }
}

Login.propTypes = {
    changePage: PropTypes.func.isRequired,
};

export default Login;
