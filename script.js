const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');

const numberButtons = document.getElementsByClassName('digits');
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
        case '➗':
        case '/':
            result = a / b;
            break
    }
    return result;
}

function setOperandButton(object) {
    if (!operator) {
        operandA += object;
        operandA = /^\./g.test(operandA)? '0' + operandA: operandA; 
        mainScreen.textContent = operandA;
    }
    else {
        operandB += object;
        operandB = /^\./g.test(operandB)? '0' + operandB: operandB; 
        mainScreen.textContent = operandB; 
    }
}

function getOperator(object) {
    let operators = {'*': 'x', '/': '➗'};
    return /[\*//]/g.test(object)? operators[object]: object;
}

function setOperatorButton(object) {
    if (operandB !== '') {
        operandB ||= opdB;
        const outcome = operate(operandA, operator, operandB);
        if (isFinite(outcome)) {
            operandA = outcome;
            mainScreen.textContent = operandA;   
            operandB = '';
        } else {
            mainScreen.textContent = 'Cannot divide by zero';
            opT = operator;
        }
    } 
    operandA ||= opdA;
    operator = getOperator(object);
    if (isNaN(parseFloat(mainScreen.textContent))) {
        subScreen.textContent = `${operandA} ${opT} ${operandB} ${operator}`;
        clearAll();
        // Add logic to only show the number and equal buttons
    } else {
        subScreen.textContent = `${operandA} ${operator}`;
    }
    opdB = operandA || operandB;
}

function setEqualButton() {
    operandA ||= opdA;
    if (!operator && !opT) {
        subScreen.textContent = operandA === ''? '0 =': `${operandA} =`;
    } else {
        operandB ||= opdB;
        operator ||= opT;
        const outcome = operate(operandA, operator, operandB);
        if (isFinite(outcome)) {
            subScreen.textContent = `${operandA} ${operator} ${operandB} =`;
            operandA = outcome;
            mainScreen.textContent = operandA;
        } else {
            subScreen.textContent = `${operandA} ${operator}`
            mainScreen.textContent = 'Cannot divide by zero';
            clearAll();
            // Add logic to only show the number and equal buttons
        }
        opdB = operandB;
        opT = operator;
        operandB = '';
        operator = '';
    }
    opdA = operandA;
    operandA = '';
}

function clearAll() {
    operandA = operandB = opdA = opdB = '';
    operator = opT = '';
}

function deleteAll() {
    mainScreen.textContent = 0;
    subScreen.textContent = ''
    clearAll();
}

function setDecimalButton(object) {
    if (!operator) {
        if (!operandA.includes('.')) {
            operandA += object;
        } 
    } else {
        if (!operandB.includes('.')) {
            operandB += object;
        } 
    }
}

window.addEventListener('keydown', event => {
    if (/^\d$/g.test(event.key)) {
        setOperandButton(event.key);
    } else if(/[\+\*//-]/g.test(event.key)) {
        setOperatorButton(event.key);
    } else if(/Enter|=/g.test(event.key)) {
        setEqualButton();
    } else if(/\./g.test(event.key)) {
        setDecimalButton(event.key);
    }
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

percentButton.addEventListener('click', () => {
    if (!operator) {
        operandA /= 100;   
        mainScreen.textContent = operandA;
    } else {
        operandB /= 100; 
        mainScreen.textContent = operandB;
    }
})

negateButton.addEventListener('click', () => {
    if (!operator) {
        operandA = -operandA;
        mainScreen.textContent = operandA;
    } else {
        operandB = -operandB;
        mainScreen.textContent = operandB;
    }
})

decimalButton.addEventListener('click', event => {
    setDecimalButton(event.target.textContent);
})

clearBtn.addEventListener('click', deleteAll);

deleteBtn.addEventListener('click', () => {
    if (!operator) {
        operandA = operandA.toString().slice(0, -1) || 0;
        opdA = operandA;
        mainScreen.textContent = operandA;
    } else {
        if (operandB) {
            operandB = operandB.toString().slice(0, -1) || 0;
            opdB = operandB;
            mainScreen.textContent = operandB;
        }
    }
})