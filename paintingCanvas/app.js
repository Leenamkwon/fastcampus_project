const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = "500";
canvas.height = "500";

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

// 마우스 누르기
function startPainting() {
  painting = true;
}

// 마우스 이동
function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if(!painting) {
    ctx.beginPath(); // 경로 생성
    ctx.moveTo(x, y); // 펜을 x와 y로 지정된 좌표로 옮김
  } else {
    ctx.lineTo(x, y); // 시작점은 이전에 그려진 경로에 의해 결정되며, 시작점은 moveTo()메소드를 통해 변경가능
    ctx.stroke(); // 윤곽선 
  }
}

// 마우스 떼기
function onmouseDown(e) {
  painting = true;
}

if(canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}