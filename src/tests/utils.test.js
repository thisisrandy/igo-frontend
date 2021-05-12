import { capitalizeFirstLetter } from "../utils";

test("capitalizes the first letter", () => {
  expect(capitalizeFirstLetter("foo")).toBe("Foo");
});

test("doesn't change other letters' capitalization", () => {
  expect(capitalizeFirstLetter("FoO")).toBe("FoO");
});
