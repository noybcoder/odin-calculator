const mainScreen = document.getElementById('main-screen');
const subScreen = document.getElementById('sub-screen');


const numberButtons = document.getElementsByClassName('digits');
const operatorButtons = document.getElementsByClassName('operators');

const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('backspace');

let count = 0;

[...numberButtons].forEach(button => 
    button.addEventListener('click', event => {

        if (/^0$/g.test(mainScreen.innerHTML)) {
            mainScreen.innerHTML = '';
        } 
  
        mainScreen.innerHTML += event.target.innerHTML;

    })
);

[...operatorButtons].forEach(button => 
    button.addEventListener('click', event => {
        subScreen.classList.remove('hidden');
        if (subScreen.innerHTML === '') {
            subScreen.innerHTML = `${mainScreen.innerHTML} ${event.target.innerHTML}`;
        }
        else if (/\d+\s\+/g.test(subScreen.innerHTML)) {
            subScreen.innerHTML += ` ${mainScreen.innerHTML} =`;
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