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

export default class numberLCD {
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

  private numberToDigit(input: number) {
    return this.LCD_NUMBERS.get(input);
  }

  public convert() {
    let digitLines: string[] = [];
    let numberIndex = 0;
    // for (const number of numbers) {
    //   const resizedDigit = this.numberToDigit(parseInt(number));
    // }
    if (this.number < 10) {
      return this.numberToDigit(this.number);
    }

    const numbers = this.splitNumberToDigitsArray();

    for (const number of numbers) {
      // get right sized digit
      const resizedDigit = this.numberToDigit(Number(number));
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
            this.CARRIAGE_RETURN + digitSplit[heightIndex] + this.SPACE;

          // other first digit in position y need to be assigned
        } else if (!digitLines[heightIndex]) {
          digitLines[heightIndex] = digitSplit[heightIndex] + this.SPACE;

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
    return this.digitLinesToString(digitLines);
  }

  private digitLinesToString(digitLines: string[]) {
    return digitLines.reduce((result, line) => {
      result += `${line}\n`;
      return result;
    }, "");
  }

  private splitNumberToDigitsArray() {
    return this.number.toString().split("");
  }
}
