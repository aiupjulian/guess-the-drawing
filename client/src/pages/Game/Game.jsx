import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Chat from './components/Chat';
// import css from './App.scss';
// import subscribeToTimer from '../socket';
// import pages from '../../constants';

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
    // const { changePage } = this.props;
    //     changePage(pages.SCORE);
    // }

    render() {
        const { username } = this.props;

        return (
            <Fragment>
                <div className="canvas">
                    {'canvas'}
                    {/* <canvas className="whiteboard" height="1" width="1">
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
                    </div> */}
                </div>
                <div className="chat">
                    <Chat username={username} />
                </div>
            </Fragment>
        );
    }
}

Game.propTypes = {
    changePage: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};

export default Game;
