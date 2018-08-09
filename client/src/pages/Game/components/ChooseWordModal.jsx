import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import WordButton from './WordButton';

const ChooseWordModal = ({ isModalOpen, onCloseChooseWordModal, words }) => (
    <Modal isModalOpen={isModalOpen}>
        <h3>{ 'Choose a word:' }</h3>
        <ul>
            {words.map(word => (
                <li>
                    <WordButton word={word} onClickWordButton={onCloseChooseWordModal} />
                </li>
            ))}
        </ul>
    </Modal>
);

ChooseWordModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onCloseChooseWordModal: PropTypes.func.isRequired,
    words: PropTypes.arrayOf(PropTypes.string),
};

ChooseWordModal.defaultProps = {
    words: [],
};

export default ChooseWordModal;
