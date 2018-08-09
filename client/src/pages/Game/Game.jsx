import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Chat from './components/Chat';
import Canvas from './components/Canvas';
import ScoreModal from './components/ScoreModal';
import ChooseWordModal from './components/ChooseWordModal';
import css from './Game.scss';
import {
    emitWordChosen,
    subscribeToPlay,
    subscribeToRound,
    subscribeToWordChosen,
} from '../../socket';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    state = {
        isChooseWordModalOpen: false,
        isScoreModalOpen: true,
        offsetHeight: 0,
        offsetWidth: 0,
        play: {},
    };

    componentDidMount() {
        const { username } = this.props;
        window.addEventListener('resize', this.onResize, false);
        this.onResize();
        subscribeToPlay((play) => {
            this.setState({
                isChooseWordModalOpen: username === play.username,
                isScoreModalOpen: false,
                play,
            });
        });
        subscribeToRound(() => { this.setState({ play: {}, isScoreModalOpen: true }); });
        subscribeToWordChosen((play) => { this.setState({ play }); });
    }

    onResize = () => {
        this.setState({
            offsetHeight: this.canvas.current.offsetHeight,
            offsetWidth: this.canvas.current.offsetWidth,
        });
    };

    handleCloseChooseWordModal = (word) => {
        this.setState({ isChooseWordModalOpen: false });
        emitWordChosen(word);
    };

    render() {
        const { username, users } = this.props;
        const {
            isChooseWordModalOpen,
            isScoreModalOpen,
            offsetHeight,
            offsetWidth,
            play,
        } = this.state;

        return (
            <Fragment>
                <div className={css.statusBar}>
                    {play.username} {play.word} {'||||'} {play.words} {'tiempo'}
                </div>
                <div
                    className={css.canvas}
                    ref={this.canvas}
                >
                    <Canvas
                        disabled={username !== play.username}
                        offsetHeight={offsetHeight}
                        offsetWidth={offsetWidth}
                    />
                </div>
                <div className={css.chat}>
                    <Chat username={username} />
                </div>
                <ScoreModal isModalOpen={isScoreModalOpen} users={users} />
                <ChooseWordModal
                    isModalOpen={isChooseWordModalOpen}
                    words={play.words}
                    onCloseChooseWordModal={this.handleCloseChooseWordModal}
                />
            </Fragment>
        );
    }
}

Game.propTypes = {
    username: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string,
            score: PropTypes.number,
        }),
    ).isRequired,
};

export default Game;
