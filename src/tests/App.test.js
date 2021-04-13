import { render, screen } from "@testing-library/react";
import App from "../components/App";

// FIXME: This is currently only set up to test the template App
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
