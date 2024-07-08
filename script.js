//global vars
let NUM1 = null;
let OPERATOR = null;
let NUM2 = null;
let RESULT = null;

let operatorJustPressed = false;
let resultDisplayed = false;

// - - - - operation functions - - - -

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function mulitply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "ERROR";
    }

    else {
        return num1 / num2;
    }
}

function operate(num1, operator, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    let result;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = mulitply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }

    if(!(Number.isInteger(result))) {
        result = result.toFixed(3);
    }

    return result;
}

// - - - BUTTONS AND DISPLAY - - -

const display = document.querySelector("#display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");
const log = document.querySelector(".log");

function resetOperatorColors() {
    operatorBtns.forEach((button) => {
        button.style.backgroundColor = "#C9ADA7";
    });
}
function updateLog() {
    log.textContent = `NUM1: ${NUM1}, 
    NUM2: ${NUM2}, 
    OPERATOR: ${OPERATOR}, 
    operatorJustPressed: ${operatorJustPressed}, 
    resultDisplayed: ${resultDisplayed}`;
}

function setOperator(operatorTextContent) {
    switch (operatorTextContent) {
        case "+":
            OPERATOR = "+";
            break;
        case "-":
            OPERATOR = "-";
            break;
        case '÷':
            OPERATOR = "/";
            break;
        case "×":
            OPERATOR = "*";
            break;
    }

    //updateLog();
}

digitBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorJustPressed) {
            display.textContent = "";
            operatorJustPressed = false;
            resultDisplayed = false;
            resetOperatorColors();
            
        }

        //result is displayed and no new operator was pressed before
        // user started typing a new number. 
        else if (resultDisplayed){
            display.textContent = "";
            resultDisplayed = false;
            NUM1 = null;
        }

        display.textContent += button.textContent;

        //updateLog();
    });
});


operatorBtns.forEach((button) => {
    button.addEventListener("click", () => {

        if (display.textContent === "") {
            //nothing to compute.
            return;
        }

        else if (operatorJustPressed) {
            //operator already active.
            return;
        }

        else {

            operatorJustPressed = true;
            button.style.backgroundColor = "#f99c87";

            if (NUM1 == null) {
                NUM1 = Number(display.textContent);
                setOperator(button.textContent);
                //updateLog();
            }

            else if (!(NUM1 == null) && !(resultDisplayed) && OPERATOR) {

                //num1, and an operator already aquired. (chain-operation)
                NUM2 = Number(display.textContent);
                RESULT = operate(NUM1, OPERATOR, NUM2);
                display.textContent = RESULT;
                

                NUM1 = RESULT;
                setOperator(button.textContent);
                //updateLog();
            }

            else if (!(NUM1 == null) && (resultDisplayed) && !(OPERATOR)) {
                setOperator(button.textContent);

            }

        }
    });
});


clearBtn.addEventListener("click", () => {
    display.textContent = "";
    NUM1 = null;
    NUM2 = null;
    OPERATOR = null;
    RESULT = null;

    resetOperatorColors();
    //updateLog();
});

equalsBtn.addEventListener("click", () => {

    if(operatorJustPressed || resultDisplayed) {
        return;
    }

    NUM2 = Number(display.textContent);
    //updateLog();

    if (!(NUM1 == null) && !(NUM2 == null) && OPERATOR) {
        RESULT = operate(NUM1, OPERATOR, NUM2);
        display.textContent = RESULT;
        resultDisplayed = true;
        //updateLog();
    }

    NUM1 = RESULT;
    NUM2 = null;
    OPERATOR = null;

    //updateLog();
});