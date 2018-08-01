import React from 'react';
import openSocket from 'socket.io-client';
import css from './App.scss';

export default class App extends React.Component {
    componentDidMount() {
        const socket = openSocket('http://localhost:8081');
        socket.emit('hola');
        socket.on('cacona', () => {console.log('cacona')});
    }

    render() {
        return (
            <p className={css.p}>
                { 'This is my new react app' }
            </p>
        );
    }
}
