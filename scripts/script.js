//Global variables to keep track of the current computation
let firstNumber = '';
let secondNumber = '';
let operator = '';
let operationResult = '';
let divideByZero = 0;

//Global constants that store the main nodes
const currentDisplay = document.querySelector('.current-display');
const pastDisplay = document.querySelector('.past-display');
const numberButton = document.querySelectorAll('.number-button');
const operatorButton = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const decimalButton = document.querySelector('.decimal-button');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');

//Functions to update the display
function updateCurrentDisplay() {
  currentDisplay.textContent = firstNumber + operator + secondNumber;
}

function updatePastDisplay(value) {
  const content = document.createElement('p');

  content.textContent = firstNumber + operator + secondNumber + `=${value}`;
  content.style.marginRight = '5vw';

  pastDisplay.prepend(content);
}

function resetPastDisplay() {
  while (pastDisplay.firstChild) {
    pastDisplay.removeChild(pastDisplay.lastChild);
  }
}

//Functions that change the global variables and execute other
//functions when these change
function updateFirstNumber(value) {
  firstNumber = value;
  updateCurrentDisplay();
}

function updateSecondNumber(value) {
  secondNumber = value;
  updateCurrentDisplay();
}

function updateOperator(value) {
  operator = value;
  updateCurrentDisplay();
}

function appendFirstNumber(appendValue) {
  updateFirstNumber(firstNumber + appendValue);
}

function appendSecondNumber(appendValue) {
  updateSecondNumber(secondNumber + appendValue);
}

function resetCurrentVariables() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
}

//Function responsible to operate the current expression,
//change the display and reset global variables
function equalsTo() {
  if (firstNumber == '' || (operator != '!' && secondNumber == '')) {
  } else if (operator == '÷' && secondNumber == '0') {
    return alert('Watch out! You are trying to divide a number by 0.');
  } else {
    operationResult = operate(operator, firstNumber, secondNumber);
    updatePastDisplay(operationResult);
    resetCurrentVariables();
    if (operationResult == 'Undefined') {
      updateFirstNumber('');
    } else {
      updateFirstNumber(`${operationResult}`);
    }
  }
}

//EventListener assignment for each button
numberButton.forEach((currentValue) => {
  currentValue.addEventListener('click', () => {
    if (operator == '') {
      appendFirstNumber(currentValue.textContent);
    } else if (operator == '!') {
    } else {
      appendSecondNumber(currentValue.textContent);
    }
  });
});

operatorButton.forEach((currentValue) => {
  currentValue.addEventListener('click', () => {
    if (firstNumber != '' && secondNumber == '') {
      updateOperator(currentValue.textContent);
    } else if (firstNumber != '' && secondNumber != '') {
      equalsTo();
      updateOperator(currentValue.textContent);
    }
  });
});

equalsButton.addEventListener('click', () => {
  equalsTo();
});

clearButton.addEventListener('click', () => {
  resetCurrentVariables();
  updateCurrentDisplay();
  resetPastDisplay();
});

decimalButton.addEventListener('click', () => {
  if (firstNumber != '' && operator == '' && !firstNumber.includes('.')) {
    appendFirstNumber(decimalButton.textContent);
  } else if (secondNumber != '' && !secondNumber.includes('.')) {
    appendSecondNumber(decimalButton.textContent);
  }
});

deleteButton.addEventListener('click', () => {
  if (firstNumber != '' && operator == '') {
    updateFirstNumber(firstNumber.slice(0, firstNumber.length - 1));
  } else if (operator != '' && secondNumber == '') {
    updateOperator('');
  } else if (secondNumber != '') {
    updateSecondNumber(secondNumber.slice(0, secondNumber.length - 1));
  }
});

//Function responsible to round answers when they get big
function formatResult(number) {
  if (number.toString().length > 10) {
    return number.toPrecision(10);
  } else {
    return number;
  }
}

//Functions corresponding to the calculator basic operations
function add(number1, number2) {
  return formatResult(number1 + number2);
}

function subtract(number1, number2) {
  return formatResult(number1 - number2);
}

function multiply(number1, number2) {
  return formatResult(number1 * number2);
}

function divide(number1, number2) {
  return formatResult(number1 / number2);
}

function exponential(number1, number2) {
  return formatResult(Math.pow(number1, number2));
}

function factorial(number) {
  if (Number.isInteger(number) && number >= 0) {
    let result = 1;
    for (i = 1; i < number; i++) {
      result *= i + 1;
    }
    return result;
  } else return 'Undefined';
}

//Function responsible to operate an expression
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
    case '^':
      return exponential(number1, number2);
    case '!':
      return factorial(number1);
    case '':
      return number1;
  }
}
