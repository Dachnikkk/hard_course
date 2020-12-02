let hourArr = ["час", 'часа', "часов"];
let minutesArr = ["минута", 'минуты', 'минут'];
let secondArr = ['секунда', 'секунды', 'секунд']
let date = new Date;
let today = date.getDay(); //запишем сегодняшний день
const ol = document.querySelector('ol');
let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
};

let a = date.toLocaleString("ru", options);
let b = date.toLocaleString("ru");
yearEnd();

let hour = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();

function yearEnd(){ // функция замены г. на года
    let arr = a.split('');
    arr.splice(arr.length - 2, 2, 'года');
    a = arr.join('');
}

function declOfNum(n, textForm) {   // склонения
    n = Math.abs(n) % 100; let n1 = n % 10;
    if (n > 10 && n < 20) { return textForm[2]; }
    if (n1 > 1 && n1 < 5) { return textForm[1]; }
    if (n1 == 1) { return textForm[0]; }
    return textForm[2];
}

let aString = `Сегодня ${a}, ${hour} ${declOfNum(hour, hourArr)} ${minutes} ${declOfNum(minutes, minutesArr)} ${seconds} ${declOfNum(seconds, secondArr)}`;
let bString = b.split(', ').join(' - ')
console.log(bString);

createP(aString);
createP(bString);
function createP(value) {
    const p = document.createElement('p');
    p.textContent = value;
    ol.appendChild(p);
}

setInterval(window.location.reload(), 1000)


