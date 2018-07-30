let username;

let usernameInput = document.getElementsByClassName('username-input')[0];
usernameInput.onkeypress = (event) => {
    const usernameInputVal = usernameInput.value;
    if (usernameInputVal && event.keyCode == 13) {
        socket.emit('add user', username);
        usernameInput.value = '';
    }
}

socket.on('users', (users) => {
    let usersUl = document.getElementsByClassName('users')[0];
    users.forEach((user) => {
        let newLi = document.createElement("li");
        let newContent = document.createTextNode(message);
        newLi.appendChild(newContent);
        usersUl.appendChild(newLi);
    });
});