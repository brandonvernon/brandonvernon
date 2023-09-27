const color = document.querySelector('#colorPicker');
const height = document.querySelector('#inputHeight');
const width = document.querySelector('#inputWidth');
const size = document.querySelector('#sizePicker');
const canvas = document.querySelector('#pixelCanvas');
const erase = document.querySelector('#erase');
const text = document.createTextNode("Double-Click to Erase");
const colorPicker = document.querySelector("#colorPicker");
const colorPickerBorder = document.querySelector("#colorPickerBorder");

function clearGrid() {
canvas.innerHTML = '';
}

function makeGrid() {
  let tr;
  let td;
  for (let i = 0; i < height.value; i++) {
    tr = document.createElement('tr');
    canvas.appendChild(tr);
    for (let j = 0; j < width.value; j++) {
        td = document.createElement('td');
        tr.appendChild(td);
    }
  }
  canvas.style.backgroundColor = "white";
  erase.appendChild(text);
}

colorPicker.onchange = function() {
  colorPickerBorder.style.backgroundColor = colorPicker.value;
}
colorPickerBorder.style.backgroundColor = colorPicker.value;

function addColor() {
  canvas.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.nodeName === 'TD') {
        event.target.style.backgroundColor = color.value;
    }
  })
}

function removeColor() {
  canvas.addEventListener('dblclick', function(event) {
    event.preventDefault();
    if (event.target.nodeName === 'TD') {
        event.target.style.backgroundColor = '';
    }
  })
}

size.addEventListener('submit', function(event) {
  event.preventDefault();
  clearGrid();
  makeGrid();
  addColor();
  removeColor();
})
