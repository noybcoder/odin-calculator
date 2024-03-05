const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');

const buttons = document.querySelector('.button-wrapper');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('backspace');

function isNumber(node) {
    const regex = new RegExp('^\\d$', 'g')
    return regex.test(node.textContent);
}

const numberButtons = [...buttons.children].filter(isNumber);

numberButtons.forEach(button => 
    button.addEventListener('click', event => {
        if (/^0$/g.test(mainScreen.textContent)) {
            mainScreen.textContent = 0;
        }
        if (mainScreen.textContent.length < 10) {
            mainScreen.textContent += event.target.textContent;
        }
    })
);

window.addEventListener('keydown', event => {
    if (/^0$/g.test(mainScreen.textContent)) {
        mainScreen.textContent = 0;
    }
    if (/^\d$/g.test(event.key) && mainScreen.textContent.length < 10) {
        mainScreen.textContent += event.key;
    }
})

clearBtn.addEventListener('click', () => {
    mainScreen.textContent = 0;
})

deleteBtn.addEventListener('click', () => {
    mainScreen.textContent = mainScreen.textContent.slice(0, -1) || 0;
})