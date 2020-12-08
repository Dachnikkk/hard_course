'use strict'

let start = document.getElementById('start'); // кнопка рассчитать
let cancel = document.getElementById('cancel'); // кнопка сбросить
let plusIncome = document.getElementsByTagName('button')[0]; // кнопка плюс у доп дохода
let plusExpenses = document.getElementsByTagName('button')[1]; // кнопка плюс добавление обяз расхода
let checkBox = document.getElementById('deposit-check'); // чекбокс депозита
let incomeValue = document.querySelectorAll('.additional_income-item'); // коллекция возможных доходов
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0]; // дневной бюджет
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0]; //расходы за месяц
let additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // возможные доходы
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; // возможные расходы
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; // накопления за период
let targetMonthValue = document.getElementsByClassName('target_month-value')[0]; // срок достижения цели
let salaryAmount = document.querySelector('.salary-amount'); // месячный доход
let incomeItems = document.querySelectorAll('.income-items'); // блок где хратнятся поля ввода доп дохода
let incomeTitle = document.querySelector('.income-title'); // тайтл доп дохода
let incomeAmount = document.querySelector('.income-amount'); // значение доп дохода
let expensesItems = document.querySelectorAll('.expenses-items'); // итемы обяз дохода
let expensesTitle = document.querySelector('.expenses-title');// тайтл обяз дохода
let expensesAmount = document.querySelector('.expenses-amount'); // значение обяз дохода
let additonalExpeses = document.querySelector('.additional_expenses'); // блок где хранится поле ввода возможных расходов
let additionalExpensesItem = document.querySelector('.additional_expenses-item'); // поле вывода возможных расходов
let depositBank = document.querySelector('.deposit-bank'); // селект депозита
let depositAmount = document.querySelector('.deposit-amount'); //сумма депозита
let depositPercent = document.querySelector('.deposit-percent'); // процент депозита
let targetAmount = document.querySelector('.target-amount'); // цель 
let periodSelect = document.querySelector('.period-select'); // выбор периода
let periodAmount = document.querySelector('.period-amount'); // значение периода
let budgetMonthValue = document.querySelector('.budget_month-value'); // доход за месяц
let depositCheck = document.querySelector('#deposit-check'); // депозит инпут
let depositCheckmark = document.querySelector('.deposit-checkmark'); // депозит спан



