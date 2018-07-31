let username;

let usernameInput = document.getElementsByClassName('username-input')[0];
usernameInput.focus();
usernameInput.onkeypress = (event) => {
    const usernameInputVal = usernameInput.value;
    if (usernameInputVal && event.keyCode == 13) {
        changePage(pages.LOBBY);
        socket.emit('add user', usernameInputVal);
        usernameInput.value = '';
    }
}

socket.on('users', (users) => {
    let usersUl = document.getElementsByClassName('users')[0];
    usersUl.innerHTML = '';
    users.forEach((user) => {
        let newLi = document.createElement("li");
        let newContent = document.createTextNode(user.username);
        newLi.appendChild(newContent);
        usersUl.appendChild(newLi);
    });
});
