import { Sessions } from "@/components";
import { getParkingSessions } from "@/services";

const Home = async () => {
  const sessionsData = await getParkingSessions();

  return <Sessions sessionsData={sessionsData} />;
};

export default Home;
