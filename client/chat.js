let messageInput = document.getElementsByClassName('message-input')[0];
messageInput.onkeypress = (e) => {
    const messageInputVal = messageInput.value;
    if (messageInputVal && e.keyCode == 13) {
        socket.emit('message', messageInputVal);
        addMessage(messageInputVal);
        messageInput.value = '';
    }
}

socket.on('message', (msg) => {
    addMessage(msg)
});

addMessage = (msg) => {
    let messages = document.getElementsByClassName('messages')[0];
    let newLi = document.createElement("li");
    let newContent = document.createTextNode(msg);
    newLi.appendChild(newContent);
    messages.appendChild(newLi);
    messages.scrollTop = messages.scrollHeight;
};
