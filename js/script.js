const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const resmainingGuessesSpan = document.querySelector(".remaining-span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"
const guessedLetters = [];

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
    message.innerText = "";
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
    const goodGuess = inputValidate(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const inputValidate = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        // No input
        message.innerText = "We're gonna need a guess, thanks."
    } else if (input.length > 1) {
        // More than one letter 
        message.innerText = "Woah woah woah! One letter at a time, please."
    } else if (!input.match(acceptedLetter)) {
        // Something that's not a letter
        message.innerText = "Please use letters. L-E-T-T-E-R-S. None of those weird numbers and symbols. Thank you."
    } else {
        // Correct input
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Hey, you already guessed that one."
    } else {
        guessedLetters.push(guess); 
        console.log(guessedLetters);
    }
};