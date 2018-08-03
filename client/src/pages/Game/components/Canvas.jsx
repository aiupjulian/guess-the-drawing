import React from 'react';
import PropTypes from 'prop-types';
// import css from './Canvas.scss';
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

    componentDidMount() {
        this.context = this.canvas.current.getContext('2d');
        this.current = {};
        this.drawing = false;
        this.drawnLineId = 0;
        this.drawnLinesArray = [];
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
        subscribeToClearCanvas(() => { this.clearCanvas(); });
        subscribeToUndoCanvas(() => { this.undoCanvas(); });
        this.onResize();
    }

    componentDidUpdate(prevProps) {
        const { offsetHeight, offsetWidth } = this.props;
        if (offsetHeight !== prevProps.offsetHeight || offsetWidth !== prevProps.offsetWidth) {
            this.onResize();
        }
    }

    onResize = () => {
        const { offsetHeight, offsetWidth } = this.props;
        this.canvas.current.width = offsetWidth;
        this.canvas.current.height = offsetHeight;
    };

    onMouseDown = (event) => {
        this.drawing = true;
        this.current.x = event.clientX;
        this.current.y = event.clientY;
        this.drawnLineId += 1;
    };

    onMouseUp = () => {
        if (!this.drawing) { return; }
        this.drawing = false;
    };

    onMouseMove = (event) => {
        const { color } = this.props;
        if (!this.drawing) { return; }
        this.drawLine(
            this.current.x,
            this.current.y,
            event.clientX,
            event.clientY,
            color,
            this.drawnLineId,
            false,
            true,
        );
        this.current.x = event.clientX;
        this.current.y = event.clientY;
    };

    onTouchStart = (event) => {
        const touch = event.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        this.canvas.current.dispatchEvent(mouseEvent);
    };

    onTouchEnd = () => {
        const mouseEvent = new MouseEvent('mouseup', {});
        this.canvas.current.dispatchEvent(mouseEvent);
    };

    onTouchMove = (event) => {
        const touch = event.touches[0];
        const mouseEvent = new MouseEvent(
            'mousemove',
            {
                clientX: touch.clientX,
                clientY: touch.clientY,
            },
        );
        this.canvas.current.dispatchEvent(mouseEvent);
    };

    drawLine = (x0, y0, x1, y1, color, drawnLineId, isUndoAction, emit) => {
        const {
            beginPath,
            moveTo,
            lineTo,
            stroke,
            closePath,
        } = this.context;
        beginPath();
        moveTo(x0, y0);
        lineTo(x1, y1);
        this.context.strokeStyle = color;
        this.context.lineWidth = 2;
        stroke();
        closePath();

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

    clearCanvas = (emit) => {
        this.canvas.current.width = this.canvas.current.width;
        this.drawnLinesArray = [];
        if (!emit) { return; }
        emitClearCanvas();
    };

    undoCanvas = (emit) => {
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

    // document.getElementsByClassName('clear')[0].addEventListener('click', () => { clearCanvas(true) }, false); //IMPORTANT
    // document.getElementsByClassName('undo')[0].addEventListener('click', () => { undoCanvas(true) }, false); //IMPORTANT
    render() {
        return (
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
        );
    }
}

Canvas.propTypes = {
    color: PropTypes.string.isRequired,
    offsetHeight: PropTypes.number.isRequired,
    offsetWidth: PropTypes.number.isRequired,
};

export default Canvas;
