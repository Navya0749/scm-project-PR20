const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;
let currentColor = '#000000';

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}
