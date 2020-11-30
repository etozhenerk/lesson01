"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
  };
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 4,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {

    if(confirm('Есть ли у вас дополнительный иточник заработка?')){
      let itemIncome = prompt('Какой у вас есть дополнительный зароботок?', 'Таксую');
      if (isNumber(itemIncome.trim()) || itemIncome.trim() === "") {
        while (isNumber(itemIncome.trim()) || itemIncome.trim() === "") {
          itemIncome = prompt('Какой у вас есть дополнительный зароботок?', 'Таксую');
        }
      }
      let cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', 10000);
      if (!isNumber(cashIncome)) {
        while (!isNumber(cashIncome)) {
          cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', 10000);
        }
      }
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      "Квартплата, проездной, кредит"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    let question;
    let expens;
    for (let i = 0; i < 2; i++) {
      expens = prompt("Введите обязательную статью расходов?");
      if (isNumber(expens.trim()) || expens.trim() === "") {
        while (isNumber(expens.trim()) || expens.trim() === "") {
          expens = prompt("Введите обязательную статью расходов?");
        }
      }
      question = +prompt("Во сколько это обойдется?");
      if (!isNumber(question)) {
        while (!isNumber(question)) {
          question = +prompt("Во сколько это обойдется?");
        }
      }
      appData.expenses[expens] = question;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    let n = Math.ceil(appData.mission / appData.budgetMonth);
    if (n > 0) {
      return `Цель будет достигнута за ${n} месяцев`;
    } else {
      return `Цель не будет достигнута`;
    }
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (appData.budgetDay < 0) {
      return "Что то пошло не так";
    }
  },
  getInfoDeposit: function (){
    if(appData.deposit){
      appData.persentDeposit = +prompt('Какой годовой процент?', 10);
      if (!isNumber(appData.persentDeposit)) {
        while (!isNumber(appData.persentDeposit)) {
          appData.persentDeposit = +prompt('Какой годовой процент?', 10);
        }
      }
      appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
      if (!isNumber(appData.moneyDeposit)) {
        while (!isNumber(appData.moneyDeposit)) {
          appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
        }
      }
    }
  },
  culcSavedMoney: function (){
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(`Расходы на месяц: ${appData.addExpenses}`);
console.log(`Бюджет на месяц ${appData.budgetMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя данные:");
for (let key in appData) {
  console.log("Ключ: " + key + " значение: " + appData[key]);
}

let expenses = '';
appData.addExpenses.forEach(function(item,i, arr){
  expenses += item[0].toUpperCase() + item.slice(1);
  if(i !== (arr.length - 1)){
    expenses += ', ';
  }
});
console.log(expenses);