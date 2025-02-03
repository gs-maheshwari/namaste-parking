import { render } from "@testing-library/react";
import { LoginForm } from "../src/components";

describe("LoginForm", () => {
  it("renders LoginForm unchanged", () => {
    const { container } = render(<LoginForm />);
    expect(container).toMatchSnapshot();
  });
});
