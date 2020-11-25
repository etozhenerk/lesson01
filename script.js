let money = 60000,
  income = 'фриланс',
  addExpenses = 'Интернет, Такси, Коммуналка',
  deposit = true,
  mission = 130000,
  period = 4;

console.log('type of "money": ', typeof money);
console.log('type of "income": ', typeof income);
console.log('typeo f "deposit": ', typeof deposit);

console.log('length of "addExpenses": ', addExpenses.length);

console.log(`Период равен ${period} месяца`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase().split(', ');
console.log('addExpenses: ', addExpenses);

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);
