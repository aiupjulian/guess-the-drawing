import React, { Fragments } from 'react';
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
            <Fragments>
                <ul className="users">
                </ul>
                <button type="button" className="start-game">
                    Start game
                </button>
            </Fragments>
        );
    }
}

Lobby.propTypes = {
    changePage: PropTypes.func.isRequired,
};

export default Lobby;
