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

let time = {
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
}

let a = date.toLocaleString("ru", options); // получаем значения для строки а
let b = date.toLocaleString("ru"); // получаем строку б но с запятой вместо тире
yearEnd(); // замена буквы г. в строке а на года

let aString = `Сегодня ${a}, ${time.hour} ${declOfNum(time.hour, hourArr)} ${time.minutes} ${declOfNum(time.minutes, minutesArr)} ${time.seconds} ${declOfNum(time.seconds, secondArr)}`; // получаем строу а
let bString = b.split(', ').join(' - ') // получаем строку б с тире

createP(aString);// создаём и выводим на экран
createP(bString);// создаём и выводим на экран

setInterval(function() { // функция замены через каждую секунду
    let date = new Date; // заводим новую поскольку нужно чтобы она обновлялась каждый раз
    let a = date.toLocaleString("ru", options);// получаем значения для строки а
    let b = date.toLocaleString("ru");// получаем строку б но с запятой вместо тире
    yearEnd(); // замена буквы г. в строке а на года
    time.hour = date.getHours(); // получение нового часа
    time.minutes = date.getMinutes(); // получение новой минуты
    time.seconds = date.getSeconds(); // получение новой секунды
	let aString = `Сегодня ${a}, ${time.hour} ${declOfNum(time.hour, hourArr)} ${time.minutes} ${declOfNum(time.minutes, minutesArr)} ${time.seconds} ${declOfNum(time.seconds, secondArr)}`; // переписываем строку а
    let bString = b.split(', ').join(' - '); // переписываем строку б
    replaceP(aString, 0); // переносим на экран
    replaceP(bString, 1); // переносим на экран

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
}, 1000);

function createP(value) {
    const p = document.createElement('p');
    p.textContent = value;
    ol.appendChild(p);
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


function replaceP(value, i) { // замена текста на новый
    const p = document.getElementsByTagName('p')[i];
    p.textContent = value;
}

function newTime(){ // Функция которая должна записать новое время
    time.hour = date.getHours();
    time.minutes = date.getMinutes();
    time.seconds = date.getSeconds();
}
