import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import css from './Options.scss';
// import { subscribeToTimer } from '../../../socket';
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
                <Color color="black" onChangeColor={onChangeColor} className={`${css.option} ${css.black}`} />
                <Color color="red" onChangeColor={onChangeColor} className={`${css.option} ${css.red}`} />
                <Color color="green" onChangeColor={onChangeColor} className={`${css.option} ${css.green}`} />
                <Color color="blue" onChangeColor={onChangeColor} className={`${css.option} ${css.blue}`} />
                <Color color="yellow" onChangeColor={onChangeColor} className={`${css.option} ${css.yellow}`} />
                <button
                    type="button"
                    className={css.option}
                    onClick={this.handleUndoCanvas}
                >
                    {'UNDO'}
                </button>
                <button
                    type="button"
                    className={css.option}
                    onClick={this.handleClearCanvas}
                >
                    {'CLEAR'}
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
