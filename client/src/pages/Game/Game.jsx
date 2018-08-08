import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Chat from './components/Chat';
import Canvas from './components/Canvas';
import ScoreModal from './components/ScoreModal';
import css from './Game.scss';
import { subscribeToPlay, subscribeToRound } from '../../socket';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    state = {
        offsetHeight: 0,
        offsetWidth: 0,
        play: {},
        isScoreModalOpen: true,
    };

    componentDidMount() {
        window.addEventListener('resize', this.onResize, false);
        this.onResize();
        subscribeToPlay((play) => { this.setState({ play, isScoreModalOpen: false }); });
        subscribeToRound(() => {
            this.setState({ play: {}, isScoreModalOpen: true });
        });
    }

    onResize = () => {
        this.setState({
            offsetHeight: this.canvas.current.offsetHeight,
            offsetWidth: this.canvas.current.offsetWidth,
        });
    };

    render() {
        const { username } = this.props;
        const {
            isScoreModalOpen,
            offsetHeight,
            offsetWidth,
            play,
        } = this.state;

        return (
            <Fragment>
                <div className={css.statusBar}>
                    {play.username} {play.words} {'tiempo'}
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
                <ScoreModal isModalOpen={isScoreModalOpen} />
            </Fragment>
        );
    }
}

Game.propTypes = {
    username: PropTypes.string.isRequired,
};

export default Game;
