let messageInput = document.getElementsByClassName('message-input')[0];
messageInput.onkeypress = (event) => {
    const messageInputVal = messageInput.value;
    if (messageInputVal && event.keyCode == 13) {
        socket.emit('message', messageInputVal);
        addMessage({
            username: username,
            message: messageInputVal
        });
        messageInput.value = '';
    }
}

socket.on('message', (message) => {
    addMessage(message)
});

addMessage = (message) => {
    let messages = document.getElementsByClassName('messages')[0];
    let newLi = document.createElement("li");
    let newContent = document.createTextNode(message);
    newLi.appendChild(newContent);
    messages.appendChild(newLi);
    messages.scrollTop = messages.scrollHeight;
};

const log = (message, options) => {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
}