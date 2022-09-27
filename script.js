'use strict';

// Selecting DOM elements
const hEl0 = document.getElementById('hh--0');
const hEl1 = document.getElementById('hh--1');
const mEl0 = document.getElementById('mm--0');
const mEl1 = document.getElementById('mm--1');
const sEl0 = document.getElementById('ss--0');
const sEl1 = document.getElementById('ss--1');

const colonEl = document.querySelectorAll('.colon');
const digitsEl = document.querySelectorAll('.time-display');

const startEl = document.querySelector('.btn-start');
const stopEl = document.querySelector('.btn-stop');
const resetEl = document.querySelector('.btn-reset');
const body = document.querySelector('body');

// Global variable declarations
let timer,
  ss,
  mm,
  hh,
  isRunning = false;

//Converts time to double digit string
const doubleDigit = (digit) => String(digit).padStart(2, '0');

// Reduce the opacity
const opacityControl = () => {
  if (!isRunning) {
    digitsEl.forEach((digit) => digit.classList.add('fade'));
    return;
  }
  digitsEl.forEach((digit) => {
    if (digit.textContent !== '0') digit.classList.remove('fade');
  });
};

// Set the digits of the display
const setDisplay = (hh, mm, ss) => {
  sEl1.textContent = doubleDigit(ss).split('')[1];
  sEl0.textContent = doubleDigit(ss).split('')[0];
  mEl1.textContent = doubleDigit(mm).split('')[1];
  mEl0.textContent = doubleDigit(mm).split('')[0];
  hEl1.textContent = doubleDigit(hh).split('')[1];
  hEl0.textContent = doubleDigit(hh).split('')[0];

  opacityControl();
  colonEl.forEach((element) => {
    element.classList.toggle('fade');
  });
};

//Initialize the stopwatch
const initStopwatch = () => {
  stopStopwatch();
  ss = 0;
  mm = 0;
  hh = 0;
  setDisplay(0, 0, 0);

  colonEl.forEach((element) => {
    element.classList.add('fade');
  });
};

//Start the stopwatch
const startStopwatch = () => {
  if (!isRunning) {
    timer = setInterval(runStopwatch, 1000);
    isRunning = true;
    sEl1.classList.remove('fade');
  }
  startEl.classList.add('inactive');
  body.classList.add('active');
};

//Stop the stopwatch
const stopStopwatch = () => {
  clearInterval(timer);
  startEl.classList.remove('inactive');
  isRunning = false;
  body.classList.remove('active');
};

//The brains -> stopwatch logic
const runStopwatch = function () {
  ss++;

  if (ss === 60) {
    ss = 0;
    mm++;
  }
  if (mm === 60 && ss === 0) {
    mm = 0;
    hh++;
  }
  if (hh === 24 && mm === 0 && ss === 0) {
    stopStopwatch();
  }
  setDisplay(hh, mm, ss);
};

initStopwatch();
startEl.addEventListener('click', startStopwatch);
stopEl.addEventListener('click', stopStopwatch);
resetEl.addEventListener('click', initStopwatch);
