import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Chat from './components/Chat';
import Whiteboard from './components/Whiteboard';
// import css from './Game.scss';
// import subscribeToTimer from '../socket';

class Game extends React.Component {
    state = {
        // currentPage: pages.LOGIN,
    };

    // componentDidMount() {
    //     subscribeToTimer(page => this.setState({
    //         page,
    //     }));
    // const { changePage } = this.props;
    //     changePage(pages.SCORE);
    // }

    render() {
        const { username } = this.props;

        return (
            <Fragment>
                {'barra superior: palabra a dibujar / tiempo / quien dibuja'}
                <div className="canvas">
                    <Whiteboard />
                </div>
                <div className="chat">
                    <Chat username={username} />
                </div>
            </Fragment>
        );
    }
}

Game.propTypes = {
    username: PropTypes.string.isRequired,
};

export default Game;
