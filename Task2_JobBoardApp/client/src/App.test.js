import { render } from "@testing-library/react";
import App from "./App";

// Mock pages to avoid axios / router issues
jest.mock("./pages/Employer", () => () => <div>Employer</div>);
jest.mock("./pages/Jobs", () => () => <div>Jobs</div>);
jest.mock("./pages/Apply", () => () => <div>Apply</div>);
jest.mock("./pages/Home", () => () => <div>Home</div>);

test("App renders without crashing", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
