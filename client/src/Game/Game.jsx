import React from 'react';
import PropTypes from 'prop-types';
// import css from './App.scss';
// import subscribeToTimer from '../socket';

class Game extends React.Component {
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
                { 'game' }
                <button
                    type="button"
                    onClick={() => changePage('score')}
                >
                    { 'Next Page' }
                </button>
            </p>
        );
    }
}

Game.propTypes = {
    changePage: PropTypes.func.isRequired,
};

export default Game;
