import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.scss';

const Modal = ({ isModalOpen, children }) => {
  const showHideClassName = `${css.modal} ${
    isModalOpen ? css.displayBlock : css.displayNone
  }`;

  return (
    <div className={showHideClassName}>
      <section className={css.modalMain}>{children}</section>
    </div>
  );
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
