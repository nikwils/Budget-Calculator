'use strict';


const startMoney = document.getElementById('start'),
cancelBtn = document.getElementById('cancel'),
button0 = document.getElementsByTagName('button')[0],
button1 = document.getElementsByTagName('button')[1],
depositCheck = document.querySelector('#deposit-check'),
additionalIncomeItem = document.querySelector('.additional_income-item'),
budgetDayValue = document.querySelectorAll('.result-total')[1],
expensesMonthValue = document.querySelectorAll('.result-total')[2],
additionalIncomeValue = document.querySelectorAll('.result-total')[3],
additionalExpensesValue = document.querySelectorAll('.result-total')[4],
targetMonthValue = document.querySelectorAll('.result-total')[6],
salaryAmount = document.querySelector('.salary-amount'),
incomeTitle = document.querySelector('.income-title'),
expensesTitle = document.querySelector('.expenses-title'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
depositBank = document.querySelector('.deposit-bank'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
budgetMonthValue = document.querySelector('.budget_month-value'),
inputArr = document.querySelectorAll('input');
let incomeItems = document.querySelectorAll('.income-items'),
expensesItems = document.querySelectorAll('.expenses-items'),
incomePeriodValue = document.querySelectorAll('.result-total')[5];


const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData;

class AppData {
    constructor(budget, budgetDay, budgetMonth, expensesMonth, income, incomeMonth, addIncome, expenses, addExpenses, deposit, percentDeposit, moneyDeposit){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income ={};
    this.incomeMonth = 0;
    this.addIncome =[];
    this.expenses ={};
    this.addExpenses =[];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    }
    startMoney() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth(this.expenses);
    this.getIncomeMonth(this.income);

    this.getAddExpenses();
    this.getAddIncome();

    this.valuePeriodAmount();
    this.getInfoDeposit()
    this.getBudget();
    this.showResult();
    this.calcSavedMoney();
    }
    showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    }
    addExpensesBlock(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, button1);
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if(expensesItems.length === 3) {
        button1.style.display = 'none';
        }
    }
    getExpenses(){
        const _this = this;

        expensesItems.forEach(function(item) {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== '' ){
            _this.expenses[itemExpenses] = cashExpenses;
        }
        });
    }
    addIncomeBlock(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, button0);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3) {
        button0.style.display = 'none';
        }
    }
    getIncome(){
        incomeItems.forEach(function(item) {
            const incomeTitle = item.querySelector('.income-title').value;
            const incomeAmount = item.querySelector('.income-amount').value;
            if(incomeTitle !== '' && incomeAmount !== '' ){
                appData.income[incomeTitle] = incomeAmount;
            }
        });
        console.log(this.income);
    }
    getAddExpenses(){
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
        }); 
    }
    getAddIncome(){
        const _this = this;
        let addIncome = additionalIncomeItem.value.split(', ');
        addIncome.forEach(function(item){
        item = item.trim();
        if (item !== ''){
            _this.addIncome.push(item);
        }
        });
    }
    getIncomeMonth(obj){
        let amountOfIncome = 0;
    for (let key in obj) {
        amountOfIncome += +obj[key];
    }
    this.incomeMonth = amountOfIncome;
    console.log(`Дополнительный заработок: ${this.expensesMonth}`);
    }
    getExpensesMonth(obj){
        let amountOfExpenses = 0;

        for (let key in obj) {
        amountOfExpenses += +obj[key];
        };

        this.expensesMonth = amountOfExpenses;
        console.log(`Расходы за месяц: ${this.expensesMonth}`);
    }
    getBudget(){
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth/ 30);
    }
    getTargetMonth(){
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome(){
        if (this.budgetDay < 300) {
            console.log('Низкий уровень дохода');
        } else if (this.budgetDay <= 800) {
            console.log('Средний уровень дохода');
        } else {
            console.log('Высокий уровень дохода');
        }
    }
    calcSavedMoney(){
        return this.budgetMonth * periodSelect.value;
    }
    valuePeriodAmount(){
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.value = appData.calcSavedMoney();
        if (!isNumber(incomePeriodValue.value)){
        incomePeriodValue.value = 0;
        }
    }
    getInfoDeposit(){
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
         }
    }
    valuePercent(){

    }
    changePercent(){
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
        }
    }
    depositHandler(){
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent)
        }
    }
    eventsListeners(){
        startMoney.addEventListener('click' , function() {
            if (!isNumber(salaryAmount.value) || salaryAmount.value === '') {
                startMoney.disabled = true;
                return;
            
            } else {
                 startMoney.disabled = false;
                appData.startMoney();
                document.getElementById('start').hidden = true;
                cancelBtn.style.display = 'block';
            }
        
            inputArr.forEach(function(item, i){
                if (i < 12) {
                    item.disabled = true;
                }
        
            });

            if(this.valueSelect === 'other'){  
                depositPercent.value = +depositPercent.value;
                if (!isNumber(depositPercent.value) || salaryAmount.value === '') {
                    alert('Введите корректное значение в поле проценты');
                    startMoney.disabled = true;
                    return;
                } 
            }else if(depositPercent.value < 100 && depositPercent.value > 0){
                    depositPercent.value = depositPercent.value;
            } else { alert('Введите корректное значение в поле проценты');
                    startMoney.disabled = true;
                    return;
            }
        
    
        });
        
        cancelBtn.addEventListener('click', function(){
            inputArr.forEach(function(item, i){
                if (i> -1) {
                    item.disabled = false;
                    item.value = '';
                }
        
            });
            inputArr[12].value = 1;
            periodAmount.innerHTML = periodSelect.value;
            document.getElementById('start').hidden = false;
            cancelBtn.style.display = 'none';
            incomePeriodValue.value = 0;
        });
        
        button1.addEventListener('click', appData.addExpensesBlock);
        button0.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('mousemove', appData.valuePeriodAmount);

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    
    }
};
 appData = new AppData();

appData.eventsListeners();


