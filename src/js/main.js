let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда','Четверг','Пятница','Суббота'];
let date = new Date;
const ul = document.querySelector('ul');
week.forEach((item, i, week) => {
    if(i === date.getDay()) {
        createLi(item, 'bold');
    }
    else if(i > 4) {
        createLi(item, 'italic');
    }else {
        createLi(item);
    }
})

function createLi(item, custom) {
    const li = document.createElement('li');
    li.textContent = item;
    li.classList.add(custom);
    ul.appendChild(li);
}