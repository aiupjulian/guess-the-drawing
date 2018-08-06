import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Chat from './components/Chat';
import Canvas from './components/Canvas';
import css from './Game.scss';
// import subscribeToTimer from '../socket';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    state = {
        offsetHeight: 0,
        offsetWidth: 0,
    };

    componentDidMount() {
        window.addEventListener('resize', this.onResize, false);
        this.onResize();
    }

    onResize = () => {
        this.setState({
            offsetHeight: this.canvas.current.offsetHeight,
            offsetWidth: this.canvas.current.offsetWidth,
        });
    };

    render() {
        const { username } = this.props;
        const { offsetHeight, offsetWidth } = this.state;

        return (
            <Fragment>
                {/* <div className={css.statusBar}>
                    {'barra superior: palabra a dibujar / tiempo / quien dibuja'}
                </div> */}
                <div className={css.canvas} ref={this.canvas}>
                    <Canvas
                        offsetHeight={offsetHeight}
                        offsetWidth={offsetWidth}
                    />
                </div>
                <div className={css.chat}>
                    <Chat username={username} />
                </div>
            </Fragment>
        );
    }
}

Game.propTypes = {
    username: PropTypes.string.isRequired,
};

export default Game;
