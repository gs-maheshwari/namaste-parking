import { VehicleType } from "@/lib";

export interface ParkingSessionsResponse {
  parkingSessions: ParkingSession[];
  parkingSessionsTotalCount: number;
}

export interface ParkingSession {
  parkingSessionId: string;
  parkingSpaceId: number;
  isSessionEnded: boolean;
  sessionLengthInHoursMinutes: number | null;
  sessionStartedAt: string;
  sessionEndedAt: string | null;
  vehicleLicensePlate: string;
  vehicleType: VehicleType;
}

export interface EndedSession {
  parkingSpaceId: Pick<ParkingSession, "parkingSpaceId">;
  sessionLengthInHoursMinutes: Pick<
    ParkingSession,
    "sessionLengthInHoursMinutes"
  >;
}
