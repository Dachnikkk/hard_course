let hourArr = ["час", 'часа', "часов"];
let minutesArr = ["минута", 'минуты', 'минут'];
let secondArr = ['секунда', 'секунды', 'секунд']
let date = new Date;
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

let time = { 
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
}


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

let aString = `Сегодня ${a}, ${time.hour} ${declOfNum(time.hour, hourArr)} ${time.minutes} ${declOfNum(time.minutes, minutesArr)} ${time.seconds} ${declOfNum(time.seconds, secondArr)}`;
let bString = b.split(', ').join(' - ')

createP(aString);
createP(bString);

function createP(value) {
    const p = document.createElement('p');
    p.textContent = value;
    ol.appendChild(p);
}

setInterval(function() {
    newTime();
    let a = date.toLocaleString("ru", options);
    let b = date.toLocaleString("ru");
    
	let aString = `Сегодня ${a}, ${time.hour} ${declOfNum(time.hour, hourArr)} ${time.minutes} ${declOfNum(time.minutes, minutesArr)} ${time.seconds} ${declOfNum(time.seconds, secondArr)}`;
    let bString = b.split(', ').join(' - ');
    replaceP(aString, 0);
    replaceP(bString, 1);

}, 1000);

function replaceP(value, i) { // замена текста на новый
    const p = document.getElementsByTagName('p')[i];
    console.log(p);
    p.textContent = value;
}

function newTime(){ // Функция которая должна записать новое время
    time.hour = date.getHours();
    time.minutes = date.getMinutes();
    time.seconds = date.getSeconds();
}
