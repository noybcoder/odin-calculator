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
            result = a * b;
            break;
        case '➗':
            result = a / b;
            break
    }
    return result;
}

window.addEventListener('keydown', event => {
    if (/^\d$/g.test(event.key)) {
        if (operator === '') {
            operandA += event.key;   
            mainScreen.textContent = operandA;
        } else {
            operandB += event.key; 
            mainScreen.textContent = operandB;
        }
    }
});

[...numberButtons].forEach(button => 
    button.addEventListener('click', event => {
        if (operator === '') {
            operandA += event.target.textContent;   
            mainScreen.textContent = operandA;
        } else {
            operandB += event.target.textContent; 
            mainScreen.textContent = operandB;
        }

    })
);

[...operatorButtons].forEach(button => 
    button.addEventListener('click', event => {
        if (operator === '') {
            operator = event.target.textContent;
            subScreen.textContent = `${operandA} ${operator}`;
        } else {
            if (operandB !== '') {
                const outcome = operate(operandA , operator, operandB);
                operandA =  mainScreen.textContent = outcome;
                operandB = '';
            }
            operator = event.target.textContent;
            subScreen.textContent = `${operandA} ${operator}`;            
        }
    })    
)

equalButton.addEventListener('click', event => {
    if (operator === '') {
        subScreen.textContent = `${operandA} ${event.target.textContent}`;
    } else {
        if (operandB === '') {
            operandB = operandA;
        }
        const outcome = operate(operandA, operator, operandB);
        operandA = mainScreen.textContent = outcome;
        subScreen.textContent = `${operandA} ${operator} ${operandB} ${event.target.textContent}`;
    }
})

percentButton.addEventListener('click', event => {
    if (operator === '') {
        operandA /= 100;   
        mainScreen.textContent = operandA;
    } else {
        operandB /= 100; 
        mainScreen.textContent = operandB;
    }
})

negateButton.addEventListener('click', event => {
    if (operator === '') {
        operandA = -operandA;
        mainScreen.textContent = operandA;
    } else {
        operandB = -operandB;
        mainScreen.textContent = operandB;
    }
})

decimalButton.addEventListener('click', event => {
    if (operator === '') {
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
    opADecimal = opBDecimal = 0;
})

deleteBtn.addEventListener('click', () => {
    if (operator === '') {
        operandA = operandA.slice(0, -1) || 0;
        mainScreen.textContent = operandA;
    } else {
        operandB = operandB.slice(0, -1) || 0;
        mainScreen.textContent = operandB;
    }
})