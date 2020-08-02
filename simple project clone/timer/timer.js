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

    if (this.tick) {
      this.tick();
      this.timer = setInterval(this.tick, 50);
    }
  };

  pause = () => {
    clearInterval(this.timer);
    this.startButton.addEventListener('click', this.start);
  };

  tick = () => {
    if (this.durationInput.value <= 0) {
      this.pause;
    } else {
      this.startButton.removeEventListener('click', this.start);
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
