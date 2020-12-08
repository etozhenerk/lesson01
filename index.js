'use strict';

const data = document.querySelector('.data');
const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const checkbox = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayhValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-items .income-title');
const expensesTitle = document.querySelector('.expenses-items .expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItem = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');



const AppData = function () {  
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};
AppData.prototype.isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
AppData.prototype.start =  function () {
   
  if(salaryAmount.value === ''){
    start.disabled = true;
    return;
  }
  this.budget = +salaryAmount.value;

  const inputs = data.querySelectorAll('input[type=text]');
  inputs.forEach(function (item) {  
    item.disabled = true;
  });
  cancel.style.display = 'block';
  start.style.display = 'none';

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();

  
};

AppData.prototype.reset = function(){
  const inputsAll = document.querySelectorAll('input[type=text]');
  inputsAll.forEach(function (item) {  
    item.value = '';
  });
  periodSelect.value = '1';
  periodAmount.textContent = periodSelect.value;
  const inputs = data.querySelectorAll('input[type=text]');
  inputs.forEach(function (item) {  
  item.disabled = false;
});
start.style.display = '';

cancel.style.display = 'none';

};

AppData.prototype.showResult = function () {  
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayhValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.culcSavedMoney();
  periodSelect.addEventListener('input', function () {  
    incomePeriodValue.value = _this.culcSavedMoney();
  });

};

AppData.prototype.addExpensesBlock = function(){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function(){
  let cloneIncomeItem = incomeItem[0].cloneNode(true);
  incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItem = document.querySelectorAll('.income-items');
  if(incomeItem.length === 3){
    incomePlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function(){
  const _this = this;
  expensesItems.forEach(function (item) {  
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = +item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !=='' ){
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {  
  const _this = this;
  incomeItem.forEach(function (item) {  
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = +item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !=='' ){
      _this.income[itemIncome] = cashIncome;
    }
  });

  for (let key in this.income){
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function (item){
    item = item.trim();
    if(item !== ''){
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function() {
  const _this = this;
  additionalIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if(itemValue !== ''){
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += this.expenses[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget +this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);

};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else if (this.budgetDay < 0) {
    return "Что то пошло не так";
  }
};
AppData.prototype.getInfoDeposit = function (){
  if(this.deposit){
    this.persentDeposit = +prompt('Какой годовой процент?', 10);
    if (!this.isNumber(this.persentDeposit)) {
      while (!this.isNumber(this.persentDeposit)) {
        this.persentDeposit = +prompt('Какой годовой процент?', 10);
      }
    }
    this.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
    if (!this.isNumber(this.moneyDeposit)) {
      while (!this.isNumber(this.moneyDeposit)) {
        this.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
      }
    }
  }
};
AppData.prototype.culcSavedMoney = function (){
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventsListeners = function () {  
  const _this = this;
  expensesPlus.addEventListener('click', _this.addExpensesBlock);
  incomePlus.addEventListener('click', _this.addIncomeBlock);
  start.addEventListener('click', _this.start.bind(_this));
  cancel.addEventListener('click', _this.reset);
  salaryAmount.addEventListener('blur', function () {  
    start.disabled = false;
  });
  periodSelect.addEventListener('input', function () {  
    periodAmount.textContent = periodSelect.value;
  });
};
const appData = new AppData();
appData.eventsListeners();





