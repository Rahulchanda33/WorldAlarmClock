// Function to update current times
function updateCurrentTimes() {
    const timeZones = document.querySelectorAll('.time-zone');

    timeZones.forEach((zone) => {
        const city = zone.dataset.city;
        const offset = parseFloat(zone.dataset.offset);
        const date = new Date();

        // Calculate the local time
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const localTime = new Date(utc + (3600000 * offset));

        // Display the time with hours, minutes, and seconds
        zone.querySelector('.time').textContent = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    });
}

// Initial time update
updateCurrentTimes();

// Update the time every second
setInterval(updateCurrentTimes, 1000);

// Function to set an alarm
document.getElementById('alarm-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('alarm-city').value;
    const time = document.getElementById('alarm-time').value;

    const alarmTime = new Date();
    const [hours, minutes] = time.split(':');
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);

    const alarmTimeString = alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add alarm to the list
    const alarmList = document.getElementById('alarm-list');
    const alarmItem = document.createElement('li');
    alarmItem.textContent = `Alarm set for ${city} at ${alarmTimeString}`;
    alarmList.appendChild(alarmItem);

    // Check every second if it's time for the alarm
    const checkAlarmInterval = setInterval(() => {
        const now = new Date();
        if (now.getHours() === alarmTime.getHours() && now.getMinutes() === alarmTime.getMinutes()) {
            clearInterval(checkAlarmInterval);
            triggerAlarm(city);
        }
    }, 1000);
});

// Function to trigger alarm
function triggerAlarm(city) {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.loop = true; // Enable looping
    alarmSound.play(); // Start playing the sound
    
    const modal = document.getElementById('alarm-modal');
    const closeModal = document.getElementById('close-modal');
    const countdownTimer = document.getElementById('countdown-timer');

    // Display modal
    modal.style.display = "block";

    // Initialize countdown
    let countdownTime = 300; // 5 minutes in seconds
    const countdownInterval = setInterval(() => {
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            modal.style.display = "none"; // Close the modal
            alarmSound.pause(); // Stop sound
            alarmSound.currentTime = 0; // Reset sound
        } else {
            const minutes = Math.floor(countdownTime / 60);
            const seconds = countdownTime % 60;
            countdownTimer.textContent = `Countdown: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            countdownTime--;
        }
    }, 1000);

    closeModal.onclick = function() {
        modal.style.display = "none"; // Close the modal
        clearInterval(countdownInterval);
        alarmSound.pause(); // Stop sound
        alarmSound.currentTime = 0; // Reset sound
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Close the modal
            clearInterval(countdownInterval);
            alarmSound.pause(); // Stop sound
            alarmSound.currentTime = 0; // Reset sound
        }
    };
}

// Update the clock initially
updateCurrentTimes();
// Example for expanding time zones
const timeZones = [
    { city: 'New York', offset: '-5' },
    { city: 'London', offset: '0' },
    { city: 'Tokyo', offset: '9' },
    { city: 'Delhi', offset: '5.5' },
    // Add more cities
  ];
  
  // Function to create a new clock
  function createClock(city, offset) {
    // Generate clock elements
    // Analog or digital depending on user preference
  }
  
  // Toggle between analog and digital clocks
  document.getElementById('toggleClock').addEventListener('click', function() {
    const clocks = document.querySelectorAll('.clock');
    clocks.forEach(clock => {
      // Change the class or style to switch between clock types
    });
  });
  
  // Recurring alarm feature
  function setRecurringAlarm(time, recurrence) {
    // Set an interval to trigger the alarm at the specified recurrence
  }
  
  // Lazy loading example
  document.addEventListener('scroll', function() {
    const clocks = document.querySelectorAll('.clock');
    clocks.forEach(clock => {
      if (isInViewport(clock)) {
        loadClock(clock);  // Only load clock when in viewport
      }
    });
  });
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Snooze feature
  document.getElementById('snoozeButton').addEventListener('click', function() {
    setTimeout(() => {
      // Trigger the alarm again after a few minutes
    }, 300000);  // Snooze for 5 minutes
  });
  
  // Language support
  const languageOptions = {
    en: { 'addAlarm': 'Add Alarm', 'setAlarm': 'Set Alarm' },
    es: { 'addAlarm': 'Añadir alarma', 'setAlarm': 'Establecer alarma' },
    // Add more languages
  };
  
  function setLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      el.innerText = languageOptions[lang][key];
    });
  }
  let alarmTime;
let alarmTimeout;
let isAlarmSet = false;

const alarmTimeInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm");
const timeLeftDisplay = document.getElementById("time-left");

function setAlarm() {
    const alarmValue = alarmTimeInput.value;
    if (alarmValue) {
        alarmTime = new Date(alarmValue).getTime();
        isAlarmSet = true;

        const now = new Date().getTime();
        const timeLeft = alarmTime - now;

        if (timeLeft > 0) {
            displayTimeLeft(timeLeft);
            alarmTimeout = setTimeout(ringAlarm, timeLeft);
        } else {
            alert("Alarm time must be in the future!");
        }
    }
}

function displayTimeLeft(timeLeft) {
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)));

    timeLeftDisplay.textContent = `Time left: ${hours}h ${minutes}m ${seconds}s`;
}

function ringAlarm() {
    clearTimeout(alarmTimeout);
    isAlarmSet = false;
    alert("Alarm is ringing!");
    timeLeftDisplay.textContent = ""; // Clear the display after alarm rings
}

setAlarmButton.addEventListener("click", setAlarm);
