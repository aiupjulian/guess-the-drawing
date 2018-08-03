import React from 'react';
// import PropTypes from 'prop-types';
// import css from './Canvas.scss';
// import { emitCanvas, subscribeToCanvas } from '../../../socket';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidMount() {
    }

    render() {
        return (
            <canvas className="whiteboard" height="1" width="1" ref={this.canvas}>
                {'Get a better browser, bro.'}
            </canvas>
        );
    }
}

Canvas.propTypes = {
    // changePage: PropTypes.func.isRequired,
    // username: PropTypes.string.isRequired,
};

export default Canvas;
