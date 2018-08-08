import React from 'react';
import PropTypes from 'prop-types';
import css from './ScoreModal.scss';

const Score = ({ isModalOpen }) => {
    const showHideClassName = `${css.modal} ${isModalOpen ? css.displayBlock : css.displayNone}`;

    return (
        <div className={showHideClassName}>
            <section className={css.modalMain}>
                <h3>{'holaaa'}</h3>
                <ul>
                    <li>{'player1'}</li>
                    <li>{'player1'}</li>
                    <li>{'player1'}</li>
                    <li>{'player1'}</li>
                </ul>
            </section>
        </div>
    );
};

Score.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
};

export default Score;
