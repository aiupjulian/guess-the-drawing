import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import css from './Colors.scss';
// import { subscribeToTimer } from '../../../socket';
import Color from './Color';

class Colors extends React.Component {
    state = {
        color: 'black'
    };

    // componentDidMount() {
    //     subscribeToTimer(page => this.setState({
    //         page,
    //     }));
    // const { changePage } = this.props;
    //     changePage(pages.SCORE);
    // }

    handleChangeColorClick = (color) => {
        this.setState({ color });
    };

    render() {
        return (
            <Fragment>
                <Color color="black" onChangeColor={this.handleChangeColorClick} />
                <Color color="red" onChangeColor={this.handleChangeColorClick} />
                <Color color="green" onChangeColor={this.handleChangeColorClick} />
                <Color color="blue" onChangeColor={this.handleChangeColorClick} />
                <Color color="yellow" onChangeColor={this.handleChangeColorClick} />
                <button
                    type="button"
                    className="option undo"
                    onClick={this.handleColorClick}
                >
                    {'UNDO'}
                </button>
                <button
                    type="button"
                    className="option clear"
                    onClick={this.handleColorClick}
                >
                    {'CLEAR'}
                </button>
            </Fragment>
        );
    }
}

Colors.propTypes = {
    // changePage: PropTypes.func.isRequired,
    // username: PropTypes.string.isRequired,
};

export default Colors;
