let num = 266219;
let arr = String(num).split(''); // Меняем тип на стринг для использования метода и разбиваем на массив

let res = arr[0]; // Обозначаем переменную для того чтобы видеть получить ответ из цикла
for(let i = 1; i < arr.length; i++) {
    res *= arr[i];
}

let pow = res ** 3; // Возведение в степень
console.log(pow);

let firstTwoSymbol = String(pow).split('').slice(0, 2).join(''); // Меняем тип на стринг для использования метода разбиваем на массив выдёргиваем два первых элемента и соединяем

console.log(Number(firstTwoSymbol))