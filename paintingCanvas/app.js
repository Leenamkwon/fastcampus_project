const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const INITIAL_WH = 500;

// 캔버스 크기
canvas.width = INITIAL_WH;
canvas.height = INITIAL_WH;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, INITIAL_WH, INITIAL_WH);
// 선 색상
ctx.strokeStyle = "#2c2c2c";
// 브러쉬 크기
ctx.lineWidth = 2.5;
// 채우기 색상
ctx.fillStyle = "#2c2c2c";

let painting = false;
let fill = false;


function stopPainting(e) {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if(!painting) { // 클릭하고 움직이면 이 것은 작동하지 않음.
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
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

function handleModeClick() {
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
    ctx.fillRect(0, 0, INITIAL_WH, INITIAL_WH);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "mypainting.png";
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM); // 우클릭 방지
}

const jsColor = [...colors];
jsColor.forEach(color => color.addEventListener('click', changeColor));

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (save) {
  save.addEventListener('click', handleSaveClick);
}