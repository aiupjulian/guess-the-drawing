import React from 'react';
import PropTypes from 'prop-types';
import css from './ScoreModal.scss';

const orderByScore = (a, b) => a.score - b.score;

const Score = ({ isModalOpen, users }) => {
    const showHideClassName = `${css.modal} ${isModalOpen ? css.displayBlock : css.displayNone}`;

    return (
        <div className={showHideClassName}>
            <section className={css.modalMain}>
                <h3>{ 'Scores:' }</h3>
                <ul>
                    {users.sort(orderByScore).map(user => (
                        <li>{`${user.username} - ${user.score}`}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

Score.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string,
            score: PropTypes.number,
        }),
    ).isRequired,
};

export default Score;
