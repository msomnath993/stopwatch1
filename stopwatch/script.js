const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const reset = document.querySelector(".reset");
const timer = document.querySelector(".timer");
let hr = 0,
  sec = 0,
  min = 0;

// stoptime is used to verify that the stopwatch is stopped.
let stoptime = true;

function startTimer() {
  start.style.display = "none";
  reset.style.display = "inline";
  pause.style.display = "inline";

  // checking if the timer is stopped then change it to start and call the timerCycle function
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  } else {
    resetTimer();
  }
}

//function to add Pause and Resume functionality 
function pauseTimer() {
  // checking if the timer is in running state then change it to stop and change the button text to "Resume"
  if (stoptime == false) {
    stoptime = true;
    pause.textContent = "Resume";
  } else {
    // this runs if stoptime = true i.e not running then change it to start and change the button text to "Pause"
    stoptime = false;
    pause.textContent = "Pause";
    timerCycle();
  }
}

function resetTimer() {
  //changing the default values to 0 and resetting the timer
  timer.innerHTML = "00:00:00";
  stoptime = true;
  (hr = 0), (min = 0), (sec = 0);
  start.style.display = "inline";
  
  reset.style.display = "none";
  pause.style.display = "none";
}

function timerCycle() {
  //called by startTimer and checks if the timer is started or not.
  if (stoptime == false) {
    //parsing all the variables to Integer to perform calculation and safety from String TypeConversion
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    // adding 1 to min,hr,sec after every 60 sec and resetting the values before them to 0.
    sec = sec + 1;
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    //adding 0 as a String to all the hr,min,sec if they are less than 10 in value. eg: 01,02,03,04 and so on.
    if (sec < 10 || sec == 0) sec = "0" + sec;

    if (min < 10 || min == 0) min = "0" + min;

    if (hr < 10 || hr == 0) hr = "0" + hr;

    //changing the text value in UI to the hr,min,sec dynamically using Tempelate Literals
    timer.textContent = `${hr}:${min}:${sec}`;

    //using the seTimeout API which will call the timerCycle() after every 1000 inacting as a timer.
    setTimeout("timerCycle()", 1000);
  }
}
