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

let operandA = '', operator = '', operandB = '';
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
        mainScreen.textContent = parseFloat(operandA);
    } else {
        operandB += object;
        mainScreen.textContent = parseFloat(operandB);
    }
}

function getOperator(object) {
    let operators = {'*': 'x', '/': '➗'};
    return /[\*//]/g.test(object)? operators[object]: object;
}

function setOperatorButton(object) {
    operandA ||= 0;

    if (operandB !== '') {
        const outcome = operate(operandA , operator, operandB);
        operandA =  mainScreen.textContent = outcome;
        operandB = '';
    }
    operator = getOperator(object);
    subScreen.textContent = `${operandA} ${operator}`;
}

function setEqualButton() {
    operandA ||= 0;

    if (!operator) {
        subScreen.textContent = `${operandA} =`;
    } else {
        if (!operandB) {
            operandB = operandA;
        }
        const outcome = operate(operandA, operator, operandB);
        operandA = mainScreen.textContent = outcome;
        subScreen.textContent = `${operandA} ${operator} ${operandB} =`;
    }
}

window.addEventListener('keydown', event => {
    if (/^\d$/g.test(event.key)) {
        setOperandButton(event.key);
    } else if(/[\+\*//-]/g.test(event.key)) {
        setOperatorButton(event.key);
    } else if(/Enter|=/g.test(event.key)) {
        setEqualButton();
    }    
    console.log(event.key);
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
            operandA ||= 0;
            operandA += event.target.textContent;
            mainScreen.textContent = operandA;
            opADecimal = true;
        }
    } else {
        if (!opBDecimal) {
            operandB ||=0;
            operandB += event.target.textContent;
            mainScreen.textContent = operandB;
            opBDecimal = true;
        }
    }
})

clearBtn.addEventListener('click', () => {
    mainScreen.textContent = 0;
    operandA = operandB = operator = subScreen.textContent = '';
    opADecimal = opBDecimal = false;
})

deleteBtn.addEventListener('click', () => {
    if (!operator) {
        operandA = operandA.slice(0, -1) || 0;
        mainScreen.textContent = operandA;
    } else {
        operandB = operandB.slice(0, -1) || 0;
        mainScreen.textContent = operandB;
    }
})