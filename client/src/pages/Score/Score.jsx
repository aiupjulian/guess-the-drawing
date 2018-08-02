import React from 'react';
import PropTypes from 'prop-types';
// import css from './App.scss';
// import subscribeToTimer from '../socket';
import pages from '../../constants';

class Score extends React.Component {
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
        changePage(pages.GAME);

        return (
            <p>
                { 'score' }
                <button
                    type="button"
                    onClick={() => changePage('game')}
                >
                    { 'Next Page' }
                </button>
            </p>
        );
    }
}

Score.propTypes = {
    changePage: PropTypes.func.isRequired,
};

export default Score;
