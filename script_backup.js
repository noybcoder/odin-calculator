const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');


const numberButtons = document.getElementsByClassName('digits');
const operatorButtons = document.getElementsByClassName('operators');
const equalButton = document.getElementById('equal');
const decialButton = document.getElementById('period');
const percentButton = document.getElementById('percentage');
const decimalButton = document.getElementById('period');

const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('backspace');

let operandA = 0;
let operator = '';
let operandB = 0;
let opADecimal = false;
let opBDecimal = false;


[...numberButtons].forEach(button => 
    button.addEventListener('click', event => {
        if (/^0$/g.test(mainScreen.textContent)) {
            operandA = operandB = '';
        }
        if (operator === '') {
            operandA += event.target.innerHTML;   
            mainScreen.innerHTML = operandA;
        } else {
            operandB += event.target.innerHTML; 
            mainScreen.innerHTML = operandB;
        }

    })
);

[...operatorButtons].forEach(button => 
    button.addEventListener('click', event => {
        if (operator === '') {
            operator = event.target.textContent;
            subScreen.textContent = `${operandA} ${operator}`;
        } else {
            const output = operate(operandA, operator, operandB);
            operandA = output;   
            mainScreen.textContent = operandA;
            operator = event.target.textContent;
            subScreen.textContent = `${operandA} ${operator} `;
        }
    })    
)

// equalButton.addEventListener('click', event => {
//     if (operator === '') {
//         subScreen.textContent = `${operandA} =`;
//     } else {
//         const output = operate(operandA, operator, operandB);
//         operandA = mainScreen.textContent = output;
//         subScreen.textContent = `${operandA} ${operator} ${operandB} =`;
//         operandB = '';
//     }
// })

percentButton.addEventListener('click', event => {
    if (operator === '') {
        operandA /= 100;   
        mainScreen.innerHTML = operandA;
    } else {
        operandB /= 100; 
        mainScreen.innerHTML = operandB;
    }
})

decimalButton.addEventListener('click', event => {
    if ((!opADecimal) || (!opBDecimal)) {
        if (operator === '') {
            operandA += event.target.textContent;   
            mainScreen.innerHTML = operandA;
            opADecimal = true;
        } else {
            operandB += event.target.textContent;   
            mainScreen.innerHTML = operandB;
            opBDecimal = true;
        }
    }
})

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

clearBtn.addEventListener('click', () => {
    mainScreen.innerHTML = operandA = operandB = 0;
    subScreen.innerHTML = operator = '';
    opADecimal = opBDecimal = false;
})

deleteBtn.addEventListener('click', () => {
    if (operator === '') {
        operandA = operandA.slice(0, -1) || 0;
        mainScreen.innerHTML = operandA;
    } else {
        operandB = operandB.slice(0, -1) || 0;
        mainScreen.innerHTML = operandB;
    }
})