import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../../constants';
import css from './Options.scss';
import Color from './Color';

class Options extends React.Component {
    handleClearCanvas = () => {
        const { onClearCanvas } = this.props;
        onClearCanvas(true);
    }

    handleUndoCanvas = () => {
        const { onUndoCanvas } = this.props;
        onUndoCanvas(true);
    }

    render() {
        const { onChangeColor } = this.props;

        return (
            <Fragment>
                {colors.map(color => (
                    <Color color={color} onChangeColor={onChangeColor} className={css.option} />
                ))}
                <button
                    type="button"
                    className={`${css.option} `}
                    onClick={this.handleUndoCanvas}
                >
                    <FontAwesomeIcon icon={faUndo} size="lg" />
                </button>
                <button
                    type="button"
                    className={css.option}
                    onClick={this.handleClearCanvas}
                >
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
            </Fragment>
        );
    }
}

Options.propTypes = {
    onChangeColor: PropTypes.func.isRequired,
    onClearCanvas: PropTypes.func.isRequired,
    onUndoCanvas: PropTypes.func.isRequired,
};

export default Options;
