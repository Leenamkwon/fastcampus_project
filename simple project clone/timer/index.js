const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('.circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {},
});

// perimeter = Math.PI * 2 * 둘레

// 시간에 맞춰서 애니메이션
// perimeter * timeRemaining / duration - perimeter

// 9000 / -270
