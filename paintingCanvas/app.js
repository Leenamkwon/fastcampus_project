const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');

canvas.width = 500
canvas.height = 500

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
// console.log(painting);
function stopPainting(e) {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  // console.log(painting);

  if(!painting) { // 클릭하고 움직이면 이 것은 작동하지 않음.
    ctx.beginPath();
    ctx.moveTo(x, y);
    console.log(painting);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
    console.log(painting);
  }
}

function onmousedown(e) {
  painting = true;
}

function onMouseUp(e) {
  stopPainting();
}

function changeColor(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

const jsColor = [...colors];
jsColor.forEach(color => color.addEventListener('click', changeColor));