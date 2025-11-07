const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");
const dateEl = document.getElementById("date");

const formatSelect = document.getElementById("format-select");
const showSecondsCheckbox = document.getElementById("show-seconds");
const modeToggle = document.getElementById("mode-toggle");

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Format date
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  let dayName = days[now.getDay()];
  let monthName = months[now.getMonth()];
  let date = now.getDate();

  dateEl.textContent = `${dayName}, ${monthName} ${date}`;

  // Time format 12 or 24
  let ampm = "";
  if(formatSelect.value === "12") {
    ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
  } 

  // Pad zero
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");

  if(showSecondsCheckbox.checked) {
    secondsEl.style.display = "inline";
    secondsEl.textContent = ":" + seconds.toString().padStart(2, "0");
  } else {
    secondsEl.style.display = "none";
    secondsEl.textContent = "";
  }

  ampmEl.textContent = formatSelect.value === "12" ? ampm : "";
}

// Light/Dark mode
function updateMode() {
  if(modeToggle.checked) {
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
  }
}

// Event Listeners
formatSelect.addEventListener("change", updateClock);
showSecondsCheckbox.addEventListener("change", updateClock);
modeToggle.addEventListener("change", () => {
  updateMode();
});

// Initial load
updateMode();
updateClock();
setInterval(updateClock, 1000);
