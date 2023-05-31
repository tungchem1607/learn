import { describe, expect, test } from "@jest/globals";
import numberLCD from "../src/numberLCD";
import numberLCDver2 from "../src/numberLCDver2";
import {
  LCD_EIGHT,
  LCD_FIVE,
  LCD_FOUR,
  LCD_NINE,
  LCD_ONE,
  LCD_SEVEN,
  LCD_SIX,
  LCD_THREE,
  LCD_TWO,
  LCD_ZERO,
} from "../src/config/constants";

describe("numberLCD", () => {
  const dataInput = new Map<string, (string | number)[]>([
    ["Number 0", [0, LCD_ZERO]],
    ["Number 1", [1, LCD_ONE]],
    ["Number 2", [2, LCD_TWO]],
    ["Number 3", [3, LCD_THREE]],
    ["Number 4", [4, LCD_FOUR]],
    ["Number 5", [5, LCD_FIVE]],
    ["Number 6", [6, LCD_SIX]],
    ["Number 7", [7, LCD_SEVEN]],
    ["Number 8", [8, LCD_EIGHT]],
    ["Number 9", [9, LCD_NINE]],
    [
      "Number 12",
      [
        124,
        `
     _     
  |  _| |_|
  | |_    |
`,
      ],
    ],
    [
      "Number 1234567890",
      [
        1234567890,
        `
     _   _       _   _   _   _   _   _ 
  |  _|  _| |_| |_  |_    | |_| |_| | |
  | |_   _|   |  _| |_|   | |_|  _| |_|
`,
      ],
    ],
  ]);
  dataInput.forEach((value: any, key, map) => {
    test(key, () => {
      const handleNumber = new numberLCD(value[0]);
      expect(handleNumber.convert()).toBe(value[1]);
    });
  });
});

describe("numberLCDver2", () => {
  const dataInputVer2 = new Map<string, (string | number)[]>([
    [
      "Number 2",
      [
        2,
        `
 ___ 
    |
    |
 ___ 
|    
|___ 
`,
        3,
        2,
      ],
    ],
  ]);
  dataInputVer2.forEach((value: any, key, map) => {
    test(key, () => {
      const handleNumberVer2 = new numberLCDver2(value[0]);
      expect(handleNumberVer2.convert(value[2], value[3])).toBe(value[1]);
    });
  });
});
