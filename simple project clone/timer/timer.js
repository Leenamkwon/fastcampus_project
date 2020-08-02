class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }

    this.tick();
    this.timer = setInterval(this.tick, 50);
  };

  pause = () => {
    clearInterval(this.timer);
  };

  tick = () => {
    if (this.durationInput.value <= 0) {
      this.pause;
    } else {
      this.onTick(this.timeRemaining);
      this.timeRemaining = this.timeRemaining - 0.05;
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
