"use server";

import { ParkingSpace } from "@/types";
import Occupancy from "../Occupancy";

import styles from "./overview.module.css";

const Overview = ({ parkingSpaces }: { parkingSpaces: ParkingSpace[]}) => {
  const { occupancy: residentsOccupancy = 0, capacity: residentsCapacity = 0 } =
    parkingSpaces.find((space) => space.parkingSpaceId === 1) || {};

  const { occupancy: nrCarsOccupancy = 0, capacity: nrCarsCapacity = 0 } =
    parkingSpaces.find((space) => space.parkingSpaceId === 2) || {};

  const { occupancy: nrMotorsOccupancy = 0, capacity: nrMotorsCapacity = 0 } =
    parkingSpaces.find((space) => space.parkingSpaceId === 3) || {};

  const totalOccupancy = parkingSpaces.reduce(
    (sum, space) => sum + space.occupancy,
    0
  );
  const totalCapacity = parkingSpaces.reduce(
    (sum, space) => sum + space.capacity,
    0
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Parking Overview</h1>
      <div className={styles.grid}>
        <Occupancy
          title="Residents"
          occupancy={residentsOccupancy}
          capacity={residentsCapacity}
        />
        <Occupancy
          title="Non-Resident Cars"
          occupancy={nrCarsOccupancy}
          capacity={nrCarsCapacity}
        />
        <Occupancy
          title="Non-Resident Motorcycles"
          occupancy={nrMotorsOccupancy}
          capacity={nrMotorsCapacity}
        />
      </div>
      <div className={styles.totalOccupancyWrapper}>
        <div className={styles.totalOccupancy}>
          <Occupancy title="Total Occupancy" occupancy={totalOccupancy} capacity={totalCapacity} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
