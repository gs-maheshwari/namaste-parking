import { VehicleType } from "@/lib";

export interface ParkingSpace {
  parkingSpaceId: number;
  isOccupied: boolean;
  occupancy: number;
  capacity: number;
  vehicleType: VehicleType | null;
}
