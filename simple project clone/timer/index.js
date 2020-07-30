class Timer {
  constructor(startBtn, pauseBtn, durationInput) {
    this.durationInput = durationInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.startBtn.addEventListener('click', this.start.bind(this));
  }

  start() {
    console.log(this);
    this.pause();
  }

  pause() {
    console.log(this);
  }

  onChange() {}
}

const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');

const timer = new Timer(startBtn, pauseBtn, durationInput);
