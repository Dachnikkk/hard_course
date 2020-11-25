let argument = '';

function example(arg) {
    if(typeof arg === 'string') { // Проверка на то является ли это строкой или нет
        console.log('Переданный аргумент является строкой!');
        let stringWithoutSpaces = arg.trim(); // Уберём пробелы в начале и в конце
        console.log('Строка без пробелов в начале и в конце:', stringWithoutSpaces);
        len(stringWithoutSpaces); 
    }else {
        console.log('Видимо переданный аргумент не является строкой!');
    }
}

function len(arg) {
    if(arg.length > 30) {
        let newString = arg.split('').slice(0, 30).join(''); // Преобразуем в массив вырежем из массива 30 символов(slice не учитывает последний элемент поэтому до 30) и соеденим в строку 
        console.log(newString + '...'); // добавим многоточие к строке
    }else {
        console.log(arg);
    }
}

example(argument);