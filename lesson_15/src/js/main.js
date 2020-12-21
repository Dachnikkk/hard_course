'use strict';

const start = document.getElementById('start'); // кнопка рассчитать
const cancel = document.getElementById('cancel'); // кнопка сбросить
const plusIncome = document.getElementsByTagName('button')[0]; // кнопка плюс у доп дохода
const plusExpenses = document.getElementsByTagName('button')[1]; // кнопка плюс добавление обяз расхода
const checkBox = document.getElementById('deposit-check'); // чекбокс депозита
const incomeValue = document.querySelectorAll('.additional_income-item'); // коллекция возможных доходов
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0]; // дневной бюджет
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0]; //расходы за месяц
const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // возможные доходы
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; // возможные расходы
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; // накопления за период
const targetMonthValue = document.getElementsByClassName('target_month-value')[0]; // срок достижения цели
const salaryAmount = document.querySelector('.salary-amount'); // месячный доход
let incomeItems = document.querySelectorAll('.income-items'); // блок где хратнятся поля ввода доп дохода
const incomeTitle = document.querySelector('input.income-title'); // тайтл доп дохода
const incomeAmount = document.querySelector('.income-amount'); // значение доп дохода
let expensesItems = document.querySelectorAll('.expenses-items'); // итемы обяз дохода
const expensesTitle = document.querySelector('.expenses-title');// тайтл обяз дохода
const expensesAmount = document.querySelector('.expenses-amount'); // значение обяз дохода
const additionalExpensesItem = document.querySelector('.additional_expenses-item'); // поле вывода возможных расходов
const depositBank = document.querySelector('.deposit-bank'); // селект депозита
const depositAmount = document.querySelector('.deposit-amount'); //сумма депозита
const depositPercent = document.querySelector('.deposit-percent'); // процент депозита
const targetAmount = document.querySelector('.target-amount'); // цель 
const periodSelect = document.querySelector('.period-select'); // выбор периода
const periodAmount = document.querySelector('.period-amount'); // значение периода
const budgetMonthValue = document.querySelector('.budget_month-value'); // доход за месяц
const depositCheckmark = document.querySelectorAll('.deposit-checkmark');

class AppData {
    constructor() {
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
    }

    start() {
        if(salaryAmount.value === '') { // проверка на ввод месячного дохода
            start.removeEventListener('click', this.start);
            return;
        }
        this.budget = +salaryAmount.value; // записываем месячный доход в переменную
        this.getExpInc();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpInc();
        this.getInfoDeposit();
        if(this.isNumber(this.percentDeposit) && this.percentDeposit < 100 && this.percentDeposit > 0) { // проверка процента на диапазон от 0 до 100 и на то что является это числом
            this.moneyDeposit = depositAmount.value; // запишем сумму депозита
        }else if(this.deposit) { // если депозит есть и у него некорректный ввод
            alert('Введите корректное значение в поле проценты'); 
            depositPercent.value = '';
            return;
        }
        this.getBudget();
        this.showResult();
        this.block(true);
    };

    showResult() { // выводы в подходящие инпуты
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    };

    addExpInc(e) {// добавление по плюсу  дополнительных доходов или обязательных

        const input = e.target.classList[1].split('_')[0]; // найдём какой это инпут обязательных расходов или доп доходов
        let items = document.querySelectorAll(`.${input}-items`); // колличество полей
        const cloneItem = items[0].cloneNode(true); // клонируем поля

        items[0].parentNode.insertBefore(cloneItem, e.target);// вставляем новые поля 

        items = document.querySelectorAll(`.${input}-items`); // колличество полей
        if(items.length === 3) { // проверка на поля
            e.target.style.display = 'none';
        }
    }

    getExpInc() { // запись доп доходов и обяз расходов в объект
        const count = item => {
            const startStr = item.className.split('-')[0]; // получаем значение доп доходы или обяз расходы
            const itemTitle = item.querySelector(`.${startStr}-title`).value; // получаем value из тайтла
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;// получаем value из значений
            if(itemTitle !== '' && itemAmount !== '') { // проверка на пустые строки
                this[startStr][itemTitle] = itemAmount; // запись в объект
            }
        }

        incomeItems.forEach(count);
        expensesItems.forEach(count);
    }

    getAddExpInc() { // добавление в массив возможных доходов и возможных расходов
        const pushOnArr = (item, arr) => {
            if( item !== ''){ // проверка на пустую строку
                arr.push(item); // добавляем в массив
            }
        }

        additionalIncomeItem.forEach((item) => {  // перебор
            let itemValue = item.value.trim(); // убираем пробелы
            pushOnArr(itemValue, this.addIncome)
        })

        const addExpenses = additionalExpensesItem.value.split(',');  // собираем из value в массив
        addExpenses.forEach((item) => { //перебор
            item = item.trim(); // убираем пробелы 
            pushOnArr(item, this.addExpenses);
        })
    }

