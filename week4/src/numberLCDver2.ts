import {
  LCD_ZERO,
  LCD_ONE,
  LCD_TWO,
  LCD_THREE,
  LCD_FOUR,
  LCD_FIVE,
  LCD_SIX,
  LCD_SEVEN,
  LCD_EIGHT,
  LCD_NINE,
} from "./config/constants";

export default class numberLCDver2 {
  private number: number;

  private LCD_NUMBERS = new Map([
    [0, LCD_ZERO],
    [1, LCD_ONE],
    [2, LCD_TWO],
    [3, LCD_THREE],
    [4, LCD_FOUR],
    [5, LCD_FIVE],
    [6, LCD_SIX],
    [7, LCD_SEVEN],
    [8, LCD_EIGHT],
    [9, LCD_NINE],
  ]);
  private CARRIAGE_RETURN = "\n";
  private SPACE = " ";

  constructor(input: number) {
    this.number = input;
  }
  public convert(width: number, height: number) {
    let digitLines: string[] = [];
    let numberIndex = 0;

    const numbers = this.splitNumberToDigitsArray();

    for (const number of numbers) {
      // get right sized digit
      const resizedDigit = this.resizeDigit(
        this.numberToDigit(Number(number)),
        width,
        height
      );
      const digitSplit = resizedDigit.split(this.CARRIAGE_RETURN);

      for (
        let heightIndex = 1;
        heightIndex < digitSplit.length - 1;
        heightIndex++
      ) {
        // first digit position y=0 x=0 need \n and to be assigned
        if (
          numberIndex === 0 &&
          heightIndex === 1 &&
          !digitLines[heightIndex]
        ) {
          digitLines[heightIndex] =
            this.CARRIAGE_RETURN +
            digitSplit[heightIndex] +
            (numberIndex + 1 < numbers.length ? this.SPACE : "");

          // other first digit in position y need to be assigned
        } else if (!digitLines[heightIndex]) {
          digitLines[heightIndex] =
            digitSplit[heightIndex] +
            (numberIndex + 1 < numbers.length ? this.SPACE : "");

          // if its not the last word, a space to improve lisibility
        } else if (numberIndex + 1 < numbers.length) {
          digitLines[heightIndex] += digitSplit[heightIndex] + this.SPACE;
          // last words don't need extra space
        } else {
          digitLines[heightIndex] += digitSplit[heightIndex];
        }
      }
      numberIndex++;
    }
    const result = this.digitLinesToString(digitLines);
    const fs = require("fs");
    fs.writeFile("./test.txt", result, (err: any) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
    return result;
  }

  private digitLinesToString(digitLines: string[]) {
    return digitLines.reduce((result, line) => {
      result += `${line}\n`;
      return result;
    }, "");
  }

  private numberToDigit(input: number) {
    return this.LCD_NUMBERS.get(input);
  }

  private splitNumberToDigitsArray() {
    const arrNumber = this.number.toString().split("");
    return arrNumber;
  }

  private resizeDigit(digit: string, width: number = 1, height: number = 1) {
    if (!width && !height) {
      return digit;
    }
    return this.resizeDigitHeight(digit, height);
    // return this.resizeDigitWidth(this.resizeDigitHeight(digit, height), width);
  }

  private resizeDigitWidth(digit: string, width: number) {
    // No width resizing for digit 1
    if (digit === this.numberToDigit(1)) {
      return digit;
    } else if (width <= 1) {
      return digit;
    }

    const digitSplit = digit.split(this.CARRIAGE_RETURN);
    
    const height = digitSplit.length - 2; // remove extra \n at start and end
    let digitResize = this.CARRIAGE_RETURN;

    // iterate though every lines
    for (let heightIterator = 0; heightIterator < height; heightIterator++) {
      const heightIndex = heightIterator + 1;
      let line = digitSplit[heightIndex].charAt(0);
      const character = digitSplit[heightIndex].charAt(1);

      // iterate though every columns
      for (let widthIterator = 0; widthIterator < width; widthIterator++) {
        line += character;
      }
      line += digitSplit[heightIndex].charAt(
        digitSplit[heightIndex].length - 1
      );
      digitResize += `${line}\n`;
    }

    return digitResize;
  }

  private resizeDigitHeight(digit: string, height: number) {
    if (height <= 1) {
      return digit;
    }
    const digitSplit = digit.split(this.CARRIAGE_RETURN);
    console.log('digitSplit', digitSplit);
    let digitResize = this.CARRIAGE_RETURN;
    const upperLine = digitSplit[2];
    const downLine = digitSplit[3];
    const lineWidth = digitSplit[2].length;

    digitResize += `${digitSplit[1]}\n`;
    for (let iteratorHeight = 0; iteratorHeight < height; iteratorHeight++) {
      digitResize += `${upperLine.charAt(0)} ${upperLine.charAt(
        lineWidth - 1
      )}\n`;
    }

    digitResize += `${upperLine.charAt(0)}${upperLine.charAt(
      1
    )}${upperLine.charAt(2)}\n`;
    console.log('digitResize', digitResize);

    for (let iteratorHeight = 0; iteratorHeight < height; iteratorHeight++) {
      digitResize += `${downLine.charAt(0)} ${downLine.charAt(
        lineWidth - 1
      )}\n`;
    }
    digitResize += `${downLine.charAt(0)}${downLine.charAt(1)}${downLine.charAt(
      lineWidth - 1
    )}\n`;
    return digitResize;
  }
}
