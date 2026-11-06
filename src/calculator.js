#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new RangeError("Division by zero is not allowed.");
  }
  return left / right;
}

const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

function calculate(operator, left, right) {
  const operation = operations[operator];
  if (!operation) {
    throw new TypeError(`Unsupported operation: ${operator}`);
  }
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new TypeError("Both operands must be valid finite numbers.");
  }
  return operation(left, right);
}

function printUsage() {
  console.error("Usage: node src/calculator.js <+|-|*|/> <number> <number>");
}

function main(args) {
  if (args.length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [operator, leftInput, rightInput] = args;
  if (leftInput.trim() === "" || rightInput.trim() === "") {
    console.error("Both operands must be valid finite numbers.");
    process.exitCode = 1;
    return;
  }

  try {
    console.log(calculate(operator, Number(leftInput), Number(rightInput)));
  } catch (error) {
    if (error instanceof TypeError || error instanceof RangeError) {
      console.error(error.message);
      if (error instanceof TypeError && error.message.startsWith("Unsupported operation")) {
        printUsage();
      }
      process.exitCode = 1;
      return;
    }
    throw error;
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide, calculate };
