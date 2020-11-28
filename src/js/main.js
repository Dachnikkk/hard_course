let week = ['Понедельник', 'Вторник', 'Среда','Четверг','Пятница','Суббота','Воскресенье'];
let dateArr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда','Четверг','Пятница','Суббота']; // заведём массив Date
let date = new Date;
let today = date.getDay(); //запишем сегодняшний день
const ul = document.querySelector('ul');
week.forEach((item, i) => {
    createLi(item);
    if(item === dateArr[today]) { // для нахождения сегодняшнего дня в нашей неделе мы перебором найдём в нашей неделе тот день недели который является today
        custom(item, 'bold');
    }
    if(i > 4){
        custom(item, 'italic');
    }
    delCustom(item); // зачистка промежуточных классов
})

function createLi(item) { // создание элемента списка
    const li = document.createElement('li');
    li.textContent = item;
    li.classList.add(item); // добавим промежуточный класс для того чтобы в функции custom найти нужный нам элемент и записать в него нужный нам класс
    ul.appendChild(li);
}

function custom(item, value) { // функция добавления класса
    let element = document.querySelector(`.${item}`); 
    element.classList.add(value);
}

function delCustom(item) { // функция зачистки промежуточных классов
    let element = document.querySelector(`.${item}`);
    element.classList.remove(item);
}

