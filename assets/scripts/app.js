const keyboard = document.querySelector('.keyboard');
const displayCalc = document.querySelector('.calculations');

const buttonsCollection = [];

for (let i = 0; i < keyboard.children.length; i++) {
    buttonsCollection.push(keyboard.children[i]);
}

for (const btn of buttonsCollection) {
    btn.addEventListener("click", readButton.bind(btn));
}

function manageInput(inputValue) {
    if (inputValue === "C" ||
        inputValue === "CE" ||
        inputValue === "+/-" ||
        inputValue === "=" ||
        inputValue === "%") {
        return;
    } else if (inputValue === ".") {
        outputCalculations(inputValue);
        return;
    } else if (displayCalc.innerHTML === "0") {
        displayCalc.innerHTML = "";
    }
    outputCalculations(inputValue);
}

function outputCalculations(outputValue) {
    let displayText = displayCalc.innerHTML;
    displayText += outputValue;
    displayCalc.innerHTML = displayText;
}

function readButton() {
    manageInput(this.innerHTML);
}