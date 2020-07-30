class Timer {
  constructor(startBtn, pauseBtn, durationInput) {
    this.durationInput = durationInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;

    this.timeLeft = 0;

    this.startBtn.addEventListener('click', this.start);
    this.pauseBtn.addEventListener('click', this.pause);
  }

  start = () => {
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    this.timeLeft = durationInput.value;
    this.timeLeft--;
    this.durationInput.value = this.timeLeft;

    if (this.timeLeft <= 0) {
      this.pause();
      this.timeLeft = 0;
    }
  };
}

const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');

const timer = new Timer(startBtn, pauseBtn, durationInput);
