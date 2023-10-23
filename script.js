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
    this.currentOperand = "";
    this.previousOperand = "";
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
  const numbers = document.querySelectorAll(".data-number");
  const operations = document.querySelectorAll(".data-operation");
  const allClear = document.querySelector("#all-clear");
  const equals = document.querySelector("#equals");

  // Create a calculator
  const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
  );

  // For each number, add a listener
  numbers.forEach((input) => {
    // When input is clicked, append the value and update the display
    input.addEventListener("click", () => {
      calculator.appendNum(input.value);
      calculator.updateDisplay();
    });
  });
});
