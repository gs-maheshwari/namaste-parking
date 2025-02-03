import { render } from "@testing-library/react";
import Overview from "../src/components/Overview";
import { mockParkingSpaces } from "../__mocks__";

describe("Overview Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<Overview parkingSpaces={mockParkingSpaces} />);

    expect(container).toMatchSnapshot();
  });
});
