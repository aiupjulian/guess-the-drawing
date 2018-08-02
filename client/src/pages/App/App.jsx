import React from 'react';
// import css from './App.scss';
import { subscribeToUsers } from '../../socket';
import Login from '../Login/Login';
import Lobby from '../Lobby/Lobby';
import Game from '../Game/Game';
import Score from '../Score/Score';
import pages from '../../constants';

const pagesJsx = {
    [pages.LOGIN]: Login,
    [pages.LOBBY]: Lobby,
    [pages.GAME]: Game,
    [pages.SCORE]: Score,
};

class App extends React.Component {
    state = {
        currentPage: pages.LOGIN,
        username: '',
        users: [],
    };

    componentDidMount() {
        subscribeToUsers((users) => {
            this.setState({ users });
        });
    }

    setUsername = (username) => {
        this.setState({ username });
    };

    changePage = (selectedPage) => {
        this.setState({
            currentPage: selectedPage,
        });
    };

    render() {
        const { currentPage, username, users } = this.state;
        const Child = pagesJsx[currentPage];

        return (
            <Child
                changePage={this.changePage}
                setUsername={this.setUsername}
                username={username}
                users={users}
            />
        );
    }
}

export default App;
