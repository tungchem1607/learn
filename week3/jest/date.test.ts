import { describe, expect, test } from "@jest/globals";
import moment from "moment";
import date from "./date";

describe("class date", () => {
  const classDate = new date();
  const dateNow = new Date("2023-05-06 14:30:29");
  test("format yyyy/mm/dd", () => {
    expect(classDate.formatDate(dateNow, "YYYY/MM/DD")).toBe("2023/05/06");
  });
  test("format yyyy/mm/dd hh:mm:ss", () => {
    expect(classDate.formatDate(dateNow, "YYYY/MM/DD hh:mm:ss")).toBe(
      "2023/05/06 02:30:29"
    );
  });
  test("format yyyy年mm月dd日", () => {
    expect(classDate.formatDate(dateNow, "YYYY年MM月DD日")).toBe(
      "2023年05月06日"
    );
  });
  test("format yyyy/bb/aa", () => {
    try {
      expect(classDate.formatDate(dateNow, "yyyy/bb/aa"))
    } catch(e) {
      expect(e.message).toBe("FormatInvalidException")
    }
  });
});
