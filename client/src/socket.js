import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

function subscribeToPageChange(callback) {
    socket.on('page change', data => callback(null, data));
}

export default {
    subscribeToPageChange,
};
