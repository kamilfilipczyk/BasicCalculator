const keyboard = document.querySelector('.keyboard');
const displayCalc = document.querySelector('.calculations');

const buttonsCollection = [];

for (let i = 0; i < keyboard.children.length; i++) {
    buttonsCollection.push(keyboard.children[i]);
}

for (const btn of buttonsCollection) {
    btn.addEventListener("click", readButton);
}

// function outputCalculations(outputValue) {
//     let displayText = displayCalc.textContent;
//     displayText += outputValue;
//     displayCalc.textContent = displayText;
// }

function readButton() {
    console.log("click");
}