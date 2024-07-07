//global vars
let NUM1 = 0;
let OPERATOR;
let NUM2 = 0;
let RESULT = 0;

let num1Aquired = false;
let num2Aquired = false;
let operatorAquired = false;
let operatorJustPressed = false;

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
        return undefined;
    }

    else {
        return num1 / num2;
    }
}

function operate(num1, operator, num2) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return mulitply(num1, num2);
        case "/": return divide(num1, num2);
    }
}

// - - - BUTTONS AND DISPLAY - - -

const display = document.querySelector("#display");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");
const log = document.querySelector(".log");

function resetOperatorColors() {
    operatorBtns.forEach( (button) => {
        button.style.backgroundColor = "#C9ADA7";
    });
} 

digitBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if(operatorJustPressed) {
            display.textContent = "";
            operatorJustPressed = false;
            resetOperatorColors();
        }

        display.textContent += button.textContent;
    });
});


operatorBtns.forEach((button) => {
    button.addEventListener("click", () => {

        if (display.textContent === "") {
            //nothing to compute.
            return;
        }

        else if(operatorAquired) {
            //operator already active.
            return;
        }

        else {
            operatorAquired = true;
            operatorJustPressed = true;
            button.style.backgroundColor = "#f99c87";

            if (num1Aquired == false) {
                NUM1 = Number(display.textContent);
                num1Aquired = true;

                switch (button.textContent) {
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
            }

            else if(num1Aquired) {
                if(num2Aquired) {
                    //Chain computation
                }

                NUM2 = Number(display.textContent);
                num2Aquired = true;
            }
        }
    });
});


clearBtn.addEventListener("click", () => {
    display.textContent = "";
    NUM1 = 0;
    NUM2 = 0;
    OPERATOR = "";
    RESULT = "";
    num1Aquired = false;
    num2Aquired = false;
    operatorAquired = false;
    resetOperatorColors();
})

equalsBtn.addEventListener("click", () => {
    NUM2 = Number(display.textContent);
    num2Aquired = true;
    log.textContent = `NUM1: ${NUM1}, NUM2: ${NUM2}, OPERATOR: ${OPERATOR}`;
    if(num1Aquired && num2Aquired && operatorAquired) {
        RESULT = operate(NUM1, OPERATOR, NUM2);
        display.textContent = RESULT;
    }
});