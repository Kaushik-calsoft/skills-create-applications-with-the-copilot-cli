
// Supported operations: addition (+), subtraction (-), multiplication (*), division (/),
// modulo (%), exponentiation (^), and square root (sqrt).
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

function modulo(a, b) {
  if (b === 0) {
    throw new RangeError("Modulo by zero is not allowed.");
  }
  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new RangeError("Square root of a negative number is not allowed.");
  }
  return Math.sqrt(n);
}

const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "%": modulo,
  "^": power,
  sqrt: squareRoot,
};

function calculate(operator, ...operands) {
  const operation = operations[operator];
  if (!operation) {
    throw new TypeError(`Unsupported operation: ${operator}`);
  }
  const isUnary = operator === "sqrt";
  const expectedOperands = isUnary ? 1 : 2;
  if (operands.length !== expectedOperands) {
    const expected = isUnary ? "one operand" : "two operands";
    throw new TypeError(`${operator} expects ${expected}.`);
  }
  const [left, right] = operands;
  if (!Number.isFinite(left) || (!isUnary && !Number.isFinite(right))) {
    throw new TypeError("Both operands must be valid finite numbers.");
  }
  return isUnary ? operation(left) : operation(left, right);
}

function printUsage() {
  console.error("Usage: node src/calculator.js <+|-|*|/|%|^> <number> <number>");
  console.error("       node src/calculator.js sqrt <number>");
}

function main(args) {
  const [operator, ...inputs] = args;
  const expectedOperands = operator === "sqrt" ? 1 : 2;
  if (inputs.length !== expectedOperands) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  if (inputs.some((input) => input.trim() === "")) {
    console.error("Both operands must be valid finite numbers.");
    process.exitCode = 1;
    return;
  }

  try {
    console.log(calculate(operator, ...inputs.map(Number)));
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

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
