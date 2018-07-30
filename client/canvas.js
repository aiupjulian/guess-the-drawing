'use strict';

// Set up the canvas
let canvas = document.getElementsByClassName('whiteboard')[0];
let context = canvas.getContext('2d');

// Set up the colors
const onColorUpdate = (event) => {
    current.color = event.target.className.split(' ')[1];
};
let colors = document.getElementsByClassName('color');
for (let i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
}

let current = {
    color: 'black'
};

// // limit the number of events per second
// const throttle = (callback, delay) => {
//     let previousCall = new Date().getTime();
//     return () => {
//         const time = new Date().getTime();
//         if ((time - previousCall) >= delay) {
//             previousCall = time;
//             callback.apply(null, arguments); // ???
//         }
//     };
// }

// Set up mouse events for drawing
let drawing = false;

const onMouseDown = (event) => {
    drawing = true;
    current.x = event.clientX;
    current.y = event.clientY;
}

const onMouseUp = (event) => {
    if (!drawing) { return; }
    drawing = false;
}

const onMouseMove = (event) => {
    if (!drawing) { return; }
    drawLine(current.x, current.y, event.clientX, event.clientY, current.color, true);
    current.x = event.clientX;
    current.y = event.clientY;
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mouseout', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

// Set up touch events for mobile, etc
const onTouchStart = (event) => {
    var touch = event.touches[0];
    var mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

const onTouchEnd =  (event) => {
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
}

const onTouchMove = (event) => {
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent(
        'mousemove',
        {
            clientX: touch.clientX,
            clientY: touch.clientY
        }
    );
    canvas.dispatchEvent(mouseEvent);
}

canvas.addEventListener('touchstart', onTouchStart, false);
canvas.addEventListener('touchend', onTouchEnd, false);
canvas.addEventListener('touchmove', onTouchMove, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Prevent scrolling when touching the canvas
let blockCanvasScroll = false;
document.body.addEventListener(
    'touchstart',
    (event) => {
        if (event.target == canvas) {
            blockCanvasScroll = true;
        }
    },
    {
        capture: false,
        passive: false
    }
);
document.body.addEventListener(
    'touchend',
    (event) => {
        if (event.target == canvas) {
            blockCanvasScroll = false;
        }
    },
    {
        capture: false,
        passive: false
    }
);
document.body.addEventListener(
    'touchmove',
    (event) => {
        if (blockCanvasScroll) {
            event.preventDefault();
        }
    },
    {
        capture: false,
        passive: false
    }
);

const drawLine = (x0, y0, x1, y1, color, emit) => {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    const w = canvas.width;
    const h = canvas.height;

    socket.emit(
        'drawing',
        {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
        }
    );
}

// receive drawings from other users
const onDrawingEvent = (data) => {
    const w = canvas.width;
    const h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
}

socket.on('drawing', onDrawingEvent);

// make the canvas fill its parent
const onResize = () => {
    const canvasDiv = document.getElementsByClassName('canvas')[0];
    canvas.width = canvasDiv.offsetWidth;
    canvas.height = canvasDiv.offsetHeight;
}

window.addEventListener('resize', onResize, false);
onResize();

const clearCanvas = () => {
    canvas.width = canvas.width;
}