const keyboard = document.querySelector('.keyboard');
const displayCalc = document.querySelector('.calculations');
const defaultDisplayCalc = document.querySelector('#default-output');

const buttonsCollection = [];
let firstNumber = "";
let secondNumber = "";
let typeOfOperation;
let result;
let nextNumber = false; //holds an information if any arithmetic symbol was used (if so: true)
let outputPermission = true; //variable used for the checkNumber function needs, tells if text can be displayed

const calculationsLog = []; //holds informations about all calculations so far

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

function addToLog(calcType, firstNum, secondNum, calcResult) {
    const calculationInfo = {
        calcType: calcType,
        firstNum: firstNum,
        secondNum: secondNum,
        calcResult: calcResult
    };
    calculationsLog.push(calculationInfo);
    console.log(calculationsLog);
}

function getPreviousResult() {
    firstNumber = calculationsLog[calculationsLog.length - 1].calcResult; //gets last log object in this logs array
}

function outputCalculations(outputValue) {
    let displayText = displayCalc.innerHTML;
    displayText += outputValue;
    displayCalc.innerHTML = displayText;
    outputPermission = true;
}

function clearAll() {
    let displayText = displayCalc.innerHTML;
    displayCalc.innerHTML = "";
    resetMemory();
}

function deleteLastElement() {
    let displayText = displayCalc.innerHTML;
    displayText = displayText.slice(0, -1);
    displayCalc.innerHTML = displayText;
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

function manageCalculation(pressedButton) {
    if (nextNumber === true && secondNumber !== "") {
        checkNumber(pressedButton);
        calculateResult();
        showResult();
        addToLog(typeOfOperation, parseFloat(firstNumber), parseFloat(secondNumber), result);
        resetMemory();
        //the logic below manages all calculations that are based on previous result
        getPreviousResult();
        if (pressedButton === "=") {
            return;
        }
        switch (pressedButton) {
            case "+":
                nextNumber = true;
                typeOfOperation = ADDITION;
                outputCalculations(pressedButton);
                break;
            case "-":
                nextNumber = true;
                typeOfOperation = SUBTRACTION;
                outputCalculations(pressedButton);
                break;
            case "x":
                nextNumber = true;
                typeOfOperation = MULTIPLICATION;
                outputCalculations(pressedButton);
                break;
            case "/":
                nextNumber = true;
                typeOfOperation = DIVISION;
                outputCalculations(pressedButton);
                break;

            default:
                break;
        }
    }
}

//corrects any invalid values that user can input
function checkNumber(pressedButton) {
    let currentNumber;
    //checks which number is currently on use
    if (nextNumber === false) {
        currentNumber = firstNumber;
    } else {
        currentNumber = secondNumber;
    }
    switch (pressedButton) {
        case ".":
            //if user starts with dot symbol - "0" is added before it
            if (currentNumber[0] === pressedButton) {
                if (currentNumber === firstNumber) {
                    firstNumber = "";
                    firstNumber = "0."
                } else {
                    secondNumber = "";
                    secondNumber = "0."
                }
                outputCalculations("0");
            }
            //blocks adding multiple dots to one number
            let dotCounter = 0;
            for (const num of currentNumber) {
                if (num === ".") {
                    dotCounter++;
                }
                if (dotCounter === 2) {
                    if (currentNumber === firstNumber) {
                        firstNumber = firstNumber.slice(0, -1);
                    } else {
                        secondNumber = secondNumber.slice(0, -1);
                    }
                    outputPermission = false;
                    return;
                }
            }
            break;

        case "0":

            if (currentNumber[0] === "0" && currentNumber[1] === "0") {
                if (currentNumber === firstNumber) {
                    firstNumber = firstNumber.slice(0, -1);
                } else {
                    secondNumber = secondNumber.slice(0, -1);
                }
                outputPermission = false;
            }
            break;
        default:
            //works only for +, -, x, / and = :

            //if user will leave alone dot in the end of a number it will be deleted
            if (firstNumber[firstNumber.length - 1] === ".") {
                firstNumber = firstNumber.slice(0, -1);
                deleteLastElement();
            }
            if (secondNumber[secondNumber.length - 1] === ".") {
                secondNumber = secondNumber.slice(0, -1);
                deleteLastElement();
            }
            break;
    }
}

function readButton() {
    manageInput(this.innerHTML);
}

function manageInput(pressedButton) {
    outputPermission = true;
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
        case "=":
            manageCalculation(pressedButton);
            break;
        case "+":
            if (nextNumber === false) {
                nextNumber = true;
                typeOfOperation = ADDITION;
                checkNumber(pressedButton);
                outputCalculations(pressedButton);
            }
            manageCalculation(pressedButton);
            break;
        case "-":
            if (nextNumber === false) {
                nextNumber = true;
                typeOfOperation = SUBTRACTION;
                checkNumber(pressedButton);
                outputCalculations(pressedButton);
            }
            manageCalculation(pressedButton);
            break;
        case "x":
            if (nextNumber === false) {
                nextNumber = true;
                typeOfOperation = MULTIPLICATION;
                checkNumber(pressedButton);
                outputCalculations(pressedButton);
            }
            manageCalculation(pressedButton);
            break;
        case "/":
            if (nextNumber === false) {
                nextNumber = true;
                typeOfOperation = DIVISION;
                checkNumber(pressedButton);
                outputCalculations(pressedButton);
            }
            manageCalculation(pressedButton);
            break;

        default:
            //only works if a number or dot was clicked
            assignToNumber(pressedButton);
            checkNumber(pressedButton);
            if (outputPermission === true) {
                outputCalculations(pressedButton);
            }
            break;
    }
}