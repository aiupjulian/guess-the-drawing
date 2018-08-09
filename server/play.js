const words = require('./words');

const getRandomWord = () => words[Math.floor(Math.random() * Math.floor(words.length))];
const getRandomWords = wordsQuantity => Array(wordsQuantity).fill('').map(() => getRandomWord());

const getRounds = (roundsQuantity, users) => {
    const wordsQuantity = 3;
    let roundsArray = Array(roundsQuantity).fill(Array(users.length).fill({}));
    roundsArray = roundsArray.map(
        round => round.map(
            (userRound, index) => (
                {
                    username: users[index],
                    words: getRandomWords(wordsQuantity),
                    word: '',
                    usersThatScored: [],
                }
            ),
        ),
    );
    return roundsArray;
};

module.exports = {
    getRounds,
};
