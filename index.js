
const main = document.querySelector(".main");
const calScreen = document.querySelector(".screen");

// brain is where the calculation is working. 

const brainFirstNum = document.querySelector(".brain-firstNum");
const brainSecNum = document.querySelector(".brain-secondNum");
const brainOpr = document.querySelector(".brain-operation");

let queue = {
    firstNumber:"",
    firstNumDecimal: false,
    firstOperation:"",
    secondNumber:"",
    secondNumDecimal: false,
    secondOperation:""
}

function operationTextToSymbol(text){
    if(text === "plus"){
        return "+"
    }
    if(text === "minus"){
        return "-"
    }
    if(text === "multiply"){
        return "*"
    }
    if(text === "divide"){
        return "/"
    }
}

function isInteger(number){
    if(!Number.isInteger(number)){
        return true;
    }
}
function toPercentage(){
    let firstNum = parseFloat(queue.firstNumber);
    let secondNum = parseFloat(queue.secondNumber);
    if(secondNum){
        queue.secondNumber = secondNum/100; 
        queue.secondNumDecimal = isInteger(queue.secondNumber);
    }else{
        queue.firstNumber = firstNum/100;
        queue.firstNumDecimal = isInteger(queue.firstNumber);
    }
    displayAtBrain();
    displayAtScreen();
}
function plusMinusConverter(){
    let firstNum = parseFloat(queue.firstNumber);
    let secondNum = parseFloat(queue.secondNumber);
    console.log(firstNum, secondNum)
    if(secondNum){
        queue.secondNumber = secondNum < 0 ? Math.abs(secondNum) : secondNum*-1; 
    }else{
        queue.firstNumber = firstNum < 0 ? Math.abs(firstNum) : firstNum*-1; 
    }
    displayAtBrain();
    displayAtScreen();
}

function displayAtBrain(){
    let operationSymbol = operationTextToSymbol(queue.firstOperation);
    brainFirstNum.innerHTML = queue.firstNumber;
    brainSecNum.innerHTML = queue.secondNumber;
    brainOpr.innerHTML = operationSymbol || "";
}

function displayAtScreen(){
    calScreen.innerHTML = queue.secondNumber || queue.firstNumber ;
}

function handleUsefulFunctions(usefulFunction){
    // HANDLE RESET

    if (usefulFunction === "reset"){
        reset();
    }
    if (usefulFunction === "plusToMinus"){
        plusMinusConverter();
    }
    if (usefulFunction === "percent"){
        toPercentage();
    }
}

function handleOperation(operation){
    let firstNumber = queue.firstNumber;
    let secondNumber = queue.secondNumber;
    let firstOperation = queue.firstOperation;
    if(! firstNumber){ return }
    if(!firstOperation){
        queue.firstOperation = operation;
    }
    if(firstOperation && secondNumber){
            let result = calculator(firstNumber, firstOperation, secondNumber);
            reset();
            queue.firstNumber = result;
            queue.firstOperation = (operation!=="result") ? operation : "";
    }
    displayAtBrain();
    displayAtScreen();
}

function handleNumbers(number){
    // this function handles DECIMAL as well as NUMBERS.
    let firstNumber = queue.firstNumber;
    let secondNumber = queue.secondNumber;
    let firstOperation = queue.firstOperation;
    let firstNumDecimal = queue.firstNumDecimal;
    let secondNumDecimal = queue.secondNumDecimal;

    // input is first number, if there is no operation yet.
    if(!firstOperation){
        // if input(number) is decimal && not decimal yet
        if(number === "." && !firstNumDecimal){ 
            queue.firstNumDecimal = true;
            queue.firstNumber = firstNumber + number;
        }
        //  if number, keep going.
        if(number !== "."){ 
            queue.firstNumber = firstNumber + number;
        }
        if(number === "plusToMinus"){

        }
    }
    // input is second number if there is operator already.
    if(firstOperation){
        if(number === "." && !secondNumDecimal){ 
            queue.secondNumDecimal = true;
            queue.secondNumber = secondNumber + number;
        }
        if(number !== "."){ 
            queue.secondNumber = secondNumber + number;
        }
    }
    displayAtBrain();
    displayAtScreen();
}

function calculator(firstN, operation, secondN){
    let result;
     console.log(firstN, operation, secondN);
    if(operation === "plus"){
      return result = parseFloat(firstN) + parseFloat(secondN)
    }
    if(operation === "minus"){
      return result =  parseFloat(firstN) - parseFloat(secondN)
    }
    if(operation === "multiply"){
      return result =  parseFloat(firstN) * parseFloat(secondN)
    }
    if(operation === "divide"){
      return  result =  parseFloat(firstN) / parseFloat(secondN)
    }
}
function reset(){
    // CLEAN UP THE QUEUE OBJECT AND CALCULATOR SCREEN
    queue.firstNumber = "";
    queue.secondNumber = "";
    queue.firstOperation = "";
    displayAtBrain();
    displayAtScreen();
}

function handleClick(e){
    let number = e.target.dataset.number;
    let operation = e.target.dataset.operation;
    let usefulFunction = e.target.dataset.function;
    let decimal = e.target.dataset.decimal;
    // HANDLE NUMBERS
    if(number){
        handleNumbers(number)
    }
    // HANDLE PLUS, MINUS, DIVIDE, MULTIPLY
    if(operation){
        handleOperation(operation);
    }
    // handle RESET, PERCENTAGE, MINUS-PLUS CONVERTER, ETC
    if(usefulFunction){
       handleUsefulFunctions(usefulFunction)
    }
    if(decimal){
        handleNumbers(decimal);
    }
}

main.addEventListener("click", handleClick);
