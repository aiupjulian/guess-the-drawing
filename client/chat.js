let messageInput = document.getElementById('message-input');
messageInput.onkeypress = (e) => {
    const messageInputVal = messageInput.value;
    if (messageInputVal && e.keyCode == 13) {
        socket.emit('message', messageInputVal);
        addMessage(messageInputVal);
        messageInput.value = '';
    }
}

socket.on('message', (msg) => {
    console.log(msg);
    addMessage(msg)
});

addMessage = (msg) => {
    let messages = document.getElementById('messages');
    let newLi = document.createElement("li");
    let newContent = document.createTextNode(msg);
    newLi.appendChild(newContent);
    messages.appendChild(newLi);
    messages.scrollTop = messages.scrollHeight;
};
