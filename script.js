// function display(val) {
//   document.getElementById("display").value += val;
// }

// function clearDisplay() {
//   document.getElementById("display").value = " ";
// }

// function calculate() {
//   const expression = document.getElementById("display").value;
//   const result = eval(expression);
//   document.getElementById("display").value = result;
// }

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    // set varibles to empty input
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  appendNum(num) {
    this.currentOperand += num;
  }

  chooseOperation(operation) {
    // Cannot use operation if there is no cuurent operand
    if (this.currentOperand === "") return;
    // Compute operation if there is a pervious operation
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    // Make sure there is a previous or current operand when computing
    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "/":
        result = prev / curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "+":
        result = prev + curr;
        break;
      case "%":
        result = prev % curr;
        break;
      default:
        console.log("Not an operation");
        return;
    }

    this.previousOperand = " ";
    this.operation = undefined;
    this.currentOperand = result;
  }
  getDisplayNumber(num) {
    return num;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != undefined) {
      this.previousOperandTextElement.innerText =
        this.previousOperand + " " + this.operation;
    } else {
      this.previousOperandTextElement.innerText = this.previousOperand;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Set all variables
  const previousOperandTextElement =
    document.getElementById("previous-operand");
  const currentOperandTextElement = document.getElementById("current-operand");
  const numberButtons = document.querySelectorAll(".data-number");
  const operationButtons = document.querySelectorAll(".data-operation");
  const allClearButton = document.querySelector("#all-clear");
  const equalButton = document.querySelector("#equals");

  // Create a calculator
  const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
  );

  // For each number, add a listener
  numberButtons.forEach((input) => {
    // When input is clicked, append the value and update the display
    input.addEventListener("click", () => {
      calculator.appendNum(input.value);
      calculator.updateDisplay();
    });
  });

  // For each opertaion, add a listener
  operationButtons.forEach((input) => {
    // When input is clicked, update the previous and current operand
    input.addEventListener("click", () => {
      calculator.chooseOperation(input.value);
    });
  });

  // Clear both divs when AC is clicked
  allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  // Compute results when equals is clicked
  equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
  });
});
