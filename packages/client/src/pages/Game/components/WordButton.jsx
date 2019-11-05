import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WordButton extends Component {
    handleWordClick = () => {
        const { onClickWordButton, word } = this.props;
        onClickWordButton(word);
    };

    render() {
        const { word } = this.props;
        return (
            <button
                type="button"
                onClick={this.handleWordClick}
            >
                { word }
            </button>
        );
    }
}

WordButton.propTypes = {
    onClickWordButton: PropTypes.func.isRequired,
    word: PropTypes.string.isRequired,
};

export default WordButton;
