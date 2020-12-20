const btn = document.querySelector('#change');
const color = document.querySelector('#color');
const body = document.querySelector('body')

btn.addEventListener('click', newColor);

function newColor() {
    let random = Math.floor(Math.random() * 10000000).toString(16);
    color.textContent = '#' + random;
    body.style.background = '#' + random;
}
