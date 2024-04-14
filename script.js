// Declare screen displays and button
const hourDisplay = document.getElementById('hour');
const minuteDisplay = document.getElementById('minute');

const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');

const allButtons = document.querySelectorAll('button');
const numberButtons = document.getElementsByClassName('operands');
const operatorButtons = document.getElementsByClassName('operators');
const equalButton = document.getElementById('equal');
const decialButton = document.getElementById('period');
const percentButton = document.getElementById('percentage');
const decimalButton = document.getElementById('period');
const negateButton = document.getElementById('negation');

const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('backspace');

const sound = document.getElementById('button-sound');

// Declare operands and operators used in calculation
let operandA = '', operandB = '', opdA = '', opdB = '';
let operator = '', opT = '';

// Display the current hour and minute in the calculator
const date = new Date();
hourDisplay.textContent = date.getHours().toString().padStart(2, '0');
minuteDisplay.textContent = date.getMinutes().toString().padStart(2, '0');

// Resize the font size when the text exceeds the screen width
function resizeScreen(element) {
    const screenFontSize = window.getComputedStyle(element).fontSize;
    element.style.fontSize = `${parseFloat(screenFontSize) - 5}px`;

    if (element.clientWidth >= element.parentElement.clientWidth) {
        resizeScreen(element);
    }
}

function setScreenFontSize(element) { 
    element.style.fontSize = '54px';
    resizeScreen(element);
}

// Set up the calculation function
function operate(opA, op, opB) {
    let result = 0;
    a = parseFloat(opA);
    b = parseFloat(opB);

    switch(op) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case 'x':
        case '*':
            result = a * b;
            break;
        case '÷':
        case '/':
            result = a / b;
            break;
    }
    result = result.toString().includes('.')? result.toFixed(10): result;
    return result.toString().length > 18? parseFloat(result).toExponential(2): result;
}

// Set up the decimal separator
function setDecimalSeparator(operand) {
    numbers = /(-?)(\d+,?\d*)(\.?\d*e?\+?\d*)/g.exec(operand);
    integerPortion = numbers[2].split('').reverse().join('');
    const arr = [];

    for (let i = 0; i < integerPortion.length; i += 3) {
        arr.push(integerPortion.substring(i, i + 3));
    }

    let result = arr.join(',').split('').reverse().join('');

    if (numbers[3]) {
        result += numbers[3];
    }

    return numbers[1]? numbers[1] + result: result;
}

// Set up the operand buttons
function setOperandButton(object) {
    if (!operator) {
        operandA += object;
        operandA = /^0*(-?\d+,?\d*\.?\d*)0*$/g.exec(operandA)[1];
        if (/^0\./g.test(operandA)) {
            operandA = operandA.substring(0, 18);
        } else if(/^[1-9]+\./g.test(operandA)) {
            operandA = operandA.substring(0, 17);
        } else {
            operandA = operandA.substring(0, 16);
        }
        opdA = operandA;
        mainScreen.textContent = setDecimalSeparator(operandA);
    }
    else {
        operandB += object;
        operandB = /^0*(-?\d+,?\d*\.?\d*)0*$/g.exec(operandB)[1];
        if (/^0\./g.test(operandB)) {
            operandB = operandB.substring(0, 18);
        } else if(/^[1-9]+\./g.test(operandB)) {
            operandB = operandB.substring(0, 17);
        } else {
            operandB = operandB.substring(0, 16);
        }        
        opdB = operandB;
        mainScreen.textContent = setDecimalSeparator(operandB); 
    }
}

