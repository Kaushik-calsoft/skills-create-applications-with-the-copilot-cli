const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
} = require("../calculator");

describe("calculator arithmetic operations", () => {
  test("addition: 2 + 3 = 5", () => {
    expect(add(2, 3)).toBe(5);
    expect(calculate("+", 2, 3)).toBe(5);
  });

  test("subtraction: 10 - 4 = 6", () => {
    expect(subtract(10, 4)).toBe(6);
    expect(calculate("-", 10, 4)).toBe(6);
  });

  test("multiplication: 45 * 2 = 90", () => {
    expect(multiply(45, 2)).toBe(90);
    expect(calculate("*", 45, 2)).toBe(90);
  });

  test("division: 20 / 5 = 4", () => {
    expect(divide(20, 5)).toBe(4);
    expect(calculate("/", 20, 5)).toBe(4);
  });

  test("modulo returns the remainder", () => {
    expect(modulo(5, 2)).toBe(1);
    expect(calculate("%", 5, 2)).toBe(1);
    expect(modulo(8, 4)).toBe(0);
    expect(modulo(-5, 2)).toBe(-1);
  });

  test("power raises the base to the exponent", () => {
    expect(power(2, 3)).toBe(8);
    expect(power(2, 0)).toBe(1);
    expect(power(2, -2)).toBe(0.25);
    expect(calculate("^", 2, 3)).toBe(8);
  });

  test("square root returns the non-negative root", () => {
    expect(squareRoot(16)).toBe(4);
    expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2));
    expect(squareRoot(0)).toBe(0);
    expect(calculate("sqrt", 16)).toBe(4);
  });

  test("supports fractional and negative results", () => {
    expect(add(-2.5, 1)).toBe(-1.5);
    expect(subtract(2, 5)).toBe(-3);
    expect(multiply(-3, 2.5)).toBe(-7.5);
    expect(divide(7, 2)).toBe(3.5);
  });

  test("supports zero operands", () => {
    expect(add(0, 0)).toBe(0);
    expect(subtract(0, 0)).toBe(0);
    expect(multiply(9, 0)).toBe(0);
    expect(divide(0, 9)).toBe(0);
  });

  test("rejects division by zero, including negative zero", () => {
    expect(() => divide(1, 0)).toThrow(RangeError);
    expect(() => divide(1, -0)).toThrow("Division by zero is not allowed.");
    expect(() => calculate("/", 1, 0)).toThrow(RangeError);
  });

  test("rejects modulo by zero", () => {
    expect(() => modulo(5, 0)).toThrow("Modulo by zero is not allowed.");
    expect(() => calculate("%", 5, 0)).toThrow(RangeError);
  });

  test("rejects square roots of negative numbers", () => {
    expect(() => squareRoot(-1)).toThrow(
      "Square root of a negative number is not allowed.",
    );
    expect(() => calculate("sqrt", -1)).toThrow(RangeError);
  });

  test("requires one square-root operand and two binary operands", () => {
    expect(() => calculate("sqrt")).toThrow("sqrt expects one operand.");
    expect(() => calculate("+", 1)).toThrow("+ expects two operands.");
    expect(() => calculate("sqrt", 4, 2)).toThrow("sqrt expects one operand.");
  });

  test("rejects unsupported operations", () => {
    expect(() => calculate("?", 5, 2)).toThrow("Unsupported operation: ?");
  });

  test("rejects non-finite operands", () => {
    expect(() => calculate("+", Number.NaN, 1)).toThrow(
      "Both operands must be valid finite numbers.",
    );
    expect(() => calculate("*", 1, Number.POSITIVE_INFINITY)).toThrow(
      "Both operands must be valid finite numbers.",
    );
  });
});
