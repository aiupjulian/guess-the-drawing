let messageInput = document.getElementsByClassName('message-input')[0];
messageInput.onkeypress = (event) => {
    const messageInputVal = messageInput.value;
    if (messageInputVal && event.keyCode == 13) {
        const data = {
            username: selfUsername,
            message: messageInputVal
        };
        addMessage(data);
        socket.emit('message', data);
        messageInput.value = '';
    }
}

socket.on('message', (data) => {
    addMessage(data)
});

addMessage = (data) => {
    let messages = document.getElementsByClassName('messages')[0];
    let newLi = document.createElement('li');
    let newUserContent = document.createElement('span').appendChild(document.createTextNode(`${data.user}: `));
    let newMessageContent = document.createElement('span').appendChild(document.createTextNode(data.message));
    newLi.appendChild(newUserContent);
    newLi.appendChild(newMessageContent);
    messages.appendChild(newLi);
    messages.scrollTop = messages.scrollHeight;
};


// Adds the visual chat message to the message list
const addChatMessage = (data, options) => {
    var $usernameDiv = $('<span class="username"/>')
        .text(data.username)
        .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
        .text(data.message);
    var $messageDiv = $('<li class="message"/>')
        .data('username', data.username)
        .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
}

// Gets the color of a username through our hash function
const getUsernameColor = (username) => {
    return (selfUsername === username)
        ? 'red'
        : 'blue';
}