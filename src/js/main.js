function promo () {
    alert('Добрый день, вы попали на игрового бота проводящего игру "Загадывание случайного числа от 1 до 100".');
    let con = confirm('Хотите сыграть в игру "Загадывание случайного числа от 1 до 100"?');
    if(con === false){
        alert('Хорошо! До скорых встреч!');
        promo();
    }else{
        start();
        function start(){
            let count = 10;
            let gameNumber = Math.floor(Math.random() * 99 + 1);
            let userNumber = prompt(`Угадай число от 1 до 100, осталось попыток ${count}`);
            function game(){
                function isNumber(n) { // проверка на число это или нет
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }
                if(userNumber === null){
                    alert('Игра окончена!');
                    return;
                }else if(!isNumber(userNumber)){
                    userNumber = prompt(`Введи число!`);
                    game();
                }
                if(+userNumber > +gameNumber){
                    count--;
                    counter(count, 'меньше');
                }else if(+userNumber < +gameNumber){
                    count--;
                    counter(count, 'больше');
                }else if(+userNumber === +gameNumber){
                    alert('Поздравляю, Вы угадали!!!');
                    start();
                }
                function comparison(value ) {
                    confirmedGame = confirm(`Загаданное число ${value}, продолжим?`);
                    if(confirmedGame === true){
                        userNumber = prompt(`Попробуй угадать ещё раз число от 1 до 100. Осталось попыток ${count}`);
                        game();
                    }else{
                        alert(`Число которое я загадал ${gameNumber}, я огорчён что ты не попытался угадать!`);
                        promo();
                    }
                }

                function counter(count, value){
                    if(count > 0) {
                        comparison(value, count);
                    }else {
                        let confirmedEnd = confirm('Попытки закончились, хотите сыграть еще?')
                        if(confirmedEnd === false) {
                            promo();
                        }else if(confirmedEnd === true) {
                            start();
                        } 

                    }
                }
            }
            game();
        } 
    }
}

promo();

