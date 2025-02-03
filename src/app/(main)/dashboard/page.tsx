"use server";

import { Overview } from "@/components";
import { getParkingSpaces } from "@/services";

const Home = async () => {
  const parkingSpaces = (await getParkingSpaces()) || [];
  return <Overview parkingSpaces={parkingSpaces} />;
};

export default Home;
