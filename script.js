const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');


const numberButtons = document.getElementsByClassName('digits');
const operatorButtons = document.getElementsByClassName('operators');
const equalButton = document.getElementById('equal');

const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('backspace');

let operandA = 0;
let operator = '';
let operandB = 0;

[...numberButtons].forEach(button => 
    button.addEventListener('click', event => {
        if (/^0$/g.test(mainScreen.textContent)) {
            operandA = operandB = '';
        }
        if (operator === '') {
            operandA += event.target.innerHTML;   
            mainScreen.innerHTML = operandA;
            console.log(operandA, operator);
        } else {
            operandB += event.target.innerHTML; 
            mainScreen.innerHTML = operandB;
            console.log(operandB);
        }

    })
);

[...operatorButtons].forEach(button => 
    button.addEventListener('click', event => {
        subScreen.classList.remove('hidden');
        
        if (operandA !== '') {
            operator = event.target.textContent;
            subScreen.textContent = `${operandA} ${operator}`;
        }
    })    
)

equalButton.addEventListener('click', event => {
    if (operandB !== '') {
        output = operate(operandA, operator, operandB);
        mainScreen.textContent = output;
        subScreen.textContent = `${operandA} ${operator} ${operandB} =`;
        operandA = output;
        operandB = '';
    }
})

function operate(opA, op, opB) {
    let result = 0;
    a = parseInt(opA);
    b = parseInt(opB);

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

// window.addEventListener('keydown', event => {
//     if (/^0$/g.test(mainScreen.innerHTML) && /^\d$/g.test(event.key)) {
//         mainScreen.innerHTML = '';
//     }
//     if (/^\d$/g.test(event.key) && mainScreen.innerHTML.length < 10) {
//         mainScreen.innerHTML += event.key;
//     }

// })

clearBtn.addEventListener('click', () => {
    mainScreen.innerHTML = 0;
    subScreen.classList.add('hidden');
    subScreen.innerHTML = '';
    operandA = operandB = 0;
    operator = '';

})

// deleteBtn.addEventListener('click', () => {
//     mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1) || 0;
// })