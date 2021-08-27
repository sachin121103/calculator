let previousOperand = '' //first
let currentOperand = '' //second
let currentOperation = null
let ResetScreen = false

const numButtons = document.querySelectorAll('[data-num]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const decimalButton = document.querySelector('[data-decimal]')
const upperScreen = document.getElementById('upper')
const currentScreen = document.getElementById('current')

window.addEventListener('keydown', KeyboardInput)
clearButton.addEventListener('click', clearScreen);
decimalButton.addEventListener('click', addDecimal);
equalsButton.addEventListener('click', calculate)

numButtons.forEach(button =>
    button.addEventListener('click', () => 
    addNum(button.textContent)))

operatorButtons.forEach(button => 
    button.addEventListener('click', () => 
    setOperation(button.textContent)));

function addNum(number) {
    if (currentScreen.textContent === '0' || ResetScreen) {
        resetScreen()
    }
    currentScreen.textContent += number;
}

function resetScreen() {
    currentScreen.textContent = '';
    ResetScreen = false;
}

function clearScreen() {
    currentScreen.textContent = '0';
    upperScreen.textContent = '';
    previousOperand = '';
    currentOperand = '';
    currentOperation = null;
}

function addDecimal() {
    if (ResetScreen) {
        resetScreen()
    }
    else if (currentScreen.textContent === '') {
        currentScreen.textContent = '0';
    }

    else if (currentScreen.textContent.includes('.')) {
        return 
    }
    currentScreen.textContent += '.'
}

function setOperation(operator) {
    if (currentOperation !== null) calculate()
    previousOperand = currentScreen.textContent
    currentOperation = operator
    upperScreen.textContent = `${previousOperand} ${currentOperation}`
    ResetScreen = true
  }


function calculate() {
    if (currentOperation === null || ResetScreen) return
    if (currentOperation === '÷' && currentScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return;
    }
    currentOperand = currentScreen.textContent
    currentScreen.textContent = round(
      operate(currentOperation, previousOperand, currentOperand)
    )
    upperScreen.textContent = `${previousOperand} ${currentOperation} ${currentOperand} =`

    currentOperation = null
  }

  function round(number) {
    return Math.round(number * 100) / 100
}

function KeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) addNum(e.key)
    if (e.key === '.') addDecimal()
    if (e.key === '=' || e.key === 'Enter') calculate()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(setOperator(e.key))
  }
  
  function setOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
  }

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '-':
            if (b === 0) {
                return null;
            }
            else {
            return divide(a, b);
            }
        default:
            return null;
    }
}

