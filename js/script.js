const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia"
let guessedLetters = [];
let remainingGuesses = 8

// API for retrieving words
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Start the game
getWord();

// Display symbols as placeholders for the chosen word's letters 
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// Guess button
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message
    message.innerText = "";
    // Grab what was entered in input
    const guess = letterInput.value;
    // Make sure it's a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // We have a letter!
        makeGuess(guess);
    }
    letterInput.value = "";
});

// Make sure the input is correct
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        // No input?
        message.innerText = "We're gonna need a guess, thanks."
    } else if (input.length > 1) {
        // More than one letter? 
        message.innerText = "Woah woah woah! One letter at a time, please."
    } else if (!input.match(acceptedLetter)) {
        // Something that's not a letter?
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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●")
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
   const upperWord = word.toUpperCase();
   if (!upperWord.includes(guess)) {
       // wrong guess sorry
       message.innerText = `Sorry, the word has no ${guess}.`;
       remainingGuesses -= 1;
   } else {
       message.innerText = `Nice! The word has the letter ${guess}.`
   }

   if (remainingGuesses === 0) {
       message.innerHTML = `Oof! Sorry, you're out of guesses. The word was <span class="highlight">${word}</span>.`;
       startOver();
   } else if (remainingGuesses === 1) {
       remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
   } else {
       remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
   }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You got it! Nice job!</p>`;
        
        startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    
    getWord();
    
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});