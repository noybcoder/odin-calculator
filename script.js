const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');

const buttons = document.querySelector('.button-wrapper');

function isNumber(node) {
    const regex = new RegExp('^\\d$', 'g')
    return regex.test(node.textContent);
}

const numberButtons = [...buttons.children].filter(isNumber);

numberButtons.forEach(button => 
    button.addEventListener('click', event => {
        if (/^0$/g.test(mainScreen.textContent)) {
            mainScreen.textContent = '';
        }
        if (mainScreen.textContent.length < 10) {
            mainScreen.textContent += event.target.textContent;
        }
    })
);

window.addEventListener('keydown', event => {
    if (/^0$/g.test(mainScreen.textContent)) {
        mainScreen.textContent = '';
    }
    if (/^\d$/g.test(event.key) && mainScreen.textContent.length < 10) {
        mainScreen.textContent += event.key;
    }
})

