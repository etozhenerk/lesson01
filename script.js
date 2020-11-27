"use strict";

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = "фриланс",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую",
    "Квартплата, проездной, кредит"
  ),
  expenses = [],
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 130000,
  period = 4;

let start = function(){
  do{
    money = prompt("Ваш месячный доход?");
  }while(!isNumber(money));
};

start();

function showTypeOf(data) {
  console.log(data, typeof data);
}
function getExpensesMonth() {
  let sum = 0;
  let question;
  
  for(let i = 0; i < 2; i++){
    expenses[i] = prompt("Введите обязательную статью расходов?", "Квартплата");
    question = prompt("Во сколько это обойдется?", 1000);
    if(!isNumber(question)){
      while(!isNumber(question)){
        question = prompt("Во сколько это обойдется?", 1000);
      }
    }
    sum += +question;
  }

  console.log(sum);
  return sum;
}
let expensesAmount = getExpensesMonth();
function getAccumulatedMonth() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth(),
  budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth() {
  let n = Math.ceil(mission / accumulatedMonth);
  if(n > 0){
    return `Цель будет достигнута за ${n} месяцев`;
  }else{
    return `Цель не будет достигнута`;
  }
  
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
console.log(getTargetMonth());
console.log(`Бюджет на день ${budgetDay}`);

function getStatusIncome() {
  if (budgetDay >= 1200) {
    return ("У вас высокий уровень дохода");
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ("У вас средний уровень дохода");
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return ("К сожалению у вас уровень дохода ниже среднего");
  } else if (budgetDay < 0) {
    return ("Что то пошло не так");
  }
}

console.log(getStatusIncome());
