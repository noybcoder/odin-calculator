const hourDisplay = document.getElementById('hour');
const minuteDisplay = document.getElementById('minute');

const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');

const buttons = document.querySelectorAll('button');
const numberButtons = document.getElementsByClassName('operands');
const operatorButtons = document.getElementsByClassName('operators');
const equalButton = document.getElementById('equal');
const decialButton = document.getElementById('period');
const percentButton = document.getElementById('percentage');
const decimalButton = document.getElementById('period');
const negateButton = document.getElementById('negation');

const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('backspace');

let operandA = '', operandB = '', opdA = '', opdB = '';
let operator = '', opT = '';

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

function getOperator(object) {
    let operators = {'*': 'x', '/': '÷'};
    return /[\*//]/g.test(object)? operators[object]: object;
}

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
    operator = getOperator(object);
    if (isNaN(parseFloat(mainScreen.textContent))) {
        subScreen.textContent = `${operandA || 0} ${opT} ${operandB || 0} ${operator}`;
        clearAll();
    } else {
        subScreen.textContent = `${operandA || 0} ${operator}`;
    }
    opdB = operandA || operandB;
}

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

function setPercentButton() {
    if (!operator) {
        operandA = (operandA || opdA)/100;
        mainScreen.textContent = setDecimalSeparator(operandA);
    } else {
        operandB = (operandB || opdB)/100;
        mainScreen.textContent = setDecimalSeparator(operandB);
    }
}

function setNegateButton() {
    if (!operator) {
        operandA = -(operandA || opdA) ;
        mainScreen.textContent = setDecimalSeparator(operandA);
    } else {
        operandB = -(operandB || opdB);
        mainScreen.textContent = setDecimalSeparator(operandB);
    }
}

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

function clearAll() {
    operandA = operandB = opdA = opdB = '';
    operator = opT = '';
}

function setClearAllButton() {
    mainScreen.textContent = 0;
    subScreen.textContent = ''
    clearAll();
}

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

['keydown', 'click'].forEach(action => {
    if (action === 'keydown') {
        window.addEventListener(action, event => {
            for (button of buttons) {
                if (event.key === button.textContent) {
                    button.classList.add('hidden');
                    setTimeout(() => button.classList.remove('hidden'), 100);
                }
            }
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
    window.addEventListener(action, () => setScreenFontSize(mainScreen));
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