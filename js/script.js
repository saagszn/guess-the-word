const guessedLetters = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const resmainingGuessesSpan = document.querySelector(".remaining-span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"

const hiddenLetters = function (word) {
    const hiddenLetters = [];
    for (const letter of word) {
        console.log(letter);
        hiddenLetters.push("");
    }
    wordInProgress.innerText = hiddenLetters.join("");
};

hiddenLetters(word);

guessLetterButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});
