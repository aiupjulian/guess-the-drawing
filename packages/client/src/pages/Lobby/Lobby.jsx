import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { emitStartGame, subscribeToStartGame } from '../../socket';
import { pages } from '../../constants';

class Lobby extends React.Component {
  componentDidMount() {
    const { changePage } = this.props;
    subscribeToStartGame(() => {
      changePage(pages.GAME);
    });
  }

  handleStartGameClick = () => {
    const { changePage } = this.props;
    changePage(pages.GAME);
    emitStartGame();
  };

  render() {
    const { users } = this.props;

    return (
      <Fragment>
        <ul className="users">
          {users.map(user => (
            <li>{user.username}</li>
          ))}
        </ul>
        <button
          onClick={this.handleStartGameClick}
          type="button"
          className="start-game"
        >
          {'Start game'}
        </button>
      </Fragment>
    );
  }
}

Lobby.propTypes = {
  changePage: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      score: PropTypes.number
    })
  ).isRequired
};

export default Lobby;
