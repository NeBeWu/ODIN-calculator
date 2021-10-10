let firstNumber = '';
let secondNumber = '';
let operator = '';

const currentDisplay = document.querySelector('.current-display');
const pastDisplay = document.querySelector('.past-display');
const numberButton = document.querySelectorAll('.number-button');
const operatorButton = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const decimalButton = document.querySelector('.decimal-button');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');

function updateCurrentDisplay() {
  currentDisplay.textContent = firstNumber + operator + secondNumber;
}

function updatePastDisplay(value) {
  const content = document.createElement('p');

  content.textContent = firstNumber + operator + secondNumber + `=${value}`;
  content.style.marginRight = '5vw';

  pastDisplay.prepend(content);
}

function updateFirstNumber(value) {
  firstNumber += value;
  updateCurrentDisplay();
}

function updateSecondNumber(value) {
  secondNumber += value;
  updateCurrentDisplay();
}

function updateOperator(value) {
  operator = value;
  updateCurrentDisplay();
}

function resetCurrentVariables() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
}

numberButton.forEach((currentValue) => {
  currentValue.addEventListener('click', () => {
    if (operator == '') {
      updateFirstNumber(currentValue.textContent);
    } else {
      updateSecondNumber(currentValue.textContent);
    }
  });
});

operatorButton.forEach((currentValue) => {
  currentValue.addEventListener('click', () => {
    if (firstNumber != '' && secondNumber == '') {
      updateOperator(currentValue.textContent);
    }
  });
});

equalsButton.addEventListener('click', () => {
  const value = operate(operator, firstNumber, secondNumber);
  updatePastDisplay(value);
  resetCurrentVariables();
  updateFirstNumber(`${value}`);
});

function operate(operator, number1, number2) {
  number1 = Number(number1);
  number2 = Number(number2);

  switch (operator) {
    case '+':
      return add(number1, number2);
    case '−':
      return subtract(number1, number2);
    case '×':
      return multiply(number1, number2);
    case '÷':
      return divide(number1, number2);
    default:
      return null;
  }
}

function add(number1, number2) {
  return approximate(number1 + number2);
}

function subtract(number1, number2) {
  return approximate(number1 - number2);
}

function multiply(number1, number2) {
  return approximate(number1 * number2);
}

function divide(number1, number2) {
  return approximate(number1 / number2);
}

function approximate(number) {
  return Math.trunc(10000000000 * number) / 10000000000;
}