// Set up the button mapper for buttons that have different keys
function setButtonMapper(object) {
    let buttonMappers = {'*': 'x', '/': '÷', 'Escape': 'AC', 'Backspace': '⌫'};
    return /[\*//]|Backspace|Escape/g.test(object)? buttonMappers[object]: object;
}

// Set up the operator buttons
function setOperatorButton(object) {
    if (operandB !== '') {
        operandB ||= opdB;
        const outcome = operate(operandA || 0, operator, operandB || 0);
        if (operator === '÷' && parseFloat(operandB) === 0) {
            mainScreen.textContent = 'Cannot divide by zero';
            opT = operator;
        } else {
            operandA = outcome;
            mainScreen.textContent = setDecimalSeparator(operandA);
            operandB = '';
        }
    } 
    operandA ||= opdA;
    operator = setButtonMapper(object);
    if (isNaN(parseFloat(mainScreen.textContent))) {
        subScreen.textContent = `${operandA || 0} ${opT} ${operandB || 0} ${operator}`;
        clearAll();
    } else {
        subScreen.textContent = `${operandA || 0} ${operator}`;
    }
    opdB = operandA || operandB;
}

// Set up the equal button
function setEqualButton() {
    operandA ||= opdA;
    if (!operator && !opT) {
        subScreen.textContent = `${operandA || 0} =`;
    } else {
        operandB ||= opdB;
        operator ||= opT;
        const outcome = operate(operandA || 0, operator, operandB || 0);
        if (operator === '÷' && parseFloat(operandB) === 0) {
            subScreen.textContent = `${operandA || 0} ${operator}`
            mainScreen.textContent = 'Cannot divide by zero';
            clearAll();
        } else {
            subScreen.textContent = `${operandA || 0} ${operator} ${operandB || 0} =`;
            operandA = outcome;
            mainScreen.textContent = setDecimalSeparator(operandA);
        }
        opdB = operandB;
        opT = operator;
        operandB = '';
        operator = '';
    }
    opdA = operandA;
    operandA = '';
}

// Set up the percentage button
function setPercentButton() {
    if (!operator) {
        operandA = (operandA || opdA)/100;
        mainScreen.textContent = setDecimalSeparator(operandA);
    } else {
        operandB = (operandB || opdB)/100;
        mainScreen.textContent = setDecimalSeparator(operandB);
    }
}

// Set up the negate button
function setNegateButton() {
    if (!operator) {
        operandA = -(operandA || opdA) ;
        mainScreen.textContent = setDecimalSeparator(operandA);
    } else {
        operandB = -(operandB || opdB);
        mainScreen.textContent = setDecimalSeparator(operandB);
    }
}

// Set up the decimal button
function setDecimalButton(object) {
    if (!operator) {
        if (!operandA.toString().includes('.')) {
            operandA += object;
            operandA = /^\./g.test(operandA)? '0' + operandA: operandA;
            mainScreen.textContent = setDecimalSeparator(operandA);
        } 
    } else {
        if (!operandB.toString().includes('.')) {
            operandB += object;
            operandB = /^\./g.test(operandB)? '0' + operandB: operandB;
            mainScreen.textContent = setDecimalSeparator(operandB);
        } 
    }
}

// Set up the clear everything button
function clearAll() {
    operandA = operandB = opdA = opdB = '';
    operator = opT = '';
}

function setClearAllButton() {
    mainScreen.textContent = 0;
    subScreen.textContent = ''
    clearAll();
}

// Set up the backspace button
function setBackspaceButton() {
    if (!operator) {
        if (operandA !== '') {
            operandA = operandA.toString().slice(0, -1) || 0;
            operandA = /\.$/g.test(operandA)? operandA.replace('.', ''): operandA;
            opdA = operandA;
            mainScreen.textContent = setDecimalSeparator(operandA);
        }
    } else {
        if (operandB != '') {
            operandB = operandB.toString().slice(0, -1) || 0;
            operandB = /\.$/g.test(operandB)? operandB.replace('.', ''): operandB;
            opdB = operandB;
            mainScreen.textContent = setDecimalSeparator(operandB);
        }
    }
}

// Set up the pressed and click events for the buttons
['keydown', 'click'].forEach(action => {
    if (action === 'keydown') {
        window.addEventListener(action, event => {
            allButtons.forEach(button => {
                if (setButtonMapper(event.key) === button.textContent) {
                    button.classList.add('flash');
                    setTimeout(() => {
                        button.classList.remove('flash');
                    }, 100);
                }
            });
            if (/^\d$/g.test(event.key)) {
                setOperandButton(event.key);
            } else if(/[\+\*//-]/g.test(event.key)) {
                setOperatorButton(event.key);
            } else if(/Enter|=/g.test(event.key)) {
                event.preventDefault();
                setEqualButton();
            } else if(/\./g.test(event.key)) {
                setDecimalButton(event.key);
            } else if(/Escape/g.test(event.key)) {
                event.preventDefault();
                setClearAllButton();
            } else if(/Backspace/g.test(event.key)) {
                event.preventDefault();
                setBackspaceButton();
            } else if(/%/g.test(event.key)) {
                setPercentButton();
            }
        })
    } 
    window.addEventListener(action, () => {
        setScreenFontSize(mainScreen);
        sound.play();
    });
});

[...numberButtons].forEach(button => 
    button.addEventListener('click', event => {
        setOperandButton(event.target.textContent);
    })
);

[...operatorButtons].forEach(button => 
    button.addEventListener('click', event => {
        setOperatorButton(event.target.textContent);
    })    
)

equalButton.addEventListener('click', setEqualButton);

percentButton.addEventListener('click', setPercentButton);

negateButton.addEventListener('click', setNegateButton);

decimalButton.addEventListener('click', event => {
    setDecimalButton(event.target.textContent);
})

clearBtn.addEventListener('click', setClearAllButton);

deleteBtn.addEventListener('click', setBackspaceButton);