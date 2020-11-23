let lang = prompt('Выберите язык(ru или en)');


if(lang === 'ru') {
    console.log('Пондельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if(lang === 'en') {
    console.log('Monday, tuesday, wednesday, thursday, friday, saturday, sunday');
}else {
    console.log('Кажется вы выбрали неверный язык!');
}

switch(lang) {
    case 'ru': 
        console.log('Пондельник, вторник, среда, четверг, пятница, суббота, воскресенье');
        break;
    case 'en':
        console.log('Monday, tuesday, wednesday, thursday, friday, saturday, sunday');
        break;
    default:
        console.log('Кажется вы выбрали неверный язык!');
}

let arr = [];
arr['ru'] = ['Пондельник, вторник, среда, четверг, пятница, суббота, воскресенье'];
arr['en'] = ['Monday, tuesday, wednesday, thursday, friday, saturday, sunday'];
arr[null] = ['Кажется вы выбрали неверный язык!'];
console.log(arr[lang].join(''));  // join для того чтобы получить строку, а не массив

let namePerson = prompt('Введите имя');
let res = namePerson.toLowerCase() === 'артём' ? 'Директор' : namePerson.toLowerCase() === 'максим' ? 'Преподаватель' : 'Студент';  // Исключил возможную ошибку из-за регистра
console.log(res);
