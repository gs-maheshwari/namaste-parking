import "@testing-library/jest-dom";

jest.mock("@/actions", () => ({
  signIn: jest.fn(),
}));

jest.mock("@/services", () => ({
  getParkingSpaces: jest.fn(),
  getParkingSessions: jest.fn(),
  endParkingSession: jest.fn(),
}));
