import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import css from './App.scss';
// import subscribeToTimer from '../socket';
import pages from '../../constants';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentPage: pages.LOGIN,
        };
    }

    // componentDidMount() {
    //     subscribeToTimer(page => this.setState({
    //         page,
    //     }));
    // }

    render() {
        const { changePage } = this.props;
        changePage(pages.SCORE);

        return (
            <Fragment>
                <div className="canvas">
                    <canvas className="whiteboard" height="1" width="1">
                        Get a better browser, bro.
                    </canvas>
                    <div className="options">
                        <div className="option color black"></div>
                        <div className="option color red"></div>
                        <div className="option color green"></div>
                        <div className="option color blue"></div>
                        <div className="option color yellow"></div>
                        <div className="option undo">UNDO</div>
                        <div className="option clear">CLEAR</div>
                    </div>
                </div>
                <div className="chat">
                    <ul className="messages"></ul>
                    <input className="message-input" autoComplete="off" />
                </div>
            </Fragment>
        );
    }
}

Game.propTypes = {
    changePage: PropTypes.func.isRequired,
};

export default Game;
