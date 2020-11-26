"use strict";

let money = +prompt("Ваш месячный доход?", 50000),
  income = "фриланс",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую",
    "Квартплата, проездной, кредит"
  ),
  expenses1 = prompt("Введите обязательную статью расходов?", "Квартплата"),
  amount1 = +prompt("Во сколько это обойдется?", 5000),
  expenses2 = prompt("Введите обязательную статью расходов?", "проездной"),
  amount2 = +prompt("Во сколько это обойдется?", 1000),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 130000,
  period = 4;

function showTypeOf(data) {
  console.log(data, typeof data);
}
function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}
function getAccumulatedMonth(money, amount1, amount2) {
  return money - amount1 - amount2;
}

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2),
  budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth(mission, budgetMonth) {
  return Math.ceil(mission / budgetMonth);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('length of "addExpenses": ', addExpenses.length);
console.log(`Период равен ${period} месяца`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase().split(", ");
console.log("addExpenses: ", addExpenses);
console.log(`Бюджет на месяц ${accumulatedMonth}`);
console.log(`Цель будет достигнута за ${getTargetMonth(mission,accumulatedMonth)} месяцев`);
console.log(`Бюджет на день ${budgetDay}`);

function getStatusIncome() {
  if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log("У вас средний уровень дохода");
  } else if (budgetDay >= 0 && budgetDay < 600) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
  } else if (budgetDay < 0) {
    console.log("Что то пошло не так");
  }
}

getStatusIncome();