let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    amount: [],
    deposit: false,
    period: 1,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    budget: 0,
    accumulatedMonth: 0,
    start: function() { 
        if(salaryAmount.value === '') { // проверка на ввод месячного дохода
            start.removeEventListener('click', this.start);
            return;
        }
        if(this.checkRu() !== 1) { // проверка на русские символы в полях с наименованием
            alert('Введите текст используя русскую раскладку клавиатуры!');
            return;
        }
        if(this.checkNumber() !== 1) {
            alert('Введите цифры!');
            return;
        }
        
        this.budget = +salaryAmount.value; // записываем месячный доход в переменную
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.block(true);
    },
    showResult: function() { // выводы в подходящие инпуты
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    },
    addExpensesBlock: function() { // добавление по плюсу обязательных расходов
        let cloneExpensesItem = expensesItems[0].cloneNode(true); // клонируем итем
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses); // вставляем новые поля
        let title = cloneExpensesItem.querySelector('.expenses-title'); // находим новый тайтл для очистки
        let amount = cloneExpensesItem.querySelector('.expenses-amount'); // находим новое значение для очистки
        title.value = ''; // очистка
        amount.value = ''; //очистка
        if(expensesItems.length === 3) { // проверка на поля
            plusExpenses.style.display = 'none';
        }
    },
    getExpenses: function() { // запись обязательных расходов в объект
        expensesItems.forEach(function(item) { // перебираем все поля
            let itemExpenses = item.querySelector('.expenses-title').value; // получаем value из тайтла
            let cashExpenses = item.querySelector('.expenses-amount').value;// получаем value из значений
            if(itemExpenses !== '' && cashExpenses !== '') { // проверка на пустые строки
                this.expenses[itemExpenses] = cashExpenses; // запись в объект
            }
        }.bind(appData));
    },
    addIncomeBlock: function() { // добавление по плюсу  дополнительных доходов
        let cloneIncomeItem = incomeItems[0].cloneNode(true); // клонируем итем
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);// вставляем новые поля

        let title = cloneIncomeItem.querySelector('.income-title'); // находим новый тайтл для очистки
        let amount = cloneIncomeItem.querySelector('.income-amount'); // находим новон значение для очистки
        title.value = ''; // очистка
        amount.value = ''; //очистка

        incomeItems = document.querySelectorAll('.income-items '); // колличество полей
        if(incomeItems.length === 3) { // проверка на поля
            plusIncome.style.display = 'none';
        }
    },
    getIncome: function() { 
        if(incomeTitle.value !== '' && incomeAmount.value !== ''){ // проверка на пустое поле
            let itemIncome = incomeTitle.value; // запись value в переменную
            let cashIncome = incomeAmount.value; // запись value в переменную
            this.income[itemIncome] = cashIncome; // запись value в переменную
        }
        for(let key in this.income){ // перебор доп доходов и сумма
            this.incomeMonth += +this.income[key]; // сложение доп доходов
        }
    },
    getAddExpenses: function() {  // запись возможных расходов в массив
        let addExpenses = additionalExpensesItem.value.split(',');  // собираем из value в массив
        addExpenses.forEach(function(item) { //перебор
            item = item.trim(); // убираем пробелы 
            if(item !== '') { // проверка на пустую строку
                this.addExpenses.push(item); // добавляем в массив
            }
        }.bind(appData))
    },
    getAddIncome: function() { // запись возможных доходов 
        additionalIncomeItem.forEach(function(item) {  // перебор
            let itemValue = item.value.trim(); // убираем пробелы
            if( itemValue !== ''){ // проверка на пустую строку
                this.addIncome.push(itemValue); // добавляем в массив
            }
        }.bind(appData))
    },
    getExpensesMonth: function() {  // вычисление суммы обязательных расходов
        let sum = 0;
        for(let key in this.expenses) { // перебираем обяз расходы и складываем их
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum; // добавление суммы обязательных расходов 
    },
    getBudget: function() {  // вычисление накоплений
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; // вычисление бюджета на месяц
        this.budgetDay = Math.floor(this.budgetMonth / 30); // вычисление бюджета на день
    },
    getTargetMonth: function(){ // вычисление времени до цели
        let time = targetAmount.value / this.budgetMonth;
        return time;
    },
    getStatusIncome: function(budgetDay) { // определение уровня дохода по бюджету в день
        if(budgetDay > 1200) {
            return 'У вас высокий уровень дохода!';
        }else if(budgetDay > 600 && budgetDay < 1200) {
            return 'У вас средний уровень дохода!';
        }else if(budgetDay < 600 && budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего!';
        }else if(budgetDay < 0) {
            return 'Что то пошло не так!';
        }    
    },
    getInfoDeposit: function() {
        if(this.deposit) {
            do{
                this.percentDeposit = prompt('Какой годовой процент?');
            }while(!isNumber(this.percentDeposit));
            do{
                this.moneyDeposit = prompt('Какая сумма заложена?');
            }while(!isNumber(this.moneyDeposit));
            
        }
    },
    calcPeriod: function() { // подсчёт накоплений за период
        return this.budgetMonth * periodSelect.value;
    },
    toUpperCaseArr: function(value) {
        let i = 0; // счётчик для определения элемента в массиве и замене его
        value.forEach(element => {
            element = element[0].toUpperCase() + element.slice(1); // поднимаем в верхний регистр 1 элемент и соединяем с остальной строкой
            value[i] = element; //замена старого элемента на новый с верхним регистром
            i++; // переключаем счётчик на след элемент
        });
        return value; // возвращаем новый массив
    },
    selectValue: function() { // вывод числа под селектом
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.calcPeriod();
    },
    block: function(value) { //блокировка инпутов
        let data = document.querySelector('.data'); // найдём доступные нам поля
        let inputsOnDate = data.querySelectorAll('input'); // найдём доступные нам поля
        inputsOnDate.forEach(function(item) { // переберём их
            item.disabled = value; // деактивируем или активируем 
        });

        if(value === true) { // замена кнопки и удаление и добавление, кнопок добавления инпутов
            plusIncome.style.display = 'none'; 
            plusExpenses.style.display = 'none';
            start.style.display = 'none';
            cancel.style.display = 'inline-block';
        }else {
            plusIncome.style.display = 'inline-block';
            plusExpenses.style.display = 'inline-block';
            start.style.display = 'inline-block';
            cancel.style.display = 'none';
        }

    },
    reset: function() { // очистка форм и данных
        let inputs = document.querySelectorAll('input'); // поиск всех полей
        let incomeItems = document.querySelectorAll('.income-items'); // поиск доп доходов
        let incomeLength = incomeItems.length; // колл-во инпутов доп доходов
        for(let i = 1; i < incomeLength; i++) { // переберём их оставляя 0 элемент
            incomeItems[i].remove(); // удаляем лишние инпуты
        }
        if(incomeLength === 3){ // добавления плюса если он пропал
            plusIncome.style.display = 'inline-block';
        }

        expensesItems = document.querySelectorAll('.expenses-items'); //поиск обяз расходов
        let expensesLength = expensesItems.length; // колл-во инпутов обяз расходов
        for(let i = 1; i < expensesLength; i++) { // перебём их оставляя 0 элемент
            expensesItems[i].remove(); // удаляем лишние инпуты
        }

        if(expensesLength === 3){ // добавление плюса если он пропал
            plusExpenses.style.display = 'inline-block';
        }

        inputs.forEach(function(item) { // перебор всех инпутов
            if(item === periodSelect){ // если это селект то нужно присвоить начальную точку а именно 1
                item.value = '1';
                periodAmount.textContent = '1'; //текст под селектом 
            }else if (item === depositCheck) {
                depositCheckmark.innerHTML = '';
            }else{
                item.value = ''; // очищаем остальные инпуты
            }
            this.block(false); // активируем поля
        }.bind(appData));

        // очистка данных
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.amount = [];
        this.deposit = false;
        this.period = 1;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.budget = 0;
        this.accumulatedMonth = 0;
    }, 
    alphabet: function(str) { // функция проверки на русские символы
        let arrRu = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь','э', 'ю', 'я', ' ' , 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я', ',', '.', '?', '!', ';', ':'];
        str = str.split(''); // превращаем строку в массив
        let n = 0; // счётчик
        str.forEach(function(item) { // переберём массив со строкой
            for(let i = 0; i < arrRu.length; i++) { 
                if(item === arrRu[i]){ // если буква русская 
                    n += 1; // прибавляем счётчик
                    break; // заканчиваем с этим элементом
                }
            }
        })
        if(n === str.length) { // если колличество русских символов = длине строки
            return 1;
        }else{
            return 0;
        }
    },
    checkRu: function() { // проверка на руские символы определённых полей
        // находим поля
        let incomeTitles = document.querySelectorAll('input.income-title');
        let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
        let expensesTitle = document.querySelectorAll('input.expenses-title');
        let n = 0; // счётчик

        incomeTitles.forEach(function(item) { // перебор инпутов на тот случай если пользователь добавил доп поля
            if(this.alphabet(item.value)){ // проверяем на русские символы
                n += 1; // если они русские счётчик +1
            }
        }.bind(appData))

        if(n === incomeTitles.length){ // проверка если длина массива инпутов = счётчику, значит можем продолжать проверять поля 
            n = 0; // обнулим счётчик
            additionalIncomeItem.forEach(function(item){ // перебор инпутов на тот случай если пользователь добавил доп поля
                if(this.alphabet(item.value)){ // проверяем на русские символы
                    n += 1; // если они русские счётчик +1
                }
            }.bind(appData))
        }else{
            return; // если длина масива инпутов != счётчику завершаем функцию 
        }

        if(n === additionalIncomeItem.length){ // проверка если длина массива инпутов = счётчику, значит можем продолжать проверять поля 
            n = 0; // обнулим счётчик
            expensesTitle.forEach(function(item){ // перебор инпутов на тот случай если пользователь добавил доп поля
                if(this.alphabet(item.value)){ // проверяем на русские символы 
                    n += 1; // если они русские счётчик +1
                }
            }.bind(appData))
        }else{
            return;// если длина масива инпутов != счётчику завершаем функцию 
        }
        if(n === expensesTitle.length){ // проверка если длина массива инпутов = счётчику, значит можем выводит 1 
            return 1;
        }else {
            return;
        }
    },
    isNumber: function(n) { // проверка на то является ли это числом
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    checkNumber: function() {  // проверяем инпуты на числа
         // находим поля
        let incomeAmount = document.querySelectorAll('input.income-amount');
        let expensesAmount = document.querySelectorAll('input.expenses-amount');
        let salaryAmount = document.querySelectorAll('.salary-amount');
        let targetAmount = document.querySelectorAll('.target-amount');
        let n = 0; // счётчик

        salaryAmount.forEach(function(item) { // перебор инпутов на тот случай если пользователь добавил доп поля
            if(this.isNumber(item.value)){ // проверяем на то является ли это числом
                n += 1; // если это число счётчик +1
            }
        }.bind(appData))

        if(n === salaryAmount.length){ // проверка если длина массива инпутов = счётчику, значит можем продолжать проверять поля 
            n = 0; // обнулим счётчик
            incomeAmount.forEach(function(item){ // перебор инпутов на тот случай если пользователь добавил доп поля
                if(this.isNumber(item.value) || item.value === ''){ // проверяем на то является ли это числом
                    n += 1; // если это число счётчик +1
                }
            }.bind(appData))
        }else{
            return; // если длина масива инпутов != счётчику завершаем функцию 
        }

        if(n === incomeAmount.length){ // проверка если длина массива инпутов = счётчику, значит можем продолжать проверять поля 
            n = 0; // обнулим счётчик
            expensesAmount.forEach(function(item){ // перебор инпутов на тот случай если пользователь добавил доп поля
                if(this.isNumber(item.value) || item.value === ''){ // проверяем на то является ли это числом или это пустая строка
                    n += 1; // если это число счётчик +1
                }
            }.bind(appData))
        }else{
            return;// если длина масива инпутов != счётчику завершаем функцию 
        }

        if(n === expensesAmount.length){ // проверка если длина массива инпутов = счётчику, значит можем продолжать проверять поля 
            n = 0; // обнулим счётчик
            targetAmount.forEach(function(item){ // перебор инпутов на тот случай если пользователь добавил доп поля
                if(this.isNumber(item.value) || item.value === ''){ // проверяем на то является ли это числом или это пустая строка
                    n += 1; // если это число счётчик +1
                }
            }.bind(appData))
        }else{
            return;// если длина масива инпутов != счётчику завершаем функцию 
        }

        if(n === targetAmount.length){ // проверка если длина массива инпутов = счётчику, значит можем выводит 1 
            return 1;
        }else {
            return;
        }
    }

}

let startBind = appData.start.bind(appData);
let periodSelectBind = appData.selectValue.bind(appData);
let cancelBind = appData.reset.bind(appData);

start.addEventListener('click', startBind);
cancel.addEventListener('click', cancelBind);
plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', periodSelectBind);


