const sound = require("sound-play");
const path = require('path');

let timeLeft = 5; //25 * 60; // 25 minutes
let timerInterval;
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const darkThemeImage = document.getElementById("dark");

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timerInterval);
                sound.play(path.join(__dirname, 'assets/alarme01.mp3'));
                alert("O tempo acabou! Faça uma pausa.");
            }
        }, 1000);
    }

    document.preventDefault();
    mainWindow.hide();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimer();
}

function applyDarkTheme() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
darkThemeImage.addEventListener("click", applyDarkTheme);
updateTimer();