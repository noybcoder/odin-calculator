const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');


const numberButtons = document.getElementsByClassName('digits');
const operatorButtons = document.getElementsByClassName('operators');

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

})

// deleteBtn.addEventListener('click', () => {
//     mainScreen.innerHTML = mainScreen.innerHTML.slice(0, -1) || 0;
// })