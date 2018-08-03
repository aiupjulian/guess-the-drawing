import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import css from './Colors.scss';
// import { subscribeToTimer } from '../../../socket';
import Color from './Color';

class Colors extends React.Component {
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
                    onClick={this.handleColorClick}
                >
                    {'UNDO'}
                </button>
                <button
                    type="button"
                    className={css.option}
                    onClick={this.handleColorClick}
                >
                    {'CLEAR'}
                </button>
            </Fragment>
        );
    }
}

Colors.propTypes = {
    onChangeColor: PropTypes.func.isRequired,
};

export default Colors;
