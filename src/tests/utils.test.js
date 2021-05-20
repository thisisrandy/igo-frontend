import { breakLongWords, capitalizeFirstLetter } from "../utils";

describe("test capitalizeFirstLetter", () => {
  test("capitalizes the first letter", () => {
    expect(capitalizeFirstLetter("foo")).toBe("Foo");
  });

  test("doesn't change other letters' capitalization", () => {
    expect(capitalizeFirstLetter("FoO")).toBe("FoO");
  });
});

describe("test breakLongWords", () => {
  test("correctly breaks long words", () => {
    expect(breakLongWords("hello world", 4)).toBe("hel- lo wor- ld");
  });
});
