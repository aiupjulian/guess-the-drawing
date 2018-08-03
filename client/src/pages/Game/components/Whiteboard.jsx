import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Canvas from './Canvas';
import Colors from './Colors';
import css from './Whiteboard.scss';
// import { subscribeToTimer } from '../../../socket';

class Whiteboard extends React.Component {
    state = {
        color: 'black',
    };

    handleChangeColor = (color) => {
        this.setState({ color });
    };

    render() {
        const { color } = this.state;
        const { offsetHeight, offsetWidth } = this.props;
        return (
            <Fragment>
                <div className={css.canvas}>
                    <Canvas
                        color={color}
                        offsetHeight={offsetHeight}
                        offsetWidth={offsetWidth}
                    />
                </div>
                <div className={css.options}>
                    <Colors onChangeColor={this.handleChangeColor} />
                </div>
            </Fragment>
        );
    }
}

Whiteboard.propTypes = {
    offsetHeight: PropTypes.number.isRequired,
    offsetWidth: PropTypes.number.isRequired,
};

export default Whiteboard;
