import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const orderByScore = (a, b) => b.score - a.score;

const Score = ({ isModalOpen, users }) => (
  <Modal isModalOpen={isModalOpen}>
    <h3>{'Scores:'}</h3>
    <ul>
      {users.sort(orderByScore).map(user => (
        <li>{`${user.username} - ${user.score}`}</li>
      ))}
    </ul>
  </Modal>
);

Score.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      score: PropTypes.number
    })
  ).isRequired
};

export default Score;
