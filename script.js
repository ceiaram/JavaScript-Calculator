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
    // first set varibles to empty input
    this.currentOperand = "";
    this.previousOperand = "";

    // than set the text to empty input variables
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }

  appendNum(num) {
    this.currentOperand += num;
  }

  chooseOperation(operation) {
    // You can implement this function to handle operations.
  }

  compute() {
    // You can implement this function to compute results.
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
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

  // Clear both divs when AC is clicked
  allClearButton.addEventListener("click", () => {
    calculator.clear();
  });
});
