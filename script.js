const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');


const numberButtons = document.getElementsByClassName('digits');
const operatorButtons = document.getElementsByClassName('operators');

const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('backspace');

[...numberButtons].forEach(button => 
    button.addEventListener('click', event => {
        if (/^0$/g.test(mainScreen.textContent)) {
            mainScreen.textContent = '';
        }
        if (mainScreen.textContent.length < 10) {
            mainScreen.textContent += event.target.textContent;
        }
    })
);

[...operatorButtons].forEach(button => 
    button.addEventListener('click', event => {
        console.log(event.target.textContent);
    })    
)

// window.addEventListener('keydown', event => {
//     if (/^0$/g.test(mainScreen.textContent) && /^\d$/g.test(event.key)) {
//         mainScreen.textContent = '';
//     }
//     if (/^\d$/g.test(event.key) && mainScreen.textContent.length < 10) {
//         mainScreen.textContent += event.key;
//     }

// })

// clearBtn.addEventListener('click', () => {
//     mainScreen.textContent = 0;
// })

// deleteBtn.addEventListener('click', () => {
//     mainScreen.textContent = mainScreen.textContent.slice(0, -1) || 0;
// })