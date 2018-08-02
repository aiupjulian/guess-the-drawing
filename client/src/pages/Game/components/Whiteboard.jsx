import React, { Fragment } from 'react';
import Canvas from './Canvas';
import Colors from './Colors';
// import PropTypes from 'prop-types';
// import css from './Canvas.scss';
// import { subscribeToTimer } from '../../../socket';

class Whiteboard extends React.Component {
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
        return (
            <Fragment>
                <div className="canvas">
                    <Canvas />
                </div>
                <div className="options">
                    <Colors />
                </div>
            </Fragment>
        );
    }
}

Whiteboard.propTypes = {
    // changePage: PropTypes.func.isRequired,
    // username: PropTypes.string.isRequired,
};

export default Whiteboard;
