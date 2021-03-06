'use strict';


const startMoney = document.getElementById('start'),
cancelBtn = document.getElementById('cancel'),
button0 = document.getElementsByTagName('button')[0],
button1 = document.getElementsByTagName('button')[1],
additionalIncomeItem = document.querySelector('.additional_income-item'),
budgetDayValue = document.querySelectorAll('.result-total')[1],
expensesMonthValue = document.querySelectorAll('.result-total')[2],
additionalIncomeValue = document.querySelectorAll('.result-total')[3],
additionalExpensesValue = document.querySelectorAll('.result-total')[4],
targetMonthValue = document.querySelectorAll('.result-total')[6],
salaryAmount = document.querySelector('.salary-amount'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
budgetMonthValue = document.querySelector('.budget_month-value');
let incomeItems = document.querySelectorAll('.income-items'),
expensesItems = document.querySelectorAll('.expenses-items'),
incomePeriodValue = document.querySelectorAll('.result-total')[5],
depositBank = document.querySelector('.deposit-bank'),
depositCheck = document.querySelector('#deposit-check'),
inputArr = document.querySelectorAll('input');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData;

class AppData {
    constructor(){
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
    this.getInfoDeposit();
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
            if(incomeTitle !== '' && incomeAmount !== ''){
                appData.income[incomeTitle] = incomeAmount;
            }
        });
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
    console.log(`???????????????????????????? ??????????????????: ${this.expensesMonth}`);
    }
    getExpensesMonth(obj){
        let amountOfExpenses = 0;

        for (let key in obj) {
        amountOfExpenses += +obj[key];
        };

        this.expensesMonth = amountOfExpenses;
        console.log(`?????????????? ???? ??????????: ${this.expensesMonth}`);
    }
    getBudget(){
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth + monthDeposit);
        this.budgetDay = Math.ceil(this.budgetMonth/ 30);
    }
    getTargetMonth(){
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome(){
        if (this.budgetDay < 300) {
            console.log('???????????? ?????????????? ????????????');
        } else if (this.budgetDay <= 800) {
            console.log('?????????????? ?????????????? ????????????');
        } else {
            console.log('?????????????? ?????????????? ????????????');
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
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventsListeners(){
        startMoney.addEventListener('click' , function() {
            let incomeTitles = document.querySelectorAll('.income-title'),
            incomeAmount = document.querySelectorAll('.income-amount'),
            expensesTitles = document.querySelectorAll('.expenses-title'),
            expensesAmount = document.querySelectorAll('.expenses-amount');

            
            inputArr = document.querySelectorAll('input');
            console.log(inputArr);
            
            if (!isNumber(salaryAmount.value) || salaryAmount.value === '') {
                startMoney.disabled = true;
                return true;
            
            } else {

                if(depositBank.value === 'other'){  
                    const value = +depositPercent.value;
                    if(value > 0 && value < 100){
                        depositPercent.value = value;
                        
                    console.log(depositPercent.value);
                    }else { 
                        startMoney.disabled = true;
                        alert('?????????????? ???????????????????? ???????????????? ?? ???????? ????????????????');
                        return;
                    }
                } else {
                    startMoney.disabled = false;
                }
                
                startMoney.disabled = false;
                appData.startMoney();
                document.getElementById('start').hidden = true;
                cancelBtn.style.display = 'block';
            };

            

        
            inputArr.forEach(function(item, i){
                if (i < 20) {
                    item.disabled = true;
                }
        
            });
            periodSelect.disabled = false;
            appData.valuePeriodAmount();
            
        });
        
        cancelBtn.addEventListener('click', function(){

            let incomeTitles = document.querySelectorAll('.income-title'),
            incomeAmount = document.querySelectorAll('.income-amount'),
            expensesTitles = document.querySelectorAll('.expenses-title'),
            expensesAmount = document.querySelectorAll('.expenses-amount');

            inputArr.forEach(function(item, i){
                
                item.disabled = false;
                inputArr[i].value = '';

            });
            incomeTitles.forEach(function(item, i){

                if(i > 1) {
                    item.remove();
                }

            });
            incomeAmount.forEach(function(item, i){

                if(i > 0) {
                    item.remove();
                }

            });
            expensesTitles.forEach(function(item, i){

                if(i > 1) {
                    item.remove();
                }

            });
            expensesAmount.forEach(function(item, i){

                if(i > 0) {
                    item.remove();
                }

            });

            startMoney.disabled = false;
            depositPercent.style.display = 'none';
            periodSelect.value = periodSelect.min;
            periodAmount.innerHTML = periodSelect.value;
            document.getElementById('start').hidden = false;
            cancelBtn.style.display = 'none';
            incomePeriodValue.value = 0;
            button0.style.display = 'inline-block';
            button1.style.display = 'inline-block';
        });
        
        button1.addEventListener('click', appData.addExpensesBlock);
        button0.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('mousemove', appData.valuePeriodAmount);

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        salaryAmount.addEventListener('click', function(){
            startMoney.disabled = false;
        });
    
    }
};
 appData = new AppData();

appData.eventsListeners();



