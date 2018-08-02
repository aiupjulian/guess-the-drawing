import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import css from './Chat.scss';
import { emitMessage, subscribeToMessage } from '../../../socket';

class Chat extends React.Component {
    state = {
        messageInput: '',
        messages: [],
    };

    componentDidMount() {
        subscribeToMessage((message) => {
            this.setState(prevState => ({ messages: prevState.messages.concat(message) }));
        });
    }

    getUsernameColor = (messageUsername) => {
        const { username } = this.props;
        return messageUsername === username ? css.userMessage : css.othersMessage;
    };

    handleMessageChange = (event) => {
        this.setState({ messageInput: event.target.value });
    };

    handleMessageInputKeyPress = (event) => {
        const { messageInput, messages } = this.state;
        const { username } = this.props;
        if (messageInput && event.key === 'Enter') {
            emitMessage(messageInput);
            this.setState({
                messageInput: '',
                messages: messages.concat({ username, message: messageInput }),
            });
        }
    };

    render() {
        const { messageInput, messages } = this.state;
        // messages.scrollTop = messages.scrollHeight;

        return (
            <Fragment>
                <ul className="messages">
                    {messages.map(message => (
                        <li>
                            <span className={this.getUsernameColor(message.username)}>
                                {message.username}
                            </span>
                            {`: ${message.message}`}
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    maxLength="20"
                    className="message-input"
                    autoComplete="off"
                    required
                    value={messageInput}
                    onChange={this.handleMessageChange}
                    onKeyPress={this.handleMessageInputKeyPress}
                />
            </Fragment>
        );
    }
}

Chat.propTypes = {
    changePage: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};

export default Chat;
