//  Get all ele
const player = document.querySelector('.player'),
      video = player.querySelector('.viewer'),
      progerss = player.querySelector('.progress'),
      progressBar = player.querySelector('.progress__filled'),
      toggle = player.querySelector('.toggle'),
      skipButtons = player.querySelectorAll('[data-skip]'),
      ranges = player.querySelectorAll('.player__slider');

// 기능 만들기
function togglePlay() {
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '▶️' : '⏸';
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  console.log(video.currentTime);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // video[this.name] = this.value;
  
}

// 이벤트 리스너
video.addEventListener('click', togglePlay); // video controls
video.addEventListener('play', updateButton); // video가 시작할떄 발동
video.addEventListener('pause', updateButton); // video가 멈추면 발동
toggle.addEventListener('click', togglePlay); // toggle btn
skipButtons.forEach(button => button.addEventListener('click', skip)); // skip btn

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

console.dir(video);