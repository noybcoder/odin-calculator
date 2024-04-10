const hourDisplay = document.getElementById('hour');
const minuteDisplay = document.getElementById('minute');

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

function resizeScreen(element) {
    const screenFontSize = window.getComputedStyle(element).fontSize;
    element.style.fontSize = `${parseFloat(screenFontSize) - 3}px`;

    if (element.clientWidth >= element.parentElement.clientWidth) {
        resizeScreen(element);
    }
}

function setScreenFontSize(element) { 
    element.style.fontSize = '50px';
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
        case '➗':
        case '/':
            result = a / b;
            break;
    }
    integerLength = result.toString().split('.')[0].length;
    result = result.toString().includes('.')? result.toFixed(14 - integerLength): result;
    return result.toString().length > 16? parseFloat(result).toExponential(2): result;
}

function setOperandButton(object) {
    if (!operator) {
        operandA += object;
        operandA = /^0*(\d+\.?\d*)0*$/g.exec(operandA)[1];
        if (/^0\./g.test(operandA)) {
            operandA = operandA.substring(0, 18);
        } else if(/^[1-9]+\./g.test(operandA)) {
            operandA = operandA.substring(0, 17);
        } else {
            operandA = operandA.substring(0, 16);
        }
        opdA = operandA;
        mainScreen.textContent = operandA;
    }
    else {
        operandB += object;
        operandB = /^0*(\d+\.?\d*)0*$/g.exec(operandB)[1].substring(0, 18);
        if (/^0\./g.test(operandB)) {
            operandB = operandB.substring(0, 18);
        } else if(/^[1-9]+\./g.test(operandB)) {
            operandB = operandB.substring(0, 17);
        } else {
            operandB = operandB.substring(0, 16);
        }        
        opdB = operandB;
        mainScreen.textContent = operandB.toLocaleString(); 
    }
}

function getOperator(object) {
    let operators = {'*': 'x', '/': '➗'};
    return /[\*//]/g.test(object)? operators[object]: object;
}

function setOperatorButton(object) {
    if (operandB !== '') {
        operandB ||= opdB;
        const outcome = operate(operandA || 0, operator, operandB || 0);
        if (operator === '➗' && parseFloat(operandB) === 0) {
            mainScreen.textContent = 'Cannot divide by zero';
            opT = operator;
        } else {
            operandA = outcome;
            mainScreen.textContent = operandA;
            operandB = '';
        }
    } 
    operandA ||= opdA;
    operator = getOperator(object);
    if (isNaN(parseFloat(mainScreen.textContent))) {
        subScreen.textContent = `${operandA || 0} ${opT} ${operandB || 0} ${operator}`;
        clearAll();
        // Add logic to only show the number and equal buttons
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
        if (operator === '➗' && parseFloat(operandB) === 0) {
            subScreen.textContent = `${operandA || 0} ${operator}`
            mainScreen.textContent = 'Cannot divide by zero';
            clearAll();
            // Add logic to only show the number and equal buttons
        } else {
            subScreen.textContent = `${operandA || 0} ${operator} ${operandB || 0} =`;
            operandA = outcome;
            mainScreen.textContent = operandA;
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
        mainScreen.textContent = operandA;
    } else {
        operandB = (operandB || opdB)/100;
        mainScreen.textContent = operandB;
    }
}

function setNegateButton() {
    if (!operator) {
        operandA = -(operandA || opdA) ;
        mainScreen.textContent = operandA.toLocaleString();
    } else {
        operandB = -(operandB || opdB);
        mainScreen.textContent = operandB.toLocaleString();
    }
}

function setDecimalButton(object) {
    if (!operator) {
        if (!operandA.toString().includes('.')) {
            operandA += object;
            operandA = /^\./g.test(operandA)? '0' + operandA: operandA;
            mainScreen.textContent = operandA;
        } 
    } else {
        if (!operandB.toString().includes('.')) {
            operandB += object;
            operandB = /^\./g.test(operandB)? '0' + operandB: operandB;
            mainScreen.textContent = operandB;
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
            mainScreen.textContent = operandA;
        }
    } else {
        if (operandB != '') {
            operandB = operandB.toString().slice(0, -1) || 0;
            operandB = /\.$/g.test(operandB)? operandB.replace('.', ''): operandB;
            opdB = operandB;
            mainScreen.textContent = operandB;
        }
    }
}

['keydown', 'click'].forEach(action => {
    if (action === 'keydown') {
        window.addEventListener(action, event => {
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