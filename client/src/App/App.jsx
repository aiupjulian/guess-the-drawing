import React from 'react';
// import css from './App.scss';
// import subscribeToTimer from '../socket';
import Login from '../Login/Login';
import Lobby from '../Lobby/Lobby';
import Game from '../Game/Game';
import Score from '../Score/Score';

const pages = {
    LOGIN: 'login',
    LOBBY: 'lobby',
    GAME: 'game',
    SCORE: 'score',
};

class App extends React.Component {
    state = {
        currentPage: pages.LOGIN,
    };

    // componentDidMount() {
    //     subscribeToTimer(page => this.setState({
    //         page,
    //     }));
    // }

    changePage = (selectedPage) => {
        this.setState({
            currentPage: selectedPage,
        });
    };

    render() {
        const { currentPage } = this.state;
        const pagesJsx = {
            [pages.LOGIN]: Login,
            [pages.LOBBY]: Lobby,
            [pages.GAME]: Game,
            [pages.SCORE]: Score,
        };
        const Child = pagesJsx[currentPage];

        return (
            <Child changePage={this.changePage} />
        );
    }
}

export default App;
