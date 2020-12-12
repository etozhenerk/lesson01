'use strict';

const data = document.querySelector('.data');
const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const depositСheck = document.querySelector('#deposit-check');
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
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItem = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');



class AppData  {  
  constructor(){
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
  }
    
  isNumber(n) {
  return ;
}
  start() {
   
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

  this.getExpInc();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getInfoDeposit();
  this.getBudget();
  
  this.showResult();
  }
  reset() {
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
  
  }
  showResult() {  
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
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItem = document.querySelectorAll('.income-items');
    if(incomeItem.length === 3){
      incomePlus.style.display = 'none';
    }
  }
  getExpInc () {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if(itemTitle !== '' && itemAmount !=='' ){
        this[startStr][itemTitle] = itemAmount;
      }
    };
  
    incomeItem.forEach(count);
  
    expensesItems.forEach(count);
  
    for (let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses () {
    const _this = this;
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item){
      item = item.trim();
      if(item !== ''){
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome () {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {

    const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100);
    this.budgetMonth = this.budget +this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  
  }
  getInfoDeposit () {
    if(this.deposit){
      this.persentDeposit = +depositPercent.value;
      this.moneyDeposit = +depositAmount.value;
    }
  }
  culcSavedMoney (){
    return this.budgetMonth * periodSelect.value;
  }
  changePersent (){
    const valueSelect = this.value;
    if(valueSelect === 'other'){
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('blur', function(){
        if(depositPercent.value < 0 || depositPercent.value > 100 || isNaN(depositPercent.value)){
          depositPercent.value = 0;
        }
      });
    }else{
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }
  depositHandler (){
    if(depositСheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePersent);
    }else{
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePersent);
    }
  }
  eventsListeners () {  
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    salaryAmount.addEventListener('blur', function () {  
      start.disabled = false;
    });
    periodSelect.addEventListener('input', function () {  
      periodAmount.textContent = periodSelect.value;
    });

    depositСheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.eventsListeners();