    getExpensesMonth() {  // вычисление суммы обязательных расходов
        let sum = 0;
        for(let key in this.expenses) { // перебираем обяз расходы и складываем их
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum; // добавление суммы обязательных расходов 
    };

    getIncomeMonth() {  // вычисление суммы доп доходов
        let sum = 0;
        for(let key in this.income) { // перебираем доп доходы и складываем их
            sum += +this.income[key];
        }
        this.incomeMonth = sum; // добавление суммы доп доходов
    };

    getBudget() {  // вычисление накоплений
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit; //вычисление бюджета на месяц
        this.budgetDay = Math.floor(this.budgetMonth / 30); // вычисление бюджета на день
    };

    getTargetMonth(){ // вычисление времени до цели
        const time = targetAmount.value / this.budgetMonth;
        return time;
    };

    getStatusIncome(budgetDay) { // определение уровня дохода по бюджету в день
        if(budgetDay > 1200) {
            return 'У вас высокий уровень дохода!';
        }else if(budgetDay > 600 && budgetDay < 1200) {
            return 'У вас средний уровень дохода!';
        }else if(budgetDay < 600 && budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего!';
        }else if(budgetDay < 0) {
            return 'Что то пошло не так!';
        }    
    };

    calcPeriod() { // подсчёт накоплений за период
        return this.budgetMonth * periodSelect.value;
    };

    toUpperCaseArr(value) {
        let i = 0; // счётчик для определения элемента в массиве и замене его
        value.forEach((element) => {
            element = element[0].toUpperCase() + element.slice(1); // поднимаем в верхний регистр 1 элемент и соединяем с остальной строкой
            value[i] = element; //замена старого элемента на новый с верхним регистром
            i++; // переключаем счётчик на след элемент
        });
        return value; // возвращаем новый массив
    };

    selectValue() { // вывод числа под селектом
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.calcPeriod();
    };

    block(value) { //блокировка инпутов
        const data = document.querySelector('.data'); // найдём доступные нам поля
        const inputsOnDate = data.querySelectorAll('input'); // найдём доступные нам поля
        inputsOnDate.forEach((item) => { // переберём их
            if(item === periodSelect){ // пропускаем селект
            }else{
                item.disabled = value; // деактивируем или активируем 
            }
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

    };

    reset() { // очистка форм и данных
        const inputs = document.querySelectorAll('input'); // поиск всех полей
        const incomeItems = document.querySelectorAll('.income-items'); // поиск доп доходов
        const incomeLength = incomeItems.length; // колл-во инпутов доп доходов
        for(let i = 1; i < incomeLength; i++) { // переберём их оставляя 0 элемент
            incomeItems[i].remove(); // удаляем лишние инпуты
        }
        if(incomeLength === 3){ // добавления плюса если он пропал
            plusIncome.style.display = 'inline-block';
        }

        expensesItems = document.querySelectorAll('.expenses-items'); //поиск обяз расходов
        const expensesLength = expensesItems.length; // колл-во инпутов обяз расходов
        for(let i = 1; i < expensesLength; i++) { // перебём их оставляя 0 элемент
            expensesItems[i].remove(); // удаляем лишние инпуты
        }

        if(expensesLength === 3){ // добавление плюса если он пропал
            plusExpenses.style.display = 'inline-block';
        }

        inputs.forEach((item) => { // перебор всех инпутов
            if(item === periodSelect){ // если это селект то нужно присвоить начальную точку а именно 1
                item.value = '1';
                periodAmount.textContent = '1'; //текст под селектом 
            }else{
                item.value = ''; // очищаем остальные инпуты
            }
            this.block(false); // активируем поля
        });
        // зачистка депозита
        checkBox.checked = false;
        depositBank.style.display = 'none';  // убираем элемент
        depositAmount.style.display = 'none'; // убираем элемент
        depositPercent.style.display = 'none'; // убираем элемент
        depositAmount.value = ''; // очистка инпутов
        depositBank.value = '';// очистка инпутов
        this.deposit = false; // указываем что депозита нет
        depositBank.removeEventListener('change', this.changePercent);
        
        this.resetData();
    };

    resetData() {
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
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    getInfoDeposit() { // если депозит существует
        if(this.deposit) {
            this.percentDeposit = depositPercent.value; // запишем процент
            this.moneyDeposit = depositAmount.value; // запишем сумму
        }
    };

    changePercent() { // проверка выбора банка
        const valueSelect = this.value; // какой селект выбран в поле с банками
        if(valueSelect === 'other') { // если другой
            depositPercent.style.display = 'inline-block'; // открываем инпут проценты
        }else {
            depositPercent.value = valueSelect; // записываем процент выбранного банка
            depositPercent.style.display = 'none'; // скрываем инпут проценты при перевыборе банка
        }
        
    }

    depositHandler() { 
        if(checkBox.checked) { // если чекбокс выбран
            depositBank.style.display = 'inline-block'; //открываем элемент
            depositAmount.style.display = 'inline-block'; //открываем элемент
            this.deposit = true; // подтверждаем то что есть депозит
            depositBank.addEventListener('change', this.changePercent); // обработчик событий для выбора банка(для поиска процента)
        }else { // если чекбокс не выбран
            depositBank.style.display = 'none';  // убираем элемент
            depositAmount.style.display = 'none'; // убираем элемент
            depositAmount.value = ''; // очистка инпутов
            depositBank.value = '';// очистка инпутов
            this.deposit = false; // указываем что депозита нет
            depositBank.removeEventListener('change', this.changePercent); // удаляем обработчик событий
        }
    }

    eventsListeners() {
        const startBind = this.start.bind(this);
        const periodSelectBind = this.selectValue.bind(this);
        const cancelBind = this.reset.bind(this);
        const depositHandlerBind = this.depositHandler.bind(this);

        start.addEventListener('click', startBind);
        cancel.addEventListener('click', cancelBind);
        plusExpenses.addEventListener('click', this.addExpInc);
        plusIncome.addEventListener('click', this.addExpInc);
        periodSelect.addEventListener('input', periodSelectBind);
        checkBox.addEventListener('change', depositHandlerBind);
    };

};

const appData = new AppData();
appData.eventsListeners();



