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
  mission: 50000,
  period: 4,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
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
      if (isNumber(expens) || expens === "") {
        while (isNumber(expens) || expens === "") {
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
