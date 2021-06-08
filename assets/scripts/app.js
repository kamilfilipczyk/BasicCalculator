const keyboard = document.querySelector('.keyboard');
const displayCalc = document.querySelector('.calculations');
const defaultDisplayCalc = document.querySelector('#default-output');

const buttonsCollection = [];
let firstNumber = "";
let secondNumber = "";
let typeOfOperation;
let result;
let nextNumber = false; //holds an information if any arithmetic symbol was used (if so: true)


const ADDITION = "addition";
const SUBTRACTION = "subtraction";
const MULTIPLICATION = "multiplication";
const DIVISION = "division";

//selects every button on the keyboard
for (let i = 0; i < keyboard.children.length; i++) {
    buttonsCollection.push(keyboard.children[i]);
}

//adds listeners to every button
for (const btn of buttonsCollection) {
    btn.addEventListener("click", readButton.bind(btn));
}


function outputCalculations(outputValue) {
    let displayText = displayCalc.innerHTML;
    displayText += outputValue;
    displayCalc.innerHTML = displayText;
}

function clearAll() {
    let displayText = displayCalc.innerHTML;
    displayCalc.innerHTML = "";
    resetMemory();
}

function showResult() {
    let displayText = displayCalc.innerHTML;
    displayCalc.innerHTML = result;
}

function resetMemory() {
    nextNumber = false;
    firstNumber = "";
    secondNumber = "";
    result = 0;
    typeOfOperation = "";
}

function assignToNumber(inputValue) {
    if (nextNumber === false) {
        firstNumber += inputValue;
    } else {
        secondNumber += inputValue;
    }
}

function calculateResult() {
    switch (typeOfOperation) {
        case ADDITION:
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case SUBTRACTION:
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case MULTIPLICATION:
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case DIVISION:
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;

        default:
            break;
    }
}

function readButton() {
    manageInput(this.innerHTML);
}

function manageInput(pressedButton) {
    switch (pressedButton) {
        case "C":
            clearAll();
            break;
        case "CE":

            break;
        case "%":

            break;
        case "+/-":

            break;
        case ".":

            break;
        case "=":
            if (nextNumber === true && secondNumber !== "") {
                nextNumber = false;
                calculateResult();
                showResult();
                resetMemory();
            }
            break;
        case "+":
            if (nextNumber === false) {
                nextNumber = true;
                typeOfOperation = ADDITION;
                outputCalculations(pressedButton);
            }
            break;
        case "-":
            if (nextNumber === false) {
                nextNumber = true;
                typeOfOperation = SUBTRACTION;
                outputCalculations(pressedButton);
            }
            break;
        case "x":
            if (nextNumber === false) {
                nextNumber = true;
                typeOfOperation = MULTIPLICATION;
                outputCalculations(pressedButton);
            }
            break;
        case "/":
            if (nextNumber === false) {
                nextNumber = true;
                typeOfOperation = DIVISION;
                outputCalculations(pressedButton);
            }
            break;

        default:
            //only works if a number was clicked
            outputCalculations(pressedButton);
            assignToNumber(pressedButton);
            break;
    }
}