import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { constants } from 'canvas-shared';
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

const { time } = constants;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  state = {
    currentTime: 0,
    isChooseWordModalOpen: false,
    isScoreModalOpen: true,
    offsetHeight: 0,
    offsetWidth: 0,
    play: {}
  };

  componentDidMount() {
    const { username } = this.props;
    window.addEventListener('resize', this.onResize, false);
    this.onResize();
    subscribeToPlay(play => {
      this.setState({
        isChooseWordModalOpen: username === play.username,
        isScoreModalOpen: false,
        play,
        currentTime: time.SHOW_WORD_SECONDS
      });
    });
    subscribeToRound(() => {
      this.setState({
        currentTime: time.SHOW_SCORE_SECONDS,
        isScoreModalOpen: true,
        play: {}
      });
    });
    subscribeToWordChosen(play => {
      this.setState({
        currentTime: time.PLAY_SECONDS,
        isChooseWordModalOpen: false,
        play
      });
    });
    this.interval = setInterval(() => this.tick(), 1000);
  }

  onResize = () => {
    this.setState({
      offsetHeight: this.canvas.current.offsetHeight,
      offsetWidth: this.canvas.current.offsetWidth
    });
  };

  tick = () => {
    const { currentTime } = this.state;
    if (currentTime !== 0) {
      this.setState(prevState => ({
        currentTime: prevState.currentTime - 1
      }));
    }
  };

  handleCloseChooseWordModal = word => {
    this.setState({ isChooseWordModalOpen: false });
    emitWordChosen(word);
  };

  render() {
    const { username, users } = this.props;
    const {
      currentTime,
      isChooseWordModalOpen,
      isScoreModalOpen,
      offsetHeight,
      offsetWidth,
      play
    } = this.state;

    return (
      <Fragment>
        <div className={css.statusBar}>
          {play.username}
          {play.word &&
            (play.username === username
              ? play.word
              : play.word.replace(/\w/g, '_'))}
          {currentTime}
        </div>
        <div className={css.canvas} ref={this.canvas}>
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
      score: PropTypes.number
    })
  ).isRequired
};

export default Game;
