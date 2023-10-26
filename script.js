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

  deleteNum() {
    const lengthOfNum = String(this.currentOperand).length;
    const newOperand = this.currentOperand.slice(0, lengthOfNum - 1);

    // Set new operand to current operand
    this.currentOperand = newOperand;
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

  // Adds commas to numbers
  getDisplayNumber(num) {
    // Split number to two parts: before the decimal place and after the decimal place
    const stringNum = num.toString();
    const integerDigits = parseFloat(stringNum.split(".")[0]);
    const decimalDigits = stringNum.split(".")[1];

    let integerDisplay;
    // If not an integer value (nothing...)
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      // If user entered an integer value, there can never be any decimal places
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    // There are decimal digits that the user has entered
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    if (this.operation != undefined) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )}  ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
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
  const deleteButton = document.querySelector("#delete");

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

  // Delete the last number of the operand
  deleteButton.addEventListener("click", () => {
    calculator.deleteNum();
    calculator.updateDisplay();
  });

  // Compute results when equals is clicked
  equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
  });
});
