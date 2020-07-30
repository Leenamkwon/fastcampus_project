import Timer from './timer.js';

const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');

const timer = new Timer(startBtn, pauseBtn, durationInput, {
  onStart() {
    console.log('Timer started');
  },
  onTick() {
    console.log('Timer just ticked down');
  },
  onComplete() {
    console.log('Timer is completed');
  },
});

timer;
