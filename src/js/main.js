'use strict';

const register = document.querySelector('#registerUser'); // получаем кнопку регистрации
const login = document.querySelector('#login'); // получаем кнопку авторизации
const ul = document.querySelector('ul');  // список зарегестрированных пользователей
const username = document.querySelector('#username');

let array = []; // массив с юзерами

class User{ // класс юзера
    constructor(){
        this.firstName = '';
        this.lastName = '';
        this.login = '';
        this.password = '';
        this.regDate = '';
    }

}

function registerName() { // функция получения и записи имени и фамилии
    let promptName = prompt('Введите через пробел Имя и Фамилию пользовотеля');
    let i = 0; // счётчик
    promptName.split('').forEach(item => { // делаем массив из строки
        if(item === ' '){ // проверка на пробел 
            i += 1; // если это пробел +1 в счётчик
        }
    })
    if(i !== 1) { // если кол-во пробело не равно 1 
        alert('Неверно введено Имя и Фамилия!');
        return;
    }
    let user = new User(); // создание нового юзера
    user.firstName = promptName.split(' ')[0];
    user.lastName = promptName.split(' ')[1];
    registerLogin(user);
}

function registerLogin(user) { // функция получения и записи логина и пароля
    user.login = prompt('Введите логин');
    user.password = prompt('Введите пароль');
    registerDate(user);
}

function registerDate(user) { // функция получения и записи даты
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
    let date = new Date;
    let a = date.toLocaleString("ru", options);
    user.regDate = a;
    userOnScreen(user);
    array.push(user);
    writeLocalStorage(array);
}

function userOnScreen(user) { // функция вывода юзера на экран
    let li = document.createElement('li');
    let button = document.createElement('button');
    li.textContent = `Имя: ${user.firstName}, фамилия: ${user.lastName}, зарегестрирован: ${user.regDate}`
    button.textContent = 'Удалить';
    button.classList.add('button');
    button.addEventListener('click', deleteBtn)
    li.append(button);
    ul.append(li);
}

function writeLocalStorage(array) { // функция записи массива юзеров в локал сторедж
    localStorage.array =  JSON.stringify(array);
}


function parseStorage() { // функция получения и вывода на экран юзеров
    array = JSON.parse(localStorage.array);
    array.forEach(item => {
        userOnScreen(item);
    })
}

function deleteBtn({ target }) { // принимает таргет кнопки
    const li = document.querySelectorAll('li'); // берём массив лишек
    let delLi = target.closest('li'); // находим лишку родителя кнопки
    for(let i = 0; i < li.length; i++){ 
        if(li[i] === delLi){ // перебираем массив лишек и находим номер нашей лишки 
            array.splice(i, 1); // вырезаем из массива
            delLi.remove(); // вырезаем из DOM
            localStorage.array =  JSON.stringify(array); // и подчистим её в LocalStorage
        }
    }
}

function authorization() {
    let log = prompt('Введите логин');
    let pass = prompt('Введите пароль');
    array.forEach((item) => {
        checkData(item, log, pass);
    });
}

function checkData(item, log, pass) {
    if(item.login === log){
        if(item.password === pass){
            username.textContent = item.firstName;
        }else{
            alert('Пользователь не найден');
        }
    }else{
        alert('Пользователь не найден')
    }
}

function eventsListeners() { 
    register.addEventListener('click', registerName); // слушатель событий на регистрацию
    login.addEventListener('click', authorization); // слушатель событий на авторизацию
}

eventsListeners(); // установим слушатели событий

if(localStorage.array){ // если массив уже существует в локал сторедж то выведем элементы на экран
    parseStorage();
}else{

}
