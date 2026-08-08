let currentInput = "0";
let historyInput = "";
let isEvaluated = false;

const resultElement = document.getElementById("result");
const historyElement = document.getElementById("history");

function updateDisplay() {
  resultElement.innerText = currentInput;
  historyElement.innerText = historyInput;
}

function appendNumber(num) {
  if (isEvaluated) {
    currentInput = num === "." ? "0." : num;
    historyInput = "";
    isEvaluated = false;
  } else {
    if (currentInput === "0" && num !== ".") {
      currentInput = num;
    } else if (num === "." && currentInput.includes(".")) {
      return;
    } else {
      currentInput += num;
    }
  }
  updateDisplay();
}

function appendOperator(op) {
  if (isEvaluated) {
    historyInput = currentInput + " " + getOpSymbol(op);
    currentInput = "0";
    isEvaluated = false;
  } else {
    if (historyInput !== "" && currentInput === "0") {
      historyInput = historyInput.slice(0, -1) + getOpSymbol(op);
    } else {
      historyInput += " " + currentInput + " " + getOpSymbol(op);
      currentInput = "0";
    }
  }
  updateDisplay();
}

function getOpSymbol(op) {
  if (op === "*") return "×";
  if (op === "/") return "÷";
  if (op === "-") return "−";
  return op;
}

function clearDisplay() {
  currentInput = "0";
  historyInput = "";
  isEvaluated = false;
  updateDisplay();
}

function deleteChar() {
  if (isEvaluated) {
    clearDisplay();
    return;
  }
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

function calculate() {
  if (historyInput === "" || isEvaluated) return;

  let fullExpression = historyInput + " " + currentInput;
  let sanitizedExpression = fullExpression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/%/g, "/100");

  try {
    let result = eval(sanitizedExpression);
    
    // Pembulatan angka desimal panjang
    if (!Number.isInteger(result)) {
      result = parseFloat(result.toFixed(8));
    }

    historyInput = fullExpression + " =";
    currentInput = String(result);
    isEvaluated = true;
  } catch (error) {
    currentInput = "Error";
    isEvaluated = true;
  }
  updateDisplay();
}
