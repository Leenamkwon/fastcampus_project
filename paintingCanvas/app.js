const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");
const mode = document.getElementById('jsMode');

// 캔버스 크기
canvas.width = 500
canvas.height = 500

// 선 색상
ctx.strokeStyle = "#2c2c2c";
// 브러쉬 크기
ctx.lineWidth = 2.5;
ctx.fillStyle = "#2c2c2c";

let painting = false;
let fill = false;
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
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const range = e.target.value;
  ctx.lineWidth = range;
}

function handleModeClick(e) {
  if(fill === true) {
    fill = false;
    mode.innerText = "FILL";
  } else {
    fill = true;
    mode.innerText = "PAINT";
  }
}

function handleCanvasClick() {
  if ( fill === true) {
    ctx.fillRect(0, 0, 700, 700);
  };
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
}

const jsColor = [...colors];
jsColor.forEach(color => color.addEventListener('click', changeColor));

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}