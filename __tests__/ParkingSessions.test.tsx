import { render } from "@testing-library/react";
import Sessions from "@/components/Sessions";
import { mockParkingSessions } from "../__mocks__";

describe("Sessions Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <Sessions
        sessions={mockParkingSessions.parkingSessions}
        totalCount={mockParkingSessions.parkingSessionsTotalCount}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
