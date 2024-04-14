const StopBtn = document.getElementById("StopBtn");
const StartBtn = document.getElementById("StartBtn");
const ResetBtn = document.getElementById("ResetBtn");
const TimeDisplay = document.querySelector(".TimeDisplay");

let intervalId;
let time = 0;
let isRunning = false;

function startStopwatch() {
  if (!isRunning) {
    intervalId = setInterval(() => {
      time++;
      updateTime();
    }, 1000);
    isRunning = true;
  }
}

function stopStopwatch() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
}

function resetStopwatch() {
  stopStopwatch();
  time = 0;
  updateTime();
}

function updateTime() {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  TimeDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

StartBtn.addEventListener("click", startStopwatch);
StopBtn.addEventListener("click", stopStopwatch);
ResetBtn.addEventListener("click", resetStopwatch);