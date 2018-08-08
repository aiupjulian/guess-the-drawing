import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import css from './Canvas.scss';
import Options from './Options';
import {
    emitClearCanvas,
    emitDrawing,
    emitUndoCanvas,
    subscribeToClearCanvas,
    subscribeToDrawing,
    subscribeToUndoCanvas,
} from '../../../socket';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    state = {
        color: 'black',
    };

    componentDidMount() {
        this.context = this.canvas.current.getContext('2d');
        this.current = {};
        this.drawing = false;
        this.drawnLineId = 0;
        this.drawnLinesArray = [];
        this.canvasHorizontalDistanceToWindows = 0;
        this.canvasVerticalDistanceToWindows = 0;
        this.blockCanvasScroll = false;
        document.body.addEventListener(
            'touchstart',
            (event) => {
                if (event.target === this.canvas.current) {
                    this.blockCanvasScroll = true;
                }
            },
            {
                capture: false,
                passive: false,
            },
        );
        document.body.addEventListener(
            'touchend',
            (event) => {
                if (event.target === this.canvas.current) {
                    this.blockCanvasScroll = false;
                }
            },
            {
                capture: false,
                passive: false,
            },
        );
        document.body.addEventListener(
            'touchmove',
            (event) => {
                if (this.blockCanvasScroll) {
                    event.preventDefault();
                }
            },
            {
                capture: false,
                passive: false,
            },
        );
        subscribeToDrawing((data) => {
            const { height, width } = this.canvas.current;
            this.drawnLineId = data.drawnLineId;
            this.drawLine(
                data.x0 * width,
                data.y0 * height,
                data.x1 * width,
                data.y1 * height,
                data.color,
                data.drawnLineId,
            );
        });
        subscribeToClearCanvas(() => { this.handleClearCanvas(); });
        subscribeToUndoCanvas(() => { this.handleUndoCanvas(); });
        this.onResize();
    }

    componentDidUpdate(prevProps) {
        this.context = this.canvas.current.getContext('2d');
        const { offsetHeight, offsetWidth } = this.props;
        if (offsetHeight !== prevProps.offsetHeight || offsetWidth !== prevProps.offsetWidth) {
            this.onResize();
        }
    }

    onResize = () => {
        const { offsetHeight, offsetWidth } = this.props;
        this.canvas.current.width = offsetWidth;
        this.canvas.current.height = offsetHeight;
        this.canvasHorizontalDistanceToWindows = this.canvas.current.getBoundingClientRect().x;
        this.canvasVerticalDistanceToWindows = this.canvas.current.getBoundingClientRect().y;
    };

    onMouseDown = (event) => {
        this.drawing = true;
        this.current.x = this.getMouseHorizontalPositionInCanvas(event.clientX);
        this.current.y = this.getMouseVerticalPositionInCanvas(event.clientY);
        this.drawnLineId += 1;
    };

    onMouseUp = () => {
        if (!this.drawing) { return; }
        this.drawing = false;
    };

    onMouseMove = (event) => {
        const { color } = this.state;
        if (!this.drawing) { return; }
        this.drawLine(
            this.current.x,
            this.current.y,
            this.getMouseHorizontalPositionInCanvas(event.clientX),
            this.getMouseVerticalPositionInCanvas(event.clientY),
            color,
            this.drawnLineId,
            false,
            true,
        );
        this.current.x = this.getMouseHorizontalPositionInCanvas(event.clientX);
        this.current.y = this.getMouseVerticalPositionInCanvas(event.clientY);
    };

    onTouchStart = (event) => {
        const touch = event.touches[0];
        this.onMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
    };

    onTouchEnd = () => {
        this.onMouseUp();
    };

    onTouchMove = (event) => {
        const touch = event.touches[0];
        this.onMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    };

    getMouseHorizontalPositionInCanvas = mouseX => mouseX - this.canvasHorizontalDistanceToWindows;

    getMouseVerticalPositionInCanvas = mouseY => mouseY - this.canvasVerticalDistanceToWindows;

    drawLine = (x0, y0, x1, y1, color, drawnLineId, isUndoAction, emit) => {
        /* eslint-disable */
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.strokeStyle = color;
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();
        /* eslint-enable */

        if (!isUndoAction) {
            this.saveDrawnLine([x0, y0, x1, y1, color, drawnLineId]);
        }

        if (!emit) { return; }
        const w = this.canvas.current.width;
        const h = this.canvas.current.height;

        emitDrawing({
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color,
            drawnLineId,
        });
    };

    handleClearCanvas = (emit) => {
        this.canvas.current.width = this.canvas.current.width;
        this.drawnLinesArray = [];
        if (!emit) { return; }
        emitClearCanvas();
    };

    handleUndoCanvas = (emit) => {
        this.canvas.current.width = this.canvas.current.width;
        this.drawnLinesArray = this.drawnLinesArray.filter(
            drawnLine => drawnLine[5] !== this.drawnLineId,
        );
        this.drawnLinesArray.forEach(
            (drawnLine) => { this.drawLine(...drawnLine, true); },
        );
        this.drawnLineId -= 1;
        if (!emit) { return; }
        emitUndoCanvas();
    };

    saveDrawnLine = (drawnLine) => {
        this.drawnLinesArray.push(drawnLine);
    };

    handleChangeColor = (color) => {
        this.setState({ color });
    };

    render() {
        return (
            <Fragment>
                <div className={css.canvas}>
                    <canvas
                        height="1"
                        width="1"
                        ref={this.canvas}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        onMouseOut={this.onMouseUp}
                        onMouseMove={this.onMouseMove}
                        onTouchStart={this.onTouchStart}
                        onTouchEnd={this.onTouchEnd}
                        onTouchMove={this.onTouchMove}
                    >
                        {'Get a better browser, bro.'}
                    </canvas>
                </div>
                <div className={css.options}>
                    <Options
                        onChangeColor={this.handleChangeColor}
                        onClearCanvas={this.handleClearCanvas}
                        onUndoCanvas={this.handleUndoCanvas}
                    />
                </div>
            </Fragment>
        );
    }
}

Canvas.propTypes = {
    offsetHeight: PropTypes.number.isRequired,
    offsetWidth: PropTypes.number.isRequired,
};

export default Canvas;
