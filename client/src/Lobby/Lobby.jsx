import React from 'react';
import PropTypes from 'prop-types';
// import css from './App.scss';
// import subscribeToTimer from '../socket';

class Lobby extends React.Component {
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
                { 'lobby' }
                <button
                    type="button"
                    onClick={() => changePage('game')}
                >
                    { 'Next Page' }
                </button>
            </p>
        );
    }
}

Lobby.propTypes = {
    changePage: PropTypes.func.isRequired,
};

export default Lobby;
