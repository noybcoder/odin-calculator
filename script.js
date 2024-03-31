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

let operandA = 0, operandB = 0, opdA = 0, opdB = 0;
let operator = '', opT = '';
let opADecimal = false, opBDecimal = false;

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
        operandA = parseFloat(operandA);
        mainScreen.textContent = operandA;
    }
    else {
        operandB += object;
        operandB = parseFloat(operandB);
        mainScreen.textContent = operandB; 
    }
}

function getOperator(object) {
    let operators = {'*': 'x', '/': '➗'};
    return /[\*//]/g.test(object)? operators[object]: object;
}

function setOperatorButton(object) {
    if (operandB) {
        operandB ||= opdB;
        operandA = operate(operandA, operator, operandB);
        mainScreen.textContent = operandA;
        opdB = operandA || operandB;
        operandB = 0;
    } else {
        opdB = opdA || opdB;
    }
    operandA ||= opdA;
    operator = getOperator(object);
    subScreen.textContent = `${operandA} ${operator}`;
}

function setEqualButton() {
    operandA ||= opdA;

    if (!operator && !opT) {
        subScreen.textContent = `${operandA} =`;
    } else {
        operandB ||= opdB;
        operator ||= opT;
        subScreen.textContent = `${operandA} ${operator} ${operandB} =`;
        operandA = operate(operandA, operator, operandB);
        mainScreen.textContent = operandA;
        opdB = operandB;
        opT = operator;
        operandB = 0;
        operator = '';
    }

    opdA = operandA;
    operandA = 0;
}

window.addEventListener('keydown', event => {
    if (/^\d$/g.test(event.key)) {
        setOperandButton(event.key);
    } else if(/[\+\*//-]/g.test(event.key)) {
        setOperatorButton(event.key);
    } else if(/Enter|=/g.test(event.key)) {
        setEqualButton();
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
    if (!operator) {
        if (!opADecimal) {
            operandA += event.target.textContent;
            mainScreen.textContent = operandA;
            opADecimal = true;
        }
    } else {
        if (!opBDecimal) {
            operandB += event.target.textContent;
            mainScreen.textContent = operandB;
            opBDecimal = true;
        }
    }
})

clearBtn.addEventListener('click', () => {
    mainScreen.textContent = 0;
    operandA = operandB = opdA = opdB = 0;
    operator = opT = subScreen.textContent = '';
    opADecimal = opBDecimal = false;
})

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