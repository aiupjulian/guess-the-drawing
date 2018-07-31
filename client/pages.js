const pages = {
    LOGIN: 'login',
    LOBBY: 'lobby',
    GAME: 'game',
    SCORE: 'score',
};
let currentPage = pages.LOGIN;

const changePage = (selectedPage) => {
    currentPage = selectedPage;
    Object.values(pages).forEach((page) => {
        let pageDom = document.getElementsByClassName(page)[0];
        if (selectedPage === page) {
            pageDom.classList.add('show');
            pageDom.classList.remove('hide');
        } else {
            pageDom.classList.add('hide');
            pageDom.classList.remove('show');
        }
    });
};

changePage(currentPage);
