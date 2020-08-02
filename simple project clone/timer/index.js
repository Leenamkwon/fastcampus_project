class Timer {
  constructor(durationInput, startButton, pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    console.log(this);
    this.startButton.addEventListener('click', this.start);
  }

  start = () => {
    this.tick();
    this.timer = setInterval(this.tick, 1000);
  };

  pause = () => {
    clearInterval(this.timer);
  };

  tick = () => {
    console.log('tick');
  };
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton);

timer.start();
