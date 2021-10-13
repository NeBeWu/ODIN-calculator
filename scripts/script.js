//Global variables to keep track of the current computation
let firstNumber = '';
let secondNumber = '';
let operator = '';

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

//Functions to update the global variables and execute other
//functions when these change
function limitSize() {
  if (currentDisplay.textContent.length > 16) {
    alert('Maximum number of characters is 16!');
    deleteLast();
  }
}

function updateFirstNumber(value) {
  firstNumber = value;
  updateCurrentDisplay();
  limitSize();
}

function updateSecondNumber(value) {
  secondNumber = value;
  updateCurrentDisplay();
  limitSize();
}

function updateOperator(value) {
  operator = value;
  updateCurrentDisplay();
  limitSize();
}

function appendFirstNumber(appendValue) {
  updateFirstNumber(firstNumber + appendValue);
}

function appendSecondNumber(appendValue) {
  updateSecondNumber(secondNumber + appendValue);
}

function resetCurrentVariables() {
  updateFirstNumber('');
  updateSecondNumber('');
  updateOperator('');
}

//Functions corresponding to the calculator actions
function appendNumber(number) {
  switch (operator) {
    case '':
      appendFirstNumber(number);
      break;
    case '!':
      break;
    default:
      appendSecondNumber(number);
      break;
  }
}

function appendOperator(operator) {
  if (firstNumber != '' && secondNumber == '') {
    updateOperator(operator);
  } else if (firstNumber != '' && secondNumber != '') {
    equalsTo();
    updateOperator(operator);
  }
}

function equalsTo() {
  if (
    firstNumber == '' ||
    operator == '' ||
    (operator != '!' && secondNumber == '')
  ) {
  } else if (operator == '÷' && Number(secondNumber) == 0) {
    return alert("You can't divide a number by 0.");
  } else if (operator == '!' && !Number.isInteger(firstNumber)) {
    return alert("You can't compute factorials of non-integers.");
  } else {
    let operationResult = operate(operator, firstNumber, secondNumber);
    updatePastDisplay(operationResult);
    resetCurrentVariables();
    updateFirstNumber(`${operationResult}`);
  }
}

function clear() {
  resetCurrentVariables();
  updateCurrentDisplay();
  resetPastDisplay();
}

function appendDecimal() {
  if (firstNumber != '' && operator == '' && !firstNumber.includes('.')) {
    appendFirstNumber('.');
  } else if (secondNumber != '' && !secondNumber.includes('.')) {
    appendSecondNumber('.');
  }
}

function deleteLast() {
  if (firstNumber != '' && operator == '') {
    updateFirstNumber(firstNumber.slice(0, firstNumber.length - 1));
  } else if (operator != '' && secondNumber == '') {
    updateOperator('');
  } else if (secondNumber != '') {
    updateSecondNumber(secondNumber.slice(0, secondNumber.length - 1));
  }
}

//EventListener assignment for each button
numberButton.forEach((currentValue) => {
  currentValue.addEventListener('click', () =>
    appendNumber(currentValue.textContent)
  );
});

operatorButton.forEach((currentValue) => {
  currentValue.addEventListener('click', () =>
    appendOperator(currentValue.textContent)
  );
});

equalsButton.addEventListener('click', () => {
  equalsTo();
});

clearButton.addEventListener('click', () => {
  clear();
});

decimalButton.addEventListener('click', () => {
  appendDecimal();
});

deleteButton.addEventListener('click', () => {
  deleteLast();
});

//EventListener assignment for keyboard
window.addEventListener('keydown', (e) => {
  if (Number.isInteger(Number(e.key))) {
    appendNumber(e.key);
  }
  switch (e.key) {
    case '+':
      appendOperator('+');
      break;
    case '-':
      appendOperator('−');
      break;
    case '*':
      appendOperator('×');
      break;
    case '/':
      appendOperator('÷');
      break;
    case '^':
      appendOperator('^');
      break;
    case '!':
      appendOperator('!');
      break;
    case '=':
    case 'Enter':
      equalsTo();
      break;
    case 'Escape':
      clear();
      break;
    case '.':
      appendDecimal();
      break;
    case 'Backspace':
      deleteLast();
      break;
  }
});

//Functions corresponding to the operations logic
function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

function exponential(number1, number2) {
  return Math.pow(number1, number2);
}

function factorial(number) {
  let result = 1;
  for (i = 1; i < number; i++) {
    result *= i + 1;
  }
  return result;
}

//Function responsible to round answers when they get big
function formatResult(number) {
  if (number.toString().length > 6) {
    return number.toPrecision(6);
  } else {
    return number;
  }
}

//Function responsible to operate an expression
function operate(operator, number1, number2) {
  number1 = Number(number1);
  number2 = Number(number2);

  switch (operator) {
    case '+':
      return formatResult(add(number1, number2));
    case '−':
      return formatResult(subtract(number1, number2));
    case '×':
      return formatResult(multiply(number1, number2));
    case '÷':
      return formatResult(divide(number1, number2));
    case '^':
      return formatResult(exponential(number1, number2));
    case '!':
      return factorial(number1);
  }
}
